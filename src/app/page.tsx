import dynamic from "next/dynamic";
import Navbar from "@/components/shared/Navbar";
import Hero from "@/components/sections/Hero";
import Footer from "@/components/sections/Footer";
import TrustBar from "@/components/sections/TrustBar";
import ProductShowcase from "@/components/sections/ProductShowcase";
import { ClientOnlyCursor } from "@/components/shared/ClientOnly";

const Services = dynamic(() => import("@/components/sections/Services"));
const WhyChooseUs = dynamic(() => import("@/components/sections/WhyChooseUs"));
const HowItWorks = dynamic(() => import("@/components/sections/HowItWorks"));
const CTASection = dynamic(() => import("@/components/sections/CTASection"));
const WhatsAppButton = dynamic(
  () => import("@/components/shared/WhatsAppButton")
);
const ScrollProgress = dynamic(
  () => import("@/components/shared/ScrollProgress")
);

export default function Home() {
  return (
    <>
      <ClientOnlyCursor />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <ProductShowcase />
        <Services />
        <WhyChooseUs />
        <HowItWorks />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
