import styled from "@emotion/styled"
import SearchBar from "./SearchBar"

export default function MainPage() {
  return (
    <S.Container>
      <S.SearchBarWrapper>
        <SearchBar />
      </S.SearchBarWrapper>
    </S.Container>
  )
}

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    padding: 50px;
    gap: 50px;
    align-items: center;
    height: 100vh;
  `,

  SearchBarWrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    justify-content: center;
    width: 90vw;
    height: 40vh;
    background-color: white;
  `,

}