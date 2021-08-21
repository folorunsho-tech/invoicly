import { MdAdd } from "react-icons/md";
import Nav from "./components/Nav";
import Btn from "./components/Button";
import InvoiceView from "./components/InvoiceView";
import InvoiceDisplay from "./components/InvoiceDisplay";

import mainStyles from "./theme/main.module.css";
import styles from "./theme/button.module.css";
import empty from "./assets/illustration-empty.svg";
import { useMediaQuery, useDisclosure } from "@chakra-ui/react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import InvoiceCreate from "./components/InvoiceCreate";
import { InvoiceContext } from "./Contexts/InvoiceContext";
import { useContext } from "react";

function App() {
  // const location = window.location.pathname;
  const { Invoices } = useContext(InvoiceContext);
  const Empty = () => {
    return (
      <div className={mainStyles.empty}>
        <img src={empty} alt="Empty Invoice Illustration" />
        <div className={mainStyles.emptyText}>
          <h2>There is nothing here</h2>
          <p>
            Create an invoice by clicking the <b>New</b> button and get started
          </p>
        </div>
      </div>
    );
  };
  const [textQuery] = useMediaQuery("(min-width: 800px)");
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Router>
        <Nav />
        <Switch>
          <Route path="/" exact>
            <main className={mainStyles.main}>
              {isOpen && <InvoiceCreate onClose={onClose} isOpen={isOpen} />}
              <section className={mainStyles.top}>
                <div className={mainStyles.topTitle}>
                  <h2>Invoices</h2>
                  <p>{Invoices.length} invoices</p>
                </div>
                <div className={mainStyles.topCTA}>
                  {/* <div>filter</div> */}
                  <Btn
                    content={textQuery ? "New Invoice" : "New"}
                    variant={styles.new}
                    iconLeft={<MdAdd className={styles.icon} />}
                    handleClick={onOpen}
                  />
                </div>
              </section>
              {Invoices === undefined || Invoices.length === 0 ? (
                <Empty />
              ) : (
                <section className={mainStyles.mainSection}>
                  {Invoices.map((invoice) => (
                    <Link to={`/view/${invoice.id}`} key={invoice.id}>
                      <InvoiceDisplay invoice={invoice} />
                    </Link>
                  ))}
                </section>
              )}
            </main>
          </Route>
          <Route path={`/view/:id`} exact>
            <InvoiceView invoices={Invoices} />
          </Route>
        </Switch>
      </Router>

      {/* <Btn content="Save as Draft" variant={styles.save} />
      
      <Btn content="+ Add New Item" variant={styles.add} /> */}
    </>
  );
}

export default App;
