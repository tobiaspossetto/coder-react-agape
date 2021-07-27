import NavBar from './components/navbar/NavBar'
import Footer from './components/footer/Footer'
import Home from './components/Pages/home/Home'
import CartContainer from './components/Pages/cart/CartContainer'
import ItemDetailContainer from './components/Pages/details/ItemDetailContainer'
import ItemListContainer from './components/Pages/products/ItemListContainer'


import {CartProvider} from './components/context/cart-context'

import {
 
  Switch,
  Route
} from "react-router-dom";
import { HashRouter as Router } from 'react-router-dom'
require("./App.css")
function App() {
  return (
      <CartProvider>


        <Router basename={process.env.PUBLIC_URL} className="App">
        <NavBar/>
          <Switch>
            <Route exact path={"/"} component={Home}/>
            <Route exact path={"/productos"} component={ItemListContainer}/> 
            <Route exact path={"/productos/category/:category"} component={ItemListContainer}/>
            <Route exact path={"/productos/item/:id"} component={ItemDetailContainer}/>
            <Route exact path={"/carrito"} component={CartContainer}/>
            
          </Switch>



          <Footer/>
        </Router>
      </CartProvider>
      
     
    
  );
}

export default App;
