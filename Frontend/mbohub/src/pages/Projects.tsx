import { ProjectShowcase } from "@/components/ProjectShowcase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; 
import { Link } from "react-router-dom";
const Projects = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="h-[300px] bg-secondary overflow-hidden">
      <div className="container relative z-10 h-full flex items-center justify-center">
        <div className="max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold text-white text-center pb-2">
        Onze Projecten
            </h1>
            <p className="text-lg md:text-xl text-white/90 text-center">
              Ontdek de innovatieve projecten waar MBO-studenten en bedrijven
              samen aan werken
            </p>
          </div>
        </div>
      </div>
      {/* Project Showcase Section */}
      <ProjectShowcase />
      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-primary mb-6">
            Wil je samenwerken?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Wij zijn altijd op zoek naar verbinding en kijken graag hoe we samen kunnen werken. 
            Wil je namens een bedrijf of organisatie kijken hoe je kunt samenwerken met mbo-studenten? 
            Of ben je een student en wil je meewerken aan een project voor toonaangevende bedrijven in Amsterdam?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              // variant="secondary"
              asChild
              className="bg-secondary hover:bg-secondary-dark text-white font-semibold"
            >
              <Link to="/contact?type=business">Project Aanmelden als Bedrijf</Link>
            </Button>
            <Button 
              // variant="outline"
              asChild
              className="bg-accent hover:bg-accent-dark text-white font-semibold"
            >
              <Link to="/contact?type=student">Aanmelden als Student</Link>
            </Button>
          </div>
        </div>
      </section>
      
    </div>
  );
};
export default Projects;