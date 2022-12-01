
import "./style.css";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { getUser, selectUser, userFetchLink } from "../../features/user/userSlice";
import { useAppDispatch } from "../../app/hooks";
import { addData, getAllDataByFields } from "../../firebase/firestore";
import { phone, EnumFirestore, Product } from "../../features/type";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { uploadPicArray } from "../../firebase/storage";
import { useSelector } from "react-redux";

export const AddProduct = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const user = useSelector(selectUser)
	const [arrPic, setArrPic] = useState<any>([]);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
		watch,
	} = useForm<Product>();

	useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user && user.email) {
                dispatch(userFetchLink({ func: getAllDataByFields, obj: { collectionName: EnumFirestore.USERS, fieldname: "email", field: user.email } }))
                    .unwrap()
                    .then((e: any) => {
                        dispatch(getUser(e[0]))
                    })
                    .catch(e => console.log(e))
                }
            else {
                navigate('/login')
            }

        })
    }, [])

	const save = (data: any) => {
        dispatch(userFetchLink({ func: uploadPicArray, obj: { collectionName: EnumFirestore.PHONE, obj: { ...data, userId: user.profile.id, picurl: arrPic } } }))
        .then(e => {
                setArrPic([])
                reset()
            })
            .catch(e => console.log(e))
    }
	return (
		<div className="body">
			<div className="product"> <br></br>
				<form className="form"  onSubmit={handleSubmit(save)}>
				<h2 className="h22"> Add Product</h2>
					<input className="inp2" 
						placeholder="Model"
						{...register("name", { required: true })}
					/>
					{errors.name && errors.name.type === "required" && (
						<p>Enter name</p>
					)}{" "}
					
					<input className="inp2"
						placeholder="Price"
						{...register("price", { required: true })}
					/>
					{errors.price && errors.price.type === "required" && (
						<p>Enter price</p>
					)}{" "} 
                    <input className="inp2"
						placeholder="Year"
						{...register("year", { required: true })}
					/>
					{errors.price && errors.price.type === "required" && (
						<p>Enter price</p>
					)}{" "}
					<textarea className="inp2"
						placeholder="Description"
						{...register("desc", { required: true })}
					/>
					<select className="sel22" {...register("model")}>
						{phone.map((e) => {
							return (
								<option key={e.name} value={e.name}>
									{e.name}
								</option>
							);
						})}
					</select>
					<input className="inp2"
						type={"file"}
						multiple
						onChange={(e) => {
							let arr = e.target.files;
							if (arr?.length) {
								let arr1 = Array.from(arr);
								setArrPic([...arrPic, ...arr1]);
							}
							console.log(e.target.files);
						}}
					/>
					<div>
						{arrPic.length
							? arrPic.map((e: any, i: number) => {
									return (
										<div key={i} style={{ display: "inline-block" }}>
											<img
												src={"http://localhost:3000/ph/" + e.name}
												alt=""
												width="100px"
											/>
											<button
												type="button"
												onClick={() => {
													arrPic.splice(i, 1);
													setArrPic([...arrPic]);
												}}
											>
												&times;
											</button>
										</div>
									);
							  })
							: ""}
					</div>
					<button className="sub">Submit</button>
				</form>
			</div>
	</div>
	);
};