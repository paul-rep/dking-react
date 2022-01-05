import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { mobile,medium } from "./responsive/responsive";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logout } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { toggleDrawer } from "../redux/drawerSlice";
import { SearchBar } from "./Search/Search";
import MiniCart from "../components/MiniCart";
import { useMediaQuery } from "react-responsive";
import { SCREENS } from "./responsive/breakpoints";
import { slide as Menu } from "react-burger-menu";
import menuStyles from "../components/menuStyles";

const Container = styled.div`
  height: 60px;
  margin-bottom: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  text-align: left;
  ${medium({ display: "none" })}
`;

const SearchContainer = styled.div`
  position: relative;
`;
const Center = styled.div`
  flex: 1;
  display: flex;
  justify-items: center;
  justify-content: center;

`;

const Input = styled.input`
  border: none;
  width: 250px;
  ${mobile({ width: "50px" })}
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 10px;
  padding: 15px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
  const isMobile = useMediaQuery({ maxWidth: SCREENS.lg });
  const quantity = useSelector(state=>state.cart.quantity);
  const user = useSelector(state=>state.user.currentUser);

  const history = useHistory();
  const dispatch = useDispatch();
  const onLogout = ()=>{
    dispatch(logout());
    history.push("/");
  };

  const MenuLayout = () => {
    if (isMobile){
      return (
        <Menu right styles={menuStyles}>
        <ListContainer>
          <MenuItem>COLLECTIONS</MenuItem>

          <MenuItem>CONTACT</MenuItem>

          {user && <MenuItem onClick={()=> onLogout()}>LOGOUT</MenuItem>}
          {!user && <MenuItem onClick={() => history.push("/register")}>REGISTER</MenuItem>}
          {!user && <MenuItem onClick={() => history.push("/login")}>SIGN IN</MenuItem>}
      
          <MenuItem onClick={()=>dispatch(toggleDrawer('right'))}>
            <Badge badgeContent={quantity} color="secondary">
              <ShoppingCartOutlined />
            </Badge>
          </MenuItem>
        </ListContainer> 
      </Menu>
      )
    }
    return (
      <>
      <MenuItem>COLLECTIONS</MenuItem>

      <MenuItem>CONTACT</MenuItem>

      {user && <MenuItem onClick={()=> onLogout()}>LOGOUT</MenuItem>}
      {!user && <MenuItem onClick={() => history.push("/register")}>REGISTER</MenuItem>}
      {!user && <MenuItem onClick={() => history.push("/login")}>SIGN IN</MenuItem>}
  
      <MenuItem onClick={()=>dispatch(toggleDrawer('right'))}>
        <Badge badgeContent={quantity} color="secondary">
          <ShoppingCartOutlined />
        </Badge>
      </MenuItem>
      </>
    )
  }

  return (
    <Container>
      <Wrapper>
        <Left>
           <Logo><Link to="/"><img src="/logo-2.png"></img></Link></Logo>
        </Left>
        <Center>
          <SearchContainer>
            <SearchBar/>
          </SearchContainer>
        </Center>
        <Right>
          {MenuLayout()}
        </Right>
      </Wrapper>

      <MiniCart/>
    </Container>
  );
};

export default Navbar;