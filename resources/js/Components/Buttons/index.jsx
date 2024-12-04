import { Button } from "@mui/material";

export const PrimaryButton = ({
    type = 'submit',
    color = 'primary',
    variant = "contained",
    children,
    ...props
}) => {
    return (
        <Button
            {...props}
            variant={variant}
            color={color}
            type={type}
        >
            {children}
        </Button>
    );
};

export const DangerButton = ({
    type = 'submit',
    color = 'error',
    variant = "contained",
    children,
    ...props
}) => {
    return (
        <Button
            {...props}
            variant={variant}
            color={color}
            type={type}
        >
            {children}
        </Button>
    );
};

export const InfoButton = ({
    type = 'button',
    color = "info",
    variant = "contained",
    children,
    ...props
}) => {
    return (
        <Button
            {...props}
            variant={variant}
            color={color}
            type={type}
        >
            {children}
        </Button>
    );
};

export const SecondaryButton = ({
    type = 'button',
    color = "secondary",
    variant = "contained",
    children,
    ...props
}) => {
    return (
        <Button
            {...props}
            variant={variant}
            color={color}
            type={type}
        >
            {children}
        </Button>
    );
};
