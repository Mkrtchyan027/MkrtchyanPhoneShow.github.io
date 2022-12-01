import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { EnumFirestore, Product, User } from '../../features/type';
import { getUser, selectUser, userFetchLink } from '../../features/user/userSlice';
import { deleteDataById, getAllDataByFields, getDataById } from '../../firebase/firestore';
import './style.css';
import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { allProduct, deleteProductById, selectProduct } from '../../features/product/productSlice';
import { allcart, deleteCartById, selectcart } from '../../features/cart/cartSlise';

export const Cart = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const user = useSelector(selectUser)
    const cart = useAppSelector(selectcart)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user && user.email) {
                dispatch(userFetchLink({ func: getAllDataByFields, obj: { collectionName: EnumFirestore.USERS, obj: { "email": user.email } } }))
                    .unwrap()
                    .then((e: any) => {
                        if (e) {
                            dispatch(getUser(e[0]))
                            dispatch(userFetchLink({ func: getAllDataByFields, obj: { collectionName: EnumFirestore.CART, obj: { "userId": e[0].id } } }))
                                .unwrap()
                                .then((res: any) => {
                                    dispatch(allcart(res))
                                })
                        }
                    })
                    .catch(e => console.log(e))
            }
            else {
                navigate('/login')
            }

        })
    }, [])

    return <div className='cart'>
        <h2 className='h22'> Cart</h2>
        <table>
            <thead>
                <tr>
                    <th>image</th>
                    <th>name</th>
                    <th>price</th>
                    <th>delete</th>
                </tr>
            </thead>

            <tbody>
                {
                    cart?.arr?.map((e: any) => {
                        return <tr key={e.id}>
                            <td>
                            <Link className='lk' to={'/seeproduct/' + e.product.id}>
                                <img width={'100px'} src={e.product.picurl[0]} />
                            </Link>
                            </td>

                            <td>{e.product.name}</td>
                            <td>{e.product.price} $</td>
                            <td>
                                <button className='productbutton' onClick={() => {
                                    dispatch(userFetchLink({ func: deleteDataById, obj: { collectionName: EnumFirestore.CART, id: e.id } }))
                                    dispatch(deleteCartById(e.id))
                                }}>&times;</button>
                            </td>
                        </tr>
                    })
                }
            </tbody>
        </table>
    </div>
}