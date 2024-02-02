import * as React from "react";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MainListItemsCreator from "./ListItems";
import { Avatar, Box, Collapse, ListItemButton, Toolbar } from "@mui/material";
import Image from "next/image";
import globalTheme from "@/theme";
import { TransitionGroup } from "react-transition-group";

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const TopBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: "white",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Sidebar = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    border: "1px solid #2E2C7B",
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

export default function Bars() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ backgroundColor: globalTheme.palette.primary.main }}>
      <TopBar
        position="absolute"
        open={open}
        sx={{
          px: 2,
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            pr: [0],
            pl: [1],
            height: 64,
          }}
        >
          <IconButton
            edge="start"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              color: globalTheme.palette.primary.main,
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <List sx={{ display: "flex", p: 0, height: 64, minWidth: 350 }}>
            <ListItemButton
              component="h3"
              sx={{
                color: globalTheme.palette.primary.main,
                maxWidth: 108,
                borderBottom: "3px solid",
              }}
            >
              업무관리
            </ListItemButton>
            <ListItemButton
              component="h3"
              sx={{ color: globalTheme.palette.primary.main, maxWidth: 108, borderBottom: "3px solid" }}
            >
              전자결재
            </ListItemButton>
            <ListItemButton
              component="h3"
              sx={{ color: globalTheme.palette.primary.main, maxWidth: 108, borderBottom: "3px solid" }}
            >
              회계관리
            </ListItemButton>
          </List>
          <List sx={{ display: "flex" }}>
            <IconButton
              sx={{
                color: globalTheme.palette.primary.main,
                px: 2,
                width: 50,
                height: 50,
              }}
            >
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon sx={{ width: 28, height: 28 }} />
              </Badge>
            </IconButton>
            <IconButton sx={{ px: 2, width: 50, height: 50 }}>
              <Avatar alt="user_name" sx={{ width: 36, height: 36 }} />
            </IconButton>
          </List>
        </Toolbar>
      </TopBar>
      <Sidebar variant="permanent" open={open}>
        <Toolbar
          sx={{
            backgroundColor: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        >
          <Image src="/images/topLogo.png" alt="logo" width={175} height={40} />
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List
          component="nav"
          sx={{
            backgroundColor: globalTheme.palette.primary.main,
            color: "white",
          }}
        >
          <MainListItemsCreator sidebarOpen={open} />
        </List>
      </Sidebar>
    </Box>
  );
}
