import React from "react";
import styled from "styled-components";
import { mobile,medium } from "../responsive/responsive";

import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useClickOutside } from "react-click-outside-hook";
import { useEffect } from "react";
import { useRef } from "react";
import MoonLoader from "react-spinners/MoonLoader";
import { useDebounce } from "../../hooks/useDebounce";
import axios from "axios";
import { SearchItem } from "./SearchItem";

const SearchBarContainer = styled(motion.div)`
  z-index: 99;
  display: flex;
  flex-direction: column;
  width: 20em;
  background-color: #fff;
  border-radius: 6px;
  position: absolute;
  top: -20px;
  overflow: hidden;
  ${medium({ width: "15em",top: "20px"})}
  ${mobile({ width: "11em"})}

`;

const SearchContent = styled.div`
  z-index: 150;
  position: absolute;
  top: 80px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1em;
//   overflow-y: scroll;
`;

const SearchInputContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  padding: 2px 15px;
  border: 1px solid black;
  border-radius: 5px;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  font-size: 16px;
  color: #12112e;
  font-weight: 500;
  border-radius: 6px;
  background-color: transparent;
  &:focus {
    outline: none;
    &::placeholder {
      opacity: 0;
    }
  }
  &::placeholder {
    color: #bebebe;
    transition: all 250ms ease-in-out;
    ${mobile({ fontSize: "10px"})}
  }
`;

const SearchIconContainer = styled.span`
  color: #bebebe;
  font-size: 27px;
  margin-right: 10px;
  margin-top: 6px;
  vertical-align: middle;
`;

const CloseIconContainer = styled(motion.span)`
  color: #bebebe;
  font-size: 23px;
  vertical-align: middle;
  transition: all 200ms ease-in-out;
  cursor: pointer;
  &:hover {
    color: #dfdfdf;
  }
`;

const LineSeperator = styled.span`
  display: flex;
  min-width: 100%;
  min-height: 2px;
  background-color: #d8d8d878;
`;


const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WarningMessage = styled.span`
  color: #a1a1a1;
  font-size: 14px;
  display: flex;
  align-self: center;
  justify-self: center;
`;

const containerVariants = {
  expanded: {
    height: "30em",
  },
  collapsed: {
    height: "3.8em",
  },
};

const containerTransition = { type: "spring", damping: 22, stiffness: 150 };

export function SearchBar(props) {
  const [isExpanded, setExpanded] = useState(false);
  const [parentRef, isClickedOutside] = useClickOutside();
  const inputRef = useRef();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [noProducts, setNoProducts] = useState(false);

  const isEmpty = !products || products.length === 0;

  const changeHandler = (e) => {
    e.preventDefault();
    if (e.target.value.trim() === "") setNoProducts(false);

    setSearchQuery(e.target.value);
  };

  const expandContainer = () => {
    setExpanded(true);
  };

  const collapseContainer = () => {
    setExpanded(false);
    setSearchQuery("");
    setLoading(false);
    setNoProducts(false);
    setProducts([]);
    if (inputRef.current) inputRef.current.value = "";
  };

  useEffect(() => {
    if (isClickedOutside) collapseContainer();
  }, [isClickedOutside]);

  const prepareSearchQuery = (query) => {
    const url = `${process.env.REACT_APP_API}/products/search/?q=${query}`;


    return encodeURI(url);
  };

  const searchProduct = async () => {
    if (!searchQuery || searchQuery.trim() === "") return;

    setLoading(true);
    setNoProducts(false);

    const URL = prepareSearchQuery(searchQuery);

    const response = await axios.get(URL).catch((err) => {
      console.log("Error: ", err);
    });

    if (response) {
      console.log("Response: ", response.data);
      if (response.data && response.data.length === 0) setNoProducts(true);

      setProducts(response.data);
    }

    setLoading(false);
  };

  useDebounce(searchQuery, 500, searchProduct);

  return (
    <SearchBarContainer
      animate={isExpanded ? "expanded" : "collapsed"}
      variants={containerVariants}
      transition={containerTransition}
      ref={parentRef}
    >
      <SearchInputContainer>
        <SearchIconContainer>
          <SearchIcon />
        </SearchIconContainer>
        <SearchInput
          placeholder="Search for products"
          onFocus={expandContainer}
          ref={inputRef}
          value={searchQuery}
          onChange={changeHandler}
        />
        <AnimatePresence>
          {isExpanded && (
            <CloseIconContainer
              key="close-icon"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={collapseContainer}
              transition={{ duration: 0.2 }}
            >
              <CloseIcon />
            </CloseIconContainer>
          )}
        </AnimatePresence>
      </SearchInputContainer>
      {isExpanded && <LineSeperator />}
      {isExpanded && (
        <SearchContent>
          {isLoading && (
            <LoadingWrapper>
              <MoonLoader loading color="#000" size={20} />
            </LoadingWrapper>
          )}
          {!isLoading && isEmpty && !noProducts && (
            <LoadingWrapper>
              <WarningMessage>Start typing to Search</WarningMessage>
            </LoadingWrapper>
          )}
          {!isLoading && noProducts && (
            <LoadingWrapper>
              <WarningMessage>No products found!</WarningMessage>
            </LoadingWrapper>
          )}
          {!isLoading && !isEmpty && (
            <>
              {products.map(product => (

                <SearchItem
                  key={product._id}
                  item={product}
                />
              ))}
            </>
          )}
        </SearchContent>
      )}
    </SearchBarContainer>
  );
}