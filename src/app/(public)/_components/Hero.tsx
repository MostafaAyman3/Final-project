import { Particles } from "@/components/magicui/particles";
import { Button } from "@/components/ui/button";
import { Bot, Telescope } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative h-[calc(100vh-53px)] bg-gradient-to-b from-primary/10 to-primary/5 p-2">
      <div className="container mx-auto h-full flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">
            Your{" "}
            <span className="bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent">
              AI Medical Assistant
            </span>
            <br />
            Fast, Reliable, and Always Available
          </h1>
          <p className="text-sm md:text-base mt-3 text-muted-foreground text-center max-w-2xl mx-auto">
            Revolutionize your health journey with AI-powered diagnostics. From
            skin and eyes to brain scans and lab results, our smart platform
            delivers instant medical insights—anytime, anywhere.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <Button size="lg">
              <Telescope /> Start a Diagnosis Now
            </Button>
            <Button size="lg" variant="outline">
              <Bot />
              Chat with AI Consultant
            </Button>
          </div>
        </div>
      </div>

      <Particles
        className="absolute inset-0 z-0"
        quantity={110}
        ease={100}
        size={1}
        color="#2b7fff"
        refresh
      />
    </section>
  );
};

export default Hero;
