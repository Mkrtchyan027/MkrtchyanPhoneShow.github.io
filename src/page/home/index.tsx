    import './style.css';
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getUser, selectUser, userFetchLink } from '../../features/user/userSlice';
import { addData, deleteDataById, getAllData, getAllDataByFields } from '../../firebase/firestore';
import { EnumFirestore, phone, Product } from '../../features/type';
import { Link } from 'react-router-dom';
import { allProduct, selectProduct } from '../../features/product/productSlice';
import { useSelector } from 'react-redux';
import { allwishlist, selectwishlist } from '../../features/wishlist/wishlistSlice';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/firebase';

export const Home = () => {
    const phone = useAppSelector(selectProduct)
    const wishlist = useAppSelector(selectwishlist)
    const user = useAppSelector(selectUser)
    const dispatch = useAppDispatch()
    console.log(phone);


    useEffect(() => {
        dispatch(userFetchLink({ func: getAllData, obj: { collectionName: EnumFirestore.PHONE } }))
            .unwrap()
            .then((res: any) => {
                dispatch(allProduct(res))

            })
        onAuthStateChanged(auth, (user) => {
            if (user && user.email) {
                console.log(user.email);

                dispatch(
                    userFetchLink({
                        func: getAllDataByFields,
                        obj: {
                            collectionName: EnumFirestore.USERS,
                            obj: { email: user.email },
                        },
                    })
                )
                    .unwrap()
                    .then((e: any) => {
                        console.log("E: ", e);
                        if (e.length) {
                            dispatch(getUser(e[0]));
                            dispatch(userFetchLink({ func: getAllDataByFields, obj: { collectionName: EnumFirestore.WISHLIST, obj:{userId:e[0].id} } }))
                                .unwrap()
                                .then((res: any) => {
                                    dispatch(allwishlist(res))

                                })

                        }
                    })
                    .catch((e) => console.log(e));
            }
        });
    }, [])
    return <div className='test'>
        <span className='video'>
            <video className='vid' autoPlay muted loop>
                <source 
                    src="http://localhost:3000/video.mp4.mov"
                    type="video/mp4"
                />
            </video>

            <div>
                <div  className='df1'>
                    <p>Shop PHONE!</p>
                    <h5>Buy Your New Phone.</h5>
                </div>
                {/* <span>
                    <div>
                        <div>
                            <h2>Free online Shipping</h2>
                            <p>Free Deleveri</p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <h3>Cash OR</h3>
                            <h3>Cart</h3>
                        </div>
                    </div>
                    <div>
                        <div>
                            <p>Customer Service</p>
                            <h3>24/7</h3>
                        </div>
                    </div>
                </span> */}
            </div>
        </span>

        <main>
            <h1>All Products</h1>

            <div className='hi'>
                {
                    phone.arr?.map((e: any) => {
                        return <div key={e.id}>
                            <p>{e.model}</p>
                            <p>Model:{e.name}</p>
                            <p>Year: {e.year}</p>
                            <img src={e.picurl[0]}/>

                            <span>
                                <p>{e.price} AMD</p>
                            </span>

                            <div className='dash'></div>

                            <span>
                                {
                                    wishlist.arr?.some((i: any) => i.product.id == e?.id && i.userId == user.profile?.id) ?
                                        <>
                                            <svg onClick={() => {
                                       

                                                dispatch(userFetchLink({ func: deleteDataById, obj: { collectionName: EnumFirestore.WISHLIST, id: wishlist.arr?.find((i: any) => i.product.id == e?.id && i.userId == user.profile.id).id } }))
                                                    .then(e => {
                                                        dispatch(userFetchLink({ func: getAllDataByFields, obj: { collectionName: EnumFirestore.WISHLIST, obj: { userId: user.profile?.id } } }))
                                                            .unwrap()
                                                            .then((e: any) => {
                                                                dispatch(allwishlist(e))
                                                            })
                                                            .catch(e => console.log(e))
                                                    })
                                            }} id='wi' xmlns="http://www.w3.org/2000/svg" width="30" viewBox="0 0 19 19" role="img"><path d="M9.44985848,15.5291774 C9.43911371,15.5362849 9.42782916,15.5449227 9.41715267,15.5553324 L9.44985848,15.5291774 Z M9.44985848,15.5291774 L9.49370677,15.4941118 C9.15422701,15.7147757 10.2318883,15.0314406 10.7297038,14.6971183 C11.5633567,14.1372547 12.3827081,13.5410755 13.1475707,12.9201001 C14.3829188,11.9171478 15.3570936,10.9445466 15.9707237,10.0482572 C16.0768097,9.89330422 16.1713564,9.74160032 16.2509104,9.59910798 C17.0201658,8.17755699 17.2088969,6.78363112 16.7499013,5.65913129 C16.4604017,4.81092573 15.7231445,4.11008901 14.7401472,3.70936139 C13.1379564,3.11266008 11.0475663,3.84092251 9.89976068,5.36430396 L9.50799408,5.8842613 L9.10670536,5.37161711 C7.94954806,3.89335486 6.00516066,3.14638251 4.31830373,3.71958508 C3.36517186,4.00646284 2.65439601,4.72068063 2.23964629,5.77358234 C1.79050315,6.87166888 1.98214559,8.26476279 2.74015555,9.58185512 C2.94777753,9.93163559 3.23221417,10.3090129 3.5869453,10.7089994 C4.17752179,11.3749196 4.94653811,12.0862394 5.85617417,12.8273544 C7.11233096,13.8507929 9.65858244,15.6292133 9.58280954,15.555334 C9.53938013,15.5129899 9.48608859,15.5 9.50042471,15.5 C9.5105974,15.5 9.48275828,15.5074148 9.44985848,15.5291774 Z"></path></svg>
                                        </>
                                        :
                                        <svg onClick={() => {
                                            console.log("====>", { product: e, userId: user.profile?.id } );
                                            dispatch(userFetchLink({ func: addData, obj: { collectionName: EnumFirestore.WISHLIST, obj: { product: e, userId: user.profile?.id } } }))
                                                .then(e => {
                                                    dispatch(userFetchLink({ func: getAllDataByFields, obj: { collectionName: EnumFirestore.WISHLIST, obj: { userId: user.profile?.id } } }))
                                                        .unwrap()
                                                        .then((e: any) => {
                                                            dispatch(allwishlist(e))

                                                        })
                                                        .catch(e => console.log(e))
                                                })
                                                .catch(e => console.log(e))
                                        }} className="wishlist" xmlns="http://www.w3.org/2000/svg" style={{ color: "#ff0" }} width="30" viewBox="0 0 19 19" role="img"><path d="M9.44985848,15.5291774 C9.43911371,15.5362849 9.42782916,15.5449227 9.41715267,15.5553324 L9.44985848,15.5291774 Z M9.44985848,15.5291774 L9.49370677,15.4941118 C9.15422701,15.7147757 10.2318883,15.0314406 10.7297038,14.6971183 C11.5633567,14.1372547 12.3827081,13.5410755 13.1475707,12.9201001 C14.3829188,11.9171478 15.3570936,10.9445466 15.9707237,10.0482572 C16.0768097,9.89330422 16.1713564,9.74160032 16.2509104,9.59910798 C17.0201658,8.17755699 17.2088969,6.78363112 16.7499013,5.65913129 C16.4604017,4.81092573 15.7231445,4.11008901 14.7401472,3.70936139 C13.1379564,3.11266008 11.0475663,3.84092251 9.89976068,5.36430396 L9.50799408,5.8842613 L9.10670536,5.37161711 C7.94954806,3.89335486 6.00516066,3.14638251 4.31830373,3.71958508 C3.36517186,4.00646284 2.65439601,4.72068063 2.23964629,5.77358234 C1.79050315,6.87166888 1.98214559,8.26476279 2.74015555,9.58185512 C2.94777753,9.93163559 3.23221417,10.3090129 3.5869453,10.7089994 C4.17752179,11.3749196 4.94653811,12.0862394 5.85617417,12.8273544 C7.11233096,13.8507929 9.65858244,15.6292133 9.58280954,15.555334 C9.53938013,15.5129899 9.48608859,15.5 9.50042471,15.5 C9.5105974,15.5 9.48275828,15.5074148 9.44985848,15.5291774 Z"></path></svg>
                                }
                                <Link className='productbutton' to={'/seeproduct/' + e.id}>See Product</Link>
                            </span>
                        </div>
                    })
                }
            </div>
        </main>
    </div>
}