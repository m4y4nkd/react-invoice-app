import React, { useContext, useState } from "react";
import { Grid, Select, MenuItem, Typography } from "@material-ui/core";

import { InvoiceContext } from "../../context/InvoiceContext";
import InvoiceCard from "./InvoiceCard";

export default function ViewAllComponent(props) {
  const { onEdit } = props;
  const { invoices, statusList } = useContext(InvoiceContext);
  const [statusFilter, setStatusFilter] = useState("");

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item md>
          <Typography paragraph>
            <b>Status:</b>
          </Typography>
          <Select
            variant="outlined"
            value={statusFilter}
            onChange={handleStatusChange}
            displayEmpty
            MenuProps={{ variant: "menu" }}
          >
            {statusList.map((status) => (
              <MenuItem key={status} value={status}>
                {status || "All"}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>
      <p />
      <Grid container spacing={2}>
        {invoices
          .filter((invoice) =>
            statusFilter ? invoice.status === statusFilter : invoice
          )
          .map((invoice) => (
            <Grid item md key={invoice.invoiceNum}>
              <InvoiceCard invoice={invoice} onEdit={onEdit} />
            </Grid>
          ))}
      </Grid>
    </>
  );
}
