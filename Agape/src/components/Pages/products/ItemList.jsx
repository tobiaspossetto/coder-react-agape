import React from 'react'
import Item from './Item'

const ItemList = (props) => {

    return (
        <div className="container-fluid pt-5">


            <div className="row m-auto ">
                {/* Mapeo el producto */}
                {
                props.products.map((i,index ) =>{
                    return(

                        <div key={index}  className="col-10 col-sm-4 col-md-4 m-auto " >
                            <Item  prodID = {i.id} title={i.name} price={i.price} description={i.description} cat={i.category} img={i.img}/>
                        </div>
                    )
                })
                }

               


            </div>
        </div>
    )
}

export default ItemList
