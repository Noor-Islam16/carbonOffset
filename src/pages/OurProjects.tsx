import Navbar from "../components/Navbar";
import curve from "../assets/home/curve.png";
import mainbg from "../assets/services/mainbg.png";
import newsletterbg from "../assets/home/newsletterbg.png";
import logo from "../assets/home/logo.png";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { getProjects } from "../api/addProject";
import parse from 'html-react-parser';

const OurProjects = () => {
  const [projectData, setProjectData] = useState([]);

  useEffect(() => {


    const fetchdata = async () => {
      try {
        const res = await getProjects();
        console.log("Response:", res);
        setProjectData(res);

      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchdata();
  }, []);

  return (
    <div>
      <Navbar />
      <div
        style={{
          backgroundImage: `url(${mainbg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "60vh",
          width: "100%",
        }}
        className="flex items-center justify-center relative"
      >
        <h1 className="text-3xl md:text-5xl font-bold text-white">Our Projects</h1>

        <img src={curve} className="absolute bottom-0 w-full" />
      </div>

      {/* projects section */}
      <div className="p-5 md:p-24 flex flex-col gap-10 md:gap-20">
        {projectData.map((project: any, index: number) => (
          <div
            key={project.id}
            className={`flex flex-col md:flex-row ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-5 md:gap-10 h-auto md:h-[70vh] shadow-xl`}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full md:w-1/2 object-cover"
            />
            <div className="flex flex-col px-5 md:px-12 gap-6 justify-center w-full md:w-1/2">
              <h1 className="text-2xl md:text-4xl text-gray-600 font-bold">
                {project.name}
              </h1>
              <h1 className="text-lg md:text-xl">
                {parse(project.details.split(' ').slice(0, 20).join(' ') + '...')}
              </h1>

              <button className="border-2 border-green-600 w-32 md:w-40 py-2 md:py-3 text-lg rounded-xl text-green-600 font-bold">
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* newsletter */}
      <div
        style={{
          backgroundImage: `url(${newsletterbg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "150px",
        }}
        className="flex flex-col md:flex-row items-center justify-between px-5 md:px-16 py-5"
      >
        <div className="flex gap-5 md:gap-16 items-center">
          <img src={logo} alt="logo" />
          <h1 className="text-lg md:text-xl text-white">Join Our Newsletter</h1>
        </div>
        <div className="flex gap-3 mt-5 md:mt-0">
          <input
            className="w-full md:w-60 h-10 rounded-md p-2 bg-white"
            placeholder="Enter your email"
          />
          <button className="bg-violet-600 text-white font-bold px-5 py-2 rounded-md">
            Submit
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OurProjects;
