import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const PasswordInput = ({ value, onChange, id, name, required }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleMouseDown = () => {
    setShowPassword(true);
  };

  const handleMouseUp = () => {
    setShowPassword(false);
  };

  return (
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        id={id}
        name={name}
        required={required}
        className="flex h-[38px] px-[15px] py-[11px] items-center gap-[10px] self-stretch border border-gray-300 rounded-[1px] bg-[#BBB] w-full"
        placeholder="********"
      />
      <button
        type="button"
        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-700 bg-transparent border-none cursor-pointer focus:outline-none"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <FontAwesomeIcon icon={faEye} />
      </button>
    </div>
  );
};

export default PasswordInput;
