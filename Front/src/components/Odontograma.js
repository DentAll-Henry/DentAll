"use client";
import { useState } from "react";

const initialTeethState = Array(32).fill({ state: "healthy" });
const toothStates = ["healthy", "cavity", "restored", "extracted"];

const Odontograma = () => {
  const [teeth, setTeeth] = useState(initialTeethState);

  const handleClick = (index) => {
    const newTeeth = [...teeth];
    const currentStateIndex = toothStates.indexOf(newTeeth[index].state);
    const nextStateIndex = (currentStateIndex + 1) % toothStates.length;
    newTeeth[index] = {
      ...newTeeth[index],
      state: toothStates[nextStateIndex],
    };
    setTeeth(newTeeth);
  };

  return (
    <div className="grid grid-cols-8 gap-4 p-4">
      {teeth.map((tooth, index) => (
        <div
          key={index}
          className={`w-16 h-16 border-2 ${
            tooth.state === "healthy"
              ? "bg-green-200"
              : tooth.state === "cavity"
              ? "bg-red-200"
              : tooth.state === "restored"
              ? "bg-blue-200"
              : "bg-gray-200"
          } flex items-center justify-center cursor-pointer`}
          onClick={() => handleClick(index)}
        >
          {index + 1}
        </div>
      ))}
    </div>
  );
};

export default Odontograma;
