import NavBar from './components/navbar/NavBar'
import Footer from './components/footer/Footer'
import Cart from './components/Pages/cart/Cart'
import ItemDetailContainer from './components/Pages/details/ItemDetailContainer'
import ItemListContainer from './components/Pages/products/ItemListContainer'
import { CartProvider } from './components/context/cart-context'
import { FirebaseProvider } from './components/context/firebase-context'
import {  HashRouter as Router , Switch, Route} from "react-router-dom";



function App() {


  return (



    //Uso Location de React Router en un context asi que necesito tener esto primero
    <Router basename={process.env.PUBLIC_URL} className="App">

      <CartProvider>
        <FirebaseProvider>

          <NavBar />


          <Switch>
            

            <Route exact path={"/"} component={ItemListContainer} />
            <Route exact path={"/category/:category"} component={ItemListContainer} />
            <Route exact path={"/item/:id"} component={ItemDetailContainer} />
            <Route exact path={"/carrito"} component={Cart} />

            <Route path={"*"} component={ItemListContainer} />

          </Switch>



          <Footer />

        </FirebaseProvider>


      </CartProvider>




    </Router>





  );
}

export default App;
