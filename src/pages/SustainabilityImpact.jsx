import { Leaf, Recycle, Factory, Globe2, TrendingUp, Sun, Wind, Building, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const SustainabilityImpact = () => {
  return (
    <section className="pt-24">

      {/* ░░░░░░░░░ SUSTAINABILITY HERO SECTION ░░░░░░░░░ */}
      <div className="relative py-20 bg-gradient-to-r from-background/50 via-background/40 to-background/20 overflow-hidden">
        
        {/* Glow Element */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-[#f98b26]/20 rounded-full blur-3xl opacity-50 animate-pulse"></div>

        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl font-extrabold mb-4 text-primary">
            Sustainability & Environmental Commitment
          </h1>

          <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
            We are committed to creating a cleaner, greener, and more sustainable future 
            through renewable energy adoption, eco-friendly practices, and responsible operations.
          </p>
        </div>
      </div>

      {/* ░░░░░░░░░ KEY SUSTAINABILITY POINTS ░░░░░░░░░ */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold mb-10 text-[#f98b26]">Our Sustainability Focus</h2>

        <div className="grid md:grid-cols-3 gap-8">

          {/* Card 1 */}
          <div className="bg-black p-8 rounded-2xl shadow-md border hover:shadow-xl transition-all">
            <div className="w-14 h-14 bg-[#f98b26]/20 rounded-xl flex items-center justify-center mb-4">
              <Leaf className="h-7 w-7 text-[#f98b26]" />
            </div>
            <h3 className="font-bold text-xl mb-2">Eco-Friendly Operations</h3>
            <p className="text-muted-foreground">
              We follow strict environmental policies to minimize waste and reduce our carbon footprint across operations.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-black p-8 rounded-2xl shadow-md border hover:shadow-xl transition-all">
            <div className="w-14 h-14 bg-[#f98b26]/20 rounded-xl flex items-center justify-center mb-4">
              <Recycle className="h-7 w-7 text-[#f98b26]" />
            </div>
            <h3 className="font-bold text-xl mb-2">Recycling & Waste Control</h3>
            <p className="text-muted-foreground">
              We ensure responsible disposal and recycling of solar materials, batteries, and project waste.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-black p-8 rounded-2xl shadow-md border hover:shadow-xl transition-all">
            <div className="w-14 h-14 bg-[#f98b26]/20 rounded-xl flex items-center justify-center mb-4">
              <Factory className="h-7 w-7 text-[#f98b26]" />
            </div>
            <h3 className="font-bold text-xl mb-2">Green EPC Practices</h3>
            <p className="text-muted-foreground">
              Every EPC project is designed to optimize efficiency while adhering to sustainable construction norms.
            </p>
          </div>
        </div>
      </div>

      {/* ░░░░░░░░░ IMPACT SECTION ░░░░░░░░░ */}
      <div className="py-20 bg-gradient-to-r from-background/60 to-background/20">
        <div className="container mx-auto px-4">

          <h2 className="text-4xl font-bold mb-4 text-[#f98b26]">
            Our Environmental Impact
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mb-12">
            Our solar solutions make a measurable difference for the planet. 
            Here are the positive environmental and social impacts we've achieved.
          </p>

          {/* Impact Stats */}
          <div className="grid md:grid-cols-4 gap-8">

            {/* Impact 1 */}
            <div className="bg-black p-8 rounded-2xl shadow-md border hover:shadow-xl transition-all text-center">
              <Globe2 className="h-10 w-10 mx-auto text-[#f98b26] mb-3" />
              <h3 className="text-3xl font-bold text-primary">150K+</h3>
              <p className="text-sm text-muted-foreground">Tons CO₂ Reduced</p>
            </div>

            {/* Impact 2 */}
            <div className="bg-black p-8 rounded-2xl shadow-md border hover:shadow-xl transition-all text-center">
              <Sun className="h-10 w-10 mx-auto text-[#f98b26] mb-3" />
              <h3 className="text-3xl font-bold text-primary">250+ MW</h3>
              <p className="text-sm text-muted-foreground">Installed Capacity</p>
            </div>

            {/* Impact 3 */}
            <div className="bg-black p-8 rounded-2xl shadow-md border hover:shadow-xl transition-all text-center">
              <Building className="h-10 w-10 mx-auto text-[#f98b26] mb-3" />
              <h3 className="text-3xl font-bold text-primary">200+</h3>
              <p className="text-sm text-muted-foreground">Projects Delivered</p>
            </div>

            {/* Impact 4 */}
            <div className="bg-black p-8 rounded-2xl shadow-md border hover:shadow-xl transition-all text-center">
              <Wind className="h-10 w-10 mx-auto text-[#f98b26] mb-3" />
              <h3 className="text-3xl font-bold text-primary">12+</h3>
              <p className="text-sm text-muted-foreground">Countries Served</p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-black px-10 py-6 text-lg shadow-xl animate-pulse-glow"
            >
              Learn More About Our Mission
            </Button>
          </div>
        </div>
      </div>

    </section>
  );
};

export default SustainabilityImpact;
