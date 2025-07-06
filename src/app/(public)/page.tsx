import Hero from "./_components/Hero";
import HowItWorks from "./_components/HowItWorks";
import ServiceSection from "./_components/ServiceSection";
import WhyUS from "./_components/WhyUS";

export default function Home() {
  return (
    <main className="flex flex-col gap-16">
      <Hero />
      <WhyUS />
      <HowItWorks />
      <section className="container mx-auto max-w-7xl overflow-hidden">
        <ServiceSection
          title="Skin Diagnosis"
          description="AI analysis for conditions like acne, rashes, eczema, moles, and more."
          cta="Explore Skin Diagnosis"
          ctaLink="/skin-diagnosis"
          image="/skin.jpg"
          side="left"
        />
        <ServiceSection
          title="Eye Diagnosis"
          description="Detect signs of cataracts, glaucoma, diabetic retinopathy, and other conditions."
          cta="Explore Eye Diagnosis"
          ctaLink="/eye-diagnosis"
          image="/eye.jpg"
          side="right"
        />
        <ServiceSection
          title="Blood Report Analysis"
          description="Upload lab reports (CBC, lipid profiles, etc.) and get a detailed interpretation."
          cta="Explore Blood Report Analysis"
          ctaLink="/blood-diagnosis"
          image="/blood.jpg"
          side="left"
        />
        <ServiceSection
          title="Alzheimer’s Screening"
          description="Early cognitive screening using language, behavior, and test data."
          cta="Explore Alzheimer’s Screening"
          ctaLink="/alzheimer"
          image="/alzheimer.jpg"
          side="right"
        />
        <ServiceSection
          title="Brain Tumor Detection"
          description="AI-powered MRI interpretation for detecting and classifying brain tumors."
          cta="Explore Brain Tumor Detection"
          ctaLink="/brain-tumor"
          image="/brain.jpg"
          side="left"
        />
      </section>
    </main>
  );
}
