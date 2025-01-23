import { drawerWidth } from '@/Components/Config/Helpers';
import { HomeIcon } from '@/Components/Icons';
import { css } from '@emotion/css';
import { useTheme } from '@emotion/react';
import { Link, router, usePage } from '@inertiajs/react';
import { ArrowBackIos, Logout, Person, Refresh, Settings } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { Tooltip } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import React, { Fragment } from 'react';
import ApplicationLogo from '../ApplicationLogo';
import NestedListItem from './NestedListItem';

export default function NavItems({
    title,
    icon,
    showBack = true,
    showRefresh = true,
    rightItem
}) {

    const { authUser } = usePage().props;

    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const theme = useTheme();

    const useStyles = (theme) => ({
        selected: css({
            backgroundColor: 'transparent !important',
            color: `${theme.palette.primary.main} !important`,
        }),
    });

    const classes = useStyles(theme);

    const menuItems = [
        [
            {
                title: "Home",
                icon: <HomeIcon />,
                route: "dashboard",
                show: true,
            },
            {
                title: "Profile",
                icon: <Person />,
                route: "profile.edit",
                show: true,
            },
            {
                title: "Run Scrapper",
                icon: <Settings />,
                route: "runScrapper",
                show: true,
            },
            {
                title: 'Logout',
                icon: <Logout />,
                route: 'logout',
                method: 'post',
                show: true
            },
        ]
    ];

    const handleGoBack = () => {
        window.history.back();
        if (showRefresh) {
            setTimeout(() => {
                handleRefreshPage();
            }, 100);
        }
    };

    const handleRefreshPage = () => {
        router.reload({
            preserveState: false,
            preserveScroll: false
        });
    };

    const drawer = (
        <div>
            <Toolbar>
                <div className="m-auto w-100">
                    <Link href={route('dashboard')}>
                        <ApplicationLogo width={50} />
                    </Link>
                </div>
                <Divider />
                <div className='user-profile pb-3'>
                    <div className="mt-4">
                        <div className="d-flex align-items-center justify-content-between">
                            <div className='ms-2'>
                                <h6 className="p-0 m-0">{authUser?.name}</h6>
                                <small className="p-0 m-0 font-size-13">{authUser?.email}</small>
                            </div>
                        </div>
                    </div>
                </div>
                <Divider />
            </Toolbar>
            <Divider variant='middle' />
            <div className='p-3'>
                {
                    menuItems.map((group, index) => (
                        <Fragment key={index}>
                            <List>
                                {group?.filter(i => i.show).map((item, index) => (
                                    <Fragment key={index}>
                                        {item.show && (
                                            <Fragment>
                                                {item.children ? (
                                                    <NestedListItem
                                                        parent={item}
                                                        children={item.children}
                                                    />
                                                ) : (
                                                    <Link
                                                        className="text-initial"
                                                        href={route(item?.route || 'dashboard')}
                                                        method={item.method}
                                                        as={item.method ? 'span' : 'a'}
                                                    >
                                                        <ListItemButton
                                                            selected={item.route == route().current()}
                                                            classes={{
                                                                selected: classes.selected
                                                            }}
                                                        >
                                                            <ListItemIcon >
                                                                {item.icon}
                                                            </ListItemIcon>
                                                            <ListItemText
                                                                primary={item.title}
                                                            />
                                                        </ListItemButton>
                                                    </Link>
                                                )}
                                            </Fragment>
                                        )}
                                    </Fragment>
                                ))}
                            </List>
                            {
                                group?.filter(i => i?.show).length > 0 &&
                                <Divider />
                            }
                        </Fragment>
                    ))
                }
            </div>
        </div>
    );

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CssBaseline />
            <AppBar
                className='m-0 m-xl-3 mx-auto'
                position="fixed"
                sx={{
                    width: "98%",
                    [theme.breakpoints.up('lg')]: {
                        width: `calc(97% - ${drawerWidth}px)`
                    },
                    margin: "none",
                    boxShadow: 'none',
                    border: {
                        md: 'none',
                        lg: '1px solid #ECEFF0;'
                    },
                    borderRadius: {
                        md: '0',
                        lg: '20px 20px 0 0'
                    },
                    backgroundColor: '#fff',
                    color: 'initial'
                }}
            >
                <Toolbar >
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: { xs: 1, sm: 2 }, display: { lg: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    {
                        showBack &&
                        <Tooltip title="Go Back" className="me-0 me-sm-2">
                            <IconButton onClick={handleGoBack}>
                                <ArrowBackIos />
                            </IconButton>
                        </Tooltip>
                    }
                    <div className='d-flex justify-content-center align-items-center svg-grey'>
                        {icon}
                        <h6 className='p-0 m-0 ms-3 navbar-title'>{title}</h6>
                    </div>
                    <div className="d-flex flex-wrap align-items-center ms-auto">
                        {
                            showRefresh &&
                            <Tooltip title="Refresh Page">
                                <IconButton onClick={handleRefreshPage} className="mr-2">
                                    <Refresh />
                                </IconButton>
                            </Tooltip>
                        }
                        {rightItem}
                    </div>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { lg: drawerWidth }, flexShrink: { lg: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: 'none',
                        [theme.breakpoints.down('lg')]: {
                            display: 'block'
                        },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: 'block',
                        [theme.breakpoints.down('lg')]: {
                            display: 'none'
                        },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: 'none' },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
        </Box>
    );
}