import React from 'react';
import usePage from './usePage';
import MainPage from './MainPage';
import SearchResultPage from './SearchResultPage';
import styled from '@emotion/styled';

function App() {
  const { page } = usePage();

  return (
    <S.Container>
      <S.Header>
        <S.HeaderImg src='logo.png'/>
        <S.HeaderImg src='portal.png'/>
        <S.RightImg src='alis.png'/>
      </S.Header>
      {page === 'main' ? <MainPage /> : <SearchResultPage />}
    </S.Container>
  )
}

const S = {
  Container: styled.div`
    background-color: orange;
    height: fit-content;
  `,

  Header: styled.div`
    background-color: white;
    display: flex;
    justify-content: start;
    gap: 20px;
    padding: 10px;
  `,

  HeaderImg: styled.img`
    height: 100px;
  `,

  RightImg: styled.img`
    height: 60px;
    margin-top: auto;
    margin-bottom: auto;
    margin-left: auto;
  `,
}

export default App;
