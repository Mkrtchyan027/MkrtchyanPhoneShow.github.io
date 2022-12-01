import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
	getUser,
	selectUser,
	userFetchLink,
} from "../../features/user/userSlice";
import {
	addData,
	getAllDataByFields,
	getDataById,
} from "../../firebase/firestore";
import { Cart, EnumFirestore, phone, Product, Reit } from "../../features/type";
import "./style.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import {
	allwishlist,
	selectwishlist,
} from "../../features/wishlist/wishlistSlice";
import { useSelector } from "react-redux";
import { Rating } from "react-simple-star-rating";
import { useForm } from "react-hook-form";
import { allrate, selectrate } from "../../features/reit/reitSlice";

export const SeeProduct = () => {
	const [clothh, setCloth] = useState<Product>();
	const dispatch = useAppDispatch();
	const params = useParams();
	const [name, setName] = useState("https://via.placeholder.com/636x477");
	const navigate = useNavigate();
	const wishlist = useAppSelector(selectwishlist);
	const userProfile = useAppSelector(selectUser);
	const user = useSelector(selectUser)
	const { register, handleSubmit, reset, formState: { errors } } = useForm<Reit>()
	const [rate, setRate] = useState(0)
	const feedbacks = useAppSelector(selectrate)
	const save = (data: any) => {
        dispatch(userFetchLink({ func: addData, obj: { collectionName:EnumFirestore.REIT, obj:{ ...data, rating: rate, userId: user.profile?.id, productId: phone, userName: user.profile?.name, userPic: user.profile?.picurl } } }))
            .then(any => {
                setRate(0)
                reset()
                dispatch(userFetchLink({ func: getAllDataByFields, obj: { collectionName: EnumFirestore.REIT, obj: { "productId": phone } } }))
                    .unwrap()
                    .then((e: any) => {
                        dispatch(allrate(e))
                    })
                    .catch(e => console.log(e))
            })
            .catch(e => console.log(e))
    }
	
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user && user.email) {
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
						dispatch(getUser(e[0]));
					})
					.catch((e) => console.log(e));
			}
		});
		dispatch(
			userFetchLink({
				func: getDataById,
				obj: { collectionName: EnumFirestore.PHONE, id: params.id },
			})
		)
			.unwrap()
			.then((res: any) => {
				setCloth(res);
				setName(res.picurl[0]);
			});
	}, []);
	return (
		<div className="seeproduct">
			{
				<div>
					{" "}
					<br />
					<br />
					<h1>{clothh?.name}</h1>
					<div className="mainimg">
						<img src={name} width="400px" height="600px" />
					</div>
					<div className="imgcontainer">
						{clothh?.picurl.map((e: any, i: number) => {
							return (
								<img
									key={i}
									src={e}
									width="80px"
									height="100px"
									onClick={() => {
										setName(e);
									}}
								/>
							);
						})}
					</div>
					<div className="feedbackmain">
						{
							clothh?.userId == user.profile?.id ?
								<></>
								:
								<form onSubmit={handleSubmit(save)}>
									<h3>Leave a review</h3>

									<div>
										<Rating initialValue={rate} SVGclassName="rating" onClick={(rate: number) => setRate(rate)} />

										<textarea placeholder="Enter your comment" {...register("comment", { required: true })}></textarea>

										<button className="productbuttonadd">Submit Review</button>
									</div>
								</form>
						}

						{
							feedbacks?.arr?.map((e: any) => {
								return <div key={e.id}>
									<div>
										{
											e?.userPic ?
												<img src={e?.userPic} width="50px" />
												:
												<svg fill="#FAFAFA" data-bbox="0 0 50 50" data-type="shape" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50"><g><path d="M25 48.077c-5.924 0-11.31-2.252-15.396-5.921 2.254-5.362 7.492-8.267 15.373-8.267 7.889 0 13.139 3.044 15.408 8.418-4.084 3.659-9.471 5.77-15.385 5.77m.278-35.3c4.927 0 8.611 3.812 8.611 8.878 0 5.21-3.875 9.456-8.611 9.456s-8.611-4.246-8.611-9.456c0-5.066 3.684-8.878 8.611-8.878M25 0C11.193 0 0 11.193 0 25c0 .915.056 1.816.152 2.705.032.295.091.581.133.873.085.589.173 1.176.298 1.751.073.338.169.665.256.997.135.515.273 1.027.439 1.529.114.342.243.675.37 1.01.18.476.369.945.577 1.406.149.331.308.657.472.98.225.446.463.883.714 1.313.182.312.365.619.56.922.272.423.56.832.856 1.237.207.284.41.568.629.841.325.408.671.796 1.02 1.182.22.244.432.494.662.728.405.415.833.801 1.265 1.186.173.154.329.325.507.475l.004-.011A24.886 24.886 0 0 0 25 50a24.881 24.881 0 0 0 16.069-5.861.126.126 0 0 1 .003.01c.172-.144.324-.309.49-.458.442-.392.88-.787 1.293-1.209.228-.232.437-.479.655-.72.352-.389.701-.78 1.028-1.191.218-.272.421-.556.627-.838.297-.405.587-.816.859-1.24a26.104 26.104 0 0 0 1.748-3.216c.208-.461.398-.93.579-1.406.127-.336.256-.669.369-1.012.167-.502.305-1.014.44-1.53.087-.332.183-.659.256-.996.126-.576.214-1.164.299-1.754.042-.292.101-.577.133-.872.095-.89.152-1.791.152-2.707C50 11.193 38.807 0 25 0"></path></g></svg>
										}

										<div>
											<p>{e.userName}</p>
											<Rating SVGclassName="rating"
												initialValue={e.rating}
												allowHover={false}
												readonly />
										</div>
									</div>

									<p>{e.comment}</p>
								</div>
							})
						}

					</div>
				</div>
			}

			{
				<span className="ch">
					{" "}
					<br /> <br />
					<h1>Model:{clothh?.model}</h1>
					<h3>Price: {clothh?.price}</h3>
					<h3>Description: {clothh?.desc}</h3>
					<button className="sub"
						onClick={() => {
							onAuthStateChanged(auth, (user) => {
								if (user && user.email) {
									dispatch(
										userFetchLink({
											func: addData,
											obj: {
												collectionName: EnumFirestore.CART,
												obj: { product: clothh, userId: userProfile.profile?.id },
											},
										})
									)
										.then((e) => { })
										.catch((e) => console.log(e));
								} else {
									navigate("/login");
								}
							});
						}}
					>
						{" "}
						to Cart
					</button>
					<div>
						<span>
							<svg
								fill="#FAFAFA"
								data-bbox="0 0 50 50"
								data-type="shape"
								xmlns="http://www.w3.org/2000/svg"
								width="26"
								height="26"
								viewBox="0 0 50 50"
							>
								<g>
									{/* <path d="M25 48.077c-5.924 0-11.31-2.252-15.396-5.921 2.254-5.362 7.492-8.267 15.373-8.267 7.889 0 13.139 3.044 15.408 8.418-4.084 3.659-9.471 5.77-15.385 5.77m.278-35.3c4.927 0 8.611 3.812 8.611 8.878 0 5.21-3.875 9.456-8.611 9.456s-8.611-4.246-8.611-9.456c0-5.066 3.684-8.878 8.611-8.878M25 0C11.193 0 0 11.193 0 25c0 .915.056 1.816.152 2.705.032.295.091.581.133.873.085.589.173 1.176.298 1.751.073.338.169.665.256.997.135.515.273 1.027.439 1.529.114.342.243.675.37 1.01.18.476.369.945.577 1.406.149.331.308.657.472.98.225.446.463.883.714 1.313.182.312.365.619.56.922.272.423.56.832.856 1.237.207.284.41.568.629.841.325.408.671.796 1.02 1.182.22.244.432.494.662.728.405.415.833.801 1.265 1.186.173.154.329.325.507.475l.004-.011A24.886 24.886 0 0 0 25 50a24.881 24.881 0 0 0 16.069-5.861.126.126 0 0 1 .003.01c.172-.144.324-.309.49-.458.442-.392.88-.787 1.293-1.209.228-.232.437-.479.655-.72.352-.389.701-.78 1.028-1.191.218-.272.421-.556.627-.838.297-.405.587-.816.859-1.24a26.104 26.104 0 0 0 1.748-3.216c.208-.461.398-.93.579-1.406.127-.336.256-.669.369-1.012.167-.502.305-1.014.44-1.53.087-.332.183-.659.256-.996.126-.576.214-1.164.299-1.754.042-.292.101-.577.133-.872.095-.89.152-1.791.152-2.707C50 11.193 38.807 0 25 0"></path> */}
								</g>
							</svg>
							{/* <p>Name: {us?.name}</p> */}
						</span>
					</div>
				</span>
			}
		</div>
	);
};
// import { useNavigate, useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { useAppDispatch, useAppSelector } from "../../app/hooks";
// import {
// 	getUser,
// 	selectUser,
// 	userFetchLink,
// } from "../../features/user/userSlice";
// import {
// 	addData,
// 	deleteDataById,
// 	getAllDataByFields,
// 	getDataById,
// } from "../../firebase/firestore";
// import { Cart, EnumFirestore, Product, Reit } from "../../features/type";
// import "./style.css";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "../../firebase/firebase";
// import {
// 	allwishlist,
// 	selectwishlist,
// } from "../../features/wishlist/wishlistSlice";
// import { useSelector } from "react-redux";
// import { useForm } from "react-hook-form";
// import { allrate, selectrate } from "../../features/reit/reitSlice";
// import { Rating } from "react-simple-star-rating"

// export const SeeProduct: React.FC = (): JSX.Element => {
// 	const [clothh, setCloth] = useState<Product>();
// 	const dispatch = useAppDispatch();
// 	const params = useParams();
// 	const [name, setName] = useState("https://via.placeholder.com/636x477");
// 	const navigate = useNavigate();
// 	const wishlist = useAppSelector(selectwishlist);
// 	const userProfile = useAppSelector(selectUser);
// 	const user = useSelector(selectUser)
// 	const [us, setUs] = useState<any>()
// 	const { register, handleSubmit, reset, formState: { errors } } = useForm<Reit>()
// 	const [rate, setRate] = useState(0)
// 	const feedbacks = useAppSelector(selectrate)

// 	useEffect(() => {
// 		onAuthStateChanged(auth, (user) => {
// 			if (user && user.email) {
// 				dispatch(
// 					userFetchLink({
// 						func: getAllDataByFields,
// 						obj: {
// 							collectionName: EnumFirestore.USERS,
// 							obj: { email: user.email },
// 						},
// 					})
// 				)
// 					.unwrap()
// 					.then((e: any) => {
// 						dispatch(getUser(e[0]));
// 					})
// 					.catch((e) => console.log(e));
// 			}
// 		})	
// 		dispatch(
// 			userFetchLink({
// 				func: getDataById,
// 				obj: { collectionName: EnumFirestore.PHONE, id: params.id },
// 			})
// 		)
// 			.unwrap()
// 			.then((res: any) => {
// 				setCloth(res);
// 				setName(res.picurl[0]);
// 			});	
// 			// dispatch(userFetchLink({ func: getAllDataByFields, obj: { collectionName: EnumFirestore.RATE, obj: { "productId": clothh?.id } } }))
// 	// .unwrap()
// 	// .then((e: any) => {
// 	// 	dispatch(allrate(e))
// 	// })
// 	// .catch(e => console.log(e))
// 	}, []);


	


//     const save = (data: any) => {
//         dispatch(userFetchLink({ func: addData, obj: { collectionName: EnumFirestore.REIT, obj: { ...data, rating: rate, userId: user.profile?.id, productId: clothh?.id, userName: user.profile?.name, userPic: user.profile?.picurl } } }))
//             .then(e => {
//                 setRate(0)
//                 reset()
//                 dispatch(userFetchLink({ func: getAllDataByFields, obj: { collectionName: EnumFirestore.REIT, obj: { "productId": clothh?.id } } }))
//                     .unwrap()
//                     .then((e: any) => {
//                         dispatch(allrate(e))
//                     })
//                     .catch(e => console.log(e))
//             })
//             .catch(e => console.log(e))
//     }

// 	return (
// 		<div className="seeproduct">
// 			{
// 				<div>
// 					{" "}
// 					<br />
// 					<br />

// 					<div className="mainimg">
// 						<img src={name} width="400px" height="600px" />
// 					</div>
// 					<div className="imgcontainer">
// 						{clothh?.picurl.map((e: any, i: number) => {
// 							return (
// 								<img
// 									key={i}
// 									src={e}
// 									width="80px"
// 									height="100px"
// 									onClick={() => {
// 										setName(e);
// 									}}
// 								/>
// 							);
// 						})}
// 					</div>
					
//                     <div className="feedbackmain">
//                         {
//                             clothh?.userId == user.profile?.id ?
//                                 <></>
//                                 :
//                                 <form onSubmit={handleSubmit(save)}>
//                                 <h4>Leave your review</h4>
//                                     <div>
//                                         <Rating initialValue={rate} SVGclassName="rating" onClick={(rate: number) => setRate(rate)} />

//                                         <textarea placeholder="Enter your comment" {...register("comment", { required: true })}></textarea>

//                                         <button className="productbutton">Submit Review</button>
//                                     </div>
//                                 </form>
//                         }

//                         {
//                             feedbacks?.arr?.map((e: any) => {
//                                 return <div key={e.id}>
//                                     <div>
//                                         {
//                                             e?.userPic ?
//                                                 <img src={e?.userPic} width="70px" height='80px'/>
//                                                 :
//                                                 <svg fill="#FAFAFA" data-bbox="0 0 50 50" data-type="shape" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50"><g><path d="M25 48.077c-5.924 0-11.31-2.252-15.396-5.921 2.254-5.362 7.492-8.267 15.373-8.267 7.889 0 13.139 3.044 15.408 8.418-4.084 3.659-9.471 5.77-15.385 5.77m.278-35.3c4.927 0 8.611 3.812 8.611 8.878 0 5.21-3.875 9.456-8.611 9.456s-8.611-4.246-8.611-9.456c0-5.066 3.684-8.878 8.611-8.878M25 0C11.193 0 0 11.193 0 25c0 .915.056 1.816.152 2.705.032.295.091.581.133.873.085.589.173 1.176.298 1.751.073.338.169.665.256.997.135.515.273 1.027.439 1.529.114.342.243.675.37 1.01.18.476.369.945.577 1.406.149.331.308.657.472.98.225.446.463.883.714 1.313.182.312.365.619.56.922.272.423.56.832.856 1.237.207.284.41.568.629.841.325.408.671.796 1.02 1.182.22.244.432.494.662.728.405.415.833.801 1.265 1.186.173.154.329.325.507.475l.004-.011A24.886 24.886 0 0 0 25 50a24.881 24.881 0 0 0 16.069-5.861.126.126 0 0 1 .003.01c.172-.144.324-.309.49-.458.442-.392.88-.787 1.293-1.209.228-.232.437-.479.655-.72.352-.389.701-.78 1.028-1.191.218-.272.421-.556.627-.838.297-.405.587-.816.859-1.24a26.104 26.104 0 0 0 1.748-3.216c.208-.461.398-.93.579-1.406.127-.336.256-.669.369-1.012.167-.502.305-1.014.44-1.53.087-.332.183-.659.256-.996.126-.576.214-1.164.299-1.754.042-.292.101-.577.133-.872.095-.89.152-1.791.152-2.707C50 11.193 38.807 0 25 0"></path></g></svg>
//                                         }

//                                         <div>
//                                             <p>{e.userName}</p>
//                                             <Rating SVGclassName="rating"
//                                                 initialValue={e.rating}
//                                                 allowHover={false}
//                                                 readonly />
//                                         </div>
//                                     </div>

//                                     <p>{e.comment}</p>
//                                 </div>
//                             })
//                         } 

//                     </div>
//                 </div>
		
// 			}

// 			{
// 				<span className="ch">
// 					{" "}
// 					<br /> <br />
// 					<h1>{name}</h1>
// 					<h2>{clothh?.price} $</h2>
// 					<h4>Brand: {clothh?.model}</h4>
// 					<h6>Description: {clothh?.desc}</h6>
// 					<button
// 						onClick={() => {
// 							onAuthStateChanged(auth, (user) => {
// 								if (user && user.email) {
// 									dispatch(
// 										userFetchLink({
// 											func: addData,
// 											obj: {
// 												collectionName: EnumFirestore.CART,
// 												obj: { product: clothh, userId: userProfile.profile?.id },
// 											},
// 										})
// 									)
// 										.then((e) => { })
// 										.catch((e) => console.log(e));
// 								} else {
// 									navigate("/login");
// 								}
// 							});
// 						}}
// 					>
// 						{" "}
// 						to Cart
// 					</button>
// 					<div>
//                     {
//                             wishlist.arr?.some((i: any) => i.product.id == clothh?.id && i.userId == user.profile?.id) ?
//                                         <>
//                                             <svg onClick={() => {
//                                                 dispatch(userFetchLink({ func: deleteDataById, obj: { collectionName: EnumFirestore.WISHLIST, id: wishlist.arr?.find((i: any) => i.product.id == clothh?.id && i.userId == user.profile?.id).id } }))
//                                                     .then(e => {
//                                                         dispatch(userFetchLink({ func: getAllDataByFields, obj: { collectionName: EnumFirestore.WISHLIST, obj: { "userId": user.profile?.id } } }))
//                                                             .unwrap()
//                                                             .then((e: any) => {
//                                                                 dispatch(allwishlist(e))
//                                                             })
//                                                             .catch(e => console.log(e))
//                                                     })
//                                             }} id='wi' xmlns="http://www.w3.org/2000/svg" width="30" viewBox="0 0 19 19" role="img"><path d="M9.44985848,15.5291774 C9.43911371,15.5362849 9.42782916,15.5449227 9.41715267,15.5553324 L9.44985848,15.5291774 Z M9.44985848,15.5291774 L9.49370677,15.4941118 C9.15422701,15.7147757 10.2318883,15.0314406 10.7297038,14.6971183 C11.5633567,14.1372547 12.3827081,13.5410755 13.1475707,12.9201001 C14.3829188,11.9171478 15.3570936,10.9445466 15.9707237,10.0482572 C16.0768097,9.89330422 16.1713564,9.74160032 16.2509104,9.59910798 C17.0201658,8.17755699 17.2088969,6.78363112 16.7499013,5.65913129 C16.4604017,4.81092573 15.7231445,4.11008901 14.7401472,3.70936139 C13.1379564,3.11266008 11.0475663,3.84092251 9.89976068,5.36430396 L9.50799408,5.8842613 L9.10670536,5.37161711 C7.94954806,3.89335486 6.00516066,3.14638251 4.31830373,3.71958508 C3.36517186,4.00646284 2.65439601,4.72068063 2.23964629,5.77358234 C1.79050315,6.87166888 1.98214559,8.26476279 2.74015555,9.58185512 C2.94777753,9.93163559 3.23221417,10.3090129 3.5869453,10.7089994 C4.17752179,11.3749196 4.94653811,12.0862394 5.85617417,12.8273544 C7.11233096,13.8507929 9.65858244,15.6292133 9.58280954,15.555334 C9.53938013,15.5129899 9.48608859,15.5 9.50042471,15.5 C9.5105974,15.5 9.48275828,15.5074148 9.44985848,15.5291774 Z"></path></svg>
//                                         </>
//                                         :
//                                         <svg onClick={() => {
//                                             dispatch(userFetchLink({ func: addData, obj: { collectionName: EnumFirestore.WISHLIST, obj: { product: clothh, userId: user.profile?.id } } }))
//                                                 .then(e => {
//                                                     dispatch(userFetchLink({ func: getAllDataByFields, obj: { collectionName: EnumFirestore.WISHLIST, obj: { "userId": user.profile?.id } } }))
//                                                         .unwrap()
//                                                         .then((e: any) => {
//                                                             dispatch(allwishlist(e))

//                                                         })
//                                                         .catch(e => console.log(e))
//                                                 })
//                                                 .catch(e => console.log(e))
//                                         }} className="wishlist" xmlns="http://www.w3.org/2000/svg" width="30" viewBox="0 0 19 19" role="img"><path d="M9.44985848,15.5291774 C9.43911371,15.5362849 9.42782916,15.5449227 9.41715267,15.5553324 L9.44985848,15.5291774 Z M9.44985848,15.5291774 L9.49370677,15.4941118 C9.15422701,15.7147757 10.2318883,15.0314406 10.7297038,14.6971183 C11.5633567,14.1372547 12.3827081,13.5410755 13.1475707,12.9201001 C14.3829188,11.9171478 15.3570936,10.9445466 15.9707237,10.0482572 C16.0768097,9.89330422 16.1713564,9.74160032 16.2509104,9.59910798 C17.0201658,8.17755699 17.2088969,6.78363112 16.7499013,5.65913129 C16.4604017,4.81092573 15.7231445,4.11008901 14.7401472,3.70936139 C13.1379564,3.11266008 11.0475663,3.84092251 9.89976068,5.36430396 L9.50799408,5.8842613 L9.10670536,5.37161711 C7.94954806,3.89335486 6.00516066,3.14638251 4.31830373,3.71958508 C3.36517186,4.00646284 2.65439601,4.72068063 2.23964629,5.77358234 C1.79050315,6.87166888 1.98214559,8.26476279 2.74015555,9.58185512 C2.94777753,9.93163559 3.23221417,10.3090129 3.5869453,10.7089994 C4.17752179,11.3749196 4.94653811,12.0862394 5.85617417,12.8273544 C7.11233096,13.8507929 9.65858244,15.6292133 9.58280954,15.555334 C9.53938013,15.5129899 9.48608859,15.5 9.50042471,15.5 C9.5105974,15.5 9.48275828,15.5074148 9.44985848,15.5291774 Z"></path></svg>
//                     }
//                 </div>				
// 				</span>
// 			}
			
// 		</div>
// 	);
// };