import '../sass/app.scss';
import './bootstrap';
if (import.meta.hot) {
    import.meta.hot.on(
        "vite:beforeUpdate",
        () => console.clear()
    );
}


import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import ErrorBoundary from '@/Components/Layouts/ErrorBoundary';
import Main from '@/Components/Layouts/Main';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

const theme = createTheme({
    typography: {
        button: {
            textTransform: "none"
        },
        body1: {
            fontWeight: 400,
        },
    },
    palette: {
        secondary: {
            main: "#fff",
        },
        primary: {
            main: "#ff6813",
            contrastText: "#fff"
        },
        error: {
            main: "#ff3a3a"
        },
        info: {
            main: "#FFECDB",
        },
        success: {
            main: "#CDFEE1",
        },
        // warning: {
        //     main: '#FDF0E3'
        // }
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                elevation1: {
                    [defaultTheme.breakpoints.down("sm")]: {
                        boxShadow: "none !important",
                    }
                },
            }
        },
        MuiFormHelperText: {
            styleOverrides: {
                contained: {
                    marginLeft: 0
                }
            }
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    borderColor: '#DADBDD'
                }
            }
        }
    }
});

createInertiaApp({
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <App
                {...props}
                children={({ Component, props, key }) => {
                    return (
                        <ThemeProvider theme={theme}>
                            <ErrorBoundary>
                                <LocalizationProvider dateAdapter={AdapterMoment}>
                                    <Main
                                        children={<Component {...props} key={key} />}
                                    />
                                </LocalizationProvider>
                            </ErrorBoundary>
                        </ThemeProvider>
                    );
                }}
            />
        );
    },
    progress: {
        color: '#4B5563',
    },
});
