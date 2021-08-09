import React from 'react'
import * as RiIcons from 'react-icons/ri'
import('../styles.css')
const Footer = () => {
    return (
        <div className="footer ">
            <div><p> Agape 2021</p></div>
        
            <div className="redes">
          
                
                    <a rel="noreferrer" target="_blank" href='https://www.instagram.com/agapetiendaonline/?hl=es'><RiIcons.RiInstagramFill size={30} /></a>

                    <a rel="noreferrer"  target="_blank" href='https://www.facebook.com/pages/category/Clothing-Store/%C3%81gape-Tienda-Online-105297704567427/'><RiIcons.RiFacebookBoxFill size={30} /></a>

                    <a rel="noreferrer" target="_blank"  href='https://api.whatsapp.com/send?phone=549356465-6612'> <RiIcons.RiWhatsappFill  size={30}/></a>
               
            </div>
        </div>
    )
}

export default Footer
