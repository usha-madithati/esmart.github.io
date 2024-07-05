import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import EditProductModal from "../components/EditProductModal";

const UserD = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const userResponse = await axios.get(
          "https://smartserver-production.up.railway.app/users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const productResponse = await axios.get(
          "https://smartserver-production.up.railway.app/products",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCurrentUser(userResponse.data);
        setProducts(productResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (isLoggedIn) {
      fetchData();
    } else {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

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

  const handleDelete = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `https://smartserver-production.up.railway.app/products/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setProducts(products.filter((product) => product._id !== productId));
        toast.success("Product deleted successfully.");
      } else {
        toast.error("Failed to delete product.");
      }
    } catch (error) {
      toast.error("Error deleting product. Try again.");
    }
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const handleModalClose = () => {
    setIsEditModalOpen(false);
    setSelectedProduct(null);
  };

  const handleUpdate = (updatedProduct) => {
    setProducts(
      products.map((product) =>
        product._id === updatedProduct._id ? updatedProduct : product
      )
    );
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <>
      <Navbar />
      <ToastContainer />
      <EditProductModal
        isOpen={isEditModalOpen}
        onClose={handleModalClose}
        product={selectedProduct}
        onUpdate={handleUpdate}
      />

      <h3 className="flex justify-center font-semibold">Happy Saving!!</h3>
      {currentUser && (
        <div className="flex justify-center font-semibold">
          Welcome, {currentUser.name}!
        </div>
      )}

      <div className="flex h-screen w-full flex-col">
        <header className="flex h-16 shrink-0 items-center justify-between border-b px-4 md:px-6">
          <div className="flex items-center gap-4">
            <Link
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
            to="#"
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
            <span className="sr-only">SmartSaver</span>
          </Link>
        </div>
      </header>
      <div className="flex flex-1">
        <nav className="hidden h-full w-64 shrink-0 border-r px-4 py-6 md:flex md:flex-col">
          <div className="flex flex-col gap-4">
            <Link
              className="flex items-center gap-2 text-lg font-semibold"
              to="#"
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
        <div className="flex flex-1 flex-col">
          <div className="mb-4 px-4 md:px-6">
            <div className="flex items-center justify-between py-6">
              <h1 className="text-3xl font-bold">Products</h1>
              <button
                className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
            <div className="flex items-center justify-between py-6">
              <h2 className="text-xl">Total Products: {products.length}</h2>
            </div>
            <ul className="space-y-4">
              {products.map((product) => (
                <li
                  key={product._id}
                  className="rounded-lg bg-white p-4 shadow"
                >
                  <div className="font-bold">
                    {product.product_name}{" "}
                    <span className="font-semibold text-xs">
                      Mfg Date:{" "}
                      {new Date(product.mfd).toLocaleDateString("en-GB", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}
                    </span>
                    <span className="m-3 font-semibold text-xs">
                      Exp Date:{" "}
                      {new Date(product.expiry_date).toLocaleDateString(
                        "en-GB",
                        {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        }
                      )}
                    </span>
                  </div>
                  <div>{product.product_info}</div>
                  <button
                    className="mt-2 m-2 px-6 py-2 text-sm text-white bg-blue-500 rounded hover:bg-orange-300"
                    onClick={() => handleEditClick(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="mt-2 px-4 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </>
);
};

export default UserD;
