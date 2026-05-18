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

export default function App() {
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