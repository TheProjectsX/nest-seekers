import { useEffect, useState } from "react";
import { useParams, useLoaderData, Link } from "react-router-dom";

const PropertyDetails = () => {
  const [propertyDetails, setPropertyDetails] = useState(null);

  const params = useParams();
  const { id } = params;
  const propertiesData = useLoaderData();

  useEffect(() => {
    const currentProperty = propertiesData.find((item) => item.id === id);
    setPropertyDetails(currentProperty ? currentProperty : "");
  }, [propertiesData]);

  if (propertyDetails == null) {
    return <></>;
  }

  // Capitalize the First Latters of each Words
  function capitalizeFirstLetters(str) {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  return (
    <>
      <h3 className="font-bold text-2xl mb-10 p-3 text-center font-lato bg-gray-600 rounded-lg">
        Property Details
      </h3>
      {propertyDetails !== "" ? (
        <div className="container mx-auto px-4">
          <div className="max-w-screen-lg mx-auto">
            <div className="flex justify-center mb-4">
              <img
                src={propertyDetails.image}
                alt={propertyDetails.estate_title}
                className="object-cover rounded-md"
              />
            </div>
            <h4 className="text-center mb-8 italic">
              Type: {propertyDetails.segment_name}
            </h4>
            <div className="rounded-md p-8">
              <h2 className="text-3xl font-bold mb-4">
                {propertyDetails.estate_title}
              </h2>
              <p className="text-lg mb-4">
                {propertyDetails.bigger_description}
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold">Status</h3>
                    <p className="text-lg">
                      {capitalizeFirstLetters(propertyDetails.status)}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Price</h3>
                    <p className="text-lg">{propertyDetails.price}</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Area</h3>
                    <p className="text-lg">{propertyDetails.area}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold">Location</h3>
                    <p className="text-lg">{propertyDetails.location}</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Facilities</h3>
                    <ul className="text-lg list-disc list-inside">
                      {propertyDetails.facilities.map((facility, index) => (
                        <li key={index}>{capitalizeFirstLetters(facility)}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <Link
              to={`/order/${propertyDetails.id}`}
              className="w-32 mx-auto block text-center bg-blue-500 hover:bg-blue-600 text-white py-2.5 rounded-md transition duration-300 ease-in-out font-lato font-semibold"
            >
              Order Now
            </Link>
          </div>
        </div>
      ) : (
        <p className="text-center text-xl font-lato italic py-4 font-semibold">
          Property ID Not Found!
        </p>
      )}
    </>
  );
};

export default PropertyDetails;
