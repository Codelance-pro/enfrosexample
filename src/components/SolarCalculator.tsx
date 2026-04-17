import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, DollarSign, Zap, TrendingUp } from "lucide-react";

const SolarCalculator = () => {
  const [monthlyBill, setMonthlyBill] = useState("");
  const [roofSize, setRoofSize] = useState("");
  const [sunlight, setSunlight] = useState("");
  const [results, setResults] = useState<{
    systemSize: number;
    annualSavings: number;
    paybackPeriod: number;
    co2Reduction: number;
  } | null>(null);

  const calculateSavings = () => {
    const bill = parseFloat(monthlyBill);
    const roof = parseFloat(roofSize);
    const sun = parseFloat(sunlight);

    if (isNaN(bill) || isNaN(roof) || isNaN(sun)) return;

    // Simple calculation formulas (real-world would be more complex)
    const systemSize = (bill * 12) / (sun * 0.15); // kW
    const annualSavings = bill * 12 * 0.8; // 80% savings
    const paybackPeriod = (systemSize * 2500) / annualSavings; // Average cost per kW
    const co2Reduction = systemSize * 1.5; // tons per year

    setResults({
      systemSize: Math.round(systemSize * 10) / 10,
      annualSavings: Math.round(annualSavings),
      paybackPeriod: Math.round(paybackPeriod * 10) / 10,
      co2Reduction: Math.round(co2Reduction * 10) / 10
    });
  };

  return (
    <section id="calculator" className="pt-32 pb-16 bg-gradient-to-b from-amber-50 via-yellow-50 to-amber-100 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <Calculator className="h-16 w-16 text-primary mx-auto mb-4" />
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Solar Savings Calculator
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover how much you can save by switching to solar energy. Get an instant estimate customized for your home.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="p-8 md:p-12 animate-fade-in-up border-2">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <Label htmlFor="monthlyBill" className="text-base font-semibold mb-2 block">
                    Monthly Electricity Bill ($)
                  </Label>
                  <Input
                    id="monthlyBill"
                    type="number"
                    placeholder="150"
                    value={monthlyBill}
                    onChange={(e) => setMonthlyBill(e.target.value)}
                    className="text-lg h-12"
                  />
                </div>

                <div>
                  <Label htmlFor="roofSize" className="text-base font-semibold mb-2 block">
                    Available Roof Space (sq ft)
                  </Label>
                  <Input
                    id="roofSize"
                    type="number"
                    placeholder="1000"
                    value={roofSize}
                    onChange={(e) => setRoofSize(e.target.value)}
                    className="text-lg h-12"
                  />
                </div>

                <div>
                  <Label htmlFor="sunlight" className="text-base font-semibold mb-2 block">
                    Daily Sunlight Hours
                  </Label>
                  <Input
                    id="sunlight"
                    type="number"
                    placeholder="5"
                    value={sunlight}
                    onChange={(e) => setSunlight(e.target.value)}
                    className="text-lg h-12"
                  />
                </div>

                <Button 
                  onClick={calculateSavings}
                  className="w-full h-12 text-lg bg-primary hover:bg-primary/90 animate-pulse-glow"
                >
                  Calculate Savings
                </Button>
              </div>

              <div className="space-y-4">
                {results ? (
                  <div className="space-y-4 animate-fade-in">
                    <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-6">
                      <div className="flex items-center space-x-3 mb-2">
                        <Zap className="h-6 w-6 text-primary" />
                        <span className="text-sm font-semibold text-muted-foreground">System Size</span>
                      </div>
                      <div className="text-3xl font-bold text-primary">{results.systemSize} kW</div>
                    </div>

                    <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl p-6">
                      <div className="flex items-center space-x-3 mb-2">
                        <DollarSign className="h-6 w-6 text-accent" />
                        <span className="text-sm font-semibold text-muted-foreground">Annual Savings</span>
                      </div>
                      <div className="text-3xl font-bold text-accent">${results.annualSavings.toLocaleString()}</div>
                    </div>

                    <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-xl p-6">
                      <div className="flex items-center space-x-3 mb-2">
                        <TrendingUp className="h-6 w-6 text-secondary" />
                        <span className="text-sm font-semibold text-muted-foreground">Payback Period</span>
                      </div>
                      <div className="text-3xl font-bold text-secondary">{results.paybackPeriod} years</div>
                    </div>

                    <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-xl p-6">
                      <div className="text-sm font-semibold text-muted-foreground mb-2">CO₂ Reduction</div>
                      <div className="text-2xl font-bold">{results.co2Reduction} tons/year</div>
                      <p className="text-sm text-muted-foreground mt-2">
                        Equivalent to planting {Math.round(results.co2Reduction * 45)} trees annually
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full animate-fade-in">
                    <div className="text-center text-muted-foreground">
                      <Calculator className="h-16 w-16 mx-auto mb-4 opacity-30" />
                      <p>Enter your details to see your potential savings</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SolarCalculator;
