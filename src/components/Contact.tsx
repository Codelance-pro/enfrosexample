import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "0235940c-6029-4503-afa8-3725590a3693", // Placeholder - replace with your real key
          subject: `New Message from ${formData.name}`,
          ...formData,
          to: "codelanceofficial@gmail.com"
        }),
      });

      const result = await response.json();
      if (result.success) {
        toast({
          title: "Message Sent!",
          description: "Your message has been sent to codelanceofficial@gmail.com. We'll get back to you soon.",
        });
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        throw new Error("Failed to send");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  return (
    <section id="contact" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Get In Touch
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to start your solar journey? Contact us today for a free consultation and quote.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-6 animate-fade-in-up">
            <Card className="p-6 hover:shadow-lg transition-all border-2 hover:border-primary/50">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Phone</h3>
                  <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  <p className="text-sm text-muted-foreground mt-1">Mon-Fri 8am-6pm PST</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all border-2 hover:border-secondary/50">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-secondary/10 rounded-xl">
                  <Mail className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Email</h3>
                  <p className="text-muted-foreground">info@solarwave.com</p>
                  <p className="text-sm text-muted-foreground mt-1">We reply within 24 hours</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all border-2 hover:border-accent/50">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-accent/10 rounded-xl">
                  <MapPin className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Address</h3>
                  <p className="text-muted-foreground">123 Solar Street</p>
                  <p className="text-muted-foreground">San Francisco, CA 94102</p>
                </div>
              </div>
            </Card>

            <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-2xl p-6">
              <h3 className="font-bold text-xl mb-3">Why Choose Us?</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center space-x-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <span>Free consultation and site assessment</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-secondary" />
                  <span>Custom designed solar solutions</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                  <span>Professional installation team</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <span>Comprehensive warranty coverage</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="p-8 animate-fade-in-up border-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-base font-semibold">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="mt-2"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-base font-semibold">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="mt-2"
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-base font-semibold">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 123-4567"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="message" className="text-base font-semibold">
                  Message *
                </Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project..."
                  className="mt-2 min-h-[120px]"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 text-lg bg-primary hover:bg-primary/90 animate-pulse-glow"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
