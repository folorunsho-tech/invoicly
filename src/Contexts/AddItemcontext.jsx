import React, { createContext, useReducer } from "react";
let itemList = [];
const AddItemcontext = createContext();
function AddItemContextProvider(props) {
  const reducer = (state, action) => {
    switch (action.type) {
      case "ADD_ITEM":
        itemList = [action.payload, ...state];
        return itemList;
      case "DELETE_ITEM":
        itemList = itemList.filter((item) => item.id !== action.payload);
        return itemList;
      case "SET_DEFAULT":
        itemList = [];
        return itemList;
      default:
        return state;
    }
  };
  const [Items, dispatch] = useReducer(reducer, []);
  return (
    <AddItemcontext.Provider value={{ Items, dispatch }}>
      {props.children}
    </AddItemcontext.Provider>
  );
}
export { AddItemcontext };
export default AddItemContextProvider;
