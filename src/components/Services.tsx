import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, Building2, Battery, Wrench, ArrowRight } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Home,
      title: "Residential Solar",
      description: "Complete solar solutions for your home, from design to installation and monitoring.",
      features: ["Custom Design", "Premium Panels", "Smart Monitoring", "25-Year Warranty"]
    },
    {
      icon: Building2,
      title: "Commercial Solar",
      description: "Scalable solar systems for businesses looking to reduce operational costs.",
      features: ["Large-Scale Systems", "ROI Analysis", "Tax Incentives", "Maintenance Plans"]
    },
    {
      icon: Battery,
      title: "Energy Storage",
      description: "Store excess energy with our advanced battery solutions for 24/7 power.",
      features: ["Backup Power", "Peak Shaving", "Grid Independence", "Smart Integration"]
    },
    {
      icon: Wrench,
      title: "Maintenance & Support",
      description: "Keep your system running at peak performance with our expert maintenance.",
      features: ["Regular Inspections", "Performance Optimization", "Emergency Repairs", "System Upgrades"]
    }
  ];

  return (
    <section id="services" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive solar solutions tailored to your energy needs and budget.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index}
              className="p-8 hover:shadow-xl transition-all duration-300 animate-fade-in-up border-2 hover:border-primary/50 group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start space-x-4 mb-6">
                <div className="p-3 bg-gradient-to-br from-primary to-secondary rounded-xl group-hover:scale-110 transition-transform">
                  <service.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </div>
              </div>
              
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center space-x-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                variant="outline" 
                className="w-full group/btn hover:bg-primary/10"
              >
                Learn More
                <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
