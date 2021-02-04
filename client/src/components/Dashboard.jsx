import React, { useContext } from "react";
import { Grid, Fab } from "@material-ui/core";
import { Create } from "@material-ui/icons";

import { InvoiceContext } from "../../context/InvoiceContext";
import SummaryCard from "./SummaryCard";

export default function DashboardComponent(props) {
  const { setPage } = props;
  const { invoices } = useContext(InvoiceContext);
  const onCreate = () => {
    setPage("Create Invoice");
  };
  return (
    <>
      <Grid container spacing={2}>
        <Grid item md={3}>
          <SummaryCard title="All Invoices" invoices={invoices} />
        </Grid>
        <Grid item md={3}>
          <SummaryCard
            title="Paid Invoices"
            invoices={invoices.filter((invoice) => invoice.status === "Paid")}
          />
        </Grid>
        <Grid item md={3}>
          <SummaryCard
            title="Overdue Invoices"
            invoices={invoices.filter(
              (invoice) => invoice.status === "Overdue"
            )}
          />
        </Grid>
        <Grid item md={3}>
          <SummaryCard
            title="Outstanding Invoices"
            invoices={invoices.filter(
              (invoice) => invoice.status === "Outstanding"
            )}
          />
        </Grid>
      </Grid>
      <p />
      <Fab color="primary" onClick={onCreate}>
        <Create />
      </Fab>
    </>
  );
}
