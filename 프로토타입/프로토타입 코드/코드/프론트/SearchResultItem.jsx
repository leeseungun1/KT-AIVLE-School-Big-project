import styled from "@emotion/styled"

export default function SearchResultItem({ resultItem }) {
  const { content, score } = resultItem 

  return <S.Container>
    <S.Description>
      {content}
    </S.Description>
    {
      score &&
      <S.PercentageDiv>
        {score}%
      </S.PercentageDiv>
    }
  </S.Container>
}

const S = {
  Container: styled.div`
    display: flex; 
    gap: 10px; 
    justify-content: space-between; 
    cursor: pointer; 
  `,

  Description: styled.div`
    width: 500px; 
    border: 1px solid #f5f5f5; 
    font-size: 10px; 
    padding: 15px; 
    background-color: #ffffff;
    line-height: 1.7; 
    &:hover { 
      background-color: #f5f5f5; 
    }
  `,

  PercentageDiv: styled.div`
    margin-top: auto;
    margin-bottom: auto;
    display: flex;
    justify-content: center; 
    align-items: center; 
    width: 80px; 
    height: 60px; 
    border-radius: 50%; 
    background-color: #ffffff;
    &:hover { 
      background-color: #f5f5f5; 
      border: 1px solid #cfc9c9; 
    }
  `,
}
