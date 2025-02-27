import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import '../Navbar.css';
import { useEffect,useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init();

export const Navbar = () => {
  const location = useLocation();
  
  const isActiveLink = (path: string) => {
    return location.pathname === path;
  };

  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const navbar = document.querySelector('nav');
      if (window.scrollY > lastScrollY) {
        navbar.style.opacity = '0.5';
      } else {
        navbar.style.opacity = '1';
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
    let hamburger = document.getElementsByClassName('hamburger')[0]
    hamburger.classList.add("unToggled")
    hamburger.classList.toggle("toggled")
    hamburger.classList.toggle("unToggled")
    
    // Add other actions you want to perform when the hamburger is clicked
  };
  const navItems = [
    { path: "/", label: "Home" },
    { path: "/projects", label: "Projecten" },
    // { path: "/news", label: "Nieuws" },
    { path: "/calendar", label: "Kalender" },
    { path: "/about", label: "Over Ons" },
    { path: "/skills", label: "Skills" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <nav className=" shadow-lg hover:!opacity-100 fixed w-full top-0 transtion-all duration-500 z-50">
      <div className="bg-white px-4 sm:px-14 ">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-primary flex items-center gap-2">
            <img src="https://mbo-hub.amsterdam/images/mbo-hub-logo.png" alt="MBO-Hub Logo" className="h-10 w-30" />
          </Link>

          <div className="hidden sm:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link 
                key={item.path}
                to={item.path} 
                className={cn(
                  "transition-colors",     
                  isActiveLink(item.path) 
                    ? "text-primary font-semibold" 
                    : "text-gray-600 hover:text-primary"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex hamburger sm:hidden" onClick={() => handleMenuToggle()}>
            <div className="hamburger-slide"></div>
          </div>
        </div>
      </div>
      {menuOpen && (
        <div data-aos="fade-right" className="sm:hidden bg-white">
          <div className="container mx-auto px-4 py-4">
            {navItems.map((item) => (
              <Link 
                key={item.path}
                to={item.path} 
                className={cn(
                  "block py-2",
                  isActiveLink(item.path) 
                    ? "text-primary font-semibold" 
                    : "text-gray-600 hover:text-primary"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};