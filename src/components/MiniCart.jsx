
 import '../minicart.css';
 import { useMediaQuery } from "react-responsive";
 import { SCREENS } from "./responsive/breakpoints";

 import Box from '@mui/material/Box';
 import Drawer from '@mui/material/Drawer';
 import List from '@mui/material/List';
import { useSelector } from 'react-redux'; 
import { useEffect } from 'react';
import { toggleDrawer,setDrawerState } from "../redux/drawerSlice";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { removeProduct } from "../redux/cartSlice";
import ClearIcon from '@mui/icons-material/Clear';

const MiniCart = () => {
     const dispatch = useDispatch();
     const drawer = useSelector((state)=>state.drawer);
     const cart = useSelector((state)=>state.cart);


     const handleDelete = (product)=> {
        dispatch(removeProduct(product));
      }

      useEffect(()=>{
          if (cart.products.length == 0){
            dispatch(setDrawerState(false));
          }
      },[cart.products.length])

     

   const list = () => (
     <Box
    //    sx={{ width: "350px" }}
       role="presentation"
       onKeyDown={() => dispatch(toggleDrawer())}
     >
       <List>
       <div className="sidebar-cart-active">
          <div className="sidebar-cart-all">
  
            <div className="cart-content">
            
              <h3>Shopping Cart</h3>
              <ul>
              {cart.products && cart.products.map((product) => (
               <li className="single-product-cart" key={product._id}>
                  <div className="cart-img">
                    <Link to={`/product/${product._id}`}><img src={product.img} alt="" /></Link>
                  </div>
                  <div style={{marginRight:"15px"}} className="cart-title">
                    <h4><a style={{textDecoration:"none"}} href="/">{product.title}</a></h4>
                    <span> {product.quantity} × {product.price}	</span>
                  </div>
                  <div className="cart-delete" onClick={() => handleDelete(product)} style={{cursor:"pointer"}}>
                  <ClearIcon/>
                  </div>
                </li>
            ))} 
              </ul>
              <div className="cart-total">
                <h4>Subtotal: <span>$ {cart.total}</span></h4>
              </div>
              <div className="cart-checkout-btn">
                <Link style={{textDecoration:"none"}} className="btn-hover cart-btn-style" to="/cart">view cart</Link>
              </div>
            </div>
          </div>
        </div>
       
       </List>
     </Box>
   );
 
   return (
     <div>
           <Drawer
             anchor="right"
             open={drawer.isOpen}
             onClose={() => dispatch(setDrawerState(false))}
           >
             {list()}
           </Drawer>
     </div>
   )
   };
 export default MiniCart;