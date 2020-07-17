import React from "react";
import './ErrorIndicator.css'
const ErrorIndicator = ({reloadAfterError}) => {

    return (
        <div className='error-indicator col-12 w-100 mt-5 mb-5'>
            <h1 className='text-warning text-center'>BOOM!</h1>
            <span className='text-center text-warning d-block'>Ой, кажется что-то сломалось, попробуйте поззже или просто нажмите обновить</span>
            <span className='text-center text-warning d-block'>Мы действительно постараемся починить это в ближайшее время.</span>

            <a href='/' className="btn btn-success mt-5 d-table mx-auto" onClick={reloadAfterError}>Обновить!</a>
        </div>
    )
}

export default ErrorIndicator;