import React, { createContext, useState } from "react";

export const CompanyContext = createContext({});

export default function CompanyProvider(props) {
  const [company, setCompany] = useState({
    name: "XYZ Company",
    gst: 12335,
    address1: "Random Street",
    address2: null,
    city: "London",
    state: "Uttar Pradesh",
    zipcode: "221005",
    country: "India",
  });
  const { children } = props;

  return (
    <CompanyContext.Provider value={{ company, setCompany }}>
      {children}
    </CompanyContext.Provider>
  );
}
