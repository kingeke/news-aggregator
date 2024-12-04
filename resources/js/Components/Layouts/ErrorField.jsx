import React, { Fragment } from 'react'
import { usePage } from '@inertiajs/react'

function ErrorField({ name }) {

    const { errors } = usePage().props

    return errors[name] ? (
        <div className="parsley-errors-list filled">
            {errors[name]}
        </div>
    ) : <Fragment />
}

export default ErrorField