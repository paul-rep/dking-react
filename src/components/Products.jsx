import React from 'react';
import { useEffect, useState,useRef} from "react";
import styled from "styled-components";
import Product from "./Product";
import axios from "axios";
import Pagination from "./Pagination";
import { publicRequest } from '../requestMethods';

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const PaginateItemsContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`;


const Products = () => {
  const [products, setProducts] = useState([]);
  const paginatedItems = useRef([]);
  const [page,setPage] = useState(0);
  const itemsPerPage = 4;

  const setPaginatedItems = (items)=>{
    paginatedItems.current = items;
    console.log("paginated",paginatedItems.current);
  }

  useEffect(() => {
    const getProducts = async () => { 
      try {
        const res = await publicRequest.get('/products');
        if (res.data.length > 0){
          setProducts(res.data);
        }
        return res.data;
      } catch (err) {
        console.log(err);
      }
    };
    getProducts().then((data)=> handleChange(null,1,data));
  },[]);


  const handleChange = (event, value, items) => {
    setPaginatedItems(items.slice((value - 1) * itemsPerPage, value * itemsPerPage));
    setPage(value);
  };

  return (
    <>
    <Container>
      {paginatedItems.current.length > 0 && paginatedItems.current.map((item) => <Product item={item} key={item._id}/>) }
    </Container>
    <PaginateItemsContainer>
         { products.length > 0 && <Pagination handleChange={handleChange} page={page} items={products} itemsPerPage={itemsPerPage}></Pagination> }
    </PaginateItemsContainer>
    </>
  );
};

export default Products;