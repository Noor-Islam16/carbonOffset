// import { useEffect } from "react";
import Navbar from "../../components/Navbar";
import Newsletter from "../../components/Newsletter";
import Footer from "../../components/Footer";
import { EmissionsCalculator } from "./EmissionsCalculator";

const IndividualCalculator: React.FC = () => {
  // useEffect(() => {
  //   // Scroll to the <main> element on the first render
  //   const mainElement = document.querySelector("main");
  //   if (mainElement) {
  //     mainElement.scrollIntoView({ behavior: "smooth" });
  //   }
  // }, []);

  return (
    <div>
      <Navbar />
      <main>
        <div className="w-full flex flex-col items-start justify-center py-20 px-10">
          <div className="text-6xl font-semibold flex md:flex-row md:gap-4">
            <h1 className="text-green-600">Individual</h1>
            <h1>Emissions</h1>
          </div>
          <h1 className="text-green-600 text-6xl font-semibold">Calculator</h1>
        </div>
        <div className="w-full flex flex-col items-start justify-center pt-20 pb-10 px-10 bg-green-600">
          <div className="text-5xl font-semibold flex md:flex-row md:gap-4">
            <h1 className="text-white">User Guide</h1>
          </div>
          <div className="text-2xl text-white font-medium flex flex-col w-4/5 p-10">
            <h1>Introduction to Carbon Footprint</h1>
            <p>
              A carbon footprint measures the total greenhouse gases (GHGs)
              generated by our actions. It is often measured in metric tons of
              carbon dioxide (CO2e) per year. Key sources include energy use,
              transportation, and waste. Understanding and managing your carbon
              footprint can help you reduce your environmental impact.
            </p>
          </div>
          <div className="w-full flex justify-end">
            <button className="bg-black text-white font-semibold py-4 px-10 rounded-xl">
              More
            </button>
          </div>
        </div>

        <div className="w-full flex flex-col items-center justify-center py-20 px-10">
          <h1 className="text-4xl font-bold">
            Complete Each Step of the Emissions Calculator
          </h1>

          <div className="w-full flex flex-col mt-6 items-start justify-center pt-10 pb-10 px-10">
            <EmissionsCalculator />
          </div>
        </div>
      </main>
      <Newsletter />
      <Footer />
    </div>
  );
};

export default IndividualCalculator;
