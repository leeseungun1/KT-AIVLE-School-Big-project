import { useDispatch, useSelector } from 'react-redux'
import { updatePage } from './searchSlice'

export default function usePage() {
    const dispatch = useDispatch()
    const page = useSelector(state => state.search.page)
    const setPage = (page) => dispatch(updatePage(page))

    return { page, setPage }
}
