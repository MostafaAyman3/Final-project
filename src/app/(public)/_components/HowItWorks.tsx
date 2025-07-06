import { UploadCloud, Cpu, LineChart, Cog } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Upload Your Medical Data",
    description:
      "Whether it's a photo, scan, or lab report, just upload it securely through our platform.",
    icon: UploadCloud,
    gradient: "from-primary/20 via-primary/20 to-primary/20",
    glowColor: "shadow-primary/30",
  },
  {
    number: "02",
    title: "Let the AI Analyze",
    description:
      "Our models instantly process the information and check for abnormalities or known patterns.",
    icon: Cpu,
    gradient: "from-primary/20 via-primary/20 to-primary/20",
    glowColor: "shadow-primary/30",
  },
  {
    number: "03",
    title: "Get Actionable Results",
    description:
      "Receive a clear, medically-informed summary and advice on the next steps.",
    icon: LineChart,
    gradient: "from-primary/20 via-primary/20 to-primary/20",
    glowColor: "shadow-primary/30",
  },
];

const HowItWorks = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="relative mx-auto max-w-7xl py-20 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 relative">
          {/* Main heading with gradient text */}
          <h2 className="text-4xl font-bold mb-2 relative z-10">
            Why Choose <span className="text-primary">Smart Doctor</span>
          </h2>

          <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
            Our streamlined process makes it easy to get the insights you need,
            without the complexity. Three simple steps to medical clarity.
          </p>
        </div>

        <div className="relative">
          {/* Dynamic connecting line with animation */}
          <div className="absolute top-24 sm:top-28 left-0 w-full h-0.5 hidden lg:block">
            <div className="w-full h-full bg-gradient-to-r from-transparent via-primary/20 to-transparent relative overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-primary/60 to-transparent animate-pulse"
                style={{
                  animation: "flow 3s ease-in-out infinite",
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="relative group"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Hover glow effect */}
                <div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-100 transition-all duration-700 blur-xl scale-110 ${step.glowColor}`}
                />

                {/* Main card */}
                <div className="relative bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm rounded-3xl p-8 border border-white/20 dark:border-slate-800/20 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:border-primary/30">
                  {/* Step number with pulsing animation */}
                  <div className="relative mb-6">
                    <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-br from-primary/20 to-primary flex items-center justify-center mx-auto relative overflow-hidden group-hover:scale-110 transition-all duration-500">
                      <div className="absolute inset-0 bg-gradient-to-br from-background/20 to-transparent" />
                      <span className="text-xl sm:text-2xl font-bold text-white relative z-10">
                        {step.number}
                      </span>
                      {/* Animated ring */}
                      <div className="absolute inset-0 rounded-2xl border-2 border-primary/30 scale-110 opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-700" />
                    </div>
                  </div>

                  {/* Icon with floating animation */}
                  <div className="relative mb-6">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center mx-auto relative overflow-hidden group-hover:rotate-6 transition-all duration-500">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <step.icon className="w-10 h-10 text-primary relative z-10 group-hover:scale-110 transition-transform duration-300" />

                      {/* Floating particles effect */}
                      <div className="absolute top-2 right-2 w-1 h-1 bg-primary/40 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300" />
                      <div
                        className="absolute bottom-3 left-3 w-1 h-1 bg-primary/60 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300"
                        style={{ animationDelay: "0.5s" }}
                      />
                    </div>
                  </div>

                  {/* Content with enhanced typography */}
                  <div className="text-center space-y-4">
                    <h3 className="text-xl sm:text-2xl font-bold group-hover:text-primary transition-colors duration-300 leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed group-hover:text-muted-foreground text-sm transition-colors duration-300">
                      {step.description}
                    </p>
                  </div>

                  {/* Step indicator line for mobile */}
                  {index < steps.length - 1 && (
                    <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gradient-to-b from-primary/30 to-transparent lg:hidden" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
