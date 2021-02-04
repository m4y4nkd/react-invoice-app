import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Divider from "@material-ui/core/Divider";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import Create from "@material-ui/icons/Create";
import Delete from "@material-ui/icons/Delete";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import GetApp from "@material-ui/icons/GetApp";
import { InvoiceContext } from "../../context/InvoiceContext";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    width: 300,
  },
  header: {
    height: 0,
    paddingTop: "16%",
    paddingBottom: "16%",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function InvoiceCard(props) {
  const { invoice, onEdit } = props;
  const { invoices, setInvoices } = useContext(InvoiceContext);
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleDelete = () => {
    setInvoices(invoices.filter((i) => i.invoiceNum !== invoice.invoiceNum));
  };
  const handleEdit = () => {
    onEdit(invoice);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {invoice.clientName[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <GetApp />
          </IconButton>
        }
        title={invoice.clientName}
        subheader={`Invoice No. ${invoice.invoiceNum}`}
      />
      <center>
        <CardHeader
          className={classes.header}
          title={invoice.clientName}
          titleTypographyProps={{ variant: "h4" }}
        />
      </center>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          Amount: $ {invoice.amount} <br />
          Status: {invoice.status} <br />
          Due Date: {invoice.dueDate}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={handleEdit}>
          <Create />
        </IconButton>
        <IconButton onClick={handleDelete}>
          <Delete />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            <b>Invoice Date:</b> {invoice.invoiceDate}
          </Typography>
          <Typography paragraph>
            <b>Notes:</b> {invoice.notes}
          </Typography>
          <br />
          <Divider />
          <Typography variant="h6">
            <b>Items</b>
          </Typography>
          <Divider />
          <br />
          {invoice.lineItems.map((item) => (
            <Typography paragraph key={item.name}>
              <b>Name:</b> {item.name} <br />
              <b>Description:</b> {item.description} <br />
              <b>Quantity:</b> {item.quantity} {item.unit} <br />
              <b>Price:</b> ${item.price} <br />
              <b>Discount:</b> {item.discount}% <br />
              <b>Tax:</b> {item.tax}% <br />
            </Typography>
          ))}
        </CardContent>
      </Collapse>
    </Card>
  );
}
