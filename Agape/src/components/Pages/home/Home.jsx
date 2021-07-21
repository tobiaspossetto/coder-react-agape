
import React from 'react'

import * as RiIcons from 'react-icons/ri'
import Portada from './Portada'

require('../../styles.css')
const Home = () => {
    return (
        <div className='pages'>
            <Portada/>
           

            <div className="contacto">
                <h2>Podes contactarte con nosotros en:</h2>
                <div className="item">
                    <a rel="noreferrer" target="_blank" href='https://www.instagram.com/agapetiendaonline/?hl=es'><RiIcons.RiInstagramFill  className="logo-social inst"/></a>
                    <a rel="noreferrer"  target="_blank" href='https://www.facebook.com/pages/category/Clothing-Store/%C3%81gape-Tienda-Online-105297704567427/'><RiIcons.RiFacebookBoxFill className="logo-social face"/></a>
                    <a rel="noreferrer" target="_blank"  href='https://api.whatsapp.com/send?phone=549356465-6612'> <RiIcons.RiWhatsappFill className="logo-social whats"/></a>
                </div>
            </div>
        </div>
    )
}

export default Home
