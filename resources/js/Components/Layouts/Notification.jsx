import { usePage } from '@inertiajs/react';
import { useSnackbar } from 'notistack';
import { Fragment, useEffect } from 'react';

function Notification() {

    const { enqueueSnackbar } = useSnackbar()

    const { notification } = usePage().props

    useEffect(() => {
        if (notification) {

            enqueueSnackbar(notification.body, {
                variant: getSeverity(notification.status)
            })

            delete history?.state?.props?.notification
        }
    }, [notification])

    const getSeverity = (status) => {
        return status === 'danger' ? 'error' : status
    }

    return <Fragment />
}

export default Notification