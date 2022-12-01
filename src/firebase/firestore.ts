import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore/lite";
import { EnumFirestore } from "../features/type";
import { db } from "./firebase";

export const addData=async({collectionName, obj}:{ collectionName:EnumFirestore, obj:any})=>{
    const coll=collection(db, collectionName)
    const x = await addDoc(coll, obj)
    console.log(x.id);    
    return 'data added'
}

export const getAllData=async({collectionName}:{collectionName:EnumFirestore})=>{
    const coll=collection(db, collectionName)
    const snapshot=await getDocs(coll)
    const arr=snapshot.docs.map(e=>{
        return {...e.data(), id: e.id}
    })
    return arr;
}

export const deleteDataById=async({collectionName, id}:{collectionName:EnumFirestore, id: string})=>{
    const coll=collection(db, collectionName)
    await deleteDoc(doc(coll, id))
    return 'data deleted'
}

export const updateDataById=async({collectionName, id, object}:{collectionName:EnumFirestore, id: string, object: any})=>{
    const coll=collection(db, collectionName)
    await updateDoc(doc(coll, id), object)
    return 'data updated'
}

export const getDataById=async({collectionName, id}:{collectionName:EnumFirestore, id:string})=>{
    const coll=collection(db, collectionName)
    const user = await getDoc(doc(coll, id))
    return {...user.data(), id:user.id}
}

export const getAllDataByFields = async({collectionName, obj}:{collectionName:EnumFirestore, obj:any})=>{
    const arr = []
    for(let e in obj){
        arr.push(where(e, "==", obj[e]))
    }
    const q = query(collection(db, collectionName), ...arr);
    const docSnap = await getDocs(q);
    const data = docSnap.docs.map(e => {
        return { ...e.data(), id: e.id }
    })
    return data
}

export const getAllDataByFilter = async({collectionName, obj}:{collectionName:EnumFirestore, obj:any})=>{
    const arr = []
    arr.push(where("price", ">=", obj.min))
    arr.push(where("price", "<=", obj.max))
    const q = query(collection(db, collectionName), ...arr);
    const docSnap = await getDocs(q);
    const data = docSnap.docs.map(e => {
        return { ...e.data(), id: e.id }
    })
    return data
}