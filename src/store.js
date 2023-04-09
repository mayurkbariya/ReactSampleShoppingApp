import { configureStore } from '@reduxjs/toolkit'
import productsSlice from './Features/Product/ProductSlice/productsSlice'

export default configureStore({
  reducer: {
    products: productsSlice,
  },
})