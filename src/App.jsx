import React, { useEffect } from "react";
import { useState } from "react";
import { IoMdTrash } from "react-icons/io";
import Navigation from "./components/Navigation";

import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import Notfound from "./components/notfound";
import { db } from "./config/firebase";
import { HiOutlineUserCircle } from "react-icons/hi";
import { RiEditCircleLine } from "react-icons/ri";
import Modal from "./components/Modal";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toaster, toast } from "react-hot-toast";
import { FiSearch } from "react-icons/fi";

const App = () => {
  const [contacts, setcontacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [editContact, setEditContact] = useState(null);
  const [isOpen, setOpen] = useState(false);

  const filtercontact = (value) => {
    const filteredContacts = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredContacts(filteredContacts);
  };

  const deletecontact = async (id) => {
    try {
      const contactDoc = doc(db, "contacts", id);
      await deleteDoc(contactDoc);
      const contactList = (await getDocs(collection(db, "contacts"))).docs.map(
        (doc) => ({
          id: doc.id,
          ...doc.data(),
        })
      );
      setcontacts(contactList);
      setFilteredContacts(contactList);
      toast.success("Contact Deleted Successfully 🔥");
    } catch (error) {
      console.log(error);
    }
  };

  const updateContact = async (id, updatedContact) => {
    try {
      const contactDoc = doc(db, "contacts", id);
      await updateDoc(contactDoc, updatedContact);
      const contactList = (await getDocs(collection(db, "contacts"))).docs.map(
        (doc) => ({
          id: doc.id,
          ...doc.data(),
        })
      );
      setcontacts(contactList);
      setFilteredContacts(contactList);
      toast.success("Contact Updated Successfully 👌");
    } catch (error) {
      console.error(error);
    }
  };

  const addcontact = async (contact) => {
    try {
      const contactRef = collection(db, "contacts");
      await addDoc(contactRef, contact);
      const contactList = (await getDocs(contactRef)).docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setcontacts(contactList);
      setFilteredContacts(contactList);
      toast.success("Contact Added Successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const onOpen = (contact = null) => {
    setEditContact(contact);
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const getcontacts = async () => {
      try {
        const contactRef = await getDocs(collection(db, "contacts"));
        const contactList = contactRef.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });

        setcontacts(contactList);
        setFilteredContacts(contactList);
      } catch (error) {
        console.error(error);
      }
    };

    getcontacts();
  }, []);

  return (
    <>
      <div className="mx-auto max-w-[370px]">
        <Navigation />
        <div className="flex justify-center">
          <div className="flex border items-center h-9 w-9/12 my-3 rounded-lg border-white p-1.5">
            <FiSearch className="text-white " />
            <input
              type="text"
              placeholder="Search Contact"
              className="placeholder-white placeholder:font-light pl-4 pb-0.5 w-11/12 bg-transparent text-white outline-none"
              onChange={(e) => filtercontact(e.target.value)}
            />
          </div>

          <div
            onClick={() => onOpen()}
            className="cursor-pointer bg-white h-12 w-12 my-2 rounded-full p-1 ml-3 flex justify-center items-center"
          >
            <img className="h-5 " src="plus.png" alt="Add" />
          </div>
        </div>
      </div>
      <div className="flex-col max-w-[370px] mx-auto ">
        {filteredContacts.length <= 0 ? (
          <Notfound />
        ) : (
          filteredContacts.map((contact) => (
            <div
              className="mb-2 gap-2 flex justify-between items-center h-14 rounded-lg bg-yellow mx-4 p-2"
              key={contact.id}
            >
              <div className="flex items-center">
                <HiOutlineUserCircle className="text-orange text-4xl stroke-[1] mr-4" />

                <div className="flex flex-col">
                  <h2 className="text-sm font-medium">{contact.name}</h2>
                  <p className="text-xs">{contact.email}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <RiEditCircleLine
                  onClick={() => onOpen(contact)}
                  className="cursor-pointer text-2xl"
                />
                <IoMdTrash
                  onClick={() => deletecontact(contact.id)}
                  className="text-purple cursor-pointer text-2xl"
                />
              </div>
            </div>
          ))
        )}
      </div>

      {isOpen && (
        <Modal isOpen={onOpen} onClose={onClose}>
          <Formik
            initialValues={{
              name: editContact ? editContact.name : "",
              email: editContact ? editContact.email : "",
            }}
            enableReinitialize={true}
            onSubmit={(values) => {
              if (editContact) {
              
                updateContact(editContact.id, values);
              } else {
               
                addcontact(values);
              }
              onClose();
            }}
          >
            <Form className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="name">Name</label>
                <Field name="name" className="border h-10" />
              </div>

              <div className="flex flex-col gap-1"></div>
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" className="border h-10" />

              <button
                type="submit"
                className="border bg-dark-yellow rounded-md px-2 py-1.5 self-end"
              >
                {editContact ? "Update Contact" : "Add Contact"}
              </button>
            </Form>
          </Formik>
        </Modal>
      )}

      <Toaster position="bottom-center" />
    </>
  );
};

export default App;
