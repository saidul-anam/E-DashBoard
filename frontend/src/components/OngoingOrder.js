import React, { useEffect, useState } from 'react'
const OngoingOrder=()=>{
    const [products,setProducts]=useState([])
    useEffect(()=>{
       getProducts();
    },[])
   
    const getProducts=async()=>{
        let result =await fetch(`https://e-dashboard-k01b.onrender.com/search_order`);
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
        
           const deliveryNow=async(item)=>{
            const orderLabel="delivered"
                let userId=item.userId;
                let price=item.price;
                let products=item.products;
                let deliveryDate=Date.now();
                let result=await fetch(`https://e-dashboard-k01b.onrender.com/update_order/${item._id}`,{
                   method:'put',
                   body:JSON.stringify({userId,price,products,deliveryDate,orderLabel}),
                   headers:{'Content-Type':"application/json"
                   }
                })
            
            console.log(result);
            result=await result.json()
            console.warn(result);
            getProducts();
        }
         
    return(
        <div className='product-list'>
            <h3>Product List</h3>
            <ul>
                <li>S.no</li>
                <li> UserId</li>
                <li> price</li>
                <li> Order Date</li>
                <li>Level</li>
                <li>Operation</li>
            </ul>
            {
               products.length>0? products.map((item,index)=>
                    <ul>
                <li>{index}</li>
                <li> {item.userId}</li>
                <li> {item.price}</li>
                <li> {item.orderDate}</li>
                
                <li>{item.orderLabel }
            
                </li>
                <li><button onClick={()=>deliveryNow(item)}>Delivery</button>
                </li>
            </ul>)
                :
                <h1>No Result Found</h1>
            }

        </div>
    )
}
export default OngoingOrder;