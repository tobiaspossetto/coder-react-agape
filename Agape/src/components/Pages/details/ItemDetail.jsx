import React, { useState } from 'react'
import ItemCount from './ItemCount'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Typography from '@material-ui/core/Typography';



import * as MdIcons from 'react-icons/md'
import * as GiIcons from 'react-icons/gi'
import { Link } from 'react-router-dom';

import { Toast } from 'react-bootstrap';


//Propio de Material UI
const useStyles = makeStyles({
    root: {
        maxWidth: 600,
    },
});



const ItemDetail = ({ product }) => {


    const classes = useStyles();

    //state para el contador
    const [count, setCount] = useState(1);

    const [show, setShow] = useState(false);

    const [add, setAdd] = useState(false);
    //Estas funciones suman o restan, rango 1-5
    const onAdd = () => {
        if (count < 5) {
            setCount(count + 1)
        }
    }
    const onQuit = () => {
        if (count > 1) {
            setCount(count - 1)
        }
    }

    //funcion para verificar si se hizo click en agregar al carrito y renderizar el link

    const addProd = () => {
        setAdd(true)
        setShow(true)
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
                                </CardContent>
                            </CardActionArea>
                            <CardActions className='d-flex justify-content-between'>
                                <ItemCount valor={count} sumar={onAdd} restar={onQuit} />
                                <button className='shadow-lg btn btn-warning' onClick={addProd}>Agregar al carrito</button>
                            </CardActions>
                        </Card>
                        {add === false ? <div></div> :
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
