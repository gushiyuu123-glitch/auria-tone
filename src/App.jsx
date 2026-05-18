import { useEffect, useState } from "react";

// PC（既存そのまま）
import Hero from "./sections/Hero.jsx";
import Works from "./sections/Works.jsx";
import Role from "./sections/Role.jsx";
import Promise from "./sections/Promise.jsx";
import Services from "./sections/Services.jsx";
import Pricing from "./sections/Pricing.jsx";
import Process from "./sections/Process.jsx";
import Faq from "./sections/Faq.jsx";
import Gallery from "./sections/Gallery.jsx";
import Contact from "./sections/Contact.jsx";
import Footer from "./sections/Footer.jsx";
import FadeNav from "./components/FadeNav.jsx";

// SP（新規追加）
import HeroSp from "./sections/HeroSp.jsx";
import WorksSp from "./sections/WorksSp.jsx";
import RoleSp from "./sections/RoleSp.jsx";
import PromiseSp from "./sections/PromiseSp.jsx";
import ServicesSp from "./sections/ServicesSp.jsx";
import PricingSp from "./sections/PricingSp.jsx";
import ProcessSp from "./sections/ProcessSp.jsx";
import FaqSp from "./sections/FaqSp.jsx";
import GallerySp from "./sections/GallerySp.jsx";
import ContactSp from "./sections/ContactSp.jsx";
import FooterSp from "./sections/FooterSp.jsx";
import FadeNavSp from "./components/FadeNavSp.jsx";

export default function App() {
  const [isSp, setIsSp] = useState(() => {
    const m = window.matchMedia?.("(max-width: 980px)");
    return !!m?.matches;
  });

  useEffect(() => {
    const m = window.matchMedia?.("(max-width: 980px)");
    if (!m) return;

    const onChange = (e) => setIsSp(!!e.matches);

    if (m.addEventListener) m.addEventListener("change", onChange);
    else m.addListener?.(onChange);

    return () => {
      if (m.removeEventListener) m.removeEventListener("change", onChange);
      else m.removeListener?.(onChange);
    };
  }, []);

  // PC
  if (!isSp) {
    return (
      <div className="min-h-screen bg-ivory text-charcoal">
        <Hero />
        <FadeNav />
        <Works />

        {/* 信頼パート */}
        <Role />
        <Promise />
        <Services />
        <Pricing />
        <Process />
        <Faq />

        {/* 背中を押す */}
        <Gallery />

        {/* 決断 */}
        <Contact />
        <Footer />
      </div>
    );
  }

  // SP（IDは全部 -sp）
  return (
    <div className="min-h-screen bg-ivory text-charcoal">
      <HeroSp />
      <FadeNavSp />
      <WorksSp />

      {/* 信頼パート */}
      <RoleSp />
      <PromiseSp />
      <ServicesSp />
      <PricingSp />
      <ProcessSp />
      <FaqSp />

      {/* 背中を押す */}
      <GallerySp />

      {/* 決断 */}
      <ContactSp />
      <FooterSp />
    </div>
  );
}