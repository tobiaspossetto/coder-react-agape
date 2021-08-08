import React from 'react'

const ItemCartCount = (props) => {
    return (
        <div className="countdetail-container">
            <button className='btn btn-danger  btn-sm' onClick={props.quit}>-</button>
           
          
            <p className="display-4"> {props.quantity}/{props.stock}</p>
            <button className='btn btn-success  btn-sm' onClick={props.add}>+</button>
        </div>
    )
}

export default ItemCartCount
