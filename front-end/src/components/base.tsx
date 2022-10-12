import { GlobalContext } from "../contexts/globalContext";
import { Route, Routes, useNavigate } from "react-router-dom";
import DeanHome from "./dean-home/deanHome";
import "./base.css";
import { AppBar, Box, Button, CssBaseline, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { CalendarMonth, Home, Menu, People, Work } from "@mui/icons-material";
import StaffCourses from "./staff-courses/staffCourses";
import StaffBase from "./staffBase";
import { UserType } from "../interfaces/general_interfaces";
import { BookHalf } from "react-bootstrap-icons";


// //----   STYLES   ----

const listItemButtonStyle = {
    minHeight: 48,
    justifyContent: 'center',
    px: 2.5,
} as const;

const listItemIconStyle = {
    minWidth: 0,
    justifyContent: 'center',
} as const;


let Base = () => {

    const navigate = useNavigate();

    const [drawerWidth, setDrawerWidth] = useState(240);
    const [drawerOpen, setDrawerOpen] = useState(false);

    useEffect(() => {
        if (drawerOpen)
            setDrawerWidth(240);
        else
            setDrawerWidth(50);
    }, [drawerOpen]);

    //----   NAVIGATE TO PAGE   ----
    const navigateToPage = (page: string) => {
        navigate(`/${page}`);
    }

    return (
        <GlobalContext.Consumer>
            {context => (

                <Box sx={{ display: "flex" }} >

                    <CssBaseline />

                    <AppBar
                        position="fixed"
                        sx={{
                            zIndex: (theme) => theme.zIndex.drawer + 1
                        }}
                    >
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                aria-label="open drawer"
                                color="inherit"
                                sx={{ mr: 2 }}
                                onClick={() => setDrawerOpen(!drawerOpen)}
                            >
                                <Menu />
                            </IconButton>
                            <Typography variant="h5" component="div" sx={{ flexGrow: 1, display: "flex", justifyContent: "start" }}>
                                Workload Sheet Generator
                            </Typography>

                            <Typography variant="h6" component="div" sx={{ flexGrow: 0.5, display: "flex", justifyContent: "start" }}>
                                Switch user
                                <div>
                                    <Button style={{ backgroundColor: "#8888FF", marginLeft: "10px" }} onClick={() => {
                                        context.setUserId(10);
                                        context.setUserType(UserType.STAFF);
                                        navigate("/staff/")
                                    }} color="inherit">Staff</Button>
                                    <Button style={{ backgroundColor: "#8888FF", marginLeft: "10px" }} onClick={() => {
                                        context.setUserId(11);
                                        context.setUserType(UserType.DEAN);
                                        navigate("/dean/")
                                    }} color="inherit">Dean</Button>
                                </div>
                            </Typography>

                            <Button onClick={() => {
                                context.logout();
                                navigate("/login");
                            }} color="inherit">Logout</Button>
                        </Toolbar>
                    </AppBar>

                    <Drawer
                        variant="permanent"
                        sx={{
                            width: drawerWidth,
                            flexShrink: 0,
                            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                        }}
                    >
                        <Toolbar />
                        <Box sx={{ overflow: 'auto' }}>
                            <List>
                                <ListItem disablePadding sx={{ display: 'block' }}>
                                    <ListItemButton sx={listItemButtonStyle} onClick={() => navigateToPage("")}>
                                        <ListItemIcon sx={listItemIconStyle}>
                                            <Home />
                                        </ListItemIcon>
                                        {
                                            drawerOpen &&
                                            <ListItemText primary={"Home"} sx={{ ml: 3 }} />
                                        }
                                    </ListItemButton>
                                    {
                                        context.userType === UserType.STAFF &&
                                        <ListItemButton sx={listItemButtonStyle} onClick={() => navigateToPage("staff/courses")}>
                                            <ListItemIcon sx={listItemIconStyle}>
                                                <BookHalf />
                                            </ListItemIcon>
                                            {
                                                drawerOpen &&
                                                <ListItemText primary={"Courses"} sx={{ ml: 3 }} />
                                            }
                                        </ListItemButton>
                                    }
                                </ListItem>
                            </List>
                        </Box>
                    </Drawer>


                    <Box
                        component="main"
                        sx={{
                            flexGrow: 1,
                            p: context.isMobile ? 0 : 3,
                            maxWidth: `${window.innerWidth - drawerWidth - 10}px`,
                        }}
                    >
                        {/* add empty toolbar to shift hidden content down */}
                        <Toolbar />

                        <Routes>
                            <Route path="" element={<DeanHome />} />

                            <Route path="staff/*" element={<StaffBase />} />
                            <Route path="dean/*" element={<div></div>} />
                        </Routes>
                    </Box>
                </Box>

            )}
        </GlobalContext.Consumer>
    );
}

export default Base;

