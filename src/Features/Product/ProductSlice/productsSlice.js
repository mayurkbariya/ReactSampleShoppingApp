import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import APIs from '../../../apis'

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async () =>{
    const response = await APIs.getProducts()
    return response
  }
)

export const productsSlice = createSlice({
  name: 'Products',
  initialState: {
    loadingProducts: false,
    products: [],
    categories: [],
    selectedCategory: '',
    searchvalue: '',
  },
  reducers: {
    changeCategory(state, action) {
      state.selectedCategory = action.payload
    },
    changeSerachValue(state, action) {
      state.searchvalue = action.payload
    },
  },
  extraReducers:{
    [getProducts.pending]: (state)=>{
      state.loadingProducts = true
    },
    [getProducts.fulfilled]: (state, action) => {
      state.products = action.payload.data.products
      state.categories = [...new Set(action.payload.data.products?.map((res) => res?.category))].map(
        (category) => ({
          label: category,
          value: category
        })
      );
      state.loadingProducts= false
    },
    [getProducts.rejected]: (state) =>{
      state.loadingProducts= false
    }
  }
})
export const { changeCategory, changeSerachValue } = productsSlice.actions

export default productsSlice.reducer