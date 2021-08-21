import React, { useContext, useRef } from "react";
import { MdDelete } from "react-icons/md";
import styles from "../theme/inputs.module.css";

import { AddItemcontext } from "../Contexts/AddItemcontext";
import { Button, Input } from "@chakra-ui/react";
const ItemLists = () => {
  const { dispatch, Items } = useContext(AddItemcontext);
  const itemName = useRef();
  const itemPrice = useRef();
  const itemQuantity = useRef();
  function ItemList() {
    return (
      <>
        <div className={styles.ItemList}>
          <div
            style={{
              marginTop: "-2rem",
              display: "flex",
              gap: "1rem",
            }}
          >
            <div>
              <Input
                type="number"
                name="quantity"
                ref={itemQuantity}
                _hover={{ border: "1px solid #252945" }}
              />
            </div>
            <div>
              <Input
                type="number"
                name="Price"
                ref={itemPrice}
                _hover={{ border: "1px solid #252945" }}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <div className={styles.ItemLists}>
      <label style={{ fontSize: "1.5rem", padding: ".5rem 0" }}>
        Item List
      </label>
      <div>
        <label style={{ color: "white" }}>Item Name</label>
        <Input
          type="text"
          name="Item Name"
          ref={itemName}
          _hover={{ border: "1px solid #252945" }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <label style={{ color: "white" }}>Qty.</label>
        <label style={{ color: "white", paddingLeft: ".8rem" }}>Price</label>
      </div>
      <div>
        <ItemList />
        <Button
          style={{
            width: "100%",
            textAlign: "center",
            justifyContent: "center",
            background: "#252945",
            borderRadius: "4rem",
          }}
          _hover={{
            cursor: "pointer",
            color: "#252945",
            background: "#dfe3fa !important",
          }}
          onClick={() => {
            if (
              (itemName.current.value &&
                itemQuantity.current.value &&
                itemPrice.current.value) !== ""
            ) {
              dispatch({
                type: "ADD_ITEM",
                payload: {
                  name: itemName.current.value,
                  quantity: itemQuantity.current.value,
                  price: itemPrice.current.value,
                  total: itemQuantity.current.value * itemPrice.current.value,
                },
              });
            }
          }}
        >
          + Add New Item
        </Button>
      </div>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "1rem",
          }}
        >
          <label style={{ color: "white" }}>Name</label>
          <label style={{ color: "white" }}>Qty.</label>
          <label style={{ color: "white" }}>Price</label>
          <label style={{ color: "white" }}>Total</label>
          <label style={{ color: "white" }}></label>
        </div>
        {Items.map((item) => (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              textAlign: "center",
              marginTop: "1rem",
            }}
          >
            <p>{item.name}</p>
            <p>{item.quantity}</p>
            <p>{item.price}</p>
            <p>{item.total}</p>
            <button>
              <MdDelete
                style={{ fontSize: "1.2rem", marginLeft: "-2rem" }}
                onClick={() => {
                  dispatch({ type: "DELETE_ITEM", payload: item.id });
                }}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ItemLists;
