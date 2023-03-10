import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Header from '../Pages/Shared/Header';

const DashboardLayout = () => {
    return (
        <div>
            <Header></Header>
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                   <Outlet></Outlet>
                </div> 
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label> 
                    <ul className="menu p-4 w-80 text-base-content">
                        <li><Link to='/dashboard/orders'>Orders List</Link></li>
                        <li><Link to='/dashboard/orders'>My Orders</Link></li>

                            <>
                            <li><Link to='/dashboard/allusers'>All Users</Link></li>
                            <li><Link to='/dashboard/adminlist'>Admin List</Link></li>
                            <li><Link to='/dashboard/customerlist'>Customer List</Link></li>
                            <li><Link to='/dashboard/productlist'>Product List</Link></li>

                            </>
                    </ul>
                
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;