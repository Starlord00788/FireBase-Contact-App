import { addDoc, collection } from "firebase/firestore";
import React from "react";
import { createPortal } from "react-dom";
import { AiOutlineClose } from "react-icons/ai";
import { db } from "../config/firebase";


const Modal = ({ isOpen, onClose, children }) => {


  
  return createPortal(

  <> if({isOpen})
  return  <div  className=" grid place-items-center absolute top-0 z-40 backdrop-blur h-screen w-screen "><div className=" relative z-50  bg-white min-h-[200px] min-w-[80%] mx-auto p-4">
    
    <div className="flex justify-end">
    <AiOutlineClose onClick={() => (onClose())} className="text-2xl p-1 hover:bg-red-600 hover:text-white cursor-pointer" />

    </div>
    {children}
    
    </div>

    </div></>
 
   ,document.getElementById("modal-root") );
};

export default Modal;
 