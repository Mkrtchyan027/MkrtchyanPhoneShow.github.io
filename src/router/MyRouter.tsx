import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import { Category } from "../page/category/category"
import { SeeCategory } from "../page/seecategory/seeCategory"
import { Error404 } from "../page/error/Error"
import { Home } from "../page/home"
import { Layout } from "../page/layout"
import { Login } from "../page/login"
import { Profile } from "../page/profile"
import { Register } from "../page/register"
import { AddProduct } from "../page/addproduct"
import { MyProduct } from "../page/myproduct"
import { Cart } from "../page/cart"
import { Settings } from "../page/settings"
import { WishList } from "../page/wishlist"
import { SeeProduct } from "../page/seeproduct"

export const MyRouter=()=>{
    return <div>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout />} >
                    <Route path='' element={<Home />} />
                    <Route path='login' element={<Login />} />
                    <Route path='register' element={<Register />} />
                    <Route path='category' element={<Category />} />
                    <Route path='seecategory/:id' element={<SeeCategory />} />
                    <Route path='seeproduct/:id' element={<SeeProduct />} />
                    <Route path='profile' element={<Profile />}>
                        <Route path='addproduct' element={<AddProduct />} />
                        <Route path='myproduct' element={<MyProduct />} />
                        <Route path='cart' element={<Cart />} />
                        <Route path='settings' element={<Settings />} />
                        <Route path='wishlist' element={<WishList />} />
                    </Route>
                    <Route path='*' element={<Error404 />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </div>
}