import React from "react";
import { useNavigate } from "react-router-dom";

function RedirectButton({ responseId }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/response", { state: { id: responseId } });
  };
  return (
    <div>
      <h2 className=" block text-gray-700 font-bold mb-6">
        El formulario ha sido enviado!
      </h2>
      <button
        onClick={handleClick}
        className="w-full mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Ver resultados
      </button>
    </div>
  );
}

export default RedirectButton;
