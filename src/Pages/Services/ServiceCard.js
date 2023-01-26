import React from 'react';
import { Link } from 'react-router-dom';

const ServiceCard = ({service}) => {
    const { _id, img, price, title } = service;


    return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl hover:border-2 border-info">
        <figure><img src={img} alt="service" /></figure>
        <div className="card-body">
            <h2 className="card-title">{title}</h2>
            <p className='text-2xl text-info'>Price: ${price}</p>
            <div className="card-actions justify-end">
            <Link to={`/checkout/${_id}`}>
                 <button className="btn btn-info">CheckOut</button>
            </Link>
            </div>
        </div>

    </div>
    );
};

export default ServiceCard;