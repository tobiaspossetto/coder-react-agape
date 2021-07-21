
import React from 'react'

import {Link} from 'react-router-dom';


//MATERIAL UI

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Typography from '@material-ui/core/Typography';

require('../../styles.css')



//UTILIZA MATERIAL UI, HAY COSAS COMO useStyles que son propios de la libreria

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
  });

  const Item = (props) => {
    
    //Propio de materialUI
    const classes = useStyles();
      
    return (
        <div className='mb-5'>

            <Card className={classes.root+"  m-auto shadow-lg" }>
                <CardActionArea>
                    <CardMedia
                    className={classes.media}
                    image={props.img}
                    title="Contemplative Reptile"
                    />
                    <CardContent>
                    <Typography  variant="h5" className='mb-2' component="h2">
                     {props.title}
                    </Typography>
                    
                    <Typography  variant="h6"  color="textPrimary" component="p">
                     {'$'+props.price}
                    </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions className='p-3 d-flex justify-content-between align-items-center'>
                    <Link className='btn btn-danger' to={'/productos/item/'+props.prodID}>Ver más</Link>
               
                    <span >
                    {props.cat}
                    </span>
                </CardActions>
                </Card>







         
        </div>

    )
}

export default Item
