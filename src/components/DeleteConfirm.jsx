import React, { useContext } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { InvoiceContext } from "../Contexts/InvoiceContext";
// import Button from "./Button";
const DeleteConfirm = ({ isOpen, id, onClose }) => {
  const { dispatch } = useContext(InvoiceContext);
  const history = useHistory();

  return (
    <>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent style={{ color: "white", backgroundColor: "#1E2139" }}>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>
              Are you sure you want to delete invoice #{id}? This action cannot
              be undone.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={onClose}
              colorScheme="blue"
              style={{
                backgroundColor: "#252945",
                padding: "0.5rem 1rem !important",
                borderRadius: "2rem",
                marginRight: "1rem",
              }}
            >
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              onClick={() => {
                dispatch({ type: "DELETE_INVOICE", payload: id });
                history.push("/");
              }}
              style={{
                backgroundColor: "#ec5757",
                padding: "0.5rem 1rem !important",
                borderRadius: "2rem",
              }}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default DeleteConfirm;
