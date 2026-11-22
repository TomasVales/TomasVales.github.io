import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { PROJECTS, UI, type Project } from "./content";
import { Chars, Magnetic, REDUCED, TOUCH, Words, gsap, lockScroll, useLang, useT } from "./lib";

const img = (f: string) => `work/${f}`;
const pad = (n: number) => String(n).padStart(2, "0");

function Thumb({ p, className = "" }: { p: Project; className?: string }) {
  if (p.icon)
    return (
      <div className={`flex items-center justify-center bg-ink ${className}`}>
        <img src={img(p.images[0])} alt="" className="bw h-1/2 w-auto [image-rendering:pixelated]" loading="lazy" />
      </div>
    );
  return <img src={img(p.images[0])} alt="" className={`bw object-cover ${className}`} loading="lazy" />;
}

/* ================= LISTA ================= */
export function Work() {
  const root = useRef<HTMLElement>(null);
  const prev = useRef<HTMLDivElement>(null);
  const t = useT();
  const { lang } = useLang();
  const [active, setActive] = useState<number | null>(null);
  const [open, setOpen] = useState<number | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".wk-head [data-char]", { yPercent: 115, stagger: 0.03, duration: 1.3, ease: "expo.out", scrollTrigger: { trigger: ".wk-head", start: "top 85%" } });
      gsap.utils.toArray<HTMLElement>(".wk-row").forEach((r) => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: r, start: "top 90%" } });
        tl.from(r.querySelector(".wk-line"), { scaleX: 0, duration: 1.3, ease: "expo.inOut" })
          .from(r.querySelectorAll("[data-char]"), { yPercent: 115, stagger: 0.015, duration: 1, ease: "expo.out" }, 0.2)
          .from(r.querySelectorAll(".wk-fade"), { opacity: 0, y: 12, duration: 0.8, ease: "expo.out" }, 0.4);
        const m = r.querySelector(".wk-mobile-img");
        if (m) gsap.from(m, { clipPath: "inset(100% 0% 0% 0%)", duration: 1.3, ease: "expo.inOut", scrollTrigger: { trigger: m, start: "top 90%" } });
      });
    }, root);
    return () => ctx.revert();
  }, [lang]);

  // preview que sigue al cursor
  useEffect(() => {
    if (TOUCH) return;
    const el = prev.current!;
    gsap.set(el, { xPercent: -50, yPercent: -50, scale: 0 });
    const xTo = gsap.quickTo(el, "x", { duration: 0.8, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.8, ease: "power3" });
    const rTo = gsap.quickTo(el, "rotation", { duration: 0.8, ease: "power3" });
    let lx = 0;
    const move = (e: MouseEvent) => { xTo(e.clientX); yTo(e.clientY); rTo(gsap.utils.clamp(-8, 8, (e.clientX - lx) * 0.4)); lx = e.clientX; };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  useEffect(() => {
    if (TOUCH) return;
    gsap.to(prev.current, { scale: active === null ? 0 : 1, duration: 0.6, ease: "expo.out" });
    if (active !== null) gsap.to(prev.current!.querySelector(".pv-strip"), { yPercent: -100 * active, duration: 0.8, ease: "expo.inOut" });
  }, [active]);

  return (
    <section ref={root} id="work" className="px-4 pb-24 md:px-8 md:pb-36">
      <div className="wk-head flex items-end justify-between pb-10 md:pb-16">
        <h2 className="text-[13vw] font-medium leading-[0.85] tracking-[-0.06em] md:text-[8vw]"><Chars text={t(UI.workLabel)} /></h2>
        <span className="label pb-2">({pad(PROJECTS.length)})</span>
      </div>
      <ul onMouseLeave={() => setActive(null)}>
        {PROJECTS.map((p, i) => (
          <li key={p.id} className="wk-row relative">
            <div className="wk-line absolute inset-x-0 top-0 h-px origin-left bg-ink" />
            <button
              data-cursor={t(UI.view)}
              onMouseEnter={() => setActive(i)}
              onClick={() => setOpen(i)}
              className={`grid w-full grid-cols-12 items-baseline gap-x-4 py-6 text-left transition-opacity duration-500 md:py-9 ${active !== null && active !== i ? "md:opacity-25" : ""}`}
            >
              <span className="wk-fade col-span-2 font-mono text-xs md:col-span-1 md:text-sm">{pad(i + 1)}</span>
              <span className={`col-span-10 text-[10.5vw] font-medium leading-[0.95] tracking-[-0.05em] transition-transform duration-700 ease-out-expo md:col-span-7 md:text-[5.2vw] ${active === i ? "md:translate-x-[2vw]" : ""}`}>
                <Chars text={p.title} />
              </span>
              <span className="wk-fade col-span-10 col-start-3 mt-2 text-mute md:col-span-3 md:col-start-auto md:mt-0">{t(p.type)}</span>
              <span className="wk-fade hidden text-right font-mono text-sm md:col-span-1 md:block">{p.year}</span>
            </button>
            <button onClick={() => setOpen(i)} className="wk-mobile-img mb-6 block aspect-[16/10] w-full overflow-hidden md:hidden" aria-label={p.title}>
              <Thumb p={p} className="h-full w-full" />
            </button>
          </li>
        ))}
      </ul>
      <div className="h-px bg-ink" />

      {/* preview flotante (desktop) */}
      <div ref={prev} className="pointer-events-none fixed left-0 top-0 z-40 hidden aspect-[16/10] w-[30vw] overflow-hidden md:block">
        <div className="pv-strip h-full w-full">
          {PROJECTS.map((p) => <Thumb key={p.id} p={p} className="block h-full w-full" />)}
        </div>
      </div>

      {open !== null && <ProjectView index={open} onIndex={setOpen} onClose={() => setOpen(null)} />}
    </section>
  );
}

/* ================= DETALLE ================= */
function ProjectView({ index, onIndex, onClose }: { index: number; onIndex: (i: number) => void; onClose: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const t = useT();
  const { lang } = useLang();
  const p = PROJECTS[index];
  const next = (index + 1) % PROJECTS.length;
  const closing = useRef(false);

  const first = useRef(true);
  useEffect(() => { lockScroll(true); return () => lockScroll(false); }, []);
  useLayoutEffect(() => {
    const tw = gsap.fromTo(root.current, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: REDUCED ? 0 : 1.1, ease: "expo.inOut" });
    return () => { tw.kill(); };
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      scroller.current!.scrollTop = 0;
      const tl = gsap.timeline({ delay: first.current && !REDUCED ? 0.75 : 0 });
      first.current = false;
      tl.from(".pv-title [data-char]", { yPercent: 115, stagger: 0.03, duration: 1.2, ease: "expo.out" })
        .from(".pv-fade", { y: 24, opacity: 0, stagger: 0.06, duration: 1, ease: "expo.out" }, "<0.15")
        .from(".pv-img", { clipPath: "inset(0% 0% 100% 0%)", duration: 1.3, ease: "expo.inOut" }, "<0.1");
      gsap.utils.toArray<HTMLElement>(".pv-img-later").forEach((el) => {
        gsap.from(el, { clipPath: "inset(100% 0% 0% 0%)", duration: 1.3, ease: "expo.inOut", scrollTrigger: { trigger: el, scroller: scroller.current, start: "top 90%" } });
      });
    }, root);
    return () => ctx.revert();
  }, [index, lang]);

  const close = () => {
    if (closing.current) return;
    closing.current = true;
    gsap.to(root.current, { clipPath: "inset(0% 0% 100% 0%)", duration: REDUCED ? 0 : 0.9, ease: "expo.inOut", onComplete: onClose });
  };
  useEffect(() => {
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  });

  const goNext = () => {
    gsap.to(".pv-body", { opacity: 0, y: -40, duration: 0.5, ease: "expo.in", onComplete: () => { gsap.set(".pv-body", { opacity: 1, y: 0 }); onIndex(next); } });
  };

  return (
    <div ref={root} className="fixed inset-0 z-[60] bg-ink text-paper" style={{ clipPath: "inset(100% 0% 0% 0%)" }} role="dialog" aria-modal aria-label={p.title}>
      <div ref={scroller} data-lenis-prevent className="h-full overflow-y-auto overscroll-contain">
        <div className="sticky top-0 z-10 flex items-center justify-between bg-gradient-to-b from-ink via-ink/80 to-transparent p-4 md:px-8 md:py-6">
          <span className="label text-mute">{pad(index + 1)} / {pad(PROJECTS.length)}</span>
          <Magnetic>
            <button onClick={close} className="label flex items-center gap-3 rounded-full border border-paper/30 px-5 py-2.5 transition-colors hover:bg-paper hover:text-ink">
              {t(UI.close)} <span className="text-base leading-none">×</span>
            </button>
          </Magnetic>
        </div>

        <div className="pv-body px-4 pb-10 md:px-8" key={p.id + lang}>
          <h2 className="pv-title text-[15vw] font-medium leading-[0.85] tracking-[-0.06em] md:text-[10vw]"><Chars text={p.title} /></h2>

          <div className="mt-10 grid gap-8 border-t border-paper/15 pt-6 md:grid-cols-12">
            <div className="pv-fade md:col-span-2"><p className="label text-mute">{t(UI.year)}</p><p className="mt-2">{p.year}</p></div>
            <div className="pv-fade md:col-span-3"><p className="label text-mute">{t(UI.type)}</p><p className="mt-2">{t(p.type)}</p></div>
            <div className="pv-fade md:col-span-4"><p className="label text-mute">{t(UI.stackL)}</p><p className="mt-2">{p.stack.join(" · ")}</p></div>
            <div className="pv-fade flex gap-3 md:col-span-3 md:justify-end">
              {p.live && <Magnetic><a href={p.live} target="_blank" rel="noreferrer" className="inline-block rounded-full bg-paper px-5 py-2.5 text-sm text-ink">{t(UI.live)} ↗</a></Magnetic>}
              {p.repo && <Magnetic><a href={p.repo} target="_blank" rel="noreferrer" className="inline-block rounded-full border border-paper/30 px-5 py-2.5 text-sm transition-colors hover:bg-paper hover:text-ink">{t(UI.code)} ↗</a></Magnetic>}
            </div>
          </div>

          <p className="pv-fade mt-14 max-w-[30ch] font-serif text-[8vw] leading-[1.05] md:mt-20 md:text-[3.4vw]">{t(p.summary)}</p>

          <div className="mt-14 md:mt-20">
            {p.icon ? (
              <div className="pv-img flex aspect-[16/9] items-center justify-center border border-paper/15 bg-[#111]">
                <img src={img(p.images[0])} alt={p.title} className="h-2/5 w-auto [image-rendering:pixelated]" />
              </div>
            ) : (
              <div className="pv-img overflow-hidden bw-hover"><img src={img(p.images[0])} alt={p.title} className="bw w-full" /></div>
            )}
          </div>

          <div className="mt-16 grid gap-8 md:mt-24 md:grid-cols-12">
            <p className="pv-fade label text-mute md:col-span-3">({t(UI.highlights)})</p>
            <ol className="md:col-span-9">
              {p.points[lang].map((pt, i) => (
                <li key={i} className="pv-fade grid grid-cols-12 gap-4 border-t border-paper/15 py-6 text-lg leading-snug md:text-2xl">
                  <span className="col-span-2 font-mono text-sm text-mute md:col-span-1">{pad(i + 1)}</span>
                  <span className="col-span-10 md:col-span-11"><Words text={pt} mask={false} /></span>
                </li>
              ))}
            </ol>
          </div>

          {p.images.slice(1).map((f) => (
            <div key={f} className="pv-img-later mt-6 overflow-hidden bw-hover md:mt-10"><img src={img(f)} alt="" className="bw w-full" loading="lazy" /></div>
          ))}

          <button onClick={goNext} data-cursor={t(UI.next)} className="group mt-28 block w-full border-t border-paper/15 pt-8 text-left md:mt-40">
            <span className="label text-mute">{t(UI.next)} →</span>
            <span className="mt-4 block text-[13vw] font-medium leading-[0.9] tracking-[-0.06em] transition-transform duration-700 ease-out-expo group-hover:translate-x-[2vw] md:text-[8vw]">
              {PROJECTS[next].title}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
