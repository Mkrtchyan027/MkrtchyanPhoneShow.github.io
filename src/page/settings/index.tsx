import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getUser, selectUser, userFetchLink } from '../../features/user/userSlice';
import { useEffect, useState } from 'react'
import './style.css';
import { onAuthStateChanged, updatePassword } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { getAllDataByFields, updateDataById } from '../../firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { EnumFirestore, User } from '../../features/type';
import { useForm } from 'react-hook-form';
import { uploadPicSingle } from '../../firebase/storage';

export const Settings:React.FC=():JSX.Element=>{
    const user = useAppSelector(selectUser)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [password, setPassword] = useState({ oldPassword: '', newPassword: '', renewPassword: '' })
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<User>();

    const save = (us: any) => {
        console.log(us);
        dispatch(
            userFetchLink({
                func:updateDataById,
                obj: {
                    collectionName: EnumFirestore.USERS,
                    object: {...us},
                    id:user.profile.id

                },
            })
        )
            .unwrap()
            .then((res: any) => {
                console.log("res=>", res);
                
                dispatch(getUser(us));
            });
        reset();
    };
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

    return <div className='settings'>
        <div className='mayr'>
            <div className='ic1'>
            <h2 className='s'>Settings</h2>
                <i className="material-icons" style={{fontSize:'36px'}}>settings</i>
                </div>
            <div className='userr'>
                {/* <h1 style={{ color: 'green' }}>♥</h1> */}

                <form className='formik' onSubmit={handleSubmit(save)}>
                   <h5>Change</h5>
                    <input className='inp2'
                        placeholder="Name" 
                        {...register("name", { required: true })}
                    />
                    {errors.name && <p>enter name</p>}
    
                    <input className='inp2'
                        placeholder="Surname"
                        {...register("surname", { required: true })}
                    />
                    {errors.surname && <p>enter surname</p>}  
                    
                    <input className='inp2'
                        placeholder="Phone"
                        {...register("phone", { required: true })} />
                    {errors.phone && <p>enter phone</p>}
                    
                    <input className='inp2'
                        placeholder="Age"
                        {...register("age", { required: true })} />
                    {errors.age && <p>enter age</p>} 


                    <input className='inp2'
					placeholder="image"
                     type={"file"}
					{...register("picurl", { required: true })}
				/>
				{errors.picurl && <p>select image</p>} 


                    <button className='sub'>Save</button> 
                </form>

                <div className='divo2525'>
                <h5 className='h22'>Change password</h5>
                    <input className='inp2' placeholder='Old password' onChange={(e) => {
                        password.oldPassword = e.target.value
                        setPassword(password)
                    }} /> 

                    <input className='inp2' placeholder='New password' onChange={(e) => {
                        password.newPassword = e.target.value
                        setPassword(password)
                    }} /> 

                    <input className='inp2' placeholder='Confirm password' onChange={(e) => {
                        password.renewPassword = e.target.value
                        setPassword(password)
                    }} /> 

                    <button className='sub' onClick={() => {
                        console.log(password);
                        if (auth.currentUser && password.oldPassword === user.profile?.password && password.newPassword.length >= 6 && password.newPassword === password.renewPassword) {
                            updatePassword(auth.currentUser, password.newPassword)
                                .then((e) => {
                                    console.log(e)
                                }).catch((error) => {
                                    console.log(error)
                                });
                        }
                    }}>Save</button>
                </div>
            </div>
        </div>
    </div>
}