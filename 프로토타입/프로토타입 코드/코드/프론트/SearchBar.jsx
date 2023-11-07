import React from 'react';
import usePage from './usePage';
import TextField from '@mui/material/TextField';
import styled from '@emotion/styled';
import SearchButton from './SearchButton';
import { useDispatch, useSelector } from 'react-redux';
import { updateSearchInput } from './searchSlice'
import { fetchSearch } from './searchSlice'

export default function SearchBar() {
  const dispatch = useDispatch()
  const searchInput = useSelector(state => state.search.searchInput)
  const searchType = useSelector(state => state.search.searchType)
  const { setPage } = usePage();

  const doSearch = (type) => {
    
    dispatch(fetchSearch({type, query: searchInput}))
    setPage('search')
  }

  const onKeyUpSearch = (e, type) => {
    if (e.key === 'Enter') {
      doSearch(type)
    }
  }

  const handleClickSearch = (type) => {
    doSearch(type)
  }

  const handleChangeUpdateSearchInput = (e) => {
    dispatch(updateSearchInput(e.target.value))
  }

  return (
    <S.Container>
        <S.SearchInput
          label="검색어를 입력하세요"
          onKeyUp={(e) => onKeyUpSearch(e, searchType)}
          onChange={(e) => handleChangeUpdateSearchInput(e)}
          value={searchInput.word}
          autoFocus={true}
        />
        <SearchButton onClick={() => handleClickSearch('word')} text="단어 검색" color="#279df4" />
        <SearchButton onClick={() => handleClickSearch('sentence')} text="문장 검색"/>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    display: flex;
    justify-content: space-between;
    gap: 10px;
    width: fit-content;
    padding: 10px;
  `,
  SearchModule: styled.div``,
  SearchInput: styled(TextField)`
    width: 355px;
    background-color: white;
  `,
}
