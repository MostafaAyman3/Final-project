import { ArrowRight, Sparkles, Zap } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = {
  title: string;
  description: string;
  cta: string;
  ctaLink: string;
  image: string;
  side: "left" | "right";
};

const ServiceSection = ({
  title,
  description,
  cta,
  ctaLink,
  image,
  side,
}: Props) => {
  const isLeft = side === "left";

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div
          className={cn(
            "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center",
            !isLeft && "lg:grid-flow-col-dense"
          )}
        >
          {/* Content */}
          <div className={cn("space-y-8", !isLeft && "lg:col-start-2")}>
            <Badge variant="outline" className="px-4 py-2">
              <Sparkles className="w-4 h-4 text-primary mr-2" />
              <span className="text-sm font-medium text-primary">
                Featured Service
              </span>
            </Badge>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-primary">
              {title}
            </h2>

            <p className="text-lg leading-relaxed text-muted-foreground max-w-2xl">
              {description}
            </p>

            <Link
              href={ctaLink}
              className={cn(buttonVariants({ variant: "default", size: "lg" }))}
            >
              <Zap className="w-5 h-5 mr-2" />
              {cta}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>

            <div className="flex items-center space-x-6 pt-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>Trusted by 10K+ users</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span>99.9% uptime</span>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className={cn(!isLeft && "lg:col-start-1")}>
            <Card className="p-2 rounded-2xl shadow-lg">
              <div className="overflow-hidden rounded-xl">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-auto object-cover rounded-xl"
                  style={{ aspectRatio: "4/3" }}
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
