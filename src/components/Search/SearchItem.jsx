import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";

const SearchItemContainer = styled.div`
  width: 100%;
  min-height: 6em;
  display: flex;
  border-bottom: 2px solid #d8d8d852;
  padding: 6px 8px;
  align-items: center;
`;

const Thumbnail = styled.div`
  width: auto;
  height: 40px;
  display: flex;
  flex: 0.4;

  img {
    width: auto;
    height: 100%;
  }
`;

const Name = styled.h3`
  font-size: 15px;
  color: #000;
  margin-left: 10px;
  flex: 2;
  display: flex;
`;

export const SearchItem = ({item}) => {

  return (
    <SearchItemContainer>
      <Thumbnail>
        <img src={item.img} />
      </Thumbnail>
      <Link style={{textDecoration:'none'}} to={`/product/${item._id}`}><Name>{item.title}</Name></Link>
    </SearchItemContainer>
  )
}