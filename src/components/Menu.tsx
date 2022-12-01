    import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react'
import './style.css'
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "../firebase/firebase"
import { EnumFirestore, User } from "../features/type"
import { getAllData, getAllDataByFields, getAllDataByFilter } from "../firebase/firestore"
import { getUser, selectUser, userFetchLink } from "../features/user/userSlice"
import { useAppDispatch } from "../app/hooks"
import { allProduct } from "../features/product/productSlice"
import { useSelector } from "react-redux"

export const Menu = () => {
    const [bool, setBool] = useState(false)
    const user = useSelector(selectUser)
    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const [rangeValue, setRangeValue] = useState({ min: 50, max: 300 })
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!open);
    };
    const [filteropen, setFilterOpen] = useState(false);
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user && user.email) {
                dispatch(userFetchLink({ func: getAllDataByFields, obj: { collectionName: EnumFirestore.USERS, obj: { "email": user.email } } }))
                    .unwrap()
                    .then((e: any) => {
                        dispatch(getUser(e[0]))
                    })
                    .catch(e => console.log(e))
                setBool(true)
            }
            else {
                // navigate('')
            }

        })
    }, [])

    return <div onClick={() =>{
        if (open)
        setOpen(false)
     } }>
        <div className="menu">
            <div className="dfg" onClick={() => navigate('')}>
                <h3 style={{ letterSpacing: '7px' }}>Phone Shop </h3>
                
            </div>

            <span className="sp1">
                
                <li className="search">
                    <span>
                        <input placeholder="Search..." onChange={(e) => {
                            dispatch(userFetchLink({ func: getAllData, obj: { collectionName: EnumFirestore.PHONE } }))
                                .unwrap()
                                .then((res: any) => {
                                    if (e.target.value) {
                                        console.log("search===>", res.filter((elm: any) => elm.model.includes(e.target.value)));
                                        dispatch(allProduct(res.filter((elm: any) => elm.includes(e.target.value))))
                                    }
                                })
                        }} />
                    </span>
                </li>
                <ul className="ul">
                <li>
                    <span className="filter" onClick={() => {
                        setFilterOpen(!filteropen)
                    }}>
                        {/* <i className="fa fa-filter" style={{ fontSize: "36px" }}></i> */}
                        {/* <i className="cis-clear-all" style={{ fontSize: '36px'}}></i> */}
                        <i className="material-icons" style={{ fontSize: '36px'}}>filter_list</i>
                        {
                            
                            filteropen ?
                                <div className="subfilter">
                                    <span>
                                        <label className="lab">Min value</label>
                                        <input className="inp1" type="range" value={rangeValue.min}
                                            onChange={(e) => {
                                                rangeValue.min = +e.target.value;
                                                setRangeValue({ ...rangeValue })
                                            }} min="50" max="10000" />
                                        <span>{rangeValue.min}</span>
                                    </span>
                                    <span>
                                        <label className="lab">Max value</label>
                                        <input className="inp1" type="range" value={rangeValue.max} onChange={(e) => {
                                            rangeValue.max = +e.target.value;
                                            setRangeValue({ ...rangeValue })
                                        }}
                                            min="10000" max='500000' />
                                        <span>{rangeValue.max}</span>
                                    </span>
                                    <button className="btnfilter"
                                        onClick={() => {
                                            dispatch(userFetchLink({ func: getAllDataByFilter, obj: { collectionName: EnumFirestore.PHONE, obj: rangeValue } }))
                                                .unwrap()
                                                .then((res: any) => {
                                                    console.log(res)
                                                    dispatch(allProduct(res))
                                                    setFilterOpen(!filteropen)
                                                })
                                        }}
                                    >
                                        Filter
                                    </button>
                                </div>
                                :
                                <></>
                        }
                    </span>
                </li>
                
                <li>
                    <Link to='/category' style={{ color: 'white' }}><h6>Category</h6></Link>
                </li>
                </ul>

                {/* {bool ?
                    <>
                        <li>
                            {
                                user.profile?.picurl ?
                                    <div className="user" key={user.profile?.id} onClick={handleOpen}>
                                        <img src={user.profile?.picurl}></img>
                                        <p>Hi, {user.profile?.name}!</p>
                                        {open ? (
                                            <ul className="menuu">
                                                <li className="menu-item">
                                                    <button>Menu 1</button>
                                                </li>
                                                <li className="menu-item">
                                                    <button>Menu 2</button>
                                                </li>
                                            </ul>
                                        ) : null}
                                    </div>
                                    :
                                    <div className="user" key={user.profile?.id} onClick={handleOpen}>
                                        <div>
                                            <svg fill="#FAFAFA" data-bbox="0 0 50 50" data-type="shape" xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 50 50"><g><path d="M25 48.077c-5.924 0-11.31-2.252-15.396-5.921 2.254-5.362 7.492-8.267 15.373-8.267 7.889 0 13.139 3.044 15.408 8.418-4.084 3.659-9.471 5.77-15.385 5.77m.278-35.3c4.927 0 8.611 3.812 8.611 8.878 0 5.21-3.875 9.456-8.611 9.456s-8.611-4.246-8.611-9.456c0-5.066 3.684-8.878 8.611-8.878M25 0C11.193 0 0 11.193 0 25c0 .915.056 1.816.152 2.705.032.295.091.581.133.873.085.589.173 1.176.298 1.751.073.338.169.665.256.997.135.515.273 1.027.439 1.529.114.342.243.675.37 1.01.18.476.369.945.577 1.406.149.331.308.657.472.98.225.446.463.883.714 1.313.182.312.365.619.56.922.272.423.56.832.856 1.237.207.284.41.568.629.841.325.408.671.796 1.02 1.182.22.244.432.494.662.728.405.415.833.801 1.265 1.186.173.154.329.325.507.475l.004-.011A24.886 24.886 0 0 0 25 50a24.881 24.881 0 0 0 16.069-5.861.126.126 0 0 1 .003.01c.172-.144.324-.309.49-.458.442-.392.88-.787 1.293-1.209.228-.232.437-.479.655-.72.352-.389.701-.78 1.028-1.191.218-.272.421-.556.627-.838.297-.405.587-.816.859-1.24a26.104 26.104 0 0 0 1.748-3.216c.208-.461.398-.93.579-1.406.127-.336.256-.669.369-1.012.167-.502.305-1.014.44-1.53.087-.332.183-.659.256-.996.126-.576.214-1.164.299-1.754.042-.292.101-.577.133-.872.095-.89.152-1.791.152-2.707C50 11.193 38.807 0 25 0"></path></g></svg>
                                            <a>Hi, {user.profile?.name}!</a>
                                        </div> */}
                                        {bool ?
                    <>
                        <li className="bn2">
                            <div className="user27" key={user.profile?.id} onClick={handleOpen}> <br></br>
                                {
                                    user.profile?.picurl ?
                                        <div className="db3">
                                           
                                            
                                            <p>Welcome {user.profile?.name}!</p> <br></br>
                                            <img className="vg2" src={user.profile?.picurl} style={{width:'40px', height:'40px', marginBottom:'17px'}}></img>
                                        </div>
                                        :
                                        <div>
                                            <svg fill="#FAFAFA" data-bbox="0 0 50 50" data-type="shape" xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 50 50"><g><path d="M25 48.077c-5.924 0-11.31-2.252-15.396-5.921 2.254-5.362 7.492-8.267 15.373-8.267 7.889 0 13.139 3.044 15.408 8.418-4.084 3.659-9.471 5.77-15.385 5.77m.278-35.3c4.927 0 8.611 3.812 8.611 8.878 0 5.21-3.875 9.456-8.611 9.456s-8.611-4.246-8.611-9.456c0-5.066 3.684-8.878 8.611-8.878M25 0C11.193 0 0 11.193 0 25c0 .915.056 1.816.152 2.705.032.295.091.581.133.873.085.589.173 1.176.298 1.751.073.338.169.665.256.997.135.515.273 1.027.439 1.529.114.342.243.675.37 1.01.18.476.369.945.577 1.406.149.331.308.657.472.98.225.446.463.883.714 1.313.182.312.365.619.56.922.272.423.56.832.856 1.237.207.284.41.568.629.841.325.408.671.796 1.02 1.182.22.244.432.494.662.728.405.415.833.801 1.265 1.186.173.154.329.325.507.475l.004-.011A24.886 24.886 0 0 0 25 50a24.881 24.881 0 0 0 16.069-5.861.126.126 0 0 1 .003.01c.172-.144.324-.309.49-.458.442-.392.88-.787 1.293-1.209.228-.232.437-.479.655-.72.352-.389.701-.78 1.028-1.191.218-.272.421-.556.627-.838.297-.405.587-.816.859-1.24a26.104 26.104 0 0 0 1.748-3.216c.208-.461.398-.93.579-1.406.127-.336.256-.669.369-1.012.167-.502.305-1.014.44-1.53.087-.332.183-.659.256-.996.126-.576.214-1.164.299-1.754.042-.292.101-.577.133-.872.095-.89.152-1.791.152-2.707C50 11.193 38.807 0 25 0"></path></g></svg>
                                            <a>Welcome {user.profile?.name}!</a>
                                        </div>
                                }
                                        {open ? (
                                            <ul className="menuu">
                                                <li className="menu-item">
                                                    <Link to='/profile/addproduct' onClick={() => setOpen(!open)}>Add Product</Link>
                                                </li>
                                                <li className="menu-item">
                                                    <Link to='/profile/myproduct' onClick={() => setOpen(!open)}>My Products</Link>
                                                </li>
                                                <li className="menu-item">
                                                    <Link to='/profile/cart' onClick={() => setOpen(!open)}>Cart</Link>
                                                </li>
                                                <li className="menu-item">
                                                    <Link to='/profile/settings' onClick={() => setOpen(!open)}>Settings</Link>
                                                </li>
                                                <li className="menu-item">
                                                    <Link to='/profile/wishlist' onClick={() => setOpen(!open)}>WishList</Link>
                                                </li>
                                            </ul>
                                        ) : null}
                                    </div>
                        
                            <button className="sub" onClick={() => {
                                signOut(auth)
                                setBool(false)
                            }}>Log Out</button>
                        </li>
                    </> :
                    <>
                        <li>
                            <Link to='/login'>Login</Link> /
                            <Link to='/register'>Register</Link>
                        </li>
                    </>
                }
            </span>
        </div>
    </div>
}