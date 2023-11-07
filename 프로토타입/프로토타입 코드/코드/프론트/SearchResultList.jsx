import * as React from 'react';
import { useSelector } from 'react-redux';
import SearchResultItem from "./SearchResultItem"
import styled from "@emotion/styled"

export default function SearchResultList() {
  const searchResult = useSelector(state => state.search.searchResult) 

  return (
    <S.Container>
      {searchResult.length > 0 &&
        searchResult.map((resultItem, idx) => <SearchResultItem resultItem={resultItem} key={resultItem.contents +`${idx}`}/>) 
      }
    </S.Container>
  )
}

const S = {
  Container: styled.div`
    margin: 0 auto; 
    display: flex; 
    flex-direction: column; 
    gap: 10px; 
    margin-top: 30px; 
  `,
}
