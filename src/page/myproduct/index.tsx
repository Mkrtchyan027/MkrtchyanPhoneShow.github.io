

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./style.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getUser, userFetchLink } from "../../features/user/userSlice";
import { deleteDataById, getAllDataByFields, updateDataById } from "../../firebase/firestore";
import { EnumFirestore } from "../../features/type";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import {allProduct,deleteProductById,selectProduct,} from "../../features/product/productSlice";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

export const MyProduct: React.FC = (): JSX.Element => {
	const products = useAppSelector(selectProduct);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

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
						if (e) {
							dispatch(
								userFetchLink({
									func: getAllDataByFields,
									obj: {
										collectionName: EnumFirestore.PHONE,
										obj: { userId: getUser(e[0]).payload.id },
									},
								})
							)
								.unwrap()
								.then((res: any) => {
									dispatch(allProduct(res));
								});
						}
					})
					.catch((e) => console.log(e));
			} else {
				navigate("/login");
			}
		});
	}, []);

	return (
		<div className="body">
			<div className="myproducts">
				<h2 className="h22">My Products</h2>
				<br />
				<br />
				<div>
					<div className="ghy12">
						{products.arr.map((e: any) => {
							return (
								<div className="db2"  key={e.id}>
									<div className="h21">
										<h4>Name: {e.name}</h4>
										<h4>Model: {e.model}</h4>
										<h4>Price: {e.price}$</h4>
										<h4>Description: {e.desc}</h4>
									</div>

									<span className="sp" >
										<Link className="aa"  to={"/seeproduct/" + e.id}>
											SEE
										</Link>

										<button className="b1"
											onClick={() => {
												dispatch(
													userFetchLink({
														func: deleteDataById,
														obj: {
															collectionName:
																EnumFirestore.PHONE,
															id: e.id,
														},
													})
												);
												dispatch(deleteProductById(e.id));
											}}
										>
											DELETE{" "}
										</button>

										<button className="b1"
											onClick={async () => {									
												const { value: formValues } =
													await Swal.fire({
														title: "EDIT",
														html:
															`<input id="swal-input1" class="swal2-input" value=${e.name} >` +
															`<input id="swal-input2" class="swal2-input" value=${e.price}>` +
															`<input id="swal-input3" class="swal2-input" value=${e.desc}>` 
														,
														focusConfirm: false,
                                                        preConfirm: () => {
                                                            return [
                                                            document?.getElementById('swal-input1'),
                                                            document?.getElementById('swal-input2'),
                                                            document?.getElementById('swal-input3'),
                                                            ]
                                                        }
													});

												if (formValues) {
													let d =  Array.from(formValues).map((e:any)=>e.value)
                                                    let obj = {name:d[0], price:d[1], desc:d[2]}; 
                                                    console.log('===>',obj, e.id);
                                                                                        
                                                    dispatch(
                                                        userFetchLink({
                                                            func: updateDataById,
                                                            obj: {
                                                                collectionName: EnumFirestore.PHONE,
                                                                object: {...obj },
                                                                id:e.id
                                                            },
                                                        })
                                                    )
												}
											}}
										>
											EDIT
										</button>
									</span>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};