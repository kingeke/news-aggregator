import React from 'react';
import { logo } from '@/assets/pictures';
import { Link, usePage } from '@inertiajs/react';
import { Button } from '@mui/material';

function ErrorHandler({ status, errorMessage }) {

    const { authUser } = usePage().props;

    const title = {
        503: '503: Service Unavailable',
        500: '500: Server Error',
        404: '404: Page Not Found',
        403: '403: Forbidden',
        401: '401: Unauthorized',
        900: 'Client Error'
    }[status];

    const description = {
        503: 'Sorry, we are doing some maintenance and would be done soon. Please check back later.',
        500: 'Whoops, something went wrong on our servers.',
        404: 'Sorry, the page you are looking for could not be found.',
        403: 'Sorry, you are forbidden from accessing this page.',
        401: 'Sorry, you are not authorized to access this page.',
        900: 'Sorry, an error just occurred, please refresh your page and try again, if the problem persists please contact us immediately to resolve the issue.'
    }[status];

    return (
        <div className="container">
            <div className="row min-vh-100 d-flex justify-content-center align-items-center">
                <div className="col-md-6 mx-auto">
                    <div className="text-center">
                        <div className="my-3">
                            {logo}
                        </div>
                        <div className="mb-3">
                            <h4 className="text-danger">{title}</h4>
                        </div>
                        <p>{description}</p>
                    </div>
                    {
                        authUser?.id &&
                        <div className="text-center">
                            <Link href={route('dashboard')}>
                                <Button
                                    className="mb-3"
                                    variant="contained"
                                    color="default"
                                    margin="normal"
                                    size="large"
                                >
                                    Go to Dashboard
                                </Button>
                            </Link>
                        </div>
                    }
                    {
                        errorMessage &&
                        <div className="my-3 p-3 bg-light text-center">
                            <code>
                                {errorMessage}
                            </code>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default ErrorHandler;