import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import type { Lang } from "./content";

gsap.registerPlugin(ScrollTrigger);
export { gsap, ScrollTrigger };

export const REDUCED = typeof window !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
export const TOUCH = typeof window !== "undefined" && matchMedia("(pointer: coarse)").matches;

/* ---------- scroll suave ---------- */
export let lenis: Lenis | null = null;
export function initLenis() {
  if (REDUCED || lenis) return;
  lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((t) => lenis?.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  if (import.meta.env.DEV) (window as unknown as { __lenis: Lenis }).__lenis = lenis;
}
export function scrollToId(id: string) {
  const el = id === "top" ? 0 : document.getElementById(id);
  if (el === null) return;
  if (lenis) lenis.scrollTo(el as HTMLElement | number, { duration: 1.6 });
  else if (el === 0) window.scrollTo({ top: 0 });
  else el.scrollIntoView();
}
export function lockScroll(on: boolean) {
  if (lenis) (on ? lenis.stop() : lenis.start());
  document.documentElement.style.overflow = on ? "hidden" : "";
}

/* ---------- idioma ---------- */
type Ctx = { lang: Lang; setLang: (l: Lang) => void };
export const LangCtx = createContext<Ctx>({ lang: "en", setLang: () => {} });
export const useLang = () => useContext(LangCtx);
/** t(obj) devuelve el texto del idioma actual */
export function useT() {
  const { lang } = useLang();
  return <T,>(o: Record<Lang, T>) => o[lang];
}
export function initialLang(): Lang {
  try {
    const s = localStorage.getItem("tv-lang");
    if (s === "en" || s === "it" || s === "es") return s;
  } catch { /* sin storage */ }
  const n = (navigator.language || "en").slice(0, 2);
  return n === "it" ? "it" : n === "es" ? "es" : "en";
}

/* ---------- texto partido ---------- */
export function Chars({ text, className = "" }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((w, wi) => (
        <span key={wi}>
          <span className="inline-block whitespace-nowrap" aria-hidden>
            {[...w].map((ch, i) => (
              <span className={`mask ${className}`} key={i}><span data-char>{ch}</span></span>
            ))}
          </span>
          {wi < words.length - 1 ? " " : ""}
        </span>
      ))}
      <span className="sr-only">{text}</span>
    </>
  );
}
export function Words({ text, className = "", mask = true }: { text: string; className?: string; mask?: boolean }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((w, i) => (
        <span key={i}>
          {mask ? (
            <span className={`mask ${className}`}><span data-word>{w}</span></span>
          ) : (
            <span data-word className={className}>{w}</span>
          )}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </>
  );
}

/* ---------- magnético ---------- */
export function Magnetic({ children, strength = 0.35, className = "" }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || TOUCH || REDUCED) return;
    const xTo = gsap.quickTo(el, "x", { duration: 0.8, ease: "elastic.out(1, 0.35)" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.8, ease: "elastic.out(1, 0.35)" });
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const leave = () => { xTo(0); yTo(0); };
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => { el.removeEventListener("mousemove", move); el.removeEventListener("mouseleave", leave); };
  }, [strength]);
  return <span ref={ref} className={`inline-block ${className}`}>{children}</span>;
}

/* ---------- hora en Venecia ---------- */
export function useVeniceTime() {
  const fmt = () => new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Rome", hour: "2-digit", minute: "2-digit", second: "2-digit" }).format(new Date());
  const [t, setT] = useState(fmt);
  useEffect(() => { const id = setInterval(() => setT(fmt()), 1000); return () => clearInterval(id); }, []);
  return t;
}

/* ---------- cursor (sin estado de React: todo directo al DOM) ---------- */
export function Cursor() {
  const root = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (TOUCH) return;
    document.documentElement.classList.add("has-cursor");
    const el = root.current!;
    gsap.set(el, { xPercent: -50, yPercent: -50 });
    const xTo = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3" });
    let lastTarget: Element | null = null;
    const move = (e: MouseEvent) => {
      xTo(e.clientX); yTo(e.clientY);
      el.style.opacity = "1";
      const tg = e.target;
      if (tg === lastTarget || !(tg instanceof Element)) return;
      lastTarget = tg;
      const t = tg.closest<HTMLElement>("[data-cursor], a, button");
      const txt = t?.dataset.cursor ?? "";
      el.classList.toggle("is-hover", !!t && !txt);
      el.classList.toggle("is-label", !!txt);
      if (txt && label.current) label.current.textContent = txt;
    };
    // si el contenido bajo el mouse cambia (p. ej. texto "Copiado!"), se vuelve a leer al moverse
    const reset = () => { lastTarget = null; };
    const out = () => { el.style.opacity = "0"; };
    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("click", reset);
    window.addEventListener("wheel", reset, { passive: true });
    document.addEventListener("mouseleave", out);
    return () => {
      window.removeEventListener("mousemove", move); window.removeEventListener("click", reset); window.removeEventListener("wheel", reset);
      document.removeEventListener("mouseleave", out); document.documentElement.classList.remove("has-cursor");
    };
  }, []);
  if (TOUCH) return null;
  return (
    <div ref={root} className="cur pointer-events-none fixed left-0 top-0 z-[100] mix-blend-difference" style={{ opacity: 0 }}>
      <div className="cur-dot" />
      <span ref={label} className="cur-label" />
    </div>
  );
}

/* ---------- reloj (componente propio para no re-renderizar secciones enteras) ---------- */
export function VeniceClock({ className = "" }: { className?: string }) {
  const t = useVeniceTime();
  return <span className={className}>{t}</span>;
}
