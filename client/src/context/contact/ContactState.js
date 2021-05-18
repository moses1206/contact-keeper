import React, { useReducer } from "react";
import uuid from "uuid";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import {
  ADD_CONTACT,
  UPDATE_CONTACT,
  DELETE_CONTACT,
  FILTER_CONTACTS,
  SET_CURRENT_CONTACT,
  CLEAR_CURRENT_CONTACT,
  SET_ALERT,
  REMOVE_ALERT,
  CLEAR_FILTER,
} from "../types";

const ContactState = (props) => {
  const initialState = {
    contacts: [
      {
        id: 1,
        username: "Jill Johnson",
        email: "jill@gmail.com",
        phone: "111-111-1111",
        type: "personal",
      },
      {
        id: 2,
        username: "Sara Watson",
        email: "sara@gmail.com",
        phone: "222-222-2222",
        type: "personal",
      },
      {
        id: 3,
        username: "Harry White",
        email: "harry@gmail.com",
        phone: "333-333-333",
        type: "professional",
      },
    ],
    current: null,
    filtered: null,
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Add Contact
  const addContact = (contact) => {
    contact.id = uuid.v4();
    dispatch({ type: ADD_CONTACT, payload: contact });
  };

  // Delete Contact
  const deleteContact = (id) => {
    dispatch({ type: DELETE_CONTACT, payload: id });
  };

  // Set Current Contact
  const setCurrentContact = (contact) => {
    dispatch({ type: SET_CURRENT_CONTACT, payload: contact });
  };

  // Clear Current Contact
  const clearCurrentContact = () => {
    dispatch({ type: CLEAR_CURRENT_CONTACT });
  };
  // Update Contact
  const updateContact = (contact) => {
    dispatch({ type: UPDATE_CONTACT, payload: contact });
  };

  // Filter Contacts
  const filterContacts = (text) => {
    dispatch({ type: FILTER_CONTACTS, payload: text });
  };

  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        addContact,
        deleteContact,
        setCurrentContact,
        clearCurrentContact,
        updateContact,
        filterContacts,
        clearFilter,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
