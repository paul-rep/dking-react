import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";

import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../components/responsive/responsive";
import { useLocation } from "react-router";

import { userRequest } from "../requestMethods";

import { useEffect, useState,useRef} from "react";
import Product from "../components/Product";
import axios from "axios";
import Pagination from "../components/Pagination";
import { useSort } from "../hooks/useSort";

const ProductsContainer = styled.div`
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

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;


const Shop = () => {
  const location = useLocation();
  const category_id = location.pathname.split("/")[2];

  const [products, setProducts] = useState([]);
  const paginatedItems = useRef([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // console.log("filteredProducts",filteredProducts);
  const [page, setPage] = useState(1);
  const itemsPerPage = 4;
  
  const [category, setCategory] = useState({});
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };

  const setPaginatedItems = (items)=>{
    paginatedItems.current = items;
    // console.log("paginated",paginatedItems.current);
  }

  const handleChange = (event, value) => {
    console.log("in change",value);
    if (filteredProducts.length > 0){
       setPaginatedItems(filteredProducts.slice((value - 1) * itemsPerPage, value * itemsPerPage));
    } else {
      setPaginatedItems(products.slice((value - 1) * itemsPerPage, value * itemsPerPage));
    }
    setPage(value);
  };

  const renderProducts = () => {
    return (paginatedItems.current.map((item) => <Product item={item} key={item._id}/>))
  }

  useSort(sort,setFilteredProducts);

  useEffect(() => {
    const fetchCategory = async() =>{
      try {
        const res = await userRequest.get(`/categories/find/${category_id}`);
        console.log(res.data);
        setCategory(res.data);
      
        }catch (e){
          console.log(e)
        }
    }
    fetchCategory();
  }, [category_id])

  useEffect(() => {
    const getProducts = async () => {
      try {
        console.log("cat_id",category_id);
        const res = await axios.get(`http://localhost:5000/api/products?category=${category_id}`);
        console.log("products in category",res.data)
        setProducts(res.data);
        // setFilteredProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, []);

    
  useEffect(() => {
    console.log("filters changed");
    if (Object.entries(filters).length > 0){
    console.log("in if");

      setFilteredProducts(
        products.filter((item) => {
          let flag = false;
          // let color = "";
          // let size = "";
          // let { color, size } = item;
          // console.log("filterz",color, size);

          Object.entries(filters).every(([key, value]) => {
            console.log(key,value);
            flag = item[key].includes(value)
          });
          console.log("flag",flag);
          return flag;
        })
      );
    } else {
      console.log("in else");
      setFilteredProducts(products);  
    }
    console.log("filtered",filteredProducts);
    handleChange(null,page);
  }, [products, filters]);

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>{category && category.title}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select name="color" onChange={handleFilters}>
            <Option disabled>Color</Option>
            <Option>white</Option>
            <Option>black</Option>
            <Option>red</Option>
            <Option>blue</Option>
            <Option>yellow</Option>
            <Option>green</Option>
          </Select>
          <Select name="size" onChange={handleFilters}>
            <Option disabled>Size</Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>


      <ProductsContainer>
          {filteredProducts.length > 0 && renderProducts()}
      </ProductsContainer>
      <PaginateItemsContainer>
         { filteredProducts.length > itemsPerPage && <Pagination handleChange={handleChange} page={page} items={filteredProducts} itemsPerPage={itemsPerPage}></Pagination> }
      </PaginateItemsContainer>
      
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Shop;