import { useEffect, useState } from "react";
import type { Lang } from "./content";
import { Cursor, LangCtx, REDUCED, ScrollTrigger, gsap, initLenis, initialLang, lockScroll } from "./lib";
import { About, Archive, Contact, Hero, LangWipe, Loader, Marquee, Nav, Path, Toolbox } from "./sections";
import { Work } from "./work";

export default function App() {
  const [lang, setLangState] = useState<Lang>(initialLang);
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [wipe, setWipe] = useState<Lang | null>(null);

  useEffect(() => {
    initLenis();
    lockScroll(true);
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);

  const setLang = (l: Lang) => {
    try { localStorage.setItem("tv-lang", l); } catch { /* sin storage */ }
    if (REDUCED) { setLangState(l); return; }
    setWipe(l);
    gsap.timeline()
      .fromTo("#lang-wipe", { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.7, ease: "expo.inOut" })
      .call(() => setLangState(l))
      .to("#lang-wipe", { clipPath: "inset(0% 0% 100% 0%)", duration: 0.8, ease: "expo.inOut", delay: 0.35, onComplete: () => ScrollTrigger.refresh() });
  };

  return (
    <LangCtx.Provider value={{ lang, setLang }}>
      <div>
        <Cursor />
        {loading && <Loader onReveal={() => { setReady(true); lockScroll(false); }} onDone={() => { setLoading(false); ScrollTrigger.refresh(); }} />}
        <LangWipe target={wipe} />
        <Nav onLang={setLang} />
        <main>
          <Hero ready={ready} />
          <Marquee />
          <About />
          <Work />
          <Toolbox />
          <Path />
          <Archive />
          <Contact />
        </main>
      </div>
    </LangCtx.Provider>
  );
}
