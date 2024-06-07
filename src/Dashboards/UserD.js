import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const UserD = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userResponse, productResponse] = await Promise.all([
          axios.get("https://smartserver-production.up.railway.app/users"),
          axios.get("https://smartserver-production.up.railway.app/products"),
        ]);
        setUsers(userResponse.data);
        setProducts(productResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchCurrentUser = () => {
      const user = JSON.parse(localStorage.getItem("currentUser"));
      setCurrentUser(user);
    };

    fetchData();
    fetchCurrentUser();
  }, []);

  const handleLogout = () => {
    try {
      let confirmation = window.confirm("Are you sure want to logout?");
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

  return (
    <>
      <Navbar />
      <ToastContainer />

      <h3 className="flex justify-center font-semibold">Happy Saving!!</h3>
      {currentUser && (
        <div className="flex justify-center font-semibold">Welcome!</div>
      )}

      <div className="flex h-screen w-full flex-col">
        <header className="flex h-16 shrink-0 items-center justify-between border-b px-4 md:px-6">
          <div className="flex items-center gap-4">
            <Link
              className="flex items-center gap-2 text-lg font-semibold md:text-base"
              href="#"
              rel="ugc"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="m8 3 4 8 5-5 5 15H2L8 3z"></path>
              </svg>
              <span className="sr-only">Acme Inc</span>
            </Link>
          </div>
        </header>
        <div className="flex flex-1">
          <nav className="hidden h-full w-64 shrink-0 border-r px-4 py-6 md:flex md:flex-col">
            <div className="flex flex-col gap-4">
              <Link
                className="flex items-center gap-2 text-lg font-semibold"
                href="#"
                rel="ugc"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <rect width="7" height="9" x="3" y="3" rx="1"></rect>
                  <rect width="7" height="5" x="14" y="3" rx="1"></rect>
                  <rect width="7" height="9" x="14" y="12" rx="1"></rect>
                  <rect width="7" height="5" x="3" y="16" rx="1"></rect>
                </svg>
                Dashboard
              </Link>
              <Link
                className="flex items-center gap-2 text-lg font-semibold text-gray-500 dark:text-gray-400"
                to="/user/add-products"
                rel="ugc"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 16v-4"></path>
                  <path d="M12 8h.01"></path>
                </svg>
                Add Products
              </Link>
              <Link
                className="flex items-center gap-2 text-lg font-semibold text-gray-500 dark:text-gray-400"
                to="/user/settings"
                rel="ugc"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                Settings
              </Link>
            </div>
          </nav>
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div
                className="rounded-lg border bg-card text-card-foreground shadow-sm"
                data-v0-t="card"
              >
                <div className="space-y-1.5 p-6 flex flex-row items-center justify-between pb-2">
                  <h3 className="whitespace-nowrap tracking-tight text-sm font-medium">
                    Total Products
                  </h3>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="M20 21l-4-4H8l-4 4"></path>
                    <path d="M12 17V8"></path>
                    <path d="M18 14V4"></path>
                    <path d="M6 14V10"></path>
                  </svg>
                </div>
                <div className="p-6 pt-0 flex items-center">
                  <div className="text-2xl font-bold">{products.length}</div>
                </div>
              </div>
              <div
                className="rounded-lg border bg-card text-card-foreground shadow-sm"
                data-v0-t="card"
              >
                <div className="space-y-1.5 p-6 flex flex-row items-center justify-between pb-2">
                  <h3 className="whitespace-nowrap tracking-tight text-sm font-medium">
                    Users
                  </h3>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </div>
                <div className="p-6 pt-0 flex items-center">
                  <div className="text-2xl font-bold">{users.length}</div>
                </div>
              </div>
            </div>
            <div
              className="rounded-lg border bg-card text-card-foreground shadow-sm"
              data-v0-t="card"
            >
              <div className="space-y-1.5 p-6 flex flex-row items-center justify-between pb-2">
                <h3 className="tracking-tight text-sm font-medium">
                  User List
                </h3>
              </div>
              <div className="p-6 pt-0">
                <ul>
                  {users.map((user) => (
                    <li key={user._id} className="mb-2">
                      <div className="flex justify-between">
                        <span>{user.name}</span>
                        <span>{user.email}</span>
                        <span>{user.phone}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div
              className="rounded-lg border bg-card text-card-foreground shadow-sm"
              data-v0-t="card"
            >
              <div className="space-y-1.5 p-6 flex flex-row items-center justify-between pb-2">
                <h3 className="tracking-tight text-sm font-medium">
                  Product List
                </h3>
              </div>
              <div className="p-6 pt-0">
                <ul>
                  {products.map((product) => (
                    <li key={product._id} className="mb-2">
                      <div className="flex justify-between">
                        <span>{product.product_name}</span>
                        <span>{product.barcode}</span>
                        <span>{product.mfd}</span>
                        <span>{product.expiry_date}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default UserD;
