import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  SettingsOutlined,
  PermContactCalendarOutlined,
  VerifiedOutlined,
  MapsHomeWorkOutlined,
  Home,
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/penguin.png";

const Sidebar = () => {
  const path = useLocation().pathname.split("/")[0];
  return (
    <Drawer
      variant="permanent"
      open={true}
      component="aside"
      sx={{
        "& .MuiDrawer-paper": {
          position: "fixed",
          minHeight: "100vh",
          whiteSpace: "nowrap",
          boxSizing: "border-box",
          padding: 1,
          boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.1)",
          width: 240,
        },
      }}
    >
      <div className="d-flex w-100 justify-content-center align-items-center mb-4">
        <img src={Logo} width={80} height={80} />
      </div>
      <List component="nav">
        <Link to="/" className="">
          <ListItemButton
            className={path === "" ? "bg-primary text-light" : ""}
          >
            <ListItemIcon>
              <Home sx={{ color: path === "" ? "#ffffff" : "" }} />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </Link>
        <ListItemButton
          className={path === "vocab" ? "bg-primary text-light" : ""}
        >
          <ListItemIcon>
            <MapsHomeWorkOutlined />
          </ListItemIcon>
          <ListItemText primary="Factory Audit Order" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <VerifiedOutlined />
          </ListItemIcon>
          <ListItemText primary="User management" />
        </ListItemButton>
        <Link to="/client">
          <ListItemButton>
            <ListItemIcon>
              <PermContactCalendarOutlined />
            </ListItemIcon>
            <ListItemText primary="Client Management" />
          </ListItemButton>
        </Link>
        <ListItemButton>
          <ListItemIcon>
            <SettingsOutlined />
          </ListItemIcon>
          <ListItemText primary="Admin" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Sidebar;
