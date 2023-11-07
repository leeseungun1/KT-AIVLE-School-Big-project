import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
import SearchBar from './SearchBar'
import SearchResultList from './SearchResultList'

export default function SearchResultPage() {
    const searchType = useSelector(state => state.search.searchType)
    console.log(searchType, 'searchType at SearchResultPage')
    return (
        <S.Container>
            <SearchBar />
            <SearchResultList />
        </S.Container>
    )
}

const S = {
    Container: styled.div`
        display: flex;
        flex-direction: column;
        padding: 50px;
        gap: 20px;
        align-items: center;
    `,
}
