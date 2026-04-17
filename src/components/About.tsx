import { Card } from "@/components/ui/card";
import { CheckCircle, Leaf, TrendingDown, Zap } from "lucide-react";

const About = () => {
  const benefits = [
    {
      icon: TrendingDown,
      title: "Lower Energy Bills",
      description: "Save up to 70% on your monthly electricity costs with solar power."
    },
    {
      icon: Leaf,
      title: "Eco-Friendly",
      description: "Reduce your carbon footprint and contribute to a cleaner planet."
    },
    {
      icon: Zap,
      title: "Energy Independence",
      description: "Generate your own power and reduce reliance on the grid."
    },
    {
      icon: CheckCircle,
      title: "Increase Property Value",
      description: "Solar installations can increase your home value by up to 4%."
    }
  ];

  return (
    <section id="about" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Choose Solar Energy?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Harness the power of the sun and join millions of homeowners making the switch to clean, renewable energy.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benefits.map((benefit, index) => (
            <Card 
              key={index}
              className="p-6 hover:shadow-lg transition-all duration-300 animate-fade-in-up border-2 hover:border-primary/50 group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <benefit.icon className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-3xl p-8 md:p-12 animate-fade-in-up">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
              <p className="text-lg text-muted-foreground mb-6">
                At SolarWave, we're committed to making solar energy accessible and affordable for everyone. 
                With over 25 years of experience, we've helped thousands of families and businesses transition 
                to clean, renewable energy.
              </p>
              <div className="space-y-3">
                {["Expert Installation", "Premium Equipment", "25-Year Warranty", "24/7 Support"].map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-accent" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-8 text-primary-foreground">
                <div className="text-5xl font-bold mb-2">$1,200</div>
                <div className="text-xl mb-4">Average Annual Savings</div>
                <p className="text-primary-foreground/90">
                  Our customers save an average of $1,200 per year on energy costs after going solar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
