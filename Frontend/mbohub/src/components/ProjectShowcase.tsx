import { useEffect, useState } from 'react';
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import {Link} from 'react-router-dom';
import { ProjectDetails } from './ProjectDetails';
interface ProjectShowcaseProps {
  limit?: number;
}

export const ProjectShowcase = ({ limit }: ProjectShowcaseProps) => {
  const [projects, setProjects] = useState([]);
  const [details, setDetails] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const fetchProjects = async (clear) => {
    const urlParams = new URLSearchParams(window.location.search);
    const cat = urlParams.get('cat');
    let body = cat ? JSON.stringify({ cat }) : null;
    if (clear) {
      body = null;
    }
    try {
      const response = await fetch('http://localhost:8000/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: body,
      });


      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      if (Array.isArray(data)) {
        setProjects(limit ? data.slice(0, limit) : data);
      } else {
        throw new Error('Invalid data format received from API');
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { 
    fetchProjects(false);
  }, [limit]);

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="container px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-12">
            Uitgelichte Projecten
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2,3].map((i) => (
              <Card key={i} className="h-80 animate-pulse">
                <div className="h-48 bg-gray-200" />
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-1/4" />
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-white">
      <div className="container px-4">
        <h2 className={`text-3xl md:text-4xl font-bold text-primary text-center ${projects.length > 0 ? "mb-12" : "mb-0"}`}>
          {projects.length > 0 ? limit ? "Uitgelichte Projecten" : `Alle ${new URLSearchParams(window.location.search).get('cat') !== null ?new URLSearchParams(window.location.search).get('cat').toLocaleLowerCase(): '' } Projecten ` : "Geen Projecten gevonden"}
          {new URLSearchParams(window.location.search).get('cat') !== null && <Link to='/projects' onClick={() => fetchProjects(true)} className='text-slate-400 hover:text-slate-600 text-sm ml-2'>Alle Projecten zien</Link>}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {projects && projects.map((project) => (
            <Card
              key={project.id}
              onClick={() => {setDetails(project.id)
              }}
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            >
              {details === project.id && <ProjectDetails project={project} onClose={() => setDetails(null)} />}
              <div className="relative h-48 overflow-hidden">
                <img
                src={`${project.fotos.find(img => img.primairy === 1)?.name ?  import.meta.env.VITE_APP_IMG_URL + '/projects/' : ''}${project.fotos.find(img => img.primairy === 1)?.id !== undefined ? project.fotos.find(img => img.primairy === 1)?.id + '-' + project.fotos.find(img => img.primairy === 1)?.name  : 'https://mbo-hub.amsterdam/images/mbo-hub-logo.png'}`}
                alt={project.Title}
                className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">

              <Badge 
                onClick={() => {
                const url = new URL(window.location.href);
                url.searchParams.set('cat', project.tag);
                window.history.pushState({}, '', url.toString());
                window.dispatchEvent(new Event('popstate'));
                fetchProjects(false);
                }} 
                className="mb-2 bg-secondary transition-all duration-300 text-white"
              >
                {project.tag}
              </Badge>
              <h3 className="text-xl font-semibold  text-primary">
                {project.Title}
              </h3>
              <span className='mb-2 text-slate-400 text-sm'>{project.updated_at}</span>
              <p className="text-gray-600 line-clamp-3">{project.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section> );
};