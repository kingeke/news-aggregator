import React from 'react'
import { NumericFormat } from 'react-number-format';

const NumberFormatCustom = React.forwardRef((props, ref) => {

    const { prefix = "\u20A6", inputRef, onChange, ...other } = props;

    return (
        <NumericFormat
            {...other}
            getInputRef={ref}
            decimalScale={2}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            prefix={prefix}
        />
    );
})

export default NumberFormatCustom;