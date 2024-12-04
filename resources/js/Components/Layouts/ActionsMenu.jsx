import { MoreVert } from '@mui/icons-material';
import { Divider, IconButton, List, ListItem, ListItemIcon, ListItemText, Menu, Tooltip } from '@mui/material';
import { Fragment, useState } from 'react';
import { Link } from '@inertiajs/react';
import NestedListItem from './Components/NestedListItem';

function ActionsMenu({ actions, title = 'Actions', icon }) {

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleAction = (e, item) => {

        handleClose()

        if (item.action) {

            e.preventDefault()

            return item.action()
        }
    }

    actions = actions && actions.filter(group => group.filter(item => item.show || item.show === undefined).length > 0)

    return (
        <Fragment>
            {
                actions.length > 0 &&
                <Fragment>
                    <Tooltip title={title}>
                        <IconButton onClick={handleClick}>
                            {icon ? icon : <MoreVert />}
                        </IconButton>
                    </Tooltip>
                    <Menu
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        PaperProps={{
                            style: {
                                minWidth: 280
                            }
                        }}
                    >
                        {
                            actions && actions.map((group, index) => (
                                <div key={index}>
                                    {
                                        (group.show || group.show == undefined) &&
                                        <div>
                                            <List>
                                                {
                                                    group && group.filter(i => i.show || i.show === undefined).length > 0 && group.map((item, index) => (
                                                        <Fragment key={index}>
                                                            {
                                                                (item.show || item.show == undefined) &&
                                                                <Fragment>
                                                                    {item.children && item.children.filter(i => i.show || i.show === undefined).length > 0 ? (
                                                                        <NestedListItem
                                                                            parent={item}
                                                                            children={item.children}
                                                                            handleRoute={handleAction}
                                                                            nestedPaddingLeft={5}
                                                                        />
                                                                    ) :
                                                                        <Link
                                                                            className="text-initial"
                                                                            href={item.route}
                                                                            onClick={(e) => handleAction(e, item)}
                                                                            method={item.method}
                                                                            as={item.method ? 'span' : 'a'}
                                                                            data={item.data}
                                                                        >
                                                                            <ListItem button>
                                                                                <ListItemIcon>{item.icon}</ListItemIcon>
                                                                                <ListItemText primary={item.title} />
                                                                            </ListItem>
                                                                        </Link>
                                                                    }
                                                                </Fragment>
                                                            }
                                                        </Fragment>
                                                    ))
                                                }
                                            </List>
                                            {
                                                group.filter(i => i.show || i.show === undefined).length > 0 &&
                                                <Divider />
                                            }
                                        </div>
                                    }
                                </div>
                            ))
                        }
                    </Menu>
                </Fragment>
            }
        </Fragment>
    );
}

export default ActionsMenu
