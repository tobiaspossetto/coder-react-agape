import React from 'react'

import ItemList from './ItemList'
require('../../styles.css')
const ItemListContainer = () => {

    //ESTE COMPONENTE PARA MI ESTA AL VICIO, PERO ES PARA CUMPLIR CON LA CONSIGNA
    return (
        <div className="pages">
            <ItemList/>
            
        </div>
    )
}

export default ItemListContainer
