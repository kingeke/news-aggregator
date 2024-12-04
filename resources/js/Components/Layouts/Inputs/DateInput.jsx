import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import React, { Fragment, useEffect } from 'react';
import moment from 'moment';
import ErrorField from '../ErrorField';

function DateInput({
    form,
    handleDateChange,
    required = true,
    views = ['year', 'month', 'day'],
    openTo = 'year',
    format = "MMMM Do, YYYY",
    inputName,
    label,
    disablePast = false,
    disableFuture = false,
    maxDate,
    minDate
}) {

    const inputRef = React.createRef()

    useEffect(() => {
        inputRef.current.required = true
    }, [])

    return (
        <Fragment>
            <div className="form-group">
                <DatePicker
                    name={inputName}
                    label={label}
                    openTo={openTo}
                    views={views}
                    className='w-100'
                    format={format}
                    disablePast={disablePast}
                    disableFuture={disableFuture}
                    value={form[inputName] ? moment(form[inputName]) : null}
                    required={required}
                    onChange={date => handleDateChange(date, inputName)}
                    minDate={minDate}
                    maxDate={maxDate}
                    inputRef={inputRef}
                />
                <ErrorField name={inputName} />
            </div>
        </Fragment>
    );
}

export default DateInput;
