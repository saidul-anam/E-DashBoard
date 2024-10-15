import React, { useEffect, useState } from 'react'
const PastCart=()=>{
    const [products,setProducts]=useState([])
    
    useEffect(()=>{
       getProducts();
    },[])
    
    const getProducts=async()=>{
        const userId=JSON.parse(localStorage.getItem('user'))._id;
        let result =await fetch(`https://e-dashboard-k01b.onrender.com/search_pastcart/${userId}`);
             result=await result.json();
             console.warn(result);
             setProducts(result);
    }
        
    return(
        <div className='product-list'>
            <h3>Product List</h3>
            <ul>
                <li>S.no</li>
                <li> Name</li>
                <li> price</li>
                <li> Catagory</li>
                <li> Company</li>
                <li>Quantity</li>
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
                <li>{item.Quantity }</li>
            </ul>)
                :
                <h1>No Result Found</h1>
            }

        </div>
    )
}
export default PastCart;