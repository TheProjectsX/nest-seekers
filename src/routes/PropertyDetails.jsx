import { useEffect, useState } from "react";
import { useParams, useLoaderData } from "react-router-dom";

const PropertyDetails = () => {
  //   const [propertyData, setPropertyData] = useState(null);

  //   const params = useParams();
  //   const { id } = params;
  //   const propertiesData = useLoaderData();

  //   useEffect(() => {
  //     const currentProperty = propertiesData.find((item) => item.id === id);
  //     setPropertyData(currentProperty ? currentProperty : "");
  //   }, [propertiesData]);

  //   if (propertyData == null) {
  //     return <></>;
  //   }

  // Capitalize the First Latters of each Words
  function capitalizeFirstLetters(str) {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  const propertyData = {
    image:
      "https://i.ibb.co/n3FzkW4/digital-marketing-agency-ntwrk-g39p1k-Djv-SY-unsplash-1.jpg",
    estate_title: "Family-Friendly Home",
    id: "009",
    segment_name: "Single-family homes",
    description:
      "Warm and inviting family home featuring a spacious backyard and children's play area.",
    bigger_description:
      "Welcome to your new family home! This warm and inviting property offers plenty of space for your growing family. The open-concept layout, large windows, and neutral color palette create a bright and airy atmosphere throughout the home. Outside, the spacious backyard provides the perfect setting for outdoor play and family gatherings. With its convenient location in a family-friendly neighborhood, this home is sure to be a hit with you and your loved ones.",
    price: "$400,000",
    status: "sale",
    area: "2000 sq ft",
    location: "Residential neighborhood",
    facilities: ["living room", "backyard", "play area"],
  };

  return (
    <>
      <h3 className="font-bold text-2xl mb-10 p-3 text-center font-lato bg-gray-600 rounded-lg">
        Property Details
      </h3>
      {propertyData !== "" ? (
        <div>
          <div className="flex flex-col items-center gap-5 mb-5">
            <img src={propertyData["image"]} alt="Property Image" />
            <h3 className="text-3xl font-bold font-lato">
              {propertyData["estate_title"]}
            </h3>
          </div>

          <div className="flex flex-col gap-5 justify-between lg:flex-row">
            <div className="p-6 border lg:w-[55%]">
              <b className="text-xl">Description: </b>
              {propertyData["bigger_description"]}
            </div>

            <div className="border flex-grow py-4 px-6">
              <h4 className="text-2xl font-bold font-lato text-center underline underline-offset-4 mb-3">
                Details:
              </h4>
              <table className="text-left w-full mb-2">
                <tr>
                  <th>Status:</th>
                  <td>{capitalizeFirstLetters(propertyData["status"])}</td>
                </tr>
                <tr>
                  <th>Price:</th>
                  <td>{propertyData["price"]}</td>
                </tr>
                <tr>
                  <th>Area:</th>
                  <td>{propertyData["area"]}</td>
                </tr>
                <tr>
                  <th>Location:</th>
                  <td>{propertyData["location"]}</td>
                </tr>
                <tr>
                  <th>Facilities:</th>
                  <td>
                    {propertyData["facilities"]
                      .map((item) => capitalizeFirstLetters(item))
                      .join(", ")}
                  </td>
                </tr>
              </table>
              <p className="font-lato italic">{propertyData["segment_name"]}</p>
            </div>
          </div>
        </div>
      ) : (
        <p>Not Found</p>
      )}
    </>
  );
};

export default PropertyDetails;
