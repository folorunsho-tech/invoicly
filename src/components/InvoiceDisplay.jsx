import styles from "../theme/invoicedisplay.module.css";
import React from "react";
import ovalPaid from "../assets/Oval.svg";
import ovalPend from "../assets/Oval(1).svg";
function InvoiceHome({ invoice = [] }) {
  return (
    <div className={styles.main}>
      <div className={styles.top}>
        <h3>#{invoice.id}</h3>
        <p>Due {invoice.paymentDue}</p>
        <h2>£ {invoice.total.total}</h2>
      </div>
      <div className={styles.bottom}>
        <p className={styles.client}>{invoice.clientName}</p>
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
      </div>
    </div>
  );
}

export default InvoiceHome;
