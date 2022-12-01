import { Outlet } from 'react-router-dom';
import { Menu } from '../../components/Menu';
import './style.css';

export const Layout=()=>{
    return <div className='layout'>
        <Menu />
        <Outlet/>
    </div>
}