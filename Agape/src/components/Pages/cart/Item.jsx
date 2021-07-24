import React, {useState, useEffect} from 'react'
import * as MdIcons from 'react-icons/md'
import * as BsIcons from 'react-icons/bs'
import ItemCartCount from './ItemCartCount'
//PARA EL ACCORDION DE MUI
import { withStyles, makeStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';

//TABLA
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import {useCart} from '../../context/cart-context'


require('./carrito.css')
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






const Item = (props) => {
  const {cartProducts,modifyProduct,removeProduct} = useCart()
  const classes = useStyles();

  const [quantityEdit, setQuantityEdit] = useState(props.quantity);
  
  const remove = () => {
    removeProduct(props.id)
  }
 
  const quit = () => {
    if(quantityEdit>1){
      setQuantityEdit(quantityEdit - 1)
    }
     
    //  console.log(cartProducts)
  }

  const add = () => {
    
      setQuantityEdit(quantityEdit + 1)
       
      //  console.log(cartProducts)
  }

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
                    {/* <input type="number"
                    min="1" max="10" value={props.quantity} /> */}
                      <ItemCartCount quantity={quantityEdit} quit={quit} add={add}/>
                    
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

export default Item
