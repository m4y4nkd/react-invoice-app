import React, { useContext, useState } from "react";
import {
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
} from "@material-ui/core";

import { InvoiceContext } from "../../context/InvoiceContext";
import InvoiceCard from "./InvoiceCard";

export default function ViewAllComponent(props) {
  const { onEdit } = props;
  const { invoices, statusList } = useContext(InvoiceContext);
  const [statusFilter, setStatusFilter] = useState("");
  const [clientName, setClientName] = useState("");

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <FormControl required fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              variant="outlined"
              label="Status"
              value={statusFilter}
              onChange={handleStatusChange}
              displayEmpty
              MenuProps={{ variant: "menu" }}
            >
              {statusList.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} />
        <Grid item xs={12} sm={3}>
          <TextField
            variant="outlined"
            required
            id="clientName"
            name="clientName"
            label="Client Name"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            fullWidth
          />
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
