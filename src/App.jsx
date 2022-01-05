import "./App.css";
import Product from "./pages/Product";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import AdminHome from "./pages/admin/home/Home";
import NewUser from "./pages/admin/newUser/NewUser";
import UserList from "./pages/admin/userList/UserList";
import NewProduct from "./pages/admin/newProduct/NewProduct";
import User from "./pages/admin/user/User";
import Topbar from "./components/admin/topbar/Topbar";
import Sidebar from "./components/admin/sidebar/Sidebar";
import AdminProductList from "./pages/admin/productList/ProductList";
import Profile from "./pages/profile";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Success from "./pages/Success";
import { useSelector } from "react-redux";

const App = () => {
  const user = useSelector((state) => state.user.currentUser);
  const admin = useSelector((state) => state.user.currentUser?.isAdmin);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/products">
          <Shop />
        </Route>
        <Route exact path="/products/:category">
          <Shop />
        </Route>
        <Route exact path="/product/:id">
          <Product />
        </Route>
      

        <Route path="/cart">
        {user ? <Cart /> : <Redirect to="/" />}
        </Route>
        <Route path="/success">
        {user ?  <Success /> : <Redirect to="/" />}
        </Route>
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
        {user && <Route path="/profile"><Profile/></Route>}
        {admin && (
          <>
            <Topbar />
            <div className="container">
              <Sidebar />
              <Route exact path="/admin">
                <AdminHome />
              </Route>
              <Route exact path="/admin/users">
                <UserList />
              </Route>
              <Route exact path="/admin/user/:userId">
                <User />
              </Route>
              <Route exact path="/admin/newUser">
                <NewUser />
              </Route>
              <Route exact path="/admin/products">
                <AdminProductList />
              </Route>
              <Route exact path="/admin/product/:productId">
                <Product />
              </Route>
              <Route exact path="/admin/newproduct">
                <NewProduct />
              </Route>
            </div>
          </>
        )}
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;