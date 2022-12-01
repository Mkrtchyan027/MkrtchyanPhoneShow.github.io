import { addDoc, collection, doc, updateDoc } from "firebase/firestore/lite";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { EnumFirestore } from "../features/type";
import { db, storage } from "./firebase";

export const uploadPicSingle = async ({ collectionName, obj , id}: { collectionName: EnumFirestore, obj: any, id:string }) => {
    if (obj.picurl.length) {
        const storageRef = ref(storage, `files/${obj.picurl[0].name}`);
        const uploadTask = uploadBytesResumable(storageRef, obj.picurl[0]);
        uploadTask.on("state_changed",
            (snapshot) => {
            },
            (error) => {
                alert(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    console.log(downloadURL)
                    const coll = collection(db, collectionName)
                    await updateDoc(doc(coll, id), {picurl: downloadURL})
                });
            }
        );
    }
}
export const uploadPicArray = async ({ collectionName, obj }: { collectionName: EnumFirestore, obj: any }) => {
    const arr:any = []
    const coll = collection(db, collectionName)
   
    const x = await addDoc(coll, { ...obj, picurl: arr })
    console.log(x.id);
    for (let e of obj.picurl) {
        const storageRef = ref(storage, `photo/${e.name}`);
        const uploadTask = uploadBytesResumable(storageRef, e);
        uploadTask.on("state_changed",
            (snapshot) => {
            },
            (error) => {
                alert(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    console.log(downloadURL)
                    arr.push(downloadURL)
                    await updateDoc(doc(coll, x.id), {picurl: arr})
                });
            }
        );
    }
}