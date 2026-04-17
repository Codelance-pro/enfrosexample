import { Button } from "@/components/ui/button";
import { Download, ShieldCheck, Award, CheckCircle2 } from "lucide-react";

const certificates = [
  {
    title: "MNRE Approved Vendor",
    desc: "Registered and recognized by the Ministry of New & Renewable Energy.",
    file: "/certificates/mnre.pdf",
  },
  {
    title: "ISO 9001:2015",
    desc: "Quality Management System Certification ensuring top-tier standards.",
    file: "/certificates/iso9001.pdf",
  },
  {
    title: "ISO 14001:2015",
    desc: "Environmental Management Certification for sustainable operations.",
    file: "/certificates/iso14001.pdf",
  },
  {
    title: "ISO 45001:2018",
    desc: "Safety & Occupational Health Certification for workforce protection.",
    file: "/certificates/iso45001.pdf",
  },
  {
    title: "CE Certification",
    desc: "Product meets European Union safety, health, and environmental protection.",
    file: "/certificates/ce.pdf",
  },
  {
    title: "IEC Standard Compliance",
    desc: "Panels tested under International Electrotechnical Commission norms.",
    file: "/certificates/iec.pdf",
  },
];

const CertificatePage = () => {
  return (
    <section className="pt-24">

      {/* TOP HERO BANNER */}
      <div className="relative py-20 bg-gradient-to-r from-[#008B5E] via-[#0056A6] to-[#00E7B4] text-white overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">

          <h1 className="text-5xl font-extrabold mb-4 animate-fade-in">
            Certificates & Approvals
          </h1>

          <p className="text-lg max-w-2xl leading-relaxed opacity-90 animate-fade-in">
            We adhere to national and international quality standards. Explore our certifications and approvals that ensure reliability, safety, and long-term performance.
          </p>
        </div>

        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl opacity-40 animate-pulse"></div>
      </div>

      {/* CONTENT SECTION */}
      <div className="container mx-auto px-4 py-16">

        {/* WHY CERTIFICATIONS MATTER */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 bg-white shadow-lg rounded-2xl border hover:shadow-2xl transition-all">
            <ShieldCheck className="h-12 w-12 text-[#008B5E] mb-4" />
            <h3 className="font-bold text-xl mb-2">Government Approved</h3>
            <p className="text-gray-600">
              Our certifications meet national renewable energy standards and ensure complete compliance.
            </p>
          </div>

          <div className="p-6 bg-white shadow-lg rounded-2xl border hover:shadow-2xl transition-all">
            <Award className="h-12 w-12 text-[#0056A6] mb-4" />
            <h3 className="font-bold text-xl mb-2">International Standards</h3>
            <p className="text-gray-600">
              ISO & IEC certifications guarantee global-quality workmanship and product durability.
            </p>
          </div>

          <div className="p-6 bg-white shadow-lg rounded-2xl border hover:shadow-2xl transition-all">
            <CheckCircle2 className="h-12 w-12 text-[#00E7B4] mb-4" />
            <h3 className="font-bold text-xl mb-2">Tested for Safety</h3>
            <p className="text-gray-600">
              All products undergo rigorous safety and performance testing for maximum reliability.
            </p>
          </div>
        </div>

        {/* CERTIFICATE GRID */}
        <h2 className="text-3xl font-extrabold mb-8 text-[#0C1F24]">
          Our Official Certifications
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, index) => (
            <div
              key={index}
              className="group bg-white p-6 rounded-2xl shadow-lg border hover:shadow-2xl transition-all hover:-translate-y-2"
            >
              <div className="bg-gradient-to-br from-[#008B5E] via-[#0056A6] to-[#00E7B4] p-1 rounded-xl mb-4">
                <div className="bg-white p-6 rounded-xl text-left">
                  <h3 className="font-bold text-xl mb-2 text-[#0C1F24]">
                    {cert.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {cert.desc}
                  </p>

                  <Button
                    variant="outline"
                    className="border-[#008B5E] text-[#008B5E] hover:bg-[#008B5E] hover:text-white transition-all"
                    onClick={() => window.open(cert.file, "_blank")}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

    </section>
  );
};

export default CertificatePage;
