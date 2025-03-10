import { useEffect, useState, useMemo, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableHeader } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import JoditEditor from "jodit-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import type { Event, Project } from "@/types/database";
import "../Admin.css";

const Admin = () => {
  const [event, setEvent] = useState<Partial<Event>>({
    title: "",
    type: "",
    description: "",
    location: "",
    date: new Date().toISOString().split("T")[0],
  });
  const [projectContent, setProjectContent] = useState("");
  const [eventContent, setEventContent] = useState("");

  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);
  const [project, setProject] = useState<Partial<Project>>({
    title: "",
    category: "",
    description: projectContent,
  });

  const [isAdmin, setIsAdmin] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const [data, setData] = useState<{
    users: { id: number; name: string; email: string }[];
    fotos: any[];
  }>({ users: [], fotos: [] });
  useEffect(() => {
    const checkAdmin = () => {
      if (document.cookie.includes("admin=true")) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    };

    const checkOverflow = () => {
      const scroll = document.querySelector(".hidescrollbar");
      if (scroll) {
        if (scroll.scrollWidth > scroll.clientWidth) {
          setIsOverflowing(true);
        }
      }
    };

    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/admin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const resdata = await response.json();
        setData(resdata);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchData();
    checkAdmin();
    checkOverflow();
  }, []);

  const handleEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/events.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(event),
        }
      );

      if (response.ok) {
        toast.success("Evenement succesvol toegevoegd!");
        setEvent({
          title: "",
          type: "",
          description: "",
          location: "",
          date: new Date().toISOString().split("T")[0],
        });
      } else {
        toast.error(
          "Er is iets misgegaan bij het toevoegen van het evenement."
        );
      }
    } catch (error) {
      toast.error(
        "Er is een fout opgetreden bij het verbinden met de database."
      );
      console.error("Error submitting event:", error);
    }
  };

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", project.title);
      formData.append("category", project.category);
      formData.append("description", project.description);

      // Voeg afbeeldingen toe aan FormData
      images.forEach((image, index) => {
        formData.append(`images[]`, image);
      });
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/makeProject`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        toast.success("Project succesvol toegevoegd!");
        setProject({
          title: "",
          category: "",
          description: "",
        });
        setProjectContent("");
        setImages([]);
      } else {
        toast.error("Er is iets misgegaan bij het toevoegen van het project.");
      }
    } catch (error) {
      toast.error(
        "Er is een fout opgetreden bij het verbinden met de database."
      );
      console.error("Error submitting project:", error);
    }
  };
  const editor = useRef(null);
  const config = useMemo(
    () => ({
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      placeholder: "Start typings...",
      buttons: ["bold", "italic", "underline", "strikethrough", "ul"],
      // controls: {
      //   ul: {
      //     list: undefined
      //   },
      //   ol: {
      //     list: undefined
      //   },
      // }
    }),
    []
  );

  const goToLeft = () => {
    const scroll = document.querySelector(".hidescrollbar");
    scroll.scrollLeft -= 200;
  };
  const goToRight = () => {
    const scroll = document.querySelector(".hidescrollbar");
    scroll.scrollLeft += 200;
  };

  if (isAdmin) {
    return (
      <div className="container flex flex-col gap-8 mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        {data.users.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Gebruikers</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <tr>
                    <th className="text-left">ID</th>
                    <th className="text-left">Naam</th>
                    <th className="text-left">Email</th>
                  </tr>
                </TableHeader>
                <TableBody>
                  {data.users.map((user) => (
                    <tr className="border-b" key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                    </tr>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
        {data.fotos.length > 0 && (
          <Card className="relative">
            <CardHeader>
              <CardTitle>Foto's</CardTitle>
            </CardHeader>
            <figure className="flex px-6 scroll-smooth pb-6 h-[200px] overflow-auto hidescrollbar gap-4">
              {isOverflowing && (
                <button
                  className="md:block absolute left-1 pr-0.5 bg-white rounded-full  top-[55%] hidden"
                  onClick={goToLeft}
                >
                  <svg
                    width="40px"
                    height="40px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        d="M15 7L10 12L15 17"
                        stroke="#000000"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </g>
                  </svg>
                </button>
              )}
              {data.fotos.map((foto) => (
                <img
                  key={foto.id}
                  src={`${import.meta.env.VITE_APP_IMG_URL}/projects/${
                    foto.id
                  }-${foto.name}`}
                  alt={foto.name}
                  className="w-[200px] object-cover rounded h-full"
                />
              ))}
              {isOverflowing && (
                <button
                  className="md:block absolute bg-white rounded-full p-2 right-1 top-[55%] hidden"
                  onClick={goToRight}
                >
                  <svg
                    width="22.5px"
                    height="22.5px"
                    viewBox="-4.5 0 20 20"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#000000"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <title>arrow_right [#336]</title>{" "}
                      <desc>Created with Sketch.</desc> <defs> </defs>{" "}
                      <g
                        id="Page-1"
                        stroke="none"
                        stroke-width="1"
                        fill="none"
                        fill-rule="evenodd"
                      >
                        <g
                          id="Dribbble-Light-Preview"
                          transform="translate(-305.000000, -6679.000000)"
                          fill="#000000"
                        >
                          <g
                            id="icons"
                            transform="translate(56.000000, 160.000000)"
                          >
                            <path
                              d="M249.365851,6538.70769 L249.365851,6538.70769 C249.770764,6539.09744 250.426289,6539.09744 250.830166,6538.70769 L259.393407,6530.44413 C260.202198,6529.66364 260.202198,6528.39747 259.393407,6527.61699 L250.768031,6519.29246 C250.367261,6518.90671 249.720021,6518.90172 249.314072,6519.28247 L249.314072,6519.28247 C248.899839,6519.67121 248.894661,6520.31179 249.302681,6520.70653 L257.196934,6528.32352 C257.601847,6528.71426 257.601847,6529.34685 257.196934,6529.73759 L249.365851,6537.29462 C248.960938,6537.68437 248.960938,6538.31795 249.365851,6538.70769"
                              id="arrow_right-[#336]"
                            ></path>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                </button>
              )}
            </figure>
          </Card>
        )}
        <Tabs defaultValue="events" className="space-y-4">
          <TabsList>
            <TabsTrigger value="events">Evenementen</TabsTrigger>
            <TabsTrigger value="projects">Projecten</TabsTrigger>
          </TabsList>

          <TabsContent value="events">
            <Card>
              <CardHeader>
                <CardTitle>Voeg Evenement Toe</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleEventSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="event-title">Titel</Label>
                    <Input
                      id="event-title"
                      value={event.title}
                      onChange={(e) =>
                        setEvent({ ...event, title: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="event-type">Type</Label>
                    <Select
                      onValueChange={(value) =>
                        setEvent({ ...event, type: value })
                      }
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecteer type" />
                      </SelectTrigger>
                      <SelectContent style={{ backgroundColor: "white" }}>
                        <SelectItem value="workshop">Workshop</SelectItem>
                        <SelectItem value="seminar">Seminar</SelectItem>
                        <SelectItem value="excursie">Excursie</SelectItem>
                        <SelectItem value="gastcollege">Gastcollege</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="event-date">Datum</Label>
                    <Input
                      id="event-date"
                      type="date"
                      value={event.date}
                      onChange={(e) =>
                        setEvent({ ...event, date: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="event-location">Locatie</Label>
                    <Input
                      id="event-location"
                      value={event.location}
                      onChange={(e) =>
                        setEvent({ ...event, location: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="event-description">Beschrijving</Label>
                    <JoditEditor
                      id="event-description"
                      ref={editor}
                      value={eventContent}
                      config={config}
                      tabIndex={1} // tabIndex of textarea
                      onBlur={(newContent) => setEventContent(newContent)} // preferred to use only this option to update the content for performance reasons
                      onChange={(newContent) =>
                        setProject({ ...project, description: newContent })
                      }
                    />
                  </div>

                  <Button className="text-white" type="submit">
                    Evenement Toevoegen
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects">
            <Card>
              <CardHeader>
                <CardTitle>Voeg Project Toe</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProjectSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="project-title">Titel</Label>
                    <Input
                      id="project-title"
                      value={project.title}
                      onChange={(e) =>
                        setProject({ ...project, title: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="project-category">Categorie</Label>
                    <Select
                      value={project.category}
                      onValueChange={(value) =>
                        setProject({ ...project, category: value })
                      }
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecteer categorie" />
                      </SelectTrigger>
                      <SelectContent style={{ backgroundColor: "white" }}>
                        <SelectItem value="Logistiek">Logistiek</SelectItem>
                        <SelectItem value="ICT">ICT</SelectItem>
                        <SelectItem value="Techniek">Techniek</SelectItem>
                        <SelectItem value="Media">Media</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 flex flex-col">
                    <Label
                      htmlFor="project-image"
                      className="w-1/6 h-12 border flex items-center justify-center cursor-pointer hover:border-2 transition-all hover:border-primary rounded-md "
                    >
                      Afbeelding(en) toevoegen
                    </Label>
                    <input
                      type="file"
                      accept="image/png, image/jpeg, image/jpg, image/svg, image/gif, image/webp"
                      id="project-image"
                      ref={fileInputRef}
                      multiple
                      onChange={(e) => {
                        if (e.target.files) {
                          setImages([...images, ...Array.from(e.target.files)]);
                          e.target.value = "";
                        }
                      }}
                      className="opacity-0 absolute z-[-1]"
                    />
                  </div>
                  {images.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex gap-4">
                        {images.map((image, key) => (
                          <figure
                            className="h-48 relative rounded shadow group"
                            key={image.name}
                          >
                            <img
                              key={image.name}
                              src={URL.createObjectURL(image)}
                              alt={image.name}
                              className=" object-cover h-full rounded"
                            />
                            <svg
                              onClick={() =>
                                setImages(
                                  images.filter((_, index) => index !== key)
                                )
                              }
                              className="absolute top-1 right-1 opacity-0 transition-all cursor-pointer rounded-full hover:rotate-180 duration-500 group-hover:opacity-100"
                              fill="#000000"
                              width="40px"
                              height="40px"
                              viewBox="0 0 256 256"
                              id="Flat"
                              xmlns="http://www.w3.org/2000/svg"
                              stroke="#000000"
                              stroke-width="15"
                            >
                              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                              <g
                                id="SVGRepo_tracerCarrier"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></g>
                              <g id="SVGRepo_iconCarrier">
                                {" "}
                                <path d="M202.82861,197.17188a3.99991,3.99991,0,1,1-5.65722,5.65624L128,133.65723,58.82861,202.82812a3.99991,3.99991,0,0,1-5.65722-5.65624L122.343,128,53.17139,58.82812a3.99991,3.99991,0,0,1,5.65722-5.65624L128,122.34277l69.17139-69.17089a3.99991,3.99991,0,0,1,5.65722,5.65624L133.657,128Z"></path>{" "}
                              </g>
                            </svg>
                          </figure>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="project-description">Beschrijving</Label>
                    <JoditEditor
                      id="project-description"
                      ref={editor}
                      value={projectContent}
                      config={config}
                      tabIndex={1} // tabIndex of textarea
                      onBlur={(newContent) => setProjectContent(newContent)} // preferred to use only this option to update the content for performance reasons
                      onChange={(newContent) =>
                        setProject({ ...project, description: newContent })
                      }
                    />
                  </div>
                  <Button className="text-white" type="submit">
                    Project Toevoegen
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    );
  } else {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center font-bold text-xl">
        404 Page Not Found
        <p className="flex text-base font-medium items-center gap-1">
          Back to{" "}
          <Link
            to="/"
            className="text-base font-medium text-primary flex items-center gap-2"
          >
            Home
          </Link>
        </p>
      </div>
    );
  }
};

export default Admin;
