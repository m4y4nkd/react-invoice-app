import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import _ from "lodash";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    width: 300,
  },
  header: {
    height: 140,
  },
});

export default function SummaryCard(props) {
  const { title, invoices } = props;
  const classes = useStyles();

  const clients = [...new Set(invoices.map((invoice) => invoice.clientName))];
  const amount = _.sumBy(invoices, "total");

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <center>
          <CardHeader
            className={classes.header}
            title={invoices.length}
            titleTypographyProps={{ variant: "h2" }}
          />
        </center>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Total Amount: $ {amount}
            <br />
            Number of Clients: {clients.length}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          View Details
        </Button>
      </CardActions>
    </Card>
  );
}
