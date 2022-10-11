import { GlobalContext } from "../contexts/globalContext";
import { Route, Routes, useNavigate } from "react-router-dom";
import AdminHome from "./dean-home/adminHome";
import "./adminBase.css";
import { AppBar, Box, Button, CssBaseline, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { CalendarMonth, Home, Menu, People, Work } from "@mui/icons-material";
import StaffCourses from "./staff-courses/staffCourses";
import UsersPage from "./admin-users-page/adminUsersPage";


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


let AdminBase = () => {

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
                                    <ListItemButton sx={listItemButtonStyle} onClick={() => navigateToPage("users")}>
                                        <ListItemIcon sx={listItemIconStyle}>
                                            <People />
                                        </ListItemIcon>
                                        {
                                            drawerOpen &&
                                            <ListItemText primary={"Users"} sx={{ ml: 3 }} />
                                        }
                                    </ListItemButton>
                                    <ListItemButton sx={listItemButtonStyle} onClick={() => navigateToPage("appointments")}>
                                        <ListItemIcon sx={listItemIconStyle}>
                                            <CalendarMonth />
                                        </ListItemIcon>
                                        {
                                            drawerOpen &&
                                            <ListItemText primary={"Appointments"} sx={{ ml: 3 }} />
                                        }
                                    </ListItemButton>
                                    <ListItemButton sx={listItemButtonStyle} onClick={() => navigateToPage("specialties")}>
                                        <ListItemIcon sx={listItemIconStyle}>
                                            <Work />
                                        </ListItemIcon>
                                        {
                                            drawerOpen &&
                                            <ListItemText primary={"Specialties"} sx={{ ml: 3 }} />
                                        }
                                    </ListItemButton>
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
                            <Route path="" element={<AdminHome />} />

                            <Route path="staff/*" element={<UsersPage context={context} />} />
                            <Route path="dean/*" element={<StaffCourses context={context} />} />
                        </Routes>
                    </Box>
                </Box>

            )}
        </GlobalContext.Consumer>
    );
}

export default AdminBase;

