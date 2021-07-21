import * as FaIcons from 'react-icons/fa'
import * as GiIcons from 'react-icons/gi'





//Este objeto contiene cada link con su nombre e icono correspondiente. 

//La razon de hacerlo asi es para que sea mas dinamico a mi parecer.
const links = [
    {
        "icon":  <FaIcons.FaHome size={25} color='ffac40'/>,
        "name": "Inicio",
        "to": "/"

    },
    {
        "icon":  <FaIcons.FaStore size={25} color='ffac40'/>,
        "name": "Todos los Productos",
        "to": "/productos"
    },
    {
        "icon":  <GiIcons.GiClothes size={25} color='ffac40'/>,
        "name": "Ropa",
        "to": "/productos/category/Ropa"
    },
    {
        "icon":  <GiIcons.GiBigDiamondRing size={25} color='ffac40'/>,
        "name": "Accesorios",
        "to": "/productos/category/Accesorios"
    },
    {
        "icon":  <FaIcons.FaShoppingCart size={25} color='ffac40'/>,
        "name": "Carrito",
        "to": "/carrito"
    }
   
    
   
    
]

export default links