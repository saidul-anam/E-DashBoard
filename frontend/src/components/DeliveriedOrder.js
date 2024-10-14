import React, { useEffect, useState } from 'react'
const DeliveredOrder=()=>{
    const [products,setProducts]=useState([])
    useEffect(()=>{
       getProducts();
    },[])
   
    const getProducts=async()=>{
        let result =await fetch(`http://localhost:5000/search_pastorder`);
             result=await result.json();

             setProducts(result);
    }
   /* const deleteproduct=async(id)=>{
         console.warn(id)
         let result=await fetch(`http://localhost:5000/carts/${id}`,{
            method:"Delete"
         });
         result=await result.json()
        if(result){
            getProducts()
            alert("record is deleted");
        }
        }*/
        
         
    return(
        <div className='product-list'>
            <h3>Product List</h3>
            <ul>
                <li>S.no</li>
                <li> UserId</li>
                <li> price</li>
                <li>Delivery Date</li>
                <li>Level</li>
                <li>Operation</li>
            </ul>
            {
               products.length>0? products.map((item,index)=>
                    <ul>
                <li>{index}</li>
                <li> {item.userId}</li>
                <li> {item.price}</li>
                <li> {item.deliveryDate}</li>
                <li>{item.orderLabel }
                </li>
            </ul>)
                :
                <h1>No Result Found</h1>
            }

        </div>
    )
}
export default DeliveredOrder;