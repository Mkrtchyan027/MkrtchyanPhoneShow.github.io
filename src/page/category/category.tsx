import { Link } from "react-router-dom"
import { phone } from "../../features/type"
import './style.css'

export const Category = () => {
    return <div className="container">
        <h2 className="h222">Category</h2>
        <div className="dvk">
            {
                phone.map((e:any, i) => {
                    return <Link to={'/seecategory/'+e.name} key={i} className="brands" onClick={()=>{}}>
                        <img className="img" src={e.logo} />
                    </Link>
                })
            }
        </div>
    </div>
}