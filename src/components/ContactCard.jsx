import React from 'react'
import { HiOutlineUserCircle } from "react-icons/hi";
import { RiEditCircleLine } from "react-icons/ri";
import { IoMdTrash } from "react-icons/io";
const ContactCard = (contact) => {
  return (
    <div>
      <div
              className="flex justify-evenly  h-14 rounded-lg bg-yellow mx-4  items-center p-2"
              
            >
              <HiOutlineUserCircle className=" text-orange
              text-4xl  stroke-[1] mr-1" />
              <div className="cursor-default ">
                <h2 className=" text-sm font-medium">{contact.name}</h2>
                <p className=" text-xs ">{contact.email}</p>
              </div>
              <div className="flex ml-11 ">
                {" "}
                <RiEditCircleLine className="cursor-pointer text-2xl  " />
                <IoMdTrash className="text-purple cursor-pointer text-2xl  ml-2" />
              </div>
            </div>
    </div>
  )
}

export default ContactCard
