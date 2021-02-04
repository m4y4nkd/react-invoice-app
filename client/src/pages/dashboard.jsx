import React, { useState, useContext } from "react";
import {
  AppBar,
  CssBaseline,
  Divider,
  Drawer,
  Hidden,
  Link,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@material-ui/core";
import {
  Create,
  Receipt,
  Business,
  Menu,
  Dashboard,
  Home,
} from "@material-ui/icons";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import DashboardComponent from "../components/Dashboard";
import CompanyInfo from "../components/CompanyInfo";
import ViewAllComponent from "../components/ViewAll";
import { UserContext } from "../../context/UserContext";
import InvoiceProvider from "../../context/InvoiceContext";

import CreateForm from "../components/CreateForm";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  title: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  selected: {
    backgroundColor: theme.palette.action.selected,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function DashboardPage(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useContext(UserContext);

  const [page, setPage] = useState("Dashboard");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const [invoiceProp, setInvoiceProp] = useState({});

  const onEdit = (invoice) => {
    setInvoiceProp(invoice);
    setPage("Edit Invoice");
  };
  console.log(user);

  const handleMenuClick = (text) => {
    setPage(text);
  };

  const drawer = (
    <div>
      <center>
        <IconButton>
          <Link href="/" variant="body2">
            <Home fontSize="large" />
          </Link>
        </IconButton>
      </center>
      <Divider />
      <List>
        {["Dashboard", "Company Info"].map((text, index) => (
          <ListItem
            button
            key={text}
            onClick={() => handleMenuClick(text)}
            className={page === text ? classes.selected : null}
          >
            <ListItemIcon>
              {index === 0 ? <Dashboard /> : <Business />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["Create Invoice", "View All Invoices"].map((text, index) => (
          <ListItem
            button
            key={text}
            onClick={() => handleMenuClick(text)}
            className={page === text ? classes.selected : null}
          >
            <ListItemIcon>
              {index === 0 ? <Create /> : <Receipt />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <Menu />
          </IconButton>
          <Typography
            variant="h6"
            component="h1"
            noWrap
            className={classes.title}
          >
            My Invoicing App | Welcome{" "}
            {!user.givenName ? "User" : user.givenName}!
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />

        <InvoiceProvider>
          {page === "Dashboard" ? (
            <DashboardComponent setPage={setPage} />
          ) : null}
          {page === "Company Info" ? (
            <CompanyInfo requestAction="view" />
          ) : null}
          {page === "Create Invoice" ? <CreateForm action="Create" /> : null}
          {page === "Edit Invoice" ? (
            <CreateForm action="Edit" invoice={invoiceProp} />
          ) : null}
          {page === "View All Invoices" ? (
            <ViewAllComponent onEdit={onEdit} />
          ) : null}
        </InvoiceProvider>
      </main>
    </div>
  );
}
