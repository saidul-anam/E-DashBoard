import React, { useEffect, useState } from 'react'
const Carts=()=>{
    const [products,setProducts]=useState([])
    const[total,setTotal]=useState()
    useEffect(()=>{
       getProducts();
       gettotal();
    },[])
    const gettotal=async()=>{
        let totals=0;
        products.map((item,index)=>
            totals=totals+(parseInt(item.price) * parseInt(item.Quantity))) 
        setTotal(totals);
    }
    const getProducts=async()=>{
        const userId=JSON.parse(localStorage.getItem('user'))._id;
        let result =await fetch(`https://e-dashboard-k01b.onrender.com/search_carts/${userId}`);
             result=await result.json();
             setProducts(result);
             await gettotal();
    }
    const deleteproduct=async(id)=>{
         console.warn(id)
         let result=await fetch(`https://e-dashboard-k01b.onrender.com/carts/${id}`,{
            method:"Delete"
         });
         result=await result.json()
        if(result){
            getProducts()
            alert("record is deleted");
        }
        }
        const updateproductinc=async(item)=>{
            let name=item.name;
            let price=item.price;
            let catagory=item.catagory;
            let productId=item.productId;
            let userId=item.userId;
            let company=item.company;
            let Quantity=String(parseInt(item.Quantity)+1)
            let result=await fetch(`https://e-dashboard-k01b.onrender.com/update_cart_inc/${item._id}`,{
               method:'put',
               body:JSON.stringify({name,price,catagory,productId,userId,company,Quantity}),
               headers:{'Content-Type':"application/json"
               }
            })
            result=await result.json()
            getProducts()
            console.warn(result)
           }
           const updateproductdec=async(item)=>{
            let name=item.name;
            let price=item.price;
            let catagory=item.catagory;
            let productId=item.productId;
            let userId=item.userId;
            let company=item.company;
            let Quantity=String(parseInt(item.Quantity)-1)
            if(parseInt(Quantity)==0){
                deleteproduct(item._id);
            }
            else{
            let result=await fetch(`https://e-dashboard-k01b.onrender.com/update_cart_dec/${item._id}`,{
               method:'put',
               body:JSON.stringify( {name,price,catagory,productId,userId,company,Quantity}),
               headers:{'Content-Type':"application/json"
               }
            })
            result=await result.json()
            console.warn(result)}
            getProducts()
           }
           const orderNow=async(price,products)=>{
            const userId=JSON.parse(localStorage.getItem('user'))._id;
           let result=await fetch('https://e-dashboard-k01b.onrender.com/order',{
                method:'post',
                body: JSON.stringify({userId,price,products}),
                headers:{
                    'Content-Type':'application/json'
                }
            })
            products.map(async (item,index)=>{
                let name=item.name;
            let price=item.price;
            let catagory=item.catagory;
            let productId=item.productId;
            let company=item.company;
            let Quantity=item.Quantity;
            let OrderStatus="confirmed";
            let Confirm_level="preprocessing"
            let result_update_admin=await fetch(`https://e-dashboard-k01b.onrender.com/update_cart_confirm/${item._id}`,{
                method:'put',
                body:JSON.stringify( {name,price,catagory,productId,userId,company,Quantity,OrderStatus,Confirm_level}),
                headers:{'Content-Type':"application/json"
                }
             })})
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
                <li>{item.Quantity }
                <button onClick={()=>updateproductinc(item)}>+</button>
                <button onClick={()=>updateproductdec(item)}>-</button>
                </li>
                <li><button onClick={()=>deleteproduct(item._id)}>Remove</button>
                </li>
            </ul>)
                :
                <h1>No Result Found</h1>
            }
            {products.length>0?
            <><h3>Total ={total}</h3>
            <button onClick={()=>orderNow('1110',products)}>Order</button>
                </>
            :<></>}

        </div>
    )
}
export default Carts;