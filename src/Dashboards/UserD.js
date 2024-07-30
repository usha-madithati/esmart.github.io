import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import EditProductModal from "../components/EditProductModal";
import DashboardOverview from "./DashboardOverview";
import "./DashboardOverview.css";

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
          "http://localhost:6352/users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const productResponse = await axios.get(
          "http://localhost:6352/products",
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
        `http://localhost:6352/products/${productId}`,
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

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
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

      <h3 className="flex justify-center font-semibold">Happy Saving!!!</h3>
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
              <Link
                className="flex items-center gap-2 text-lg font-semibold text-gray-500 dark:text-gray-400"
                onClick={handleLogout}
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
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                Logout
              </Link>
            </div>
          </nav>
          <main className="flex-1 overflow-y-auto p-6 md:p-10">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 p-6">
              <div className="bg-background rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold">{currentUser && (
        <div className="flex justify-center font-semibold">
          Welcome, {currentUser.name}!
        </div>
      )}</h2>
                <div className="flex items-center justify-between mb-4">
                
                  <h2 className="text-2xl font-bold">Products</h2>
                  <span className="text-4xl font-bold">{products.length}</span>
                </div>
                <p className="text-muted-foreground">Manage and track your product inventory.</p>
              </div>
              <div className="bg-background rounded-lg shadow-lg p-6 col-span-2 lg:col-span-2">
                <div className="mb-4">
                  <h2 className="text-2xl font-bold">Product Details</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-6">
                  {products.map((product) => (
                    <div key={product._id} className="bg-muted rounded-lg shadow-lg p-4 flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-bold">{product.product_name}</h3>
                        <h5 className="text-sm font-bold">MFG Date: {formatDate(product.mfd)}</h5>
                        <h5 className="text-sm font-bold">EXP Date: {formatDate(product.expiry_date)}</h5>
                        <p className="text-muted-foreground">{product.product_info}</p>
                        <p className="text-muted-foreground">NOTIFICATION SET AS: {product.notificationPeriod}</p>
                        <div className="flex gap-2">
                    <button
                      className="flex-1 bg-blue-500 text-white py-1 rounded-lg"
                      onClick={() => handleEditClick(product)}
                    >
                      Edit
                    </button>
                    <button
                      className="flex-1 bg-red-500 text-white py-1 rounded-lg"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                  </div>
                      </div>
                      <div className="mt-4 flex justify-between items-center">
                        <span className="text-primary font-semibold">{product.price}</span>
                        <div className="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80" data-v0-t="badge">
                          In Stock
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default UserD;
