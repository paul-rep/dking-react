import { Link } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { userRequest } from "../requestMethods";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/cartSlice";

const Success = () => {
  const location = useLocation();
  //in Cart.jsx I sent data and cart. Please check that page for the changes.(in video it's only data)
  const data = location.state.stripeData;
  const cart = location.state.products;
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const [orderId, setOrderId] = useState(null);
  const history = useHistory();
  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest.post("/orders", {
          userId: currentUser._id,
          // products: cart.products.map((item) => ({
          //   productId: item._id,
          //   quantity: item._quantity,
          // })),
          products: cart.products.map(p => p._id),
          amount: cart.total,
          address: data.billing_details.address,
        });
        setOrderId(res.data._id);
        dispatch(clearCart());
      } catch (e){
          console.log(e)
      }
    };
    data && createOrder();
  }, [cart, data, currentUser]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {orderId
        ? `Thank you! Order has been created successfully. Your order number is ${orderId}`
        : `Thank you! Your order is being prepared...`}
      <button style={{ padding: 10, marginTop: 20 }} onClick={()=>history.push("/")}>Go to Homepage</button>
    </div>
  );
};

export default Success;