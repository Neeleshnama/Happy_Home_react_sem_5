import React from "react";

import { AiOutlineUser } from "react-icons/ai"; // Example icon, you can change it
import Counter from "./Counter";


const Card = (props) => {

  return (
  
      <div style={{
        backgroundColor: "rgb(239 246 255)",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2) 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
      }} className="rounded-2xl flex flex-col items-center p-5 gap-y-4">

        <Counter number={Number(props.number)} />

        <button style={{ height: "50px", width: "200px", padding: "10px 30px", backgroundColor: "rgb(30 64 175)", color: "white", borderRadius: "4px", border: "none", cursor: "pointer" }}>
          {props.type}
        </button>
      </div>
   

  );
};

export default Card;
