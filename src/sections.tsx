import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ARCHIVE, LANGS, LINKS, PATH, STACK, UI, type Lang } from "./content";
import { Chars, Magnetic, REDUCED, ScrollTrigger, Words, gsap, scrollToId, useLang, useT, VeniceClock } from "./lib";

/* ================= LOADER ================= */
export function Loader({ onReveal, onDone }: { onReveal: () => void; onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const num = useRef<HTMLSpanElement>(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (REDUCED) { onReveal(); onDone(); return; }
      const c = { v: 0 };
      gsap.timeline({ onComplete: onDone })
        .from("[data-char]", { yPercent: 110, stagger: 0.035, duration: 1, ease: "expo.out" })
        .to(c, { v: 100, duration: 2, ease: "power3.inOut", onUpdate: () => { if (num.current) num.current.textContent = String(Math.round(c.v)).padStart(3, "0"); } }, 0)
        .to(".bar", { scaleX: 1, duration: 2, ease: "power3.inOut" }, 0)
        .to("[data-char]", { yPercent: -110, stagger: 0.02, duration: 0.6, ease: "expo.in" }, "+=0.05")
        .to(".ld-meta", { opacity: 0, duration: 0.3 }, "<")
        .call(onReveal, [], "+=0.15")
        .to(root.current, { clipPath: "inset(0% 0% 100% 0%)", duration: 1.1, ease: "expo.inOut" }, "<-0.2");
    }, root);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div ref={root} className="fixed inset-0 z-[80] flex flex-col justify-between bg-ink p-4 text-paper md:p-8" style={{ clipPath: "inset(0% 0% 0% 0%)" }}>
      <div className="ld-meta label flex justify-between text-mute"><span>Portfolio</span><span>©2026</span></div>
      <div className="text-[17vw] font-medium leading-[0.85] tracking-[-0.06em] md:text-[12vw]">
        <Chars text="Tomas Vales" />
      </div>
      <div className="ld-meta">
        <div className="flex items-end justify-between">
          <span className="label text-mute">Argentina → Venezia</span>
          <span ref={num} className="font-mono text-5xl tabular-nums md:text-7xl">000</span>
        </div>
        <div className="mt-4 h-px w-full bg-paper/15"><div className="bar h-px origin-left scale-x-0 bg-paper" /></div>
      </div>
    </div>
  );
}

/* ================= CAMBIO DE IDIOMA ================= */
export function LangWipe({ target }: { target: Lang | null }) {
  return (
    <div id="lang-wipe" className="pointer-events-none fixed inset-0 z-[85] flex items-center justify-center bg-ink text-paper" style={{ clipPath: "inset(100% 0% 0% 0%)" }}>
      <span className="font-serif text-[30vw] italic leading-none md:text-[18vw]">{target === "en" ? "Hello" : target === "it" ? "Ciao" : "Hola"}</span>
    </div>
  );
}

/* ================= NAV ================= */
export function Nav({ onLang }: { onLang: (l: Lang) => void }) {
  const { lang } = useLang();
  const t = useT();
  const links: [string, string][] = [["work", t(UI.nav.work)], ["about", t(UI.nav.about)], ["contact", t(UI.nav.contact)]];
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    // el nav cambia a blanco cuando pasa sobre una sección oscura
    const active = new Set<Element>();
    const sts = [...document.querySelectorAll("[data-dark]")].map((el) =>
      ScrollTrigger.create({
        trigger: el, start: "top 40px", end: "bottom 40px", refreshPriority: -1,
        onToggle: (st) => { if (st.isActive) active.add(el); else active.delete(el); ref.current?.classList.toggle("on-dark", active.size > 0); },
      }),
    );
    return () => sts.forEach((st) => st.kill());
  }, []);
  return (
    <header ref={ref} className="nav fixed inset-x-0 top-0 z-50 flex items-start justify-between p-4 md:px-8 md:py-6">
      <button onClick={() => scrollToId("top")} className="text-sm font-medium tracking-tight">
        Tomas Vales<sup className="ml-0.5 text-[9px]">©</sup>
      </button>
      <nav className="hidden gap-8 text-sm md:flex">
        {links.map(([id, name]) => (
          <Magnetic key={id}><button onClick={() => scrollToId(id)} className="ulink">{name}</button></Magnetic>
        ))}
      </nav>
      <div className="label flex gap-3">
        {LANGS.map((l) => (
          <button key={l} onClick={() => l !== lang && onLang(l)} className={`transition-opacity ${l === lang ? "opacity-100" : "opacity-40 hover:opacity-100"}`}>
            {l}
            <span className={`block h-px bg-current transition-transform duration-500 ${l === lang ? "scale-x-100" : "scale-x-0"}`} />
          </button>
        ))}
      </div>
    </header>
  );
}

/* ================= HERO ================= */
export function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null);
  const t = useT();
  const { lang } = useLang();

  useLayoutEffect(() => {
    if (!ready) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(".hero-name [data-char]", { yPercent: 115, rotate: 6, stagger: 0.045, duration: 1.4, ease: "expo.out" })
        .from(".hero-fade", { y: 24, opacity: 0, stagger: 0.08, duration: 1, ease: "expo.out" }, 0.35)
        .from(".hero-line", { scaleX: 0, duration: 1.4, ease: "expo.inOut" }, 0.2);
      if (REDUCED) return;
      gsap.to(".hero-l1", { xPercent: -12, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } });
      gsap.to(".hero-l2", { xPercent: 12, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } });
      gsap.to(".hero-inner", { yPercent: 18, opacity: 0.2, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } });
    }, root);
    return () => ctx.revert();
  }, [ready]);

  return (
    <section ref={root} id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden px-4 pb-5 pt-24 md:px-8 md:pb-8">
      <div className="hero-inner flex flex-1 flex-col justify-end">
        <div className="mb-6 grid grid-cols-2 gap-4 text-sm md:mb-10 md:grid-cols-4" key={lang}>
          <p className="hero-fade leading-snug">{t(UI.heroRole)}<br /><span className="text-mute">{t(UI.heroAt)}</span></p>
          <p className="hero-fade hidden leading-snug md:block">UTN · Ca' Foscari<br /><span className="text-mute">AR → IT</span></p>
          <p className="hero-fade hidden leading-snug md:block">{t(UI.local)}<br /><VeniceClock className="font-mono text-mute tabular-nums" /></p>
          <p className="hero-fade flex items-start justify-end gap-2 text-right leading-snug">
            <span className="pulse-dot mt-1.5 inline-block h-2 w-2 shrink-0 rounded-full bg-ink" />
            {t(UI.available)}
          </p>
        </div>
        <h1 className="hero-name select-none font-medium leading-[0.78] tracking-[-0.065em]" aria-label="Tomas Vales">
          <div className="hero-l1 text-[27vw] md:text-[22.5vw]"><Chars text="Tomas" /></div>
          <div className="hero-l2 -mt-[1vw] text-right text-[27vw] md:text-[22.5vw]"><Chars text="Vales" /></div>
        </h1>
        <div className="hero-line mt-6 h-px origin-left bg-ink md:mt-8" />
        <div className="mt-4 flex items-end justify-between gap-6" key={"b" + lang}>
          <p className="hero-fade max-w-[34ch] text-base leading-snug md:text-xl">{t(UI.heroTag)}</p>
          <button onClick={() => scrollToId("about")} className="hero-fade label flex shrink-0 items-center gap-2">
            {t(UI.scroll)} <span className="inline-block animate-bounce">↓</span>
          </button>
        </div>
      </div>
    </section>
  );
}

/* ================= MARQUEE ================= */
export function Marquee() {
  const root = useRef<HTMLDivElement>(null);
  const items = ["Python", "TypeScript", "React", "FastAPI", "C++", "Django", "PostgreSQL", "Docker", "C#", "three.js", "Pandas", "Electron"];
  useLayoutEffect(() => {
    if (REDUCED) return;
    const ctx = gsap.context(() => {
      const tw = gsap.to(".mq-track", { xPercent: -50, duration: 40, ease: "none", repeat: -1 });
      const speed = { v: 1 };
      const speedTo = gsap.quickTo(speed, "v", { duration: 0.5, ease: "power2", onUpdate: () => { tw.timeScale(speed.v); } });
      ScrollTrigger.create({
        trigger: root.current, start: "top bottom", end: "bottom top",
        onUpdate: (st) => {
          const v = gsap.utils.clamp(0, 5, Math.abs(st.getVelocity()) / 400);
          speedTo(st.direction * (1 + v));
        },
        onToggle: (st) => { if (st.isActive) tw.play(); else tw.pause(); },
      });
    }, root);
    return () => ctx.revert();
  }, []);
  const row = items.map((s, i) => (
    <span key={i} className="flex items-center">
      <span className={i % 2 ? "font-serif italic" : "font-medium tracking-[-0.04em]"}>{s}</span>
      <span className="mx-[3vw] inline-block h-[0.18em] w-[0.18em] rounded-full bg-current" />
    </span>
  ));
  return (
    <div ref={root} className="overflow-hidden border-y border-ink/15 py-5 text-[11vw] leading-none md:py-8 md:text-[7vw]" aria-hidden>
      <div className="mq-track flex w-max whitespace-nowrap">{row}{row}</div>
    </div>
  );
}

/* ================= ABOUT ================= */
export function About() {
  const root = useRef<HTMLElement>(null);
  const t = useT();
  const { lang } = useLang();
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".ab-text [data-word]", { opacity: 0.12 }, {
        opacity: 1, stagger: 0.1, ease: "none",
        scrollTrigger: { trigger: ".ab-text", start: "top 80%", end: "bottom 55%", scrub: true },
      });
      gsap.utils.toArray<HTMLElement>(".ab-num").forEach((el) => {
        const n = Number(el.dataset.n); const o = { v: 0 };
        gsap.to(o, { v: n, duration: 2, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%" }, onUpdate: () => { el.textContent = String(Math.round(o.v)).padStart(2, "0"); } });
      });
      gsap.from(".ab-fact", { y: 40, opacity: 0, stagger: 0.1, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: ".ab-facts", start: "top 85%" } });
    }, root);
    return () => ctx.revert();
  }, [lang]);
  return (
    <section ref={root} id="about" className="px-4 py-28 md:px-8 md:py-44">
      <div className="grid gap-8 md:grid-cols-12">
        <p className="label md:col-span-3">({t(UI.aboutLabel)})</p>
        <p className="ab-text text-[7.4vw] font-medium leading-[1.05] tracking-[-0.035em] md:col-span-9 md:text-[3.6vw]">
          <Words text={t(UI.aboutText)} mask={false} />
        </p>
      </div>
      <div className="ab-facts mt-20 grid gap-x-8 md:mt-32 md:grid-cols-3">
        {UI.facts.map((f) => (
          <div key={f.n} className="ab-fact border-t border-ink pb-10 pt-6">
            <span className="ab-num block text-[22vw] font-medium leading-none tracking-[-0.06em] md:text-[9vw]" data-n={f.n}>00</span>
            <span className="label mt-3 block text-mute">{f[lang]}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ================= TOOLBOX (scroll horizontal) ================= */
export function Toolbox() {
  const root = useRef<HTMLElement>(null);
  const t = useT();
  const { lang } = useLang();
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const track = root.current!.querySelector<HTMLElement>(".tb-track")!;
        const dist = () => track.scrollWidth - window.innerWidth;
        const tw = gsap.to(track, {
          x: () => -dist(), ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: () => "+=" + dist(), pin: true, scrub: 0.8, invalidateOnRefresh: true },
        });
        gsap.utils.toArray<HTMLElement>(".tb-panel").forEach((p) => {
          gsap.from(p.querySelectorAll("li"), { yPercent: 100, opacity: 0, stagger: 0.04, duration: 0.8, ease: "expo.out", scrollTrigger: { trigger: p, containerAnimation: tw, start: "left 85%" } });
        });
      });
      mm.add("(max-width: 767px)", () => {
        gsap.utils.toArray<HTMLElement>(".tb-panel").forEach((p) => {
          gsap.from(p.querySelectorAll("li"), { y: 20, opacity: 0, stagger: 0.04, duration: 0.8, ease: "expo.out", scrollTrigger: { trigger: p, start: "top 85%" } });
        });
      });
    }, root);
    return () => ctx.revert();
  }, [lang]);
  return (
    <section ref={root} data-dark className="relative overflow-hidden bg-ink text-paper md:h-screen">
      <div className="tb-track flex flex-col md:h-full md:w-max md:flex-row md:items-stretch">
        <div className="flex flex-col justify-between p-4 pb-12 pt-24 md:w-[44vw] md:p-8 md:pt-28">
          <p className="label text-mute">({t(UI.toolboxSub)})</p>
          <h2 className="mt-10 text-[19vw] font-medium leading-[0.85] tracking-[-0.06em] md:text-[10vw]">
            {t(UI.toolbox)}<span className="font-serif font-normal italic">.</span>
          </h2>
          <p className="label mt-8 hidden text-mute md:block">→</p>
        </div>
        {STACK.map((g, i) => (
          <div key={i} className="tb-panel flex flex-col border-t border-paper/15 p-4 py-10 md:w-[30vw] md:border-l md:border-t-0 md:p-8 md:pt-28">
            <div className="flex items-baseline justify-between">
              <h3 className="font-serif text-4xl italic md:text-5xl">{t(g.name)}</h3>
              <span className="label text-mute">0{i + 1}</span>
            </div>
            <ul className="mt-8 md:mt-auto">
              {g.items.map((it) => (
                <li key={it} className="group flex items-center justify-between overflow-hidden border-t border-paper/15 py-3 text-xl tracking-tight md:text-2xl">
                  <span className="transition-transform duration-500 ease-out-expo group-hover:translate-x-3">{it}</span>
                  <span className="label text-mute opacity-0 transition-opacity group-hover:opacity-100">↗</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ================= RECORRIDO ================= */
export function Path() {
  const root = useRef<HTMLElement>(null);
  const t = useT();
  const { lang } = useLang();
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".pt-row").forEach((r) => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: r, start: "top 85%" } });
        tl.from(r.querySelector(".pt-line"), { scaleX: 0, duration: 1.4, ease: "expo.inOut" })
          .from(r.querySelectorAll("[data-word]"), { yPercent: 110, stagger: 0.03, duration: 1, ease: "expo.out" }, 0.3)
          .from(r.querySelectorAll(".pt-fade"), { y: 16, opacity: 0, stagger: 0.08, duration: 1, ease: "expo.out" }, 0.5);
      });
    }, root);
    return () => ctx.revert();
  }, [lang]);
  return (
    <section ref={root} className="px-4 py-28 md:px-8 md:py-44">
      <p className="label mb-12">({t(UI.path)})</p>
      {PATH.map((p, i) => (
        <div key={i} className="pt-row relative grid gap-4 py-8 md:grid-cols-12 md:py-12">
          <div className="pt-line absolute inset-x-0 top-0 h-px origin-left bg-ink" />
          <span className="pt-fade label md:col-span-2">{t(p.when)}</span>
          <h3 className="text-[9vw] font-medium leading-[0.95] tracking-[-0.045em] md:col-span-6 md:text-[4.4vw]"><Words text={t(p.title)} /></h3>
          <div className="md:col-span-4">
            <p className="pt-fade font-serif text-2xl italic">{p.place}</p>
            <p className="pt-fade mt-3 max-w-[40ch] text-mute">{t(p.text)}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

/* ================= ARCHIVO ================= */
export function Archive() {
  const root = useRef<HTMLElement>(null);
  const t = useT();
  const { lang } = useLang();
  const cols = t(UI.archiveCols);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".ar-row", { y: 30, opacity: 0, stagger: 0.05, duration: 1, ease: "expo.out", scrollTrigger: { trigger: ".ar-list", start: "top 80%" } });
      gsap.from(".ar-title [data-word]", { yPercent: 110, stagger: 0.05, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: ".ar-title", start: "top 85%" } });
    }, root);
    return () => ctx.revert();
  }, [lang]);
  return (
    <section ref={root} className="px-4 pb-28 md:px-8 md:pb-44">
      <h2 className="ar-title mb-12 max-w-[14ch] text-[11vw] font-medium leading-[0.9] tracking-[-0.05em] md:text-[5.5vw]"><Words text={t(UI.archiveLabel)} /></h2>
      <div className="label hidden grid-cols-12 gap-4 border-b border-ink pb-3 text-mute md:grid">
        <span className="col-span-1">{cols[0]}</span><span className="col-span-4">{cols[1]}</span><span className="col-span-3">{cols[2]}</span><span className="col-span-4">{cols[3]}</span>
      </div>
      <ul className="ar-list">
        {ARCHIVE.map((a) => {
          const inner = (
            <>
              <span className="absolute inset-0 origin-bottom scale-y-0 bg-ink transition-transform duration-500 ease-out-expo group-hover:scale-y-100" />
              <span className="relative col-span-2 font-mono text-xs text-mute md:col-span-1 md:text-sm">{a.year}</span>
              <span className="relative col-span-10 text-2xl font-medium tracking-[-0.03em] md:col-span-4 md:text-3xl">
                {a.title}
                {a.wip && <span className="label ml-3 align-middle text-mute">· {t(UI.inProgress)}</span>}
              </span>
              <span className="relative col-span-12 text-mute md:col-span-3">{t(a.type)}</span>
              <span className="relative col-span-12 flex justify-between font-mono text-xs text-mute md:col-span-4 md:text-sm">
                {a.stack}<span className="transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1">{a.url ? "↗" : ""}</span>
              </span>
            </>
          );
          const cls = "group relative grid grid-cols-12 items-baseline gap-x-4 gap-y-1 border-b border-ink/15 px-0 py-5 transition-colors duration-300 hover:text-paper md:px-3 md:py-6";
          return (
            <li key={a.title} className="ar-row">
              {a.url ? <a href={a.url} target="_blank" rel="noreferrer" className={cls}>{inner}</a> : <div className={cls}>{inner}</div>}
            </li>
          );
        })}
      </ul>
      <div className="mt-10 flex justify-end">
        <Magnetic>
          <a href={LINKS.github + "?tab=repositories"} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 rounded-full border border-ink px-6 py-3 text-sm transition-colors hover:bg-ink hover:text-paper">
            {t(UI.allRepos)} ↗
          </a>
        </Magnetic>
      </div>
    </section>
  );
}

/* ================= CONTACTO ================= */
export function Contact() {
  const root = useRef<HTMLElement>(null);
  const t = useT();
  const { lang } = useLang();
  const [copied, setCopied] = useState(false);
  const big = t(UI.contactBig);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".ct-cap", { scaleY: 1 }, {
        scaleY: 0, ease: "none",
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "top 25%", scrub: true },
      });
      gsap.from(".ct-big [data-char]", { yPercent: 115, stagger: 0.025, duration: 1.3, ease: "expo.out", scrollTrigger: { trigger: ".ct-big", start: "top 80%" } });
      gsap.from(".ct-fade", { y: 30, opacity: 0, stagger: 0.08, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: ".ct-big", start: "top 70%" } });
      gsap.from(".ft-name [data-char]", {
        yPercent: 100, stagger: 0.04, ease: "none",
        scrollTrigger: { trigger: ".ft-name", start: "top bottom", end: "bottom bottom", scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, [lang]);
  const copy = async () => {
    try { await navigator.clipboard.writeText(LINKS.email); } catch { /* sin portapapeles */ }
    setCopied(true); setTimeout(() => setCopied(false), 1800);
  };
  return (
    <section ref={root} id="contact" data-dark className="relative bg-ink px-4 pt-32 text-paper md:px-8 md:pt-48">
      {/* curva de entrada: sólo transform (barato) */}
      <div className="ct-cap pointer-events-none absolute inset-x-0 bottom-[calc(100%-2px)] h-[18vw] origin-bottom rounded-t-[50%] bg-ink" aria-hidden />
      <p className="ct-fade label text-mute">({t(UI.nav.contact)})</p>
      <h2 className="ct-big mt-8 text-[15vw] font-medium leading-[0.85] tracking-[-0.06em] md:text-[11vw]">
        <div><Chars text={big[0]} /></div>
        <div className="font-serif font-normal italic tracking-[-0.03em]"><Chars text={big[1]} /></div>
      </h2>
      <div className="mt-14 grid gap-12 md:mt-20 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="ct-fade max-w-[36ch] text-lg text-paper/70 md:text-xl">{t(UI.contactSub)}</p>
          <button onClick={copy} data-cursor={copied ? t(UI.copied) : t(UI.copy)} className="ct-fade group mt-8 block text-left">
            <span className="block whitespace-nowrap text-[5.6vw] leading-none tracking-[-0.04em] md:text-[3.4vw]">
              <span className="ulink">{LINKS.email}</span>
            </span>
            <span className="label mt-3 block text-mute">{copied ? t(UI.copied) : t(UI.copy)}</span>
          </button>
        </div>
        <div className="flex flex-col gap-3 md:col-span-5 md:items-end">
          {[["GitHub", LINKS.github], ["LinkedIn", LINKS.linkedin], ["Email", "mailto:" + LINKS.email]].map(([n, u]) => (
            <Magnetic key={n} className="ct-fade">
              <a href={u} target="_blank" rel="noreferrer" className="inline-flex min-w-48 items-center justify-between gap-6 rounded-full border border-paper/30 px-6 py-3 text-lg transition-colors duration-300 hover:bg-paper hover:text-ink">
                {n} <span>↗</span>
              </a>
            </Magnetic>
          ))}
        </div>
      </div>
      <footer className="mt-28 overflow-hidden md:mt-40">
        <div className="label flex flex-wrap items-center justify-between gap-4 border-t border-paper/15 pt-5 text-mute">
          <span>{t(UI.built)} · ©2026</span>
          <span className="tabular-nums">{t(UI.local)} <VeniceClock /></span>
          <button onClick={() => scrollToId("top")} className="ulink text-paper">{t(UI.top)} ↑</button>
        </div>
        <div className="ft-name select-none whitespace-nowrap pb-[1vw] pt-8 text-center text-[17.4vw] font-medium leading-[0.8] tracking-[-0.07em]" aria-hidden>
          <Chars text="Tomas Vales" />
        </div>
      </footer>
    </section>
  );
}
