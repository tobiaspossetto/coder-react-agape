import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import Item from './Item'
import axios from 'axios'
const ItemList = () => {

    //traigo category
    const { category } = useParams();
    
    //estado donde guardo los productos
    const [products, setProducts] = useState([]);
   
    

    //Ejecuta getProducts, depende de la llegada de category
    useEffect(()=>{  
        
        //ACLARACION: MOVI LA FUNCION DENTRO DEL useEffect porque es la forma en la que desaparecen las advertencias 
        //https://stackoverflow.com/questions/55840294/how-to-fix-missing-dependency-warning-when-using-useeffect-react-hook
        //respuesta 233

        const getProducts = async () =>{
            //Si llega un parametro de category entonces
            if(category){
                //Llama a la api pasandole la categoria
                const data = await axios.get(`http://localhost:4000/product/category/${category}`)
    
                //IMPORTANTE: uso la libreria axios. Solo para probar cosas nuevas
                //Envio data.data porque  en axios .data es lo mismo que text() en fetch
                setProducts(data.data)
               
            }else{
                //llama a la api para que traiga todo
                const data = await axios.get(`http://localhost:4000/products`)
             
                setProducts(data.data)
              
            }
        }
        getProducts()
         
    },[category])




    
      
       


    return (
        <div className="container-fluid pt-5">


            <div className="row m-auto ">
                {/* Mapeo el producto */}
                {
                products.map((i ) =>{
                    return(

                        <div key={i.id}  className="col-10 col-sm-4 col-md-4 m-auto " >
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
