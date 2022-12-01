import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { EnumFirestore } from "../../features/type";
import {
	getUser,
	selectUser,
	userFetchLink,
} from "../../features/user/userSlice";
import { auth } from "../../firebase/firebase";
import { getAllDataByFields } from "../../firebase/firestore";
import "./style.css";

export const Profile = () => {
	const user = useAppSelector(selectUser);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	useEffect(() => {
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
						if (e) {
							dispatch(getUser(e[0]));
						}
					})
					.catch((e) => console.log(e));
			} else {
				navigate("/login");
			}
		});
	}, []);
	return (
		<div className="profile">
			<div className="us"> <br/>
				<div className="me">
				<div className="div4">
				<h3>{user.profile?.name} {user.profile?.surname}</h3>
				<h4>Age:{user.profile?.age}</h4>
				</div>
				<div className='userimg'>
                        {
                            user.profile?.picurl?
                            <img className="img" src={user.profile?.picurl} style={{width:'120px',height:'auto',	}}/>
                            :
                            <img className="img" src="https://via.placeholder.com/120x120"  />
                        }
                    </div>
				</div>	
				<br />
				<div className="menu52">
					<ul>
						<li className="menu6">
							<Link id="hk5" to="/profile/addproduct">
								Add Product
							</Link>
						</li>
						<li className="menu6">
							<Link id="hk5"
								to="/profile/myproduct"
							>
								My Products
							</Link>
						</li>
						<li className="menu6">
							<Link id="hk5" to="/profile/cart">
								Cart
							</Link>
						</li>
						<li className="menu6">
							<Link id="hk5"
								to="/profile/settings"
							>
								Settings
							</Link>
						</li>
						<li className="menu6">
							<Link id="hk5"
								to="/profile/wishlist"
							>
								WishList
							</Link>
						</li>
					</ul>
				</div>
			</div>
			<div>
				<Outlet />
			</div>
		</div>
	);
};