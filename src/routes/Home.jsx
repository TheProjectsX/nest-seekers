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
              className="max-w-80 h-auto shadow-lg rounded-md bg-gray-800 text-white relative"
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.estate_title}
                  className="w-full h-52 object-cover rounded-t-md hover:scale-110 transition-[transform] duration-300"
                />
                <div
                  className={`absolute top-0 left-0 ${
                    item.status === "sale" ? "bg-green-500" : "bg-blue-500"
                  } px-2 py-1 rounded-tr-md rounded-bl-md`}
                >
                  <p className="text-sm font-semibold">
                    {capitalizeFirstLetters(item.status)}
                  </p>
                </div>
              </div>
              <div className="p-4 mb-16">
                <p className="mb-2 text-lg font-semibold text-stone-300 font-lato pl-2 border-l-2 border-blue-500">
                  {item["price"]}
                </p>
                <h2 className="text-xl font-semibold mb-2">
                  {item.estate_title}
                </h2>
                <p className="text-sm mb-4">{item.description}</p>
                <p className="font-semibold">Area: {item.area}</p>
                <p className="font-semibold">Type: {item.segment_name}</p>
                <p className="font-semibold flex items-center gap-2 mb-2">
                  <IoLocationSharp /> {item.location}
                </p>
                <p className="text-sm font-semibold italic text-blue-300">
                  {item["facilities"]
                    .map((fac) => capitalizeFirstLetters(fac))
                    .join(", ")}
                </p>
              </div>
              <div className="absolute left-[50%] translate-x-[-50%] bottom-5">
                <Link
                  to={`/property-details/${item["id"]}`}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2.5 px-5 rounded-md transition duration-300 ease-in-out font-lato font-semibold"
                >
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
