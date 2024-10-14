import './App.css';
import Nav from './components/Nav';
import Footer from './components/Footer';
import { BrowserRouter,Route,Routes} from 'react-router-dom';
import SignUp from './components/SignUp'
import Login from './components/Login';
import PrivateComponent from './components/PrivateComponent';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import UpdateProduct from './components/UpdateProduct';
import Carts from './components/Carts';
import PastCart from './components/PastCart';
import OngoingOrder from './components/OngoingOrder';
import DeliveredOrder from './components/DeliveriedOrder';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
       <Nav/>
       <Routes>
        <Route element={<PrivateComponent/>}>
     <Route path="/" element={<ProductList/>}></Route>
     <Route path="/add" element={<AddProduct/>}></Route>
     <Route path="/update/:id" element={<UpdateProduct/>}></Route>
     <Route path="/ongoingorder" element={<OngoingOrder/>}></Route>
     <Route path="/pastorder" element={<DeliveredOrder/>}></Route>
     <Route path="/carts" element={<Carts/>}></Route>
     <Route path="/pastcarts" element={<PastCart/>}></Route>
     <Route path="/logout" element={<h1>logout</h1>}></Route>
     <Route path="/profile" element={<h1>this is your profile</h1>}></Route>
     </Route>
     <Route path="/signup" element={<SignUp/>}/>
     <Route path="/login" element={<Login/>}/>
     </Routes>
     </BrowserRouter>
    
    </div>
  );
}

export default App;
