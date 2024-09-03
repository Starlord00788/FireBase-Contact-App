import React from "react";
import { FiSearch } from "react-icons/fi";


const Search = ({onOpen,filtercontact}) => {
  return (
    <div className="flex justify-center">
      <div className="flex  border items-center h-9 w-9/12  my-3 rounded-lg border-white p-1.5">
        <FiSearch className="text-white " />
        <input onChange={()=> {filtercontact}}
          type="text"
          placeholder="Search Contact"
          className="placeholder-white placeholder:font-light pl-4   pb-0.5 w-11/12 bg-transparent  text-white outline-none"
        />
      </div>

      <div
        onClick={() => (onOpen())}
        className="cursor-pointer bg-white h-12 w-12 my-2 rounded-full p-1 ml-3 flex justify-center items-center"
      >
        <img className="h-5 " src="plus.png" alt="Add" />
      </div>
    </div>
  );
};

export default Search;
