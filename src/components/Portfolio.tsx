import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Zap } from "lucide-react";

const Portfolio = () => {
  const projects = [
    {
      title: "Residential Complex",
      location: "San Francisco, CA",
      capacity: "250 kW",
      homes: "45 Homes",
      savings: "$180K/year",
      category: "Residential"
    },
    {
      title: "Tech Campus",
      location: "Austin, TX",
      capacity: "500 kW",
      homes: "Corporate HQ",
      savings: "$420K/year",
      category: "Commercial"
    },
    {
      title: "School District",
      location: "Phoenix, AZ",
      capacity: "350 kW",
      homes: "8 Schools",
      savings: "$280K/year",
      category: "Educational"
    },
    {
      title: "Shopping Center",
      location: "Miami, FL",
      capacity: "450 kW",
      homes: "Retail Complex",
      savings: "$350K/year",
      category: "Commercial"
    },
    {
      title: "Farm Installation",
      location: "Sacramento, CA",
      capacity: "300 kW",
      homes: "Agricultural",
      savings: "$240K/year",
      category: "Agricultural"
    },
    {
      title: "Beach Resort",
      location: "San Diego, CA",
      capacity: "400 kW",
      homes: "Hospitality",
      savings: "$320K/year",
      category: "Hospitality"
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Residential: "bg-primary/10 text-primary border-primary/20",
      Commercial: "bg-secondary/10 text-secondary border-secondary/20",
      Educational: "bg-accent/10 text-accent border-accent/20",
      Agricultural: "bg-primary/10 text-primary border-primary/20",
      Hospitality: "bg-secondary/10 text-secondary border-secondary/20"
    };
    return colors[category] || "bg-muted text-muted-foreground";
  };

  return (
    <section id="portfolio" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our Portfolio
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our completed projects and see the impact we've made across various sectors.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Card 
              key={index}
              className="p-6 hover:shadow-xl transition-all duration-300 animate-fade-in-up border-2 hover:border-primary/50 group overflow-hidden relative"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Badge className={`${getCategoryColor(project.category)} mb-4`}>
                {project.category}
              </Badge>
              
              <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{project.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span className="text-sm">{project.homes}</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Zap className="h-4 w-4" />
                  <span className="text-sm">{project.capacity} System</span>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <div className="text-2xl font-bold text-accent">{project.savings}</div>
                <div className="text-sm text-muted-foreground">Annual Savings</div>
              </div>

              {/* Decorative gradient */}
              <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform" />
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Card className="inline-block p-8 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 animate-fade-in-up">
            <div className="text-4xl font-bold mb-2">2.5 MW+</div>
            <p className="text-muted-foreground">Total Installed Capacity</p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
