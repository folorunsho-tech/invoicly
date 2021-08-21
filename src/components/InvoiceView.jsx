import React, { useContext } from "react";
import backArrow from "../assets/icon-arrow-left.svg";
import styles from "../theme/invoiceview.module.css";
import ovalPaid from "../assets/Oval.svg";
import ovalPend from "../assets/Oval(1).svg";
import { useParams } from "react-router-dom";
import { InvoiceContext } from "../Contexts/InvoiceContext";
import Btn from "./Button";
import { useMediaQuery, useDisclosure } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import btnStyles from "../theme/button.module.css";

import DeleteConfirm from "./DeleteConfirm";
function InvoiceView({ invoices }) {
  const [ctaQuery] = useMediaQuery("(min-width: 760px)");
  const { id } = useParams();

  const { dispatch } = useContext(InvoiceContext);
  // const {}
  const history = useHistory();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const CtaBtns = ({ mobile }) => {
    return (
      <div className={mobile ? styles.mobile : styles.cta}>
        <Btn
          content="Delete"
          variant={btnStyles.delete}
          handleClick={() => {
            onOpen();
          }}
        />
        <Btn
          content="Mark as Paid"
          variant={btnStyles.mark}
          handleClick={() => {
            const markedasPaid = {
              ...invoice,
              status: "paid",
            };
            dispatch({ type: "MARK_AS_PAID", payload: { markedasPaid, id } });
            history.push("/");
          }}
        />
      </div>
    );
  };
  const ItemList = ({ item }) => {
    return (
      <div className={styles.summCont}>
        <div className={styles.item}>
          <div className={styles.itemmeta}>
            <h2>{item.name}</h2>
            <p>
              {item.quantity} x £ {item.price}
            </p>
          </div>
          <div className={styles.itemprice}>
            <h2>£ {item.total}</h2>
          </div>
        </div>
      </div>
    );
  };
  const Data = invoices.filter((invoice) => invoice.id === id);
  let invoice = Data[0];

  return (
    <section className={styles.main}>
      <div
        className={styles.back}
        onClick={() => {
          history.push("/");
        }}
      >
        <img src={backArrow} alt="back" /> Go Back
      </div>
      <div className={styles.status}>
        <p>Status</p>
        {invoice.status === "paid" ? (
          <p className={styles.paid}>
            <img src={ovalPaid} alt="paid" />
            <span>Paid</span>
          </p>
        ) : (
          <p className={styles.pending}>
            <img src={ovalPend} alt="pending" />
            <span>Pending</span>
          </p>
        )}
        <div className={styles.ctaCont}>{ctaQuery && <CtaBtns />}</div>
      </div>

      <div className={styles.meta}>
        <div className={ctaQuery && styles.address}>
          <div>
            <h2 style={{ fontWeight: "bold" }}>
              <span style={{ color: "#7E88C3" }}>#</span>
              {invoice.id}
            </h2>
            <p>{invoice.description}</p>
          </div>
          <div style={{ margin: !ctaQuery && "1rem 0" }}>
            <p>{invoice.senderAddress.street}</p>
            <p>{invoice.senderAddress.city}</p>
            <p>{invoice.senderAddress.postCode}</p>
            <p>{invoice.senderAddress.country}</p>
          </div>
        </div>
        <div
          id="meta-cont"
          style={{ margin: "1rem 0", display: "flex", gap: "4rem" }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <div>
              <p>Invoice Date</p>
              <h2 style={{ fontWeight: "bold", fontSize: "16px" }}>
                {invoice.createdAt}
              </h2>
            </div>
            <div>
              <p>Payment Due</p>
              <h2 style={{ fontWeight: "bold", fontSize: "16px" }}>
                {invoice.paymentDue}
              </h2>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <div>
              <p>Bill To</p>
              <h2 style={{ fontWeight: "bold", fontSize: "16px" }}>
                {invoice.clientName}
              </h2>
              <div style={{ margin: "1rem 0" }}>
                <p>{invoice.clientAddress.street}</p>
                <p>{invoice.clientAddress.city}</p>
                <p>{invoice.clientAddress.postCode}</p>
                <p>{invoice.clientAddress.country}</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <p>Sent To</p>
          <h2 style={{ fontWeight: "bold", fontSize: "16px" }}>
            {invoice.clientEmail}
          </h2>
        </div>
      </div>
      <div className={styles.summary}>
        {invoice.items.map((item, index) => (
          <ItemList key={index + 1} item={item} />
        ))}
        <button>
          <p>Amount Due</p> <h2>£{invoice.total.total}</h2>
        </button>
      </div>

      <DeleteConfirm id={id} onClose={onClose} isOpen={isOpen} />
      {!ctaQuery && <CtaBtns mobile="mobile" />}
    </section>
  );
}

export default InvoiceView;
