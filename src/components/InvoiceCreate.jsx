import React, { useContext } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Input,
  InputRightAddon,
  InputGroup,
} from "@chakra-ui/react";
import { BsFillCalendarFill } from "react-icons/bs";
import Btn from "./Button";
import styles from "../theme/inputs.module.css";
import btnStyles from "../theme/button.module.css";
import { InvoiceContext } from "../Contexts/InvoiceContext";
import { useForm } from "react-hook-form";
import uid from "../utils/uid";
import ItemLists from "./ItemLists";
import { AddItemcontext } from "../Contexts/AddItemcontext";
function InvoiceCreate({ isOpen, onClose }) {
  const { dispatch } = useContext(InvoiceContext);
  // const { dispatch: itemDispatch } = useContext(AddItemcontext);
  const { Items } = useContext(AddItemcontext);

  const { register, handleSubmit, reset } = useForm();

  // {
  //   clientName,
  //     clientAddress,
  //     clientCity,
  //     clientCountry,
  //     clientEmail,
  //     clientStreetAddress,
  //     clientPostalCode,
  //     senderAddress,
  //     senderCity,
  //     senderCountry,
  //     senderPostalCode,
  //     senderStreetAddress,
  //     senderCity,
  //     invoiceDate;
  //   projectDescription
  // }
  const Billto = () => {
    return (
      <div className={styles.form}>
        <p style={{ color: "#7C5DFA", fontWeight: "bold", margin: "1rem 0" }}>
          Bill To
        </p>
        <div className={styles.drawerFormControl}>
          <label>Client’s Name</label>
          <Input
            defaultValue=""
            type="text"
            name="Client’s Name"
            {...register("clientName")}
            required
            _hover={{ border: "1px solid #252945" }}
          />
        </div>
        <div className={styles.drawerFormControl}>
          <label>Client’s Email</label>
          <Input
            defaultValue=""
            type="text"
            name="email"
            {...register("clientEmail")}
            required
            _hover={{ border: "1px solid #252945" }}
          />
        </div>
        <div>
          <label>Street Address</label>
          <Input
            defaultValue=""
            type="text"
            name="Street Address"
            {...register("clientStreetAddress")}
            required
            _hover={{ border: "1px solid #252945" }}
          />
        </div>
        <div className={styles.address}>
          <div className={styles.home}>
            <div>
              <label>City</label>
              <Input
                defaultValue=""
                type="text"
                name="city"
                {...register("clientCity")}
                required
                _hover={{ border: "1px solid #252945" }}
              />
            </div>
            <div>
              <label>Postal Code</label>
              <Input
                defaultValue=""
                type="text"
                name="Postal Code"
                {...register("clientPostalCode")}
                required
                _hover={{ border: "1px solid #252945" }}
              />
            </div>
          </div>
          <div className={styles.country}>
            <label>Country</label>
            <Input
              defaultValue=""
              type="text"
              name="Country"
              {...register("clientCountry")}
              required
              _hover={{ border: "1px solid #252945" }}
            />
          </div>
        </div>
      </div>
    );
  };
  const Billfrom = () => {
    return (
      <div className={styles.form}>
        <p style={{ color: "#7C5DFA", fontWeight: "bold", margin: "1rem 0" }}>
          Bill From
        </p>
        <div>
          <label>Street Address</label>
          <Input
            type="text"
            name="Street Address"
            {...register("senderStreetAddress")}
            required
            _hover={{ border: "1px solid #252945" }}
          />
        </div>
        <div className={styles.address}>
          <div className={styles.home}>
            <div>
              <label>City</label>
              <Input
                type="text"
                name="city"
                {...register("senderCity")}
                required
                _hover={{ border: "1px solid #252945" }}
              />
            </div>
            <div className={styles.postal}>
              <label>Postal Code</label>
              <Input
                type="text"
                name="Postal Code"
                {...register("senderPostalCode")}
                required
                _hover={{ border: "1px solid #252945" }}
              />
            </div>
          </div>
          <div className={styles.country}>
            <label>Country</label>
            <Input
              type="text"
              name="Country"
              {...register("senderCountry")}
              required
              _hover={{ border: "1px solid #252945" }}
            />
          </div>
        </div>
      </div>
    );
  };
  const Meta = () => {
    return (
      <div className={styles.meta}>
        <div>
          <label>Invoice Dates</label>
          <InputGroup>
            <Input
              type="date"
              name="Invoice Date"
              {...register("invoiceDate")}
              required
              _hover={{ border: "1px solid #252945" }}
            />
            <InputRightAddon
              children={<BsFillCalendarFill color=" #7E88C3" />}
              style={{
                background: "#1E2139",
                border: "#252945",
                margin: "auto",
                marginTop: ".3rem",
              }}
            />
          </InputGroup>
        </div>
        <div>
          <label>Payment Terms</label>
          <InputGroup>
            <select
              type="select"
              name="Payment Terms"
              {...register("paymentTerms")}
              required
              _hover={{ border: "1px solid #252945" }}
              style={{
                width: "100%",
                padding: "1rem",
                color: "inherit",
                height: "max-content",
                marginTop: ".5rem",
                background: "#1E2139",
              }}
            >
              <option value="1">Net 1 Day</option>
              <option value="7">Net 7 Days</option>
              <option value="14">Net 14 Days</option>
              <option value="30">Net 30 Days</option>
            </select>
          </InputGroup>
        </div>
        <div>
          <label>Project Description</label>
          <InputGroup>
            <Input
              type="text"
              name="Project Description"
              {...register("projectDescription")}
              required
              _hover={{ border: "1px solid #252945" }}
            />
          </InputGroup>
        </div>
      </div>
    );
  };

  const onSubmit = (data) => {
    const date = new Date();
    const currDate = {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    };
    const formData = {
      id: uid(),
      createdAt: `${currDate.year}-${currDate.month}-${currDate.day}`,
      paymentDue: data.invoiceDate,
      description: data.projectDescription,
      paymentTerms: data.paymentTerms,
      clientName: data.clientName,
      clientEmail: data.clientEmail,
      status: "pending",
      inDraft: false,
      senderAddress: {
        street: data.senderStreetAddress,
        city: data.senderCity,
        postCode: data.senderPostalCode,
        country: data.senderCountry,
      },
      clientAddress: {
        street: data.clientStreetAddress,
        city: data.clientCity,
        postCode: data.clientPostalCode,
        country: data.clientCountry,
      },
      items: [...Items],
      total: "",
    };
    console.log(formData);
    const newFormdata = {
      ...formData,
      total: formData.items.reduce((acc, currVal) => {
        return acc.total + currVal.total;
      }),
    };

    dispatch({ type: "ADD_INVOICE", payload: newFormdata });
  };
  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="left" size="sm">
      <DrawerOverlay />
      <DrawerContent className={styles.drawer}>
        <DrawerCloseButton />
        <DrawerHeader>New Invoice</DrawerHeader>
        <DrawerBody>
          <form onSubmit={handleSubmit(onSubmit)} id="invoice-form">
            <Billfrom />
            <Billto />
            <Meta />
            <ItemLists />
          </form>
        </DrawerBody>
        <DrawerFooter flex justifyContent="flex-end" w="100%">
          <Btn
            variant={btnStyles.edit}
            content="Cancel"
            style={{ marginRight: "1rem" }}
            handleClick={() => {
              onClose();
            }}
          />
          <Button
            type="submit"
            form="invoice-form"
            style={{
              backgroundColor: "#7c5dfa",
              padding: "0.5rem 1rem !important",
              borderRadius: "2rem",
            }}
            onSubmit={() => {
              onClose();
              reset(
                {
                  clientName: "",
                  clientAddress: "",
                  clientCity: "",
                  clientCountry: "",
                  clientEmail: "",
                  clientStreetAddress: "",
                  clientPostalCode: "",
                  senderAddress: "",
                  senderCity: "",
                  senderCountry: "",
                  senderPostalCode: "",
                  senderStreetAddress: "",
                  invoiceDate: "",
                  projectDescription: "",
                },
                {
                  keepErrors: true,
                  keepDirty: true,
                  keepIsSubmitted: false,
                  keepTouched: false,
                  keepIsValid: false,
                  keepSubmitCount: false,
                }
              );
            }}
          >
            Save Changes
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default InvoiceCreate;
