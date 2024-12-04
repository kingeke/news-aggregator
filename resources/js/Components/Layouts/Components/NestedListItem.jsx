import { css } from '@emotion/css';
import { useTheme } from '@emotion/react';
import { Link } from '@inertiajs/react';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, List, ListItem, ListItemIcon, ListItemText, ListItemButton } from '@mui/material';
import React, { Fragment, useState } from 'react';

function NestedListItem({ parent, children, nestedPaddingLeft = 4 }) {

    const theme = useTheme();

    const useStyles = (theme) => ({
        root: css({
            backgroundColor: 'black'
        }),
        selected: css({
            backgroundColor: 'transparent !important',
            color: `${theme.palette.primary.main} !important`,
            borderRadius: "4px"
        }),
    });

    const classes = useStyles(theme);

    const [open, setOpen] = useState(false);

    return (
        <Fragment>
            <ListItem onClick={() => setOpen(!open)}>
                <ListItemIcon >
                    {parent.icon}
                </ListItemIcon>
                <ListItemText primary={parent.title} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {
                        children.map((item, index) => (
                            <Fragment key={index}>
                                {
                                    (item.show || item.show == undefined) &&
                                    <Link
                                        className="text-initial"
                                        href={route(item?.route || 'home')}
                                        method={item.method}
                                        as={item.method ? 'span' : 'a'}
                                        data={item.data}
                                    >
                                        <ListItemButton
                                            sx={{ pl: nestedPaddingLeft }}
                                            selected={item.route == route().current()}
                                            classes={{
                                                selected: classes.selected
                                            }}
                                        >
                                            <ListItemIcon>
                                                {item.icon}
                                            </ListItemIcon>
                                            <ListItemText primary={item.title} />
                                        </ListItemButton>
                                    </Link>
                                }
                            </Fragment>
                        ))
                    }
                </List>
            </Collapse>
        </Fragment>
    );
}

export default NestedListItem;