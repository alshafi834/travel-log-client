import React, { useState } from "react";

const Instruction = () => {
  const [openInstruction, setOpenInstruction] = useState(false);
  return (
    <div
      className="instruction"
      onClick={() => {
        const toogleInfo = !openInstruction;
        setOpenInstruction(toogleInfo);
      }}
    >
      <i class="fas fa-2x fa-info-circle"></i>
      {openInstruction ? (
        <div className="infos">
          <ul>
            <li>Double click on map to add a travel log</li>
            <li>Click on the pins to watch infos</li>
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default Instruction;
