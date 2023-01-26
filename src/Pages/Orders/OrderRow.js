import React, { useEffect, useState } from 'react';

const OrderRow = ({order, handleDelete, handleStatusUpdate}) => {
    const { _id, serviceName, price, phone, service, customer, status} = order;
    const [orderService, setOrderService] = useState({});

    useEffect( () => {
        fetch(`https://car-service-hub-server.vercel.app/services/${service}`)
            .then(res => res.json())
            .then(data => setOrderService(data))
    }, [service])

    return (
        
      <tr>
      <th>
        <label>
          <button onClick={() =>handleDelete(_id)} className='btn btn-ghost'>X</button>
        </label>
      </th>
      <td>
        
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="rounded w-24 h-24">
                {
                orderService?.img &&
              <img src={orderService.img} alt="" />
                }
            </div>
          </div>
          <div>
            <div className="font-bold">{customer}</div>
            <div className="text-sm opacity-50">{phone}</div>
          </div>
        </div>
      </td>
      <td>
        {serviceName}
        <br/>
        <span className="badge badge-ghost badge-sm">${price}</span>
      </td>
      <td>Purple</td>
      <th>
        <button onClick={() => handleStatusUpdate(_id)} className="btn btn-ghost btn-xs">{status ? status : 'Pending'}</button>
      </th>
    </tr>
    );
};

export default OrderRow;