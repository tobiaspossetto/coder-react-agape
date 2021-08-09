import React, { useState} from 'react'
import ItemCount from './ItemCount'
import {useCart} from '../../context/cart-context'
import {useFirebase} from '../../context/firebase-context'
import { Link } from 'react-router-dom';

//Importacion de bootstrap
import { Toast } from 'react-bootstrap';

//Importaciones de MaterialUI
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

//Importaciones de React icons
import * as MdIcons from 'react-icons/md'
import * as GiIcons from 'react-icons/gi'

//Propio de Material UI
const useStyles = makeStyles({
    root: {
        maxWidth: 600,
    },
});


const ItemDetail = ({ product }) => {
    const classes = useStyles();

    const {verifyReply} = useCart()
    const {setidPedido} = useFirebase()
    //state para el contador, siempre desdde 1
    const [count, setCount] = useState(1);
    //states para el Toast de bootstrap y el btn para ir al cart
    const [show, setShow] = useState(false);
    const [add, setAdd] = useState(false);

    const addItem = () => {
       //Si se añadio un producto llamo a la funcion verifyReply, que se encarga de reemplazar o agregar
        verifyReply(product,count)
       //borro el mensaje de id si es que habia un pedido anterior
        setidPedido('')
        //Muestro el Toast y el btn
        setAdd(true)
        setShow(true)
    }


    //Estas funciones suman o restan, rango 1-stock
    const onAdd = () => {
        if (count < product.stock ) {
            setCount(count + 1)
        }
        
    }
    const onQuit = () => {
        if (count > 1) {
            setCount(count - 1)
        }
    }


    return (
        <>

            <div className="container-fluid pt-5 pb-5 ">


                <div className="row m-auto">
                    <div className="col-11 col-sm-6 col-md-6 m-auto" >


                        <Link className='shadow-lg btn btn-primary mb-3' to='/productos'><MdIcons.MdArrowBack size={25} /></Link>
                        <Card className={'shadow-lg  m-auto ' + classes.root}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    alt="Contemplative Reptile"
                                    height="350"
                                      image={product.img}
                                    title="Contemplative Reptile"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {product.name}
                                       
                                      
                                    </Typography>
                                
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {product.description}
                                    </Typography>
                                    <Typography variant="h6" color="textPrimary" component="p">
                                        Precio: ${product.price}  -  Stock:{product.stock}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions className='d-flex justify-content-between'>
                                {
                                    product.stock <= 0?<p>Sin stock</p> :
                                    <>
                                        <ItemCount valor={count} sumar={onAdd} restar={onQuit} />
                                        <button className='shadow-lg btn btn-warning' onClick={addItem}>Agregar al carrito</button>
                                    </>
                                }
                              
                            </CardActions>
                        </Card>
                        {add === true &&
                            <div className='d-flex justify-content-center align-items-center mt-3'>
                                <Link to='/carrito' className='btn btn-warning  w-80 d-flex justify-content-center align-items-center'><GiIcons.GiClick size={20} />  <span className='font-weight-bold  ml-1 mb-0'>Finalizá tu compra</span></Link>
                            </div>

                        }
                        
                    </div>

                </div>
                <Toast  onClose={() => setShow(false)} show={show} delay={3000} autohide>
                            <Toast.Header style={{background: '#4caf50'}} className='d-flex justify-content-between text-white'>

                                <strong className="me-auto">Añadido con exito</strong>

                            </Toast.Header>
                            <Toast.Body>
                                Puede editar su compra en el carrito
                            </Toast.Body>
                           
                </Toast>
            </div>

        </>
    )
}

export default ItemDetail
