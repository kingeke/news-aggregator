import { router } from '@inertiajs/react';
import { Error } from '@mui/icons-material';
import { SnackbarProvider } from 'notistack';
import { useEffect, useState } from 'react';
import { LoaderContext } from '../Contexts';
import CloseSnackBar from './Components/CloseSnackbar';
import Loader from './Loader';
import Notification from './Notification';

function Main({ children }) {

    let snackbarRef;

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        router.on('start', () => {
            setLoading(true);
        });

        router.on('finish', () => {
            setLoading(false);
        });

    }, []);

    return (
        <SnackbarProvider
            iconVariant={{
                'error': <Error className="mr-2" />,
            }}
            ref={(ele) => { snackbarRef = ele; }}
            onClose={(event, reason, key) => {
                if (reason === 'clickaway') {
                    snackbarRef.closeSnackbar(key);
                }
            }}
            autoHideDuration={30000}
            maxSnack={1}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            disableWindowBlurListener={true}
            action={<CloseSnackBar />}
        >
            <LoaderContext.Provider value={{ setLoading }}>
                <Loader show={loading} />
                <Notification />
                {children}
            </LoaderContext.Provider>
        </SnackbarProvider>
    );
}

export default Main;