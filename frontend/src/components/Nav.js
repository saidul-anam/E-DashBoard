import React from 'react';
import {Link,useNavigate } from 'react-router-dom';
const Nav=()=>{
  const auth=localStorage.getItem('user')
  const navigate=useNavigate();
  let name;
  if(auth){
    name=JSON.parse(auth).name;
}
  const logout=()=>{
    console.warn("apple")
    localStorage.clear();
    navigate('/login');
  }
    return (
        <div>
             {auth?
            <ul className='nav-ul'>
                <li><Link to="/"> Products</Link></li>
              {name==='admin'?
                <><li><Link to="/add"> Add Products</Link></li>
                <li><Link to="/ongoingorder">Ongoing Order</Link></li>
                <li><Link to="/pastorder">Past Order</Link></li>
                </>:
                <><li><Link to="/carts">My Cart</Link></li>
                <li><Link to="/pastcarts">Past Cart</Link></li>
                </>
              }
                <li><Link to="/profile"> Profile</Link></li>
               <li><Link onClick={logout}to="/signup"> Logout ({name})</Link></li>
                   
            </ul>:
            <ul className='nav-ul nav-right'>
          <li><Link to="/signup">Signup</Link></li>
            <li><Link to="/login"> Login</Link></li>
            </ul>
          }
        </div> 
    )
}

export default Nav;