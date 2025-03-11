import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Description } from "@radix-ui/react-alert-dialog";
import { useEffect, useState } from "react";

const Skills = () => {
  const [skills, setskills] = useState([]); // Ensure it's an array
  const [dbskills, setDBskills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [create, setCreate] = useState(false);

  const toggleCreate = () => { 
    setChosenSkill(null);
    setCreate(!create);
  };

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
      
      setDBskills(data);
      setskills(Array.isArray(data) ? data : []);  // Ensure it's always an array
    } catch (error) {
      console.error('Error fetching skills:', error);
      setskills([]); // Prevent errors on rendering
    }finally {
      setLoading(false);
    }
  };

  const updateOrCreateSkill = async (skill: any) => {
    try {
      let url = 'http://localhost:8000/api/skills';
      if (skill.id) { 
        url += `/${skill.id}`;
      }

      const response = await fetch(url, {
        method: skill.id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(skill),
      });
      const data = await response.json();
      console.log(data);
      GetSkills();
    } catch (error) {
      console.error('Error updating skill:', error);
    }
  }

  const deleteSkill = async (id: any) => {
    
    try{const response = await fetch(`http://localhost:8000/api/skills/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    console.log(data);
    GetSkills();
  } catch (error) {
    console.error('Error deleting skill:', error);
  }
    
  };


  const [chosenSkill, setChosenSkill] = useState<any>({}); // Ensure it's an object
  const logTheSkill = (skill:any) => () => {
    setChosenSkill(skill);
  };

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="container px-4">
        <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-4">Onze Skills</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Ontdek de diverse vaardigheden van onze MBO-studenten en zie hoe zij kunnen bijdragen aan jouw project.
        </p>
      </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2,3].map((i) => (
              <Card key={i} className="h-max animate-pulse">
                <div className="h-10 p-6 bg-gray-200 "  />
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-4/5" />
                  <div className="h-4 bg-gray-200 rounded w-3/5" />
                  <div className="h-4 bg-gray-200 rounded w-3/5" />
                  <div className="h-4 bg-gray-200 rounded w-3/5" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const SkillForm = () => {
    // Set initial state for form fields
    var result = dbskills.find(skill => skill.id === chosenSkill?.id) || false;
    console.log(result);
    

    const [skillData, setSkillData] = useState({
      id: chosenSkill?.id || '',
      title: chosenSkill?.title || '',
      description: chosenSkill?.description || '',
      example: result?.example || '',
      icon: chosenSkill?.icon || '',
    });
  
    // Handle changes in form inputs
    const handleChange = (e) => {
      const { name, value } = e.target;
      setSkillData((prevData) => ({
        ...prevData,
        [name]: value, // Update the respective field
      }));
    };
  
    // Handle form submission
    const handleSubmit = (e) => {
      e.preventDefault(); // Prevent page reload on form submit
      // Do something with formData, like sending it to an API
      console.log('Form submitted with data:', skillData);
      updateOrCreateSkill(skillData);
      // Reset the form
      clean();
    };

    const clean = () => {
      setChosenSkill(null);
      setCreate(false);
      setSkillData({
        id: '',
        title: '',
        description: '',
        example: '',
        icon: '',
      });
    }
  

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-4">Onze Skills</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Ontdek de diverse vaardigheden van onze MBO-studenten en zie hoe zij kunnen bijdragen aan jouw project.
        </p>
      </div>
      <button onClick={toggleCreate} className="px-4 py-2 bg-green-500 text-white rounded mb-5">create <i className="fa-solid fa-plus"></i></button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/*deze if statement moet kijken of de user wilt toevoegen en of de user is ingelogd */}
        
      {create && true && <Card>
          <form onSubmit={handleSubmit}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <input type="text" id="icon" name="icon" value={skillData.icon} onChange={handleChange} required
                        className="text-2xl w-10 text-center border-black border-solid border-2 rounded" />
                      <input type="text" id="title" name="title" value={skillData.title} onChange={handleChange} required
                        className="text-2xl border-black border-solid border-2 rounded pl-3 w-full"/>

                    </CardTitle>
                    <CardDescription>
                    <input type="text" id="description" name="description" value={skillData.description} onChange={handleChange} required
                        className=" border-black border-solid border-2 rounded pl-3 w-full"/>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                  <textarea  id="example" name="example" value={skillData.example} onChange={handleChange} required
                        className=" border-black border-solid border-2 rounded pl-3 h-[5rem] w-full resize-none"/>
                  </CardContent>
                  <div className="p-6 pt-0 flex justify-between w-full">
                    <button type="submit" className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded">Create</button>
                    <button type="button" className="px-4 py-2 bg-accent hover:bg-accent-dark text-white rounded" onClick={clean}>Annuleer</button>
                  </div>

                </form>
        </Card>}

        {Array.isArray(skills) && skills.map((skill) => (


          <Card key={skill.id} className="transition-shadow relative">
            {/*deze if statement bekijkt of je deze skill wilt editen */}
          {skill.id === chosenSkill?.id ? ( //? here wordt de skill geupdate
              <>
                <form onSubmit={handleSubmit}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <input type="text" id="icon" name="icon" value={skillData.icon} onChange={handleChange} required
                        className="text-2xl w-10 text-center border-black border-solid border-2 rounded" />
                      <input type="text" id="title" name="title" value={skillData.title} onChange={handleChange} required
                        className="text-2xl border-black border-solid border-2 rounded pl-3 w-full"/>

                    </CardTitle>
                    <CardDescription>
                    <input type="text" id="description" name="description" value={skillData.description} onChange={handleChange} required
                        className=" border-black border-solid border-2 rounded pl-3 w-full"/>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                  <textarea  id="example" name="example" value={skillData.example} onChange={handleChange} required
                        className=" border-black border-solid border-2 rounded pl-3 h-[5rem] w-full resize-none"/>
                  </CardContent>
                  <div className="p-6 pt-0 flex justify-between w-full">
                    <button type="submit" className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded">Update</button>
                    <button type="button" className="px-4 py-2 bg-accent hover:bg-accent-dark text-white rounded" onClick={clean}>Annuleer</button>
                    <button type="button" className="px-4 py-2 bg-secondary hover:bg-secondary-dark text-white rounded" onClick={() => deleteSkill(skillData.id)}>Verwijder</button>
                  </div>

                </form>
              </>
            ) : (
              <>
                {!create &&<button 
              onClick={logTheSkill(skill)}
              className="bg-primary text-white size-10 rounded-full absolute top-4 right-4 hover:bg-accent transition-all duration-200" title="Edit category">
              <i className="fa-solid fa-pen-to-square"></i>
            </button>}
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">{skill.icon}</span> {skill.title}

              </CardTitle>
              <CardDescription>{skill.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                {
                  skill.examples?.map((example) => (
                  <li key={example} className="text-gray-600">{example}</li>
                ))}
              </ul>
            </CardContent>
            
              </>
          )}

            


          </Card>
        ))}
      </div>
    </div>
  );
  };

  return <SkillForm />;
};

export default Skills;
