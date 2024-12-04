import { css } from '@emotion/css';
import { useTheme } from "@emotion/react";
import { AppBar } from "@mui/material";
import clsx from "clsx";
import { drawerWidth } from "../Config/Helpers";
import NavBar from './NavBar';

export default function AuthenticatedLayout({
    title,
    icon,
    children,
    showBack = true,
    showRefresh = true,
    rightItem
}) {

    const theme = useTheme();

    const useStyles = (theme => ({
        content: css({
        }),
        children: css({
            margin: '81px 16px 0 0px !important',
            padding: '30px 50px',
            [theme.breakpoints.down('lg')]: {
                margin: "60px auto auto auto !important",
            },
            [theme.breakpoints.down('sm')]: {
                padding: '10px',
            },
        })
    }));

    const classes = useStyles(theme);

    return (
        <div className={clsx(["authenticated-layout", classes.content])}>
            <NavBar
                title={title}
                icon={icon}
                showBack={showBack}
                showRefresh={showRefresh}
                rightItem={rightItem}
            >
                <AppBar
                    className={clsx(['m-0 m-sm-3 mt-3', classes.children])}
                    color='transparent'
                    sx={{
                        zIndex: 1,
                        width: "98%",
                        [theme.breakpoints.up('lg')]: {
                            width: `calc(97% - ${drawerWidth}px)`,
                            marginBottom: '20px !important'
                        },
                        boxShadow: 'none',
                        border: {
                            md: 'none',
                            lg: '1px solid #ECEFF0 !important;'
                        },
                        borderRadius: {
                            md: '0',
                            lg: '0 0 20px 20px'
                        },
                        position: {
                            xs: 'relative',
                            sm: 'fixed'
                        },
                        top: 0,
                        bottom: 0,
                        overflowY: 'auto',
                        marginBottom: '10px !important'
                    }}
                >
                    <div className="children">
                        {children}
                    </div>
                </AppBar>
            </NavBar>
        </div>
    );
}
