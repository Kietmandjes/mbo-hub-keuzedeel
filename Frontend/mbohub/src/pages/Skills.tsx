import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const skillCategories = [
  {
    title: "Hospitality",
    description: "Gastvrijheid en service op het hoogste niveau",
    examples: ["Hotel service project", "Restaurant management", "Event hosting"],
    icon: "🏨"
  },
  {
    title: "Media",
    description: "Digitale media en communicatie",
    examples: ["Social media campagnes", "Content creation", "Digital marketing"],
    icon: "📱"
  },
  {
    title: "Vormgeving",
    description: "Creatief design en visuele communicatie",
    examples: ["Brand identity", "UI/UX design", "Print media"],
    icon: "🎨"
  },
  {
    title: "Events",
    description: "Organisatie en uitvoering van evenementen",
    examples: ["Conferenties", "Festivals", "Bedrijfsevenementen"],
    icon: "🎪"
  },
  {
    title: "Hout en Meubilering",
    description: "Vakmanschap in houtbewerking en meubelmaking",
    examples: ["Custom furniture", "Interieur design", "Restauratie"],
    icon: "🪑"
  },
  {
    title: "Video/fotoproductie",
    description: "Professionele beeld- en videoproductie",
    examples: ["Bedrijfsvideo's", "Fotoreportages", "Documentaires"],
    icon: "📸"
  }
];

const Skills = () => {
  return (
      <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="h-[300px] bg-primary overflow-hidden">
        <div className="container relative z-10 h-full flex items-center justify-center">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center pb-2">
              Onze Skills
            </h1>
            <p className="text-lg md:text-xl text-white/90 text-center">
              Ontdek de diverse vaardigheden van onze MBO-studenten en zie hoe zij kunnen bijdragen aan jouw project.
            </p>
          </div>
        </div>
      </div>

      {/* <div className="text-center mb-12"> 
        <h1 className="text-4xl font-bold text-primary mb-4">Onze Skills</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Ontdek de diverse vaardigheden van onze MBO-studenten en zie hoe zij kunnen bijdragen aan jouw project.
        </p>
      </div> */}
      <div className="container mx-auto px-4 py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillCategories.map((category) => (
          <Card key={category.title} className="transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">{category.icon}</span>
                {category.title}
              </CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                {category.examples.map((example) => (
                  <li key={example} className="text-gray-600">{example}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Skills;