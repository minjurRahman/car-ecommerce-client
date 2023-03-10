import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';

const CheckOut = () => {
    const { _id, title, price } = useLoaderData();
    const {user} = useContext(AuthContext);

    const handlePlaceOrder = event =>{
        event.preventDefault();
        const form = event.target;
        const name = `${form.firstName.value} ${form.lastName.value}`;
        const phone = form.phone.value;
        const email = form.email.value;
        const message = form.message.value;

        const order = {
            service: _id,
            serviceName: title,
            price: price,
            customer: name,
            email: email,
            phone: phone,
            message: message
        }

        // if(phone.length > 11){
        //     alert('Phone number Should be 11 characters or longer')
        // }
        
        fetch('https://car-service-hub-server.vercel.app/orders', {
            method: 'POST',
            headers:{
                'content-type' : 'application/json',
                authorization: `Bearer ${localStorage.getItem('car-service-token')}`
            },
            body:JSON.stringify(order)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.acknowledged){
                alert('Order placed successfully')
                form.reset();
            }
        })
        .catch(error => console.log(error))


    }



    return (
        <div>
            <form onSubmit={handlePlaceOrder}>
                <h2 className='text-4xl'>You are about to order: {title}</h2>
                <h4 className='text-3xl'>Price: {price}</h4>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                    <input name='firstName' type="text" placeholder="First Name" className="input input-bordered w-full" />
                    <input name='lastName' type="text" placeholder="Last Name" className="input input-bordered w-full" />
                    <input name='phone' type="text" placeholder="Your Phone" defaultValue={user?.phone} className="input input-bordered w-full" required/>
                    <input name='email' type="text" placeholder="Your email" defaultValue={user?.email} className="input input-bordered w-full" readOnly/>
                </div>
                <textarea name='message' className="textarea textarea-bordered h-24 w-full" placeholder="Your message"></textarea>

                <input className='btn btn-info' type="submit" value="Place Your Order" />
            </form>
        </div>
    );
};

export default CheckOut;