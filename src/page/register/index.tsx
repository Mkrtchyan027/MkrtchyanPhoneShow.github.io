import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../app/hooks';
import { EnumFirestore, User } from '../../features/type';
import { userFetchLink } from '../../features/user/userSlice';
import { auth } from '../../firebase/firebase';
import { addData } from '../../firebase/firestore';
import './style.css';

export const Register = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<User>()
    const dispatch=useAppDispatch()

    const save = (data: any) => {
        createUserWithEmailAndPassword(auth, data.email, data.password).then(res => {
            console.log(res)
            dispatch(userFetchLink({func: addData, obj: {collectionName:EnumFirestore.USERS, obj: data}}))
                .then(e => console.log(e))
                .catch(e => console.log(e))
        }).catch(e => console.log(e));
        reset()
    }
    return <div className='register'>

        <h1 className='h1'>Register</h1>
        <form className='fr2' onSubmit={handleSubmit(save)}>
            
            <input className='inpo2'  placeholder='Enter your name' {...register('name', { required: true })} />
            <input className='inpo2'  placeholder='Enter your surname' {...register('surname', { required: true })} />
            <input className='inpo2'  placeholder='Enter your email' {...register('email', { required: true })} />
            <input className='inpo2' placeholder='Enter your age' {...register('age', { required: true })} />
            <input className='inpo2' placeholder='Enter your phone number' {...register('phone', { required: true })} />
            <input className='inpo2' type={"password"} placeholder='Enter your password' {...register('password', { required: true })} />

            <button className='btn22'>Register</button>
        </form>
    </div>
}