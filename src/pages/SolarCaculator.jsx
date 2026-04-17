import { useState } from "react";
import { Calculator, Sun, Zap, TrendingUp, MapPin, DollarSign, Home, Battery } from "lucide-react";

const SolarCalculator = () => {
  const [location, setLocation] = useState("");
  const [monthlyBill, setMonthlyBill] = useState("");
  const [consumerType, setConsumerType] = useState("residential");
  const [roofArea, setRoofArea] = useState("");
  const [results, setResults] = useState(null);

  const calculateSavings = () => {
    const bill = parseFloat(monthlyBill);
    const area = parseFloat(roofArea);

    if (isNaN(bill) || isNaN(area)) return;

    // Calculation based on Indian solar standards
    const systemSize = Math.min((bill * 12) / 1200, area / 100); // kW
    const monthlyGeneration = systemSize * 120; // Units per month
    const monthlySavings = monthlyGeneration * 7; // ₹7 per unit average
    const annualSavings = monthlySavings * 12;
    const systemCost = systemSize * 50000; // ₹50,000 per kW
    const paybackPeriod = systemCost / annualSavings;
    const co2Reduction = systemSize * 1.2;
    const subsidy = Math.min(systemSize * 18000, 78000); // Govt subsidy

    setResults({
      systemSize: Math.round(systemSize * 10) / 10,
      monthlyGeneration: Math.round(monthlyGeneration),
      monthlySavings: Math.round(monthlySavings),
      annualSavings: Math.round(annualSavings),
      systemCost: Math.round(systemCost),
      netCost: Math.round(systemCost - subsidy),
      subsidy: Math.round(subsidy),
      paybackPeriod: Math.round(paybackPeriod * 10) / 10,
      co2Reduction: Math.round(co2Reduction * 10) / 10,
      lifetimeSavings: Math.round(annualSavings * 25)
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50 pt-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 py-8 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-3 mb-2">
            <Sun className="h-12 w-12 text-white animate-pulse" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">Solar Calculator</h1>
          </div>
          <p className="text-center text-white text-lg">Calculate Your Solar Savings & System Size</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Main Calculator Card */}
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-yellow-400">
          <div className="bg-gradient-to-r from-yellow-400 to-amber-400 py-4 px-6">
            <div className="flex items-center space-x-2">
              <Calculator className="h-6 w-6 text-yellow-900" />
              <h2 className="text-2xl font-bold text-yellow-900">Enter Your Details</h2>
            </div>
          </div>

          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Input Section */}
              <div className="space-y-6">
                {/* Location */}
                <div>
                  <label className="flex items-center text-gray-700 font-semibold mb-2">
                    <MapPin className="h-5 w-5 mr-2 text-yellow-600" />
                    Location / Address
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-yellow-300 rounded-lg focus:outline-none focus:border-yellow-500 transition"
                  />
                </div>

                {/* Monthly Bill */}
                <div>
                  <label className="flex items-center text-gray-700 font-semibold mb-2">
                    <DollarSign className="h-5 w-5 mr-2 text-yellow-600" />
                    Monthly Electricity Bill (₹)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g., 4000"
                    value={monthlyBill}
                    onChange={(e) => setMonthlyBill(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-yellow-300 rounded-lg focus:outline-none focus:border-yellow-500 transition"
                  />
                </div>

                {/* Consumer Type */}
                <div>
                  <label className="flex items-center text-gray-700 font-semibold mb-2">
                    <Home className="h-5 w-5 mr-2 text-yellow-600" />
                    Consumer Type
                  </label>
                  <select
                    value={consumerType}
                    onChange={(e) => setConsumerType(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-yellow-300 rounded-lg focus:outline-none focus:border-yellow-500 transition"
                  >
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="industrial">Industrial</option>
                  </select>
                </div>

                {/* Roof Area */}
                <div>
                  <label className="flex items-center text-gray-700 font-semibold mb-2">
                    <Home className="h-5 w-5 mr-2 text-yellow-600" />
                    Available Roof Area (sq ft)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g., 500"
                    value={roofArea}
                    onChange={(e) => setRoofArea(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-yellow-300 rounded-lg focus:outline-none focus:border-yellow-500 transition"
                  />
                </div>

                <button
                  onClick={calculateSavings}
                  className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-4 rounded-lg shadow-lg transform hover:scale-105 transition duration-200 flex items-center justify-center space-x-2"
                >
                  <Calculator className="h-5 w-5" />
                  <span>Calculate Solar Potential</span>
                </button>
              </div>

              {/* Results Section */}
              <div>
                {results ? (
                  <div className="space-y-4">
                    {/* System Size */}
                    <div className="bg-gradient-to-br from-yellow-100 to-amber-100 rounded-xl p-6 border-2 border-yellow-300 shadow-md">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Zap className="h-6 w-6 text-yellow-700" />
                          <span className="font-semibold text-gray-700">Recommended System Size</span>
                        </div>
                      </div>
                      <div className="text-4xl font-bold text-yellow-700">{results.systemSize} kW</div>
                      <div className="text-sm text-gray-600 mt-1">Rooftop Solar System</div>
                    </div>

                    {/* Monthly Generation */}
                    <div className="bg-gradient-to-br from-orange-100 to-yellow-100 rounded-xl p-5 border-2 border-orange-300 shadow-md">
                      <div className="flex items-center space-x-2 mb-1">
                        <Battery className="h-5 w-5 text-orange-700" />
                        <span className="font-semibold text-gray-700 text-sm">Monthly Generation</span>
                      </div>
                      <div className="text-2xl font-bold text-orange-700">{results.monthlyGeneration} Units</div>
                    </div>

                    {/* Monthly Savings */}
                    <div className="bg-gradient-to-br from-amber-100 to-yellow-100 rounded-xl p-5 border-2 border-amber-300 shadow-md">
                      <div className="flex items-center space-x-2 mb-1">
                        <DollarSign className="h-5 w-5 text-amber-700" />
                        <span className="font-semibold text-gray-700 text-sm">Monthly Savings</span>
                      </div>
                      <div className="text-2xl font-bold text-amber-700">₹{results.monthlySavings.toLocaleString()}</div>
                    </div>

                    {/* Annual Savings */}
                    <div className="bg-gradient-to-br from-yellow-200 to-amber-200 rounded-xl p-6 border-2 border-yellow-400 shadow-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <TrendingUp className="h-6 w-6 text-yellow-800" />
                        <span className="font-semibold text-gray-700">Annual Savings</span>
                      </div>
                      <div className="text-3xl font-bold text-yellow-800">₹{results.annualSavings.toLocaleString()}</div>
                      <div className="text-sm text-gray-600 mt-2">25-Year Savings: ₹{(results.lifetimeSavings / 100000).toFixed(1)} Lakhs</div>
                    </div>

                    {/* System Cost */}
                    <div className="bg-white rounded-xl p-5 border-2 border-gray-300 shadow-md">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-gray-600">System Cost</div>
                          <div className="font-bold text-gray-800">₹{results.systemCost.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Govt. Subsidy</div>
                          <div className="font-bold text-green-600">- ₹{results.subsidy.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Net Cost</div>
                          <div className="font-bold text-blue-600">₹{results.netCost.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Payback Period</div>
                          <div className="font-bold text-purple-600">{results.paybackPeriod} years</div>
                        </div>
                      </div>
                    </div>

                    {/* CO2 Reduction */}
                    <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl p-5 border-2 border-green-300 shadow-md">
                      <div className="text-sm font-semibold text-gray-700 mb-1">Environmental Impact</div>
                      <div className="text-xl font-bold text-green-700">{results.co2Reduction} tons CO₂/year</div>
                      <div className="text-xs text-gray-600 mt-1">= {Math.round(results.co2Reduction * 50)} trees planted</div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center p-8">
                    <Sun className="h-24 w-24 text-yellow-300 mb-4 animate-pulse" />
                    <p className="text-gray-500 text-lg font-medium">Enter your details to calculate</p>
                    <p className="text-gray-400 text-sm mt-2">Get instant estimates for your solar system</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="max-w-6xl mx-auto mt-8 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-yellow-300">
            <div className="flex items-center space-x-3 mb-3">
              <div className="bg-yellow-400 p-3 rounded-full">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-800">Zero Investment</h3>
            </div>
            <p className="text-gray-600 text-sm">Start with zero upfront cost through various financing options</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-orange-300">
            <div className="flex items-center space-x-3 mb-3">
              <div className="bg-orange-400 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-800">25-Year Warranty</h3>
            </div>
            <p className="text-gray-600 text-sm">Long-term performance guarantee on panels and inverters</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-amber-300">
            <div className="flex items-center space-x-3 mb-3">
              <div className="bg-amber-400 p-3 rounded-full">
                <Sun className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-800">Net Metering</h3>
            </div>
            <p className="text-gray-600 text-sm">Sell excess power back to grid and reduce bills to zero</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolarCalculator;