import React from 'react'



//Toma los props y renderiza
const LinkWidget = (props) => {
    return (
        <div className="cardWidget">
            <div className="d-flex align-items-center"> 
          
                {props.icon}
               
                 <span className="ml-2 ">{props.name}</span>
            </div>
           
        </div>
    )
}

export default LinkWidget


