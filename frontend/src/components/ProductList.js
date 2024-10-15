import React, { useEffect, useState } from 'react'
import{Link} from  'react-router-dom'
const ProductList=()=>{
    const [products,setProducts]=useState([])
    const auth=localStorage.getItem('user');
    let Name=JSON.parse(auth).name;
    useEffect(()=>{
       getProducts();
    },[])

    const getProducts=async()=>{
             let result=await fetch("https://e-dashboard-k01b.onrender.com/products");
             result=await result.json();
             setProducts(result);
             
    }
    const deleteproduct=async(id)=>{
         console.warn(id)
         let result=await fetch(`https://e-dashboard-k01b.onrender.com/product/${id}`,{
            method:"Delete"
         });
         result=await result.json()
        if(result){
            getProducts()
            alert("record is deleted");
        }
        }
        const addtocart=async(name,price,catagory,company,id)=>{
            const userId=JSON.parse(localStorage.getItem('user'))._id;
            const productId=id;
            const Quantity='1';
            console.warn(name,price,catagory,company);
            let result=await fetch('https://e-dashboard-k01b.onrender.com/cart',{
                 method:'post',
                 body: JSON.stringify({name,price,catagory,productId,userId,company,Quantity}),
                 headers:{
                     'Content-Type':'application/json'
                 }
             })
             console.log(result);
             result=await result.json()
             console.warn(result);
        }
        const searchHandle=async(event)=>{
            let key=event.target.value;
            if(!key){
                getProducts()
            }
            let result=await fetch(`https://e-dashboard-k01b.onrender.com/search/${key}`)
            result=await result.json()
            if(result){
                setProducts(result)
            }
        }
    return(
        <div className='product-list'>
            <h3>Product List</h3>
            <input className='search-product-box' type="text" placeholder='Search Product'
            onChange={searchHandle}/>
            <ul>
                <li>S.no</li>
                <li> Name</li>
                <li> price</li>
                <li> Catagory</li>
                <li> Company</li>
                <li>Operation</li>
            </ul>
            {
               products.length>0? products.map((item,index)=>
                    <ul>
                <li>{index}</li>
                <li> {item.name}</li>
                <li> {item.price}</li>
                <li> {item.catagory}</li>
                <li>{item.company}</li>
                {Name==="admin"?
                <li><button onClick={()=>deleteproduct(item._id)}>Delete</button>
                <Link to={"/update/"+item._id}>Update</Link>
                </li>: 
                <li><button onClick={()=>addtocart(item.name,item.price,item.catagory,item.company,item._id)}>Cart</button></li>
                }
            </ul>
                ):
                <h1>No Result Found</h1>
            }
        </div>
    )
}
export default ProductList;