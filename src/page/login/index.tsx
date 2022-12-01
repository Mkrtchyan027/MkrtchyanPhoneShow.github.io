import { signInWithEmailAndPassword } from 'firebase/auth';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {  User } from '../../features/type';
import { auth } from '../../firebase/firebase';
import './style.css';

export const Login = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<User>()

    const navigate=useNavigate()

    const save = (data: any) => {
        signInWithEmailAndPassword(auth, data.email, data.password).then(res => {
            console.log(res)
            navigate('/profile')
        }).catch(e => {
            console.log(e)
        });
    }
    return <div className='login'>
        <h1 className='log'>Login</h1>

        <form className='form' onSubmit={handleSubmit(save)}>
            <input className='inpo1' placeholder='Enter your email' {...register('email', { required: true })} />
            <input className='inpo1' type={"password"}  placeholder='Enter your password'  {...register('password', { required: true })} />
            <button className='bni1'>Login</button>
        </form>
    </div>
}