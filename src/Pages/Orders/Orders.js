import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import OrderRow from './OrderRow';

const Orders = () => {

    const { user, logOut } = useContext(AuthContext);
    const [orders, setOrders] = useState([])
    
    useEffect( () =>{
        fetch(`https://car-service-hub-server.vercel.app/orders?email=${user?.email}`, {
            headers: {
               authorization: `Bearer ${localStorage.getItem('car-service-token')}`
            },
        })
        .then(res => {
            if(res.status === 401 || res.status === 403){
               return logOut();
            }
           return res.json();
        })
        .then(data => {
            setOrders(data)
        })

    }, [user?.email, logOut])

    const handleDelete = id =>{
        const proceed = window.confirm('Are you sure, you want to cancel this order?');
        if(proceed){
            fetch(`https://car-service-hub-server.vercel.app/orders/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('car-service-token')}`
                 },
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(data.deletedCount > 0){
                    alert("Deleted succeessfully");
                    const remaining = orders.filter(odr => odr._id !== id)
                    setOrders(remaining);
                }
            })
        }
    } 

    const handleStatusUpdate = id =>{
        fetch(`https://car-service-hub-server.vercel.app/orders/${id}`,{
            method: 'PATCH',
            headers:{
                'content-type' : 'application/json',
                authorization: `Bearer ${localStorage.getItem('car-service-token')}`
            },
            body: JSON.stringify({status: 'Approved'})
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.modifiedCount > 0){
                const remaing = orders.filter(odr => odr._id !== id);
                const approving = orders.find(odr => odr._id === id);
                approving.status = 'Approved'
                
                const newOrders = [approving, ...remaing];
                setOrders(newOrders);
            }
        })
    }



    return (
        <div>
            <h1 className='text-5xl mb-6'>You have {orders.length}</h1>
            <div className="overflow-x-auto w-full">
  <table className="table w-full">

    <thead>
      <tr>
        <th>

        </th>
        <th>Name</th>
        <th>Job</th>
        <th>Favorite Color</th>
        <th>Message</th>
      </tr>
    </thead>
    <tbody>
        {
            orders.map(order => <OrderRow
            key={order._id}
            order={order}
            handleDelete={handleDelete}
            handleStatusUpdate={handleStatusUpdate}
            ></OrderRow>)
        }
    </tbody>

  </table>
</div>
        </div>
    );
};

export default Orders; 