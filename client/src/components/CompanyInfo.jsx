import React, { useContext, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import ClearOutlined from "@material-ui/icons/ClearOutlined";
import Save from "@material-ui/icons/Save";
import Create from "@material-ui/icons/Create";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import { CompanyContext } from "../../context/CompanyContext";

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

export default function CompanyInfo(props) {
  const { requestAction } = props;
  const { company, setCompany } = useContext(CompanyContext);
  const [form, setForm] = useState(company);
  const [action, setAction] = useState(requestAction);
  const classes = useStyles();

  const validateForm = () => {
    return !(
      form.name &&
      form.gst &&
      form.address1 &&
      form.city &&
      form.zipcode &&
      form.country
    );
  };

  const onReset = () => {
    setAction("view");
  };

  const onSave = () => {
    setAction("view");
    setCompany(form);
  };
  const onEdit = () => {
    setAction("edit");
  };

  if (action === "edit") {
    return (
      <>
        <Typography variant="h5" gutterBottom>
          Company Information
        </Typography>
        <p />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              id="companyName"
              name="companyName"
              label="Company Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              id="gst"
              name="gst"
              label="GST No."
              value={form.gst}
              onChange={(e) => setForm({ ...form, gst: e.target.value })}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              id="address1"
              name="address1"
              label="Address line 1"
              value={form.address1}
              onChange={(e) => setForm({ ...form, address1: e.target.value })}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              id="address2"
              name="address2"
              label="Address line 2"
              value={form.address2}
              onChange={(e) => setForm({ ...form, address2: e.target.value })}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              id="city"
              name="city"
              label="City"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              id="state"
              name="state"
              label="State/Province/Region"
              value={form.state}
              onChange={(e) => setForm({ ...form, state: e.target.value })}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              id="zip"
              name="zip"
              label="Zip / Postal code"
              value={form.zipcode}
              onChange={(e) => setForm({ ...form, zipcode: e.target.value })}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              id="country"
              name="country"
              label="Country"
              value={form.country}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox color="secondary" id="confirmation" checked />}
              required
              label="Use this info for invoices"
            />
          </Grid>

          <Grid
            item
            xs={12}
            sm={6}
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button
              onClick={onReset}
              variant="outlined"
              startIcon={<ClearOutlined />}
              disableElevation
              color="secondary"
            >
              Cancel
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              onClick={onSave}
              startIcon={<Save />}
              disableElevation
              disabled={validateForm()}
              color="primary"
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </>
    );
  }
  return (
    <>
      <Typography variant="h5" gutterBottom>
        Company Information
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
        <Grid item xs={12}>
          <Paper elevation={0} className={classes.gridPaper}>
            <Typography>
              <b>Address line 1</b>
            </Typography>
            {company.address1}
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={0} className={classes.gridPaper}>
            <Typography>
              <b>Address line 2</b>
            </Typography>
            {company.address2}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={0} className={classes.gridPaper}>
            <Typography>
              <b>City</b>
            </Typography>
            {company.city}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={0} className={classes.gridPaper}>
            <Typography>
              <b>State/Province/Region</b>
            </Typography>
            {company.state}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={0} className={classes.gridPaper}>
            <Typography>
              <b>Zip / Postal code</b>
            </Typography>
            {company.zipcode}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={0} className={classes.gridPaper}>
            <Typography>
              <b>Country</b>
            </Typography>
            {company.country}
          </Paper>
        </Grid>
        <Grid item xs={12} className={classes.centerBox}>
          <br />
          <Button
            variant="contained"
            onClick={onEdit}
            startIcon={<Create />}
            disableElevation
            color="primary"
          >
            Edit
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
