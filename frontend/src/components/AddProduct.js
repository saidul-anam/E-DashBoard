import React,{useState} from 'react'


const AddProduct=()=>{
    const[name,setName]=useState('')
    const[price,setPrice]=useState('')
    const[catagory,setCatagory]=useState('')
    const[company,setCompany]=useState('')
    const[error,setError]=useState(false)
   const addProduct=async()=>{
      if(!name||!price||!catagory||!company){
        setError(true)
        return false;
      }
      const userId=JSON.parse(localStorage.getItem('user'))._id;
      let result=await fetch('http://localhost:5000/add-product',{
        method:'post',
        body: JSON.stringify({name,price,catagory,userId,company}),
        headers:{
            'Content-Type':'application/json'
        }
    })
    console.log(result);
    result=await result.json()
    console.warn(result); 
    }
return(
    <div className='product'>
        <h1>Add Product</h1>
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
        <button onClick={addProduct} className='appbutton'>Add Product</button>
    </div> 
)
}
export default AddProduct; 