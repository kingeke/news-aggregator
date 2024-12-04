import { Close } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useSnackbar } from 'notistack'
import React from 'react'

function CloseSnackBar() {

    const { closeSnackbar } = useSnackbar()

    return (
        <IconButton
            onClick={() => closeSnackbar()}
        >
            <Close className='text-white' />
        </IconButton >
    )
}

export default CloseSnackBar