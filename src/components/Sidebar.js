import React from "react";
import {
  Collapse,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  VerifiedOutlined,
  Home,
  ArtTrack,
  ExpandLess,
  ExpandMore,
  Headphones,
  Book,
  Mic,
  Edit,
  Article,
  AccountBox,
  SchoolOutlined,
  MonetizationOnOutlined,
  Forum,
  HistoryEdu,
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import Logo from "../assets/penguin.png";
import "../styles/Navbar.css";

const Sidebar = ({ width }) => {
  const [openQuestion, setOpenQuestion] = React.useState(false);

  const openCollapse = () => {
    setOpenQuestion(true);
  };

  const closeCollapse = () => {
    setOpenQuestion(false);
  };

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
          width,
        },
      }}
    >
      <div className="d-flex w-100 justify-content-center align-items-center my-4">
        <img src={Logo} width={80} height={80} />
      </div>
      <List component="nav">
        <NavLink to="/" className="nav-link" onClick={closeCollapse}>
          <ListItemButton>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </NavLink>

        <ListItemButton onClick={openCollapse}>
          <ListItemIcon>
            <ArtTrack />
          </ListItemIcon>
          <ListItemText primary="Question" />
          {openQuestion ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={openQuestion} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <NavLink to="/question/listening">
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <Headphones />
                </ListItemIcon>
                <ListItemText primary="Listening" className="text-dark" />
              </ListItemButton>
            </NavLink>

            <NavLink to="/question/reading">
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <Book />
                </ListItemIcon>
                <ListItemText primary="Reading" className="text-dark" />
              </ListItemButton>
            </NavLink>

            <NavLink to="/question/speaking">
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <Mic />
                </ListItemIcon>
                <ListItemText primary="Speaking" className="text-dark" />
              </ListItemButton>
            </NavLink>

            <NavLink to="/question/writing">
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <Edit />
                </ListItemIcon>
                <ListItemText primary="Writing" className="text-dark" />
              </ListItemButton>
            </NavLink>
          </List>
        </Collapse>

        <NavLink to="/vocabulary" className="nav-link">
          <ListItemButton>
            <ListItemIcon>
              <VerifiedOutlined />
            </ListItemIcon>
            <ListItemText primary="Vocabulary" />
          </ListItemButton>
        </NavLink>

        <NavLink to="/test" className="nav-link">
          <ListItemButton>
            <ListItemIcon>
              <Article />
            </ListItemIcon>
            <ListItemText primary="Test" />
          </ListItemButton>
        </NavLink>

        <NavLink to="/forum" className="nav-link">
          <ListItemButton>
            <ListItemIcon>
              <Forum />
            </ListItemIcon>
            <ListItemText primary="Forum" />
          </ListItemButton>
        </NavLink>

        <NavLink to="/user" className="nav-link">
          <ListItemButton>
            <ListItemIcon>
              <AccountBox />
            </ListItemIcon>
            <ListItemText primary="User" />
          </ListItemButton>
        </NavLink>

        <NavLink to="/teacher" className="nav-link">
          <ListItemButton>
            <ListItemIcon>
              <SchoolOutlined />
            </ListItemIcon>
            <ListItemText primary="Teacher" />
          </ListItemButton>
        </NavLink>
        <NavLink to="/courses" className="nav-link">
          <ListItemButton>
            <ListItemIcon>
              <HistoryEdu />
            </ListItemIcon>
            <ListItemText primary="Courses" />
          </ListItemButton>
        </NavLink>
        <NavLink to="/transaction" className="nav-link">
          <ListItemButton>
            <ListItemIcon>
              <MonetizationOnOutlined />
            </ListItemIcon>
            <ListItemText primary="Transactions" />
          </ListItemButton>
        </NavLink>
      </List>
    </Drawer>
  );
};

export default Sidebar;
