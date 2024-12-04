import { Chip, Stack } from '@mui/material';
import React from 'react';

export default function CustomTabs({
    tabs,
    tabValue,
    setTabValue
}) {

    const handleTabChange = (item) => {

        setTabValue(item?.key);

        history.pushState({}, null, `${location.pathname}?tab=${item?.key}`);
    };

    return (
        <Stack
            sx={{
                overflowX: 'scroll',
                paddingBottom: '15px',
                marginBottom: '30px'
            }}
            direction="row"
            spacing={2}
        >
            {
                tabs?.map((item, index) => (
                    <Chip
                        key={index}
                        className="p-2"
                        label={item?.title}
                        color={item?.key == tabValue ? "primary" : 'default'}
                        variant={item?.key == tabValue ? "filled" : 'outlined'}
                        onClick={() => handleTabChange(item)}
                    />
                ))
            }
        </Stack>
    );
}
