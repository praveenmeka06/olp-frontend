import { makeStyles } from "@mui/styles";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import logo from "../assets/img/vite.svg";
import {
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import clsx from "clsx";
import { useState } from "react";

function Navbar() {
  const classes = useStyles();
  const { setCurrentUser, currentUser } = useAuth();
  let navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const logout = () => {
    localStorage.clear();
    setCurrentUser(null);
    navigate("/login");
  };

  const mobileNavItems = [
    { title: "Students", to: "/students", users: ["admin"] },
    { title: "Courses", to: "/courses", users: ["admin", "student"] },
    { title: "Login", to: "/login", users: ["admin", "student", "public"] },
    { title: "Signup", to: "/Signup", users: ["admin", "student", "public"] },
  ];

  return (
    <>
      <div className={classes.container}>
        <div className={classes.logoDiv}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? clsx(classes.selectedLink, classes.logoDiv)
                : classes.logoDiv
            }
          >
            <img src={logo} />
          </NavLink>
        </div>
        {currentUser && currentUser.role == "admin" && (
          <NavLink
            to="/students"
            className={({ isActive }) =>
              isActive
                ? clsx(classes.selectedLink, classes.desktopLink)
                : classes.desktopLink
            }
          >
            <div className={classes.linkDiv}>Students</div>
          </NavLink>
        )}
        {currentUser && (
          <NavLink
            to="/courses"
            className={({ isActive }) =>
              isActive
                ? clsx(classes.selectedLink, classes.desktopLink)
                : classes.desktopLink
            }
          >
            <div className={classes.linkDiv}>Courses</div>
          </NavLink>
        )}
        <NavLink
          to="/login"
          className={({ isActive }) =>
            isActive
              ? clsx(classes.selectedLink, classes.desktopLink)
              : classes.desktopLink
          }
        >
          <div className={classes.linkDiv}>Login</div>
        </NavLink>
        <NavLink
          to="/signup"
          className={({ isActive }) =>
            isActive
              ? clsx(classes.selectedLink, classes.desktopLink)
              : classes.desktopLink
          }
        >
          <div className={classes.linkDiv}>SignUp</div>
        </NavLink>
        <Button className={classes.linkDiv} variant="outlined" onClick={logout}>
          Logout
        </Button>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon color="primary" />
        </IconButton>
        <nav>
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: 200,
              },
            }}
          >
            <List>
              {mobileNavItems.map((item) => {
                if (
                  item.users.includes(currentUser?.role) ||
                  item.users.includes("public")
                ) {
                  return (
                    <NavLink
                      key={item.title}
                      to={item.to}
                      style={{ textDecoration: "none" }}
                    >
                      <ListItem disablePadding>
                        <ListItemButton sx={{ textAlign: "center" }}>
                          <ListItemText primary={item.title} />
                        </ListItemButton>
                      </ListItem>
                    </NavLink>
                  );
                }
              })}
            </List>
          </Drawer>
        </nav>
      </div>
      <Outlet />
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "row !important",
    alignItems: "center",
    boxShadow: "0px 3px 3px 0px rgba(0,0,0,0.41)",
    background: "#e6effa !important",
    padding: "10px 20px",
    [theme.breakpoints.down("sm")]: {
      padding: "10px 10px",
    },
  },
  logoDiv: {
    flex: "1 1 0",
  },
  linkDiv: {
    margin: "0px 40px !important",
    [theme.breakpoints.down("md")]: {
      margin: "0px 10px !important",
    },
  },
  desktopLink: {
    textDecoration: "none",
    display: "block",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  selectedLink: {
    fontWeight: "bold",
    color: "green",
  },
}));

export default Navbar;
