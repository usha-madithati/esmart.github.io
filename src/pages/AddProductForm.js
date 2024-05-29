import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AddProductForm = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      toast.info("Add your products here");
      navigate("/user/add-products");
    } catch (error) {
      console.log(error);
      toast.error("Error ocurred");
    }
  };

  return (
    <>
      <ToastContainer></ToastContainer>
      <button
        onClick={handleSubmit}
        class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white"
      >
        <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          Add your product
        </span>
      </button>
    </>
  );
};

export default AddProductForm;
