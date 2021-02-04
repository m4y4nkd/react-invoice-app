import React, { useContext, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ClearOutlined from "@material-ui/icons/ClearOutlined";
import Save from "@material-ui/icons/Save";
import MomentUtils from "@date-io/moment";
import moment from "moment";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import { Divider } from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import LineItem from "./LineItem";
import { CompanyContext } from "../../context/CompanyContext";
import { InvoiceContext } from "../../context/InvoiceContext";

const useStyles = makeStyles((theme) => ({
  gridPaper: {
    background: theme.palette.action.hover,
    padding: theme.spacing(1),
  },
  leftBox: {
    display: "flex",
    justifyContent: "flex-end",
  },
  centerBox: {
    display: "flex",
    justifyContent: "center",
  },
}));

export default function CreateForm(props) {
  const { invoice, action } = props;
  const { company } = useContext(CompanyContext);
  const { invoices, setInvoices, statusList } = useContext(InvoiceContext);
  const [form, setForm] = useState(
    invoice || {
      clientName: "",
      invoiceNum: "",
      invoiceDate: moment().format("YYYY-MM-DD"),
      dueDate: moment().add(7, "days").format("YYYY-MM-DD"),
      status: "",
      notes: "",
      lineItems: [],
    }
  );
  const [popup, setPopup] = useState(false);
  const classes = useStyles();

  const validateForm = () => {
    return !(
      form.invoiceNum &&
      form.invoiceDate &&
      form.dueDate &&
      form.status &&
      form.clientName &&
      form.lineItems.length !== 0
    );
  };

  const onReset = () => {
    setForm({
      clientName: "",
      invoiceNum: "",
      invoiceDate: moment(),
      dueDate: moment().add(7, "days"),
      status: "",
      notes: "",
      lineItems: [],
    });
  };

  const onSubmit = () => {
    if (action === "Edit") {
      setInvoices(
        invoices.map((i) => (i.invoiceNum === form.invoiceNum ? form : i))
      );
    } else {
      setInvoices([...invoices, form]);
      setForm({
        clientName: "",
        invoiceNum: "",
        invoiceDate: moment(),
        dueDate: moment().add(7, "days"),
        status: "",
        notes: "",
        lineItems: [],
      });
    }

    setPopup(true);
  };
  const handlePopupClose = (event, reason) => {
    if (reason !== "clickaway") {
      setPopup(false);
    }
  };

  return (
    <>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Typography variant="h5" gutterBottom>
          {action} Invoice
        </Typography>
        <p />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Paper elevation={0} className={classes.gridPaper}>
              <Typography>
                <b>Company Name</b>
              </Typography>
              {company.name}
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={0} className={classes.gridPaper}>
              <Typography>
                <b>GST No.</b>
              </Typography>
              {company.gst}
            </Paper>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              variant="outlined"
              required
              id="invoiceNumber"
              name="invoiceNumber"
              label="Invoice Number"
              value={form.invoiceNum}
              disabled={action === "Edit"}
              onChange={(e) => setForm({ ...form, invoiceNum: e.target.value })}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <DatePicker
              disableToolbar
              fullWidth
              required
              variant="inline"
              inputVariant="outlined"
              label="Invoice Date"
              format="DD MMM, YYYY"
              value={moment(form.invoiceDate)}
              onChange={(date) => {
                setForm({
                  ...form,
                  invoiceDate: moment(date).format("YYYY-MM-DD"),
                });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <DatePicker
              disableToolbar
              fullWidth
              required
              variant="inline"
              inputVariant="outlined"
              label="Due Date"
              format="DD MMM, YYYY"
              value={moment(form.dueDate)}
              onChange={(date) => {
                setForm({
                  ...form,
                  dueDate: moment(date).format("YYYY-MM-DD"),
                });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl required fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                variant="outlined"
                label="Status"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
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
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              id="clientName"
              name="clientName"
              label="Client Name"
              value={form.clientName}
              onChange={(e) => setForm({ ...form, clientName: e.target.value })}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Divider />
            Line Items
          </Grid>
          {form.lineItems.length !== 0 && (
            <>
              {form.lineItems.map((lineItem, index) => (
                <LineItem
                  key={uuidv4()}
                  id={index}
                  actionProp="view"
                  lineItemData={lineItem}
                  form={form}
                  setForm={setForm}
                />
              ))}
            </>
          )}
          <LineItem
            actionProp="add"
            id={form.lineItems.length}
            form={form}
            setForm={setForm}
          />

          <Grid item xs={12}>
            <Divider />
            Summary
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              id="note"
              name="notes"
              label="Invoice Notes"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} className={classes.leftBox}>
            <Typography variant="h5">
              <b>Total</b>
            </Typography>
            <Typography variant="h6">
              <br />
              {_.sumBy(form.lineItems, (item) => item.subTotal)}
            </Typography>
          </Grid>
          <Grid item xs={12} />
          <Grid item xs={12} sm={6} className={classes.leftBox}>
            <Button
              onClick={onReset}
              variant="outlined"
              startIcon={<ClearOutlined />}
              disableElevation
              color="secondary"
            >
              Reset
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              onClick={onSubmit}
              startIcon={<Save />}
              disableElevation
              disabled={validateForm()}
              color="primary"
            >
              Save
            </Button>
          </Grid>
        </Grid>
        <Snackbar
          open={popup}
          autoHideDuration={10000}
          onClose={handlePopupClose}
        >
          <Alert onClose={handlePopupClose} severity="success">
            Action Completed Successfully!
          </Alert>
        </Snackbar>
      </MuiPickersUtilsProvider>
    </>
  );
}
