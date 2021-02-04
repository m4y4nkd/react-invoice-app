import React, { useState, createContext } from "react";

export const InvoiceContext = createContext({});

const invoiceData = require("../../server/invoices.json");

export default function InvoiceProvider(props) {
  const [invoices, setInvoices] = useState(invoiceData);
  const statusList = ["", "Paid", "Outstanding", "Overdue"];
  const { children } = props;

  return (
    <InvoiceContext.Provider value={{ invoices, setInvoices, statusList }}>
      {children}
    </InvoiceContext.Provider>
  );
}
