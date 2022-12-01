export const fetchUser=(func:Function, obj:any)=>{
    return new Promise((resolve, reject)=>{
        func(obj)
        .then((res:any)=>resolve(res))
        .catch((e:any)=>reject(e))
    })
}