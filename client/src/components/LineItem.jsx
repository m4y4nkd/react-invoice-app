import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Add from "@material-ui/icons/Add";
import Save from "@material-ui/icons/Save";
import Cancel from "@material-ui/icons/Cancel";
import Create from "@material-ui/icons/Create";
import Delete from "@material-ui/icons/Delete";
import _ from "lodash";

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

export default function LineItem(props) {
  const { actionProp, id, lineItemData, form, setForm } = props;
  const classes = useStyles();
  const [lineItem, setLineItem] = useState(
    lineItemData || {
      name: "",
      description: "",
      quantity: 0,
      unit: "",
      price: 0,
      discount: 0,
      tax: 0,
    }
  );
  const [action, setAction] = useState(actionProp);

  const validateForm = () => {
    return !(
      lineItem.name &&
      lineItem.quantity &&
      lineItem.price &&
      lineItem.tax
    );
  };

  const subTotal = (
    lineItem.quantity *
    lineItem.price *
    ((100 + Number(lineItem.tax)) / 100) *
    ((100 - lineItem.discount) / 100)
  ).toFixed(2);
  const onAdd = () => {
    setForm({
      ...form,
      lineItems: [...form.lineItems, { ...lineItem, id, subTotal }],
    });
    setLineItem({
      name: "",
      description: "",
      quantity: 0,
      unit: "",
      price: 0,
      discount: 0,
      tax: 0,
    });
  };
  const onSave = () => {
    setLineItem({
      name: "",
      description: "",
      quantity: 0,
      unit: "",
      price: 0,
      discount: 0,
      tax: 0,
      subTotal: 0,
    });
  };
  const onEdit = () => {
    setAction("edit");
  };
  const onCancel = () => {
    setLineItem(lineItemData);
    setAction("view");
  };
  const onDelete = () => {
    setForm({
      ...form,
      lineItems: _.remove(form.lineItems, (item) => item.id === lineItem.id),
    });
  };

  if (action === "edit" || action === "add") {
    return (
      <>
        <Grid item xs={12} sm={3}>
          <TextField
            variant="outlined"
            required
            id="itemName"
            name="itemName"
            label="Item Name"
            value={lineItem.name}
            onChange={(e) => setLineItem({ ...lineItem, name: e.target.value })}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            variant="outlined"
            id="itemDescription"
            name="itemDescription"
            label="Description"
            value={lineItem.description}
            onChange={(e) =>
              setLineItem({ ...lineItem, description: e.target.value })
            }
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={1}>
          <TextField
            variant="outlined"
            required
            type="number"
            id="itemQuantity"
            name="itemQuantity"
            label="Qty"
            value={lineItem.quantity}
            onChange={(e) =>
              setLineItem({ ...lineItem, quantity: e.target.value })
            }
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={1}>
          <TextField
            variant="outlined"
            id="itemUnit"
            name="itemUnit"
            label="Unit"
            value={lineItem.unit}
            onChange={(e) => setLineItem({ ...lineItem, unit: e.target.value })}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={1}>
          <TextField
            variant="outlined"
            type="number"
            required
            id="itemPrice"
            name="itemPrice"
            label="Price"
            value={lineItem.price}
            onChange={(e) =>
              setLineItem({ ...lineItem, price: e.target.value })
            }
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={1}>
          <TextField
            variant="outlined"
            type="number"
            id="itemDiscount"
            name="itemDiscount"
            label="Disc.(%)"
            value={lineItem.discount}
            onChange={(e) =>
              setLineItem({ ...lineItem, discount: e.target.value })
            }
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={1}>
          <TextField
            variant="outlined"
            required
            type="number"
            id="itemTax"
            name="itemTax"
            label="Tax (%)"
            value={lineItem.tax}
            onChange={(e) => setLineItem({ ...lineItem, tax: e.target.value })}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={1}>
          {action === "add" && (
            <Button
              variant="contained"
              onClick={onAdd}
              startIcon={<Add />}
              disableElevation
              disabled={validateForm()}
              color="primary"
              fullWidth
            >
              Add
            </Button>
          )}
          {action === "edit" && (
            <>
              <IconButton
                variant="contained"
                onClick={onSave}
                disabled={validateForm()}
                color="primary"
              >
                <Save />
              </IconButton>
              <IconButton
                variant="contained"
                onClick={onCancel}
                color="secondary"
              >
                <Cancel />
              </IconButton>
            </>
          )}
        </Grid>
        <Grid item xs={12} sm={11} />
        <Grid item xs={12} sm={1}>
          <Typography>
            <b>Subtotal</b>
          </Typography>
          {subTotal}
        </Grid>
      </>
    );
  }
  return (
    <>
      <Grid item xs={12} sm={3}>
        <Paper elevation={0} className={classes.gridPaper}>
          <Typography>
            <b>Name</b>
          </Typography>
          {lineItem.name}
        </Paper>
      </Grid>
      <Grid item xs={12} sm={3}>
        <Paper elevation={0} className={classes.gridPaper}>
          <Typography>
            <b>Description</b>
          </Typography>
          {lineItem.description}
        </Paper>
      </Grid>
      <Grid item xs={12} sm={1}>
        <Paper elevation={0} className={classes.gridPaper}>
          <Typography>
            <b>Quantity</b>
          </Typography>
          {lineItem.quantity}
        </Paper>
      </Grid>
      <Grid item xs={12} sm={1}>
        <Paper elevation={0} className={classes.gridPaper}>
          <Typography>
            <b>Unit</b>
          </Typography>
          {lineItem.unit}
        </Paper>
      </Grid>
      <Grid item xs={12} sm={1}>
        <Paper elevation={0} className={classes.gridPaper}>
          <Typography>
            <b>Price</b>
          </Typography>
          {lineItem.price}
        </Paper>
      </Grid>
      <Grid item xs={12} sm={1}>
        <Paper elevation={0} className={classes.gridPaper}>
          <Typography>
            <b>Disc. (%)</b>
          </Typography>
          {lineItem.discount}
        </Paper>
      </Grid>
      <Grid item xs={12} sm={1}>
        <Paper elevation={0} className={classes.gridPaper}>
          <Typography>
            <b>Tax (%)</b>
          </Typography>
          {lineItem.tax}
        </Paper>
      </Grid>
      <Grid item xs={12} sm={1}>
        <IconButton variant="contained" onClick={onEdit} color="primary">
          <Create />
        </IconButton>
        <IconButton variant="contained" onClick={onDelete} color="secondary">
          <Delete />
        </IconButton>
      </Grid>
      <Grid item xs={12} sm={11} />
      <Grid item xs={12} sm={1}>
        <Typography>
          <b>Subtotal</b>
        </Typography>
        {lineItem.subTotal}
      </Grid>
    </>
  );
}
