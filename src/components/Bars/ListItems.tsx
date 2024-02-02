"use client";

import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import MuiDrawer from "@mui/material/Drawer";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import globalTheme from "@/theme";
import Link from "next/link";
import { styled } from "@mui/material/styles";
import { Box, Collapse, List, Popover, PopoverPaper } from "@mui/material";
import { TransitionGroup } from "react-transition-group";

const MainListItemsCreator = ({ sidebarOpen }: { sidebarOpen: boolean }) => {
  const [selectedMenuId, setSelectedMenuId] = React.useState<number>(0);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setSelectedMenuId(0);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const menuList = [
    {
      id: 1,
      icon: <DashboardIcon />,
      text: "전표관리",
    },
    {
      id: 2,
      icon: <ShoppingCartIcon />,
      text: "매입매출",
      child: [
        { text: "매입매출" },
        { text: "미지급현황" },
        { text: "미수금현황" },
        { text: "매출원장" },
        { text: "매입원장" },
      ],
    },
    {
      id: 3,
      icon: <PeopleIcon />,
      text: "은행예금",
    },
    {
      id: 4,
      icon: <BarChartIcon />,
      text: "법인카드",
      child: [{ text: "법인카드 조회" }, { text: "카드내역 등록" }],
    },
    {
      id: 5,
      icon: <LayersIcon />,
      text: "세금계산서",
      child: [{ text: "매입" }, { text: "매출" }],
    },
  ];

  React.useEffect(() => {
    setSelectedMenuId(0);
    setAnchorEl(null);
  }, [sidebarOpen]);

  return menuList.map((item, index) => {
    const handleMenuClick = (event: React.MouseEvent<HTMLElement>, id: number) => {
      if (!!item.child?.length) {
        if (selectedMenuId === 0 || selectedMenuId !== item.id) {
          setSelectedMenuId(id);
          !sidebarOpen && setAnchorEl(event.currentTarget);
        } else {
          setSelectedMenuId(0);
          !sidebarOpen && setAnchorEl(null);
        }
      } else {
        return <Link href="/">{item.text}</Link>;
      }
    };

    const ChildList = () => {
      if (!!item.child?.length) {
        return item.child.map((childItem, childIndex) => (
          <ListItemButton
            key={childIndex}
            sx={{
              paddingLeft: sidebarOpen ? 4 : 2,
            }}
            onClick={() => console.log("test")}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={childItem.text} />
          </ListItemButton>
        ));
      }
    };

    return (
      <Box key={index}>
        <ListItemButton onClick={(e) => handleMenuClick(e, item.id)}>
          <ListItemIcon
            sx={{
              color: globalTheme.palette.grey[300],
              ml: "4px",
            }}
          >
            {item.icon}
          </ListItemIcon>
          <ListItemText primary={item.text} />
          {!!(item.child?.length ?? 0) &&
            (item.id === selectedMenuId ? (
              <ListItemText
                primary={"-"}
                sx={{
                  pr: 2,
                  size: "large",
                  textAlign: "right",
                  width: "100%",
                }}
              />
            ) : (
              <ListItemText
                primary={"+"}
                sx={{
                  pr: 2,
                  size: "large",
                  textAlign: "right",
                  width: "100%",
                }}
              />
            ))}
        </ListItemButton>
        {sidebarOpen
          ? item.id === selectedMenuId && <ChildList />
          : item.id === selectedMenuId && (
              <Popover
                id={id}
                sx={{
                  pointerEvents: "none",
                  left: 50,
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                onClose={handlePopoverClose}
              >
                <ChildList />
              </Popover>
            )}
      </Box>
    );
  });
};
export default MainListItemsCreator;
