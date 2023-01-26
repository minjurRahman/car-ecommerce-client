import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import ServiceCard from './ServiceCard';

const Services = () => {
    const [services, setServices] = useState([]);
    const [search, setSearch] = useState('');
    const searchRef = useRef();

    const [isAsc, setIsAsc] = useState(true);
    useEffect(() =>{
        fetch(`https://car-service-hub-server.vercel.app/services?search=${search}&order=${ isAsc ? 'asc' : 'desc' }`)
        .then(res => res.json())
        .then(data => setServices(data))
    } , [isAsc, search])

    const handleSearch = () =>{
        // console.log(searchRef.current.value)
        setSearch(searchRef.current.value)
    }

    return (
        <div>
            <div className='text-center mx-auto w-1/2 mb-4 py-6'>
                <p className='text-2xl font-bold text-info'>Services</p>
                <h2 className="text-5xl font-semibold">Our Service Area</h2>
                <p>the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. </p>
                <input className='input input-sm border' type="text" /> <button onClick={handleSearch} className='btn'>Search</button>
                <button className='btn btn-info'  onClick={() => setIsAsc(!isAsc)}> {isAsc ? 'desc' : 'asc'}</button>
            </div>
            <div className='mb-6 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    services.map(service => <ServiceCard 
                    key={service._id}
                    service={service}
                    ></ServiceCard>)
                }
            </div>
            <div className='text-center mb-7'>
            <button className=" btn btn-outline btn-info">More Services</button>
            </div>
        </div>
    );
};

export default Services;