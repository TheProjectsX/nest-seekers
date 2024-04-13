import { useContext, useEffect, useState } from "react";
import { Link, useLoaderData, useSearchParams } from "react-router-dom";
import UserDataContext from "../context/context";

// React Toast
import { toast } from "react-toastify";

// React Helmet
import { Helmet } from "react-helmet";

const Orders = () => {
  const [propertyId, setPropertyId] = useState("");
  const [name, setName] = useState("");

  const context = useContext(UserDataContext);
  const { userAuthData, ordersData, updateOrderData } = context;
  const propertiesData = useLoaderData();

  const [currentOrders, setCurrentOrders] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => setPropertyId(searchParams.get("id") ?? ""), [searchParams]);
  useEffect(() => setName(userAuthData.displayName ?? ""), [userAuthData]);

  useEffect(() => {
    if (ordersData === null) return;
    if (ordersData.length === 0) {
      setCurrentOrders([]);
      return;
    }

    const orders = propertiesData.filter((item) =>
      ordersData.orders.includes(item.id)
    );

    setCurrentOrders(orders);
  }, [ordersData]);

  //   Handle Order
  const handleOrder = (e) => {
    e.preventDefault();

    const id = e.target.id.value;
    const name = e.target.name.value;
    const card = e.target.card.value;
    const date = e.target.date.value;
    const cvv = e.target.cvv.value;

    const submit = e.target.submit;

    if (!propertiesData.find((item) => item.id === id)) {
      toast.error("Invalid Order ID!");
      submit.classList.add("animate__shakeX");
      setTimeout(() => {
        submit.classList.remove("animate__shakeX");
      }, 3000);
      return;
    }

    if (currentOrders.find((item) => item.id === id)) {
      toast.error("Order Already Placed!!");
      submit.classList.add("animate__shakeX");
      setTimeout(() => {
        submit.classList.remove("animate__shakeX");
      }, 3000);
      return;
    }

    if (/\D/.test(card)) {
      toast.error("Invalid Card Number!");
      submit.classList.add("animate__shakeX");
      setTimeout(() => {
        submit.classList.remove("animate__shakeX");
      }, 3000);
      return;
    }
    if (!/^\d{2}\/\d{2}$/.test(date)) {
      toast.error("Invalid Date. Format: MM/YY");
      submit.classList.add("animate__shakeX");
      setTimeout(() => {
        submit.classList.remove("animate__shakeX");
      }, 3000);
      return;
    }
    if (/\D/.test(cvv)) {
      toast.error("Invalid CVV Number!");
      submit.classList.add("animate__shakeX");
      setTimeout(() => {
        submit.classList.remove("animate__shakeX");
      }, 3000);
      return;
    }

    updateOrderData(id);
    toast.success("Order Placed Successfully!");
    setPropertyId("");
  };

  return (
    <>
      <Helmet>
        <title>Your Orders | Nest Seekers</title>
      </Helmet>
      <section>
        <h3 className="font-bold text-xl sm:text-2xl mb-10 p-3 text-center font-lato bg-blue-700 text-white rounded-lg">
          Your Orders
        </h3>

        <div className="flex flex-col sm:flex-row gap-10">
          {/* New Order Form */}
          <div className="sm:w-[54%] p-5 border border-gray-700 ">
            <h4 className="text-white font-bold font-lato text-center text-lg sm:text-xl mb-8 underline underline-offset-8">
              Place New Order
            </h4>
            <form
              className="space-y-4 md:space-y-6 container"
              onSubmit={handleOrder}
            >
              <label className="block text-sm font-medium text-white">
                Property ID <span className="text-red-600">*</span>
                <input
                  type="text"
                  name="id"
                  className="mt-2 border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="xxx"
                  value={propertyId}
                  onChange={(e) => setPropertyId(e.target.value)}
                  required
                />
              </label>

              <label className="block text-sm font-medium text-white">
                Checkout Name <span className="text-red-600">*</span>
                <input
                  type="text"
                  name="name"
                  className="mt-2 border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Mr X"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </label>

              <label className="block text-sm font-medium text-white">
                Credit Card Number <span className="text-red-600">*</span>
                <input
                  type="text"
                  name="card"
                  minLength={16}
                  maxLength={16}
                  className="mt-2 border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="xxxxxxxxxxxxxxxx"
                  required
                />
              </label>

              <div className="flex gap-4 flex-wrap justify-between !mb-4">
                <label className="block text-sm font-medium text-white flex-grow">
                  Expiration Date <span className="text-red-600">*</span>
                  <input
                    type="text"
                    name="date"
                    className="mt-2 border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="mm/yy"
                    required
                  />
                </label>
                <label className="block text-sm font-medium text-white flex-grow">
                  CVV <span className="text-red-600">*</span>
                  <input
                    type="text"
                    name="cvv"
                    minLength={3}
                    className="mt-2 border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="xxx"
                    required
                  />
                </label>
              </div>

              <button
                type="submit"
                name="submit"
                className="w-full text-white bg-[#2563eb] hover:bg-[#1d4ed8] focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg text-sm px-5 py-2.5 text-center animate__animated font-semibold"
              >
                Confirm Order
              </button>
            </form>
          </div>

          {/* Past Orders */}
          <div className="flex-grow border border-gray-700 p-5">
            <h4 className="text-white font-bold font-lato text-center text-lg sm:text-xl mb-8 underline underline-offset-8">
              Your Order History
            </h4>

            <div>
              {currentOrders === null ? (
                <div className="flex justify-center p-5">
                  <span className="loading loading-spinner loading-lg"></span>
                </div>
              ) : currentOrders.length === 0 ? (
                <p className="text-center italic font-semibold">
                  No Items To Show
                </p>
              ) : (
                <table className="min-w-full divide-y divide-gray-200 border border-gray-600">
                  <thead className="bg-gray-700">
                    <tr className="divide-x text-center font-lato font-bold text-xs uppercase *:px-6 *:py-3 *:tracking-wider">
                      <th scope="col">SL</th>
                      <th scope="col">Order ID</th>
                      <th scope="col">Price</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody className=" divide-y divide-gray-200 text-sm">
                    {currentOrders.map((item, idx) => (
                      <tr
                        key={idx}
                        className="divide-x *:text-center *:p-3 even:bg-[#1c253b]"
                      >
                        <td>{idx + 1}</td>
                        <td>{item.id}</td>
                        <td>{item.price}</td>
                        <td>
                          <Link
                            to={`/property-details/${item.id}`}
                            className="btn-link"
                          >
                            View Details
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Orders;
