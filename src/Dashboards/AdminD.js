import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";
import Navbar from "../components/Navbar";
import "tailwindcss/tailwind.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

const AdminD = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    try {
      let confirmation = window.confirm("Are you sure you want to logout?");
      if (confirmation) {
        setTimeout(() => {
          localStorage.setItem("isLoggedIn", false);
          navigate("/");
        }, 1000);
        toast.success("Logout Successfully.");
      }
    } catch (error) {
      toast.error("Error doing logout. Try again.");
    }
  };

  const handleSetting = () => {
    navigate("/user/settings");
  };

  const handleAnnounce = () => {
    navigate("/admin/announcement");
  };

  const handleManageDatabase = () => {
    window.open(
      "mongodb+srv://usha15322:SmartSaver%402024@cluster0.nd5jrmm.mongodb.net/",
      "_blank"
    );
  };

  const [barData, setBarData] = useState({
    labels: [],
    datasets: [
      {
        label: "Sales",
        data: [],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  });

  const [lineData, setLineData] = useState({
    labels: [],
    datasets: [
      {
        label: "Revenue",
        data: [],
        fill: false,
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgba(153, 102, 255, 1)",
      },
    ],
  });

  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:6352/getallproducts"
        );
        const data = response.data;
        setBarData({
          labels: data.labels,
          datasets: [
            {
              label: "Sales",
              data: data.values,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    };

    const fetchRevenueData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:6352/getallusers"
        );
        const data = response.data;
        setLineData({
          labels: data.labels,
          datasets: [
            {
              label: "Revenue",
              data: data.values,
              fill: false,
              backgroundColor: "rgba(153, 182, 455, 0.2)",
              borderColor: "rgba(153, 102, 255, 1)",
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching revenue data:", error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:6352/getallusers"
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:6352/getallproducts"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get(
          "http://localhost:6352/announcements"
        );
        setAnnouncements(response.data);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };

    fetchSalesData();
    fetchRevenueData();
    fetchUsers();
    fetchProducts();
    fetchAnnouncements();
  }, []);

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-center mb-8">Admin Dashboard</h1>
        <div className="bg-white shadow-md rounded-lg p-4 mb-8">
          <h2 className="text-xl text-gray-800 bg-yellow-400 font-semibold mb-4">
            Announcements
          </h2>
          <ul>
            {announcements.map((announcement) => (
              <li key={announcement.id} className="py-2 border-b">
                <strong>{announcement.title}</strong>: {announcement.message}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4 mb-8">
          <h2 className="text-xl bg-green-500 font-semibold mb-4">Users</h2>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Phone</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="py-2 px-4 border-b">{user.name}</td>
                  <td className="py-2 px-4 border-b">{user.email}</td>
                  <td className="py-2 px-4 border-b">{user.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl bg-slate-500 font-semibold mb-4">Products</h2>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Product Name</th>
                <th className="py-2 px-4 border-b">Barcode</th>
                <th className="py-2 px-4 border-b">MFD</th>
                <th className="py-2 px-4 border-b">Expiry Date</th>
                <th className="py-2 px-4 border-b">Product Info</th>
                <th className="py-2 px-4 border-b">Notification Period</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td className="py-2 m-2 px-4 border-b">
                    {product.product_name}
                  </td>
                  <td className="py-2 px-4 border-b">{product.barcode}</td>
                  <td className="py-2 px-4 border-b">
                    {new Date(product.mfd).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {new Date(product.expiry_date).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border-b">{product.product_info}</td>
                  <td className="py-2 px-4 border-b">{`${product.notificationPeriod} days`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-3 py-2 border-b shadow-md rounded-lg">
          <h3>Create Announcements</h3>
          <button
            className="rounded-lg bg-blue-500 px-4 m-2 justify-center align-item-center py-2 text-white hover:bg-green-600"
            onClick={handleAnnounce}
          >
            Announncements
          </button>
        </div>
        <div className=" py-4 m-3 shadow-md rounded-lg">
          <h3>Manage Database</h3>
          <button
            className="rounded-lg bg-blue-500 px-4 m-2 justify-center align-item-center py-2 text-white hover:bg-blue-600"
            onClick={handleManageDatabase}
          >
            Open MongoDB Atlas
          </button>
        </div>
        <div className="px-3 py-4 m-3 shadow-md rounded-lg">
          <h3>Other Settings</h3>
          <button
            className="rounded-lg bg-black px-4 m-2 justify-center align-item-center py-2 text-white hover:bg-blue-600"
            onClick={handleSetting}
          >
            Settings
          </button>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default AdminD;
