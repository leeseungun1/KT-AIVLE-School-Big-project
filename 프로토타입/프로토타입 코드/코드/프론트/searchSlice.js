import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios' 

export const instance = axios.create(); 


export const BASE_URL = 'http://ec2-15-164-95-75.ap-northeast-2.compute.amazonaws.com:8080/' 

instance.defaults.baseURL = BASE_URL 

function fetchSearchResult({type, query}) {
  return instance.get(`/election/${type}-search/${query}`) 
  .then(response => {
    return response.data
  }).catch(error => {
    console.log(error)
  })
}

export const fetchSearch = createAsyncThunk(
  'search/fetchSearchStatus',
  async ({type, query}, thunkAPI) => {
    console.log(type, 'type in fetchSearch')

    const response = await fetchSearchResult({type, query})

    return response
  },
)

const initialState = {
  page: 'main',
  searchInput: '',
  searchResult: [],
  searchStatus: '',
  searchType: 'word',
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    updatePage: (state, action) => {
        state.page = action.payload
    },
    updateSearchInput: (state, action) => {
        state.searchInput = action.payload
    },
    updateSearchType: (state, action) => {
        state.searchType = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSearch.pending, (state, action) => {
      state.searchStatus = 'loading'
    })
    builder.addCase(fetchSearch.fulfilled, (state, action) => {
        state.searchResult = action.payload
        state.lodaing = false
      })
    builder.addCase(fetchSearch.rejected, (state, action) => {
      state.searchStatus = 'failed'
    })
  },
})

export const { updatePage, updateSearchInput, updateSearchType } = searchSlice.actions

export default searchSlice.reducer
