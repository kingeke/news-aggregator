import React from 'react';
import NavItems from '@/Components/Layouts/Components/NavItems';
import { css } from '@emotion/css';

function NavBar({ 
    title,
    icon,
    children,
    showBack,
    showRefresh,
    rightItem
 }) {

    const useStyles = () => ({
        root: css({
            display: 'flex !important',
        }),
        content: css({
            flexGrow: 1,
            width: 100,
        }),
    });
    
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <NavItems 
                title={title}
                icon={icon}
                showBack={showBack}
                showRefresh={showRefresh}
                rightItem={rightItem}
            />
            <main className={classes.content}>
                {children}
            </main>
        </div>
    );
}

export default NavBar;

