import React,{useEffect} from 'react'
import { useRouter } from 'next/router';
const Account = () => {
  const router=useRouter();
  useEffect(() => {
    if(!localStorage.getItem("myuser")){
      router.push("/")
    }
}, [])
  return (
    <div>account</div>
  )
}

export default Account