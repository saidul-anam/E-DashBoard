import React,{useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'

const UpdateProduct=()=>{
    const[name,setName]=useState('')
    const[price,setPrice]=useState('')
    const[catagory,setCatagory]=useState('')
    const[company,setCompany]=useState('')
    const[error,setError]=useState(false)
    const params=useParams();
    useEffect(()=>{
        getProductDetails();
    })
    const getProductDetails=async()=>{
    let result =await fetch(`http://localhost:5000/product/${params.id}`);
    result=await result.json()
    console.warn(result);
    if(!error){
    setName(result.name)
    setPrice(result.price)
    setCatagory(result.catagory)
    setCompany(result.company)
    setError(true)   
}
    }
   const updateproduct=async()=>{
     let result=await fetch(`http://localhost:5000/product/${params.id}`,{
        method:'put',
        body:JSON.stringify( { name,price,catagory,company }),
        headers:{'Content-Type':"application/json"
        }
     })
     result=await result.json()
     console.warn(result)
    }
return(
    <div className='product'>
        <h1>Update Product</h1>
        <input className="inputBox" type="text"  placeholder='enter product name'
         value={name} onChange={(e)=>{setName(e.target.value)}}/>
        {error &&!name && <span className='invalid-input'>Enter valid Name</span>}
        <input className="inputBox" type="text"  placeholder='enter product price'
         value={price} onChange={(e)=>{setPrice(e.target.value)}}/>
         {error &&!price && <span className='invalid-input'>Enter valid Price</span>}
        <input className="inputBox" type="text"  placeholder='enter product catagory'
         value={catagory} onChange={(e)=>{setCatagory(e.target.value)}}/>
         {error &&!catagory && <span className='invalid-input'>Enter valid Catagory</span>}
        <input className="inputBox" type="text"  placeholder='enter product company'
         value={company} onChange={(e)=>{setCompany(e.target.value)}}/>
         {error &&!company && <span className='invalid-input'>Enter valid Company</span>}
        <button onClick={updateproduct} className='appbutton'>Update Product</button>
    </div> 
)
}
export default UpdateProduct; 