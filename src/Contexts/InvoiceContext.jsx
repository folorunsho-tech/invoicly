import { useReducer, createContext } from "react";
let invoices = JSON.parse(localStorage.getItem("invoices")) || [];
const InvoiceContext = createContext();

function InvoiceContextProvider(props) {
  const reducer = (state, action) => {
    switch (action.type) {
      case "ADD_INVOICE":
        invoices = [action.payload, ...state];
        localStorage.setItem("invoices", JSON.stringify(invoices));
        return invoices;
      case "DELETE_INVOICE":
        invoices = state.filter((invoice) => invoice.id !== action.payload);
        localStorage.setItem("invoices", JSON.stringify(invoices));
        return invoices;
      case "MARK_AS_PAID":
        const filtered = state.filter((inv) => inv.id !== action.payload.id);
        invoices = [action.payload.markedasPaid, ...filtered];
        localStorage.setItem("invoices", JSON.stringify(invoices));
        return invoices;

      default:
        return state;
    }
  };
  const [Invoices, dispatch] = useReducer(reducer, invoices);
  const Drafts = Invoices.filter((d) => d.inDraft === true);
  return (
    <InvoiceContext.Provider value={{ Invoices, dispatch, Drafts }}>
      {props.children}
    </InvoiceContext.Provider>
  );
}
export { InvoiceContext };
export default InvoiceContextProvider;
