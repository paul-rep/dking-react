import React, { useState, useEffect } from "react";
import { userRequest } from "../../requestMethods";

import { useSelector, useDispatch } from "react-redux";
// import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
// import ShowPaymentInfo from "../../components/cards/ShowPaymentInfo";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Invoice from "./Invoice";

const Profile = () => {
  const [orders, setOrders] = useState([]);
  const user = useSelector((state) => state.user.currentUser);
  useEffect(() => {
    loadUserOrders();
  }, []);

  const loadUserOrders = async () =>{
    try {
      const res = await userRequest.get(`/orders/find/${user._id}`);
      setOrders(res.data);
      
    } catch(e){
      console.log(e)
    }
    };

  const showOrderInTable = (order) => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          {/* <th scope="col">Brand</th> */}
          <th scope="col">Color</th>
          <th scope="col">Count</th>
          {/* <th scope="col">Shipping</th> */}
        </tr>
      </thead>

      <tbody>
        {order.products.map((p, i) => (
          <tr key={i}>
            <td>
              <b>{p.product?.productId}</b>
            </td>
            <td>{p.product?.price}</td>
            {/* <td>{p.product.brand}</td> */}
            <td>{p.color}</td>
            <td>{p.count}</td>
            {/* <td>
              {p.product.shipping === "Yes" ? (
                <CheckCircleOutlined style={{ color: "green" }} />
              ) : (
                <CloseCircleOutlined style={{ color: "red" }} />
              )}
            </td> */}
          </tr>
        ))}
      </tbody>
    </table>
  );

  const showDownloadLink = (order) => (
    <PDFDownloadLink
      document={<Invoice order={order} />}
      fileName="invoice.pdf"
      className="btn btn-sm btn-block btn-outline-primary"
    >
      Download PDF
    </PDFDownloadLink>
  );

  const showEachOrders = () =>
    orders.reverse().map((order, i) => (
      <div key={i} className="m-5 p-3 card">
        {/* <ShowPaymentInfo order={order} /> */}
        {showOrderInTable(order)}
        <div className="row">
          <div className="col">{showDownloadLink(order)}</div>
        </div>
      </div>
    ));

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
        </div>
        <div className="col text-center">
          <h4>
            {orders && orders.length > 0 ? "User purchase orders" : "No purchase orders"}
          </h4>
          {console.log(orders)}
          {/* {orders && showEachOrders()} */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
