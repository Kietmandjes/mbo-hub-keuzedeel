import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const About = () => {
  const teamMembers = [
    {
      name: "Sarah de Vries",
      role: "Projectleider",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      initials: "SV"
    },
    {
      name: "Mark Jansen",
      role: "Coördinator Bedrijfsrelaties",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
      initials: "MJ"
    },
    // Add more team members as needed
  ];

  const developTeam = [
    {
      name: "Igor Herrebrugh",
      role: "Developer",
      image: "https://media.licdn.com/dms/image/v2/D4E03AQGaCDTzgvCTfQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1726526605864?e=2147483647&v=beta&t=ZL_N_Ua7gDDfaUGzK-CtGo-u4QzPRl4w6UVpQ6rin0E",
      initials: "IH"
    },
    {
      name: "Kiet Mandjes",
      role: "Developer",
      image: "https://media.licdn.com/dms/image/v2/D4D03AQHF669YLK7XSg/profile-displayphoto-shrink_800_800/B4DZVmB1fbG4Ak-/0/1741173515027?e=1746662400&v=beta&t=sgz9vWmIQTuERgee1iR8Ps3btdzT4Yw-66UL-giz7YU",
      initials: "KM"
    },
    {
      name: "Bilal el Koudadi",
      role: "Developer",
      image: "https://media.licdn.com/dms/image/v2/D5603AQEyqZfBMA1ncQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1701361169494?e=2147483647&v=beta&t=8SqICMB1XCLKWFkmCuIcmxFapvPWJkZl3td1Xh93ZMI",
      initials: "BK"
    },
    // Add more team members as needed
  ];

  const informatie = [
    {
      titel: "Visie",
      text: "MBO-Hub Amsterdam verbindt studenten met bedrijven en organisaties, om samen te werken aan de toekomst van onze stad tijdens het 750-jarig jubileum.",
      meer: "Lees meer"
    },
    {
      titel: "Innovatie",
      text: "Door studenten te betrekken bij belangrijke projecten zorgen we voor nieuwe ideeën, jonge energie en een sterkere verbinding tussen onderwijs en de maatschappij.",
      meer: "Lees meer"
    },
    {
      titel: "Verbinding",
      text: "We brengen mbo-studenten, bedrijven, de Gemeente Amsterdam en initiatieven samen om te werken aan betekenisvolle projecten voor de stad.",
      meer: "Lees meer"
    }
  ];

  
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[300px] bg-energetic">
        <div className="container relative z-10 h-full flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
            Over MBO-HUB Amsterdam
          </h1>
        </div>
      </div>

      {/* Mission Section */}
      <section className="py-16 container">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold text-primary">Onze Missie</h2>
          <p className="text-lg text-gray-700">
            MBO-Hub Amsterdam verbindt studenten, bedrijven en onderwijsinstellingen om innovatieve projecten te realiseren. 
            Wij geloven in het potentieel van MBO-talent en creëren kansen voor praktijkervaring en professionele groei.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">
            Ontmoet ons Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {teamMembers.map((member) => (
              <Card key={member.name} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage className="object-cover" src={member.image} alt={member.name} />
                    <AvatarFallback>{member.initials}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-semibold text-primary">{member.name}</h3>
                  <p className="text-gray-600 mt-2">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Information Section */}
      <section className="py-16 container">
        <div className="max-w-3xl mx-auto space-y-12 text-center">
          {informatie.map((info) => (
            <div key={info.titel} className="space-y-4">
              <h2 className="text-3xl font-bold text-primary">{info.titel}</h2>
              <p className="text-lg text-gray-700">{info.text}</p>
            </div>
          ))}
        </div>
      </section>
      

      {/* Development Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">
            Ontmoet de Developers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {developTeam.map((member) => (
              <Card key={member.name} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage className="object-cover" src={member.image} alt={member.name} />
                    <AvatarFallback>{member.initials}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-semibold text-primary">{member.name}</h3>
                  <p className="text-gray-600 mt-2">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;