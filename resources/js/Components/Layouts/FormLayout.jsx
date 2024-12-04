import React, { useEffect } from 'react';

function FormLayout({
    handleSubmit,
    children
}) {

    let formRef = React.createRef();

    const handleFormSubmit = async (e) => {
        let form = $(formRef.current).data('Parsley');
        if (form.isValid()) {
            e.preventDefault();
            $(formRef.current).parsley().reset();
            return handleSubmit();
        }
    };

    useEffect(() => {
        $(formRef.current).parsley({
            errorsContainer: function (el) {
                return el.$element.closest('.form-group');
            },
        });
    }, []);

    return (
        <form
            onSubmit={handleFormSubmit}
            ref={formRef}
        >
            {children}
        </form>
    );
}

export default FormLayout;