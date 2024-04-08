import { Link, useLoaderData } from "react-router-dom";

import Slider from "../components/Slider";
import { IoLocationSharp } from "react-icons/io5";

const Home = () => {
  const propertiesData = useLoaderData();

  // Capitalize the First Latters of each Words
  function capitalizeFirstLetters(str) {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  return (
    <div className="mb-12 space-y-14">
      <Slider />

      {/* Properties Section */}
      <section className="text-center">
        <h3 className="text-2xl font-lato font-bold mb-3">
          Featured Properties
        </h3>
        <p className="max-w-lg mx-auto mb-10">
          Discover handpicked premium properties tailored to your lifestyle,
          from elegant townhouses to serene beachfront retreats.
        </p>

        {/* Properties */}
        <div className="flex justify-evenly gap-5 flex-wrap text-left">
          {propertiesData.map((item, idx) => (
            <div
              key={idx}
              className="relative max-w-80 h-[580px] bg-[#10285f] overflow-hidden"
            >
              <img
                src={item["image"]}
                alt="Property Image"
                className="mb-2 h-[215px] w-full hover:scale-105 transition-[transform] duration-300"
              />
              <p
                className={`absolute left-4 top-3 px-2 py-0.5 font-bold font-lato text-white ${
                  item["status"] == "sale" ? "bg-amber-600" : "bg-emerald-500"
                }`}
              >
                {capitalizeFirstLetters(item["status"])}
              </p>

              <div className="p-4">
                <p className="mb-2 font-semibold text-stone-300 font-lato pl-2 border-l-2">
                  {item["price"]}
                </p>
                <p className="font-bold text-xl">{item["estate_title"]}</p>
                <p className="mb-2 italic text-sm">{item["segment_name"]}</p>
                <p className="mb-2 font-lato inline-block">
                  {item["description"]}
                </p>
                <p>
                  Area: <span className="italic">{item["area"]}</span>
                </p>
                <p className="flex items-center gap-2 mb-2.5">
                  <IoLocationSharp /> {item["location"]}
                </p>
                <p className="text-sm italic text-teal-400">
                  {item["facilities"]
                    .map((fac) => capitalizeFirstLetters(fac))
                    .join(", ")}
                </p>
              </div>
              <div className="absolute left-[50%] translate-x-[-50%] bottom-2">
                <Link to={`/property-details/${item["id"]}`} className="btn">
                  View Property
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
