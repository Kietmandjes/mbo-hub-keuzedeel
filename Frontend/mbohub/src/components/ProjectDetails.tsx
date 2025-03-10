import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import '../Project.css'
interface ProjectDetailsProps {
  project: any;
  onClose: () => void;
}

export const ProjectDetails = ({ project, onClose }: ProjectDetailsProps) => {
  const [isVisible, setIsVisible] = useState(true);


  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsVisible(false);
        setTimeout(() => {
          onClose();
        }, 250); // Match the duration of the fade-out animation
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = 'auto';

    };
  }, [onClose]);

  const handleClose = () => {
    

    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 250); // Match the duration of the fade-out animation
  };
  

  const modalRoot = document.getElementById('root');
  if (!modalRoot) return null;
  return createPortal(
    <div className={`${isVisible ? 'fade-in' : 'fade-out'} fixed py-16 top-0 left-0 w-full h-full bg-black/85 flex items-center justify-center z-50`}>
      <div className={`${isVisible ? 'scale-in' : 'scale-out'} bg-white custom-scroll max-h-full overflow-auto relative p-5 rounded-lg max-w-3xl w-full`}>
        <button className="absolute right-5 top-5" onClick={handleClose}>
          <svg  className="transition-all cursor-pointer rounded-full hover:rotate-180 duration-500" fill="#000000" width="25px" height="25px" viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="15"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M202.82861,197.17188a3.99991,3.99991,0,1,1-5.65722,5.65624L128,133.65723,58.82861,202.82812a3.99991,3.99991,0,0,1-5.65722-5.65624L122.343,128,53.17139,58.82812a3.99991,3.99991,0,0,1,5.65722-5.65624L128,122.34277l69.17139-69.17089a3.99991,3.99991,0,0,1,5.65722,5.65624L133.657,128Z"></path> </g></svg> 
        </button>
        <h2 className="text-xl font-semibold  text-primary">{project.Title}</h2>
        <span className='mb-2 text-slate-400 text-sm flex gap-2'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-calendar h-4 w-4"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg>{project.updated_at}</span>
        <figure className="h-[300px] overflow-hidden w-full">
        {project.fotos.map((fotos) => (
          <img
            src={`${fotos.name ?  import.meta.env.VITE_APP_IMG_URL + '/projects/' : ''}${fotos.id !== undefined ? fotos.id + '-' + fotos.name  : 'https://mbo-hub.amsterdam/images/mbo-hub-logo.png'}`}
            alt={project.Title}
            className="w-full rounded-md h-full object-cover"
          />
          ))}
        </figure>
        <div className="pt-2" dangerouslySetInnerHTML={{ __html: project.text }} />
      </div>
    </div>,
    modalRoot
  );
};