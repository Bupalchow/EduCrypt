import React from 'react'
import { useState , useEffect } from 'react'
import { storage } from '../firebase';
import { ref , uploadBytes , listAll ,getDownloadURL} from "firebase/storage";
import { v4 } from "uuid";
const Submit = () => {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const imageListRef=ref(storage, 'Educrypt/');
  const uploadImage =()=>{
    if(imageUpload==null) return;
    const storageRef = ref(storage, `Educrypt/${imageUpload.name + v4()}`);
    uploadBytes(storageRef, imageUpload).then((snapshot)=>{
      getDownloadURL(snapshot.ref).then((url)=>{
      setImageUrls((prev)=>[...prev,url])
    })
    })
  }
  useEffect(() => {
    listAll(ref(storage, 'Educrypt')).then((res)=>{
      res.items.forEach((item)=>{
        getDownloadURL(item).then((url)=>{
          setImageUrls((prev)=>[...prev,url])
        })
      })
    })
  },[])
  return (
    <div>
      <input type="file" onChange={(event)=>setImageUpload(event.target.files[0])}/>
      <button onClick={uploadImage}>Submit</button>
      {imageUrls.map((url)=>{
        return <img src="url" />
      })}
    </div>
  )
}

export default Submit
