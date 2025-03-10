import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

const Skills = () => {
  const [skillCategories, setSkillCategories] = useState([]); // Ensure it's an array

  useEffect(() => {
    GetSkills();
  }, []);

  const GetSkills = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/skills');
      const data = await response.json();
      for (let i = 0; i < data.length; i++) {
        if (data[i].example) {
          data[i].examples = data[i].example.split(',');
        }
      }
      
      
      setSkillCategories(Array.isArray(data) ? data : []);  // Ensure it's always an array
    } catch (error) {
      console.error('Error fetching skills:', error);
      setSkillCategories([]); // Prevent errors on rendering
    }
  };

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-4">Onze Skills</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Ontdek de diverse vaardigheden van onze MBO-studenten en zie hoe zij kunnen bijdragen aan jouw project.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(skillCategories) && skillCategories.map((category) => (
          <Card key={category.title} className="transition-shadow relative">
            <button className="bg-primary text-white size-10 rounded-full absolute top-4 right-4 hover:bg-accent transition-all duration-200" title="Edit category">
              <i className="fa-solid fa-pen-to-square"></i>
            </button>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">{category.icon}</span>
                {category.title}
              </CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                {
                  category.examples?.map((example) => (
                  <li key={example} className="text-gray-600">{example}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Skills;
