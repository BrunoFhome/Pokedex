import React from "react";
import "./Pagination.css"

const Pagination = (props) => {
    const {page, totalPages, onLeftClick, onRightClick} = props
    return(
        <div className="pgcontainer">
            <button onClick={onLeftClick}><div>👈</div></button>
            <div>{page} de {totalPages}</div>
            <button onClick={onRightClick}><div>👉</div></button>
        </div>
    )
}

export default Pagination;