import React, {useState, useEffect} from 'react'
import ItemCartCount from './ItemCartCount'
import {useCart} from '../../context/cart-context'
import {useFirebase} from '../../context/firebase-context'
//React Icons
import * as MdIcons from 'react-icons/md'
import * as BsIcons from 'react-icons/bs'
//PARA EL ACCORDION DE Material UI
import { withStyles, makeStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';

//TABLA de Material UI
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import('./carrito.css')
//ESTILOS PROPIOS DADOS POR MUI PARA ACCORDION
const Accordion = withStyles({
  root: {
    background: '#ffa333',

    // border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {

    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,

    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
    display: 'flex',
    justifyContent: 'space-between',
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    background: '#383838'
  },
}))(MuiAccordionDetails);
//ESTILOS DADOS POR MUI PARA TABLA 
const useStyles = makeStyles({
  table: {
    Width: '70%',
  },
});


const CartItem = (props) => {
  const classes = useStyles();
  const {modifyProduct,removeProduct} = useCart()
  const {allProducts} = useFirebase()


  const [stockItem, setstockItem] = useState(0)
  //Contador del item, comienza con la cantidad agregada
  const [quantityEdit, setQuantityEdit] = useState(props.quantity);
  

  //Este useEffect trae el stock del producto para limitar el count 
  //Quiza se podria  optimizar con algun memo? lo intente pero no me funciono, de todas formas solo esta filtrando pocos productos
  useEffect(() => {
    
    allProducts.forEach(product => {
      if(product.id === props.id){
        setstockItem(product.stock)
      }
    })
   
   
  },[])


  const remove = () => {
    //Llama a la funcion y le pasa el id del producto a remover
    removeProduct(props.id)
  }
 
  //Funciones para el contador
  const quit = () => {
    if(quantityEdit>1){
      setQuantityEdit(quantityEdit - 1)
    }
     
   
  }

  const add = () => {
      if(quantityEdit < stockItem){
         setQuantityEdit(quantityEdit + 1)
      }
      
  }


  //Cuando modifico el count modifica la cantidad del producto
  useEffect(() => {
      modifyProduct(props.id, quantityEdit)
  }, [quantityEdit]);


  
  
  return (

    <div className='item  '>
      <Accordion square  >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <h6 >{props.name}</h6>
          
          <BsIcons.BsArrowsExpand color='#1f1d1d' size={30} />
        </AccordionSummary>
        <AccordionDetails className='accordion-details'>
          <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow >

                  <TableCell >{props.description}</TableCell>
                 
                  <TableCell></TableCell>

                </TableRow>
              </TableHead>
              <TableBody>

              

                <TableRow>

                  <TableCell >Precio/U</TableCell>
                  <TableCell >${props.price}</TableCell>

                </TableRow>
                <TableRow>

                  <TableCell >Cantidad</TableCell>
                  <TableCell >
                   
                      <ItemCartCount stock={stockItem} quantity={quantityEdit} quit={quit} add={add}/>
                    
                    </TableCell>
                  
                </TableRow>
                <TableRow>

                  <TableCell >Total</TableCell>
                  <TableCell >${props.price * quantityEdit}</TableCell>

                </TableRow>
                <TableRow>

                  <TableCell >Borrar</TableCell>
                  <TableCell > <button onClick={remove} className='btn btn-danger '>
                    <MdIcons.MdDelete color='white' size={25} />

                  </button></TableCell>

                </TableRow>

              </TableBody>
            </Table>
          </TableContainer>

        </AccordionDetails>
      </Accordion>


    </div>
  )
}

export default CartItem
