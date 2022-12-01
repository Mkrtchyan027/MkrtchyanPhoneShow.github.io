import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userSlice from '../features/user/userSlice'
import productReducer from '../features/product/productSlice'
import userReducer from '../features/user/userSlice';
import cartReducer from '../features/cart/cartSlise';
import wishlistReducer from '../features/wishlist/wishlistSlice';
import rateReducer from '../features/reit/reitSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    cart:cartReducer,
    wishlist:wishlistReducer,
    rate:rateReducer
  },
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
