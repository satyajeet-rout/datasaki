// // components/DashboardLayout.js
// import React, { useEffect, useState } from 'react';
// import { Accordion } from 'react-bootstrap';
// import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import { useConfirmation } from '../constants/ConfirmationDialog';
// import { Button, message } from 'antd';
// import { useCookies } from 'react-cookie';
// import { TbMessageChatbotFilled } from 'react-icons/tb';
// import { LoginOutlined, LogoutOutlined, WechatOutlined } from '@ant-design/icons';

// const DashboardLayout = () => {
//     const location = useLocation();
//     const { showConfirm, dialog } = useConfirmation();
//     const [cookies, setCookie, removeCookie] = useCookies();
//     const [isInnerRouteActive,setIsInnerRouteActive] = useState(false);
  

    
//     useEffect(()=>{
//             setIsInnerRouteActive(location.pathname.startsWith('/mlops-solution'));
//     },[location.pathname])
    
//     useEffect(()=>{
//         if(cookies?.access_token===undefined){
//             window.location.href = '/login';
//         }
//     },[cookies?.access_token])
//     const _logout = () => {
//         message.success("Logout successfully")
//         setTimeout(() => {
//             removeCookie("access_token",{path:"/"});            
//         }, 1000);
//     };

//     const handleLogout =()=>{
//         showConfirm(_logout); 
//     }

    
//     return (
//         <div className="dashboard-layout">
//             <div className="dashboard-body">
//                 <aside className="sidebar">
//                      <div className="siteLogo">
//                         <img src='/images/datasaki-logo.svg' alt='Dataski Logo' />
//                     </div>
//                     <nav className="py-8 h-full overflow-auto sideNav">
//                         <ul>
//                             <li>
//                              <NavLink to="/" >
//                              <img src='/images/Dashboard-icon.svg' alt='Dataset-icon'></img> Dashboard
//                                 </NavLink>
//                             </li>
//                             <li>
//                             <Accordion defaultActiveKey={isInnerRouteActive? "0" :""}>
//                                 <Accordion.Item eventKey="0" className='bg-transparent border-0'>
//                                     <Accordion.Header className='bg-none'><img src='/images/Solution-icon.svg' alt='Dataset-icon'></img> MLOPS Solution</Accordion.Header>
//                                     <Accordion.Body style={{padding:"10px 20px 10px 50px"}}>
//                                         <ul>
//                                             <li>
//                                                 <NavLink to="/mlops-solution/data-preparation" >
//                                                     Data Preparation
//                                                 </NavLink>
//                                             </li>
//                                             <li>
//                                                 <NavLink to="/mlops-solution/visualization" >
//                                                      Visualization 
//                                                 </NavLink>
//                                             </li>
//                                         </ul>
//                                     </Accordion.Body>
//                                 </Accordion.Item>
//                             </Accordion>
//                                 {/* <NavLink to="/mlops-solution" >
//                                     <img src='/images/Solution-icon.svg' alt='Dataset-icon'></img> MLOPS Solution
//                                 </NavLink> */}
//                             </li>
//                             <li>
//                                 <NavLink to="/extensions" >
//                                     <img src='/images/Extensions-icon.svg' alt='Dataset-icon'></img> Extensions
//                                 </NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/chatbot" >
//                                 <WechatOutlined style={{marginRight:"10px",fontSize:"20px"}} /> Chatbot
//                                 </NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/plugins" >
//                                 <img src='/images/Plugins-icon.svg' alt='Dataset-icon'></img> Plugins
//                                 </NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/connection" >
//                                 <img src='/images/Connection-icon.svg' alt='Dataset-icon'></img> Connection
//                                 </NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/user-profile-group" >
//                                 <img src='/images/Users-icon.svg' alt='Dataset-icon'></img> Users, Profiles & Group
//                                 </NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/subscription-plan" >
//                                 <img src='/images/Subscription-icon.svg' alt='Dataset-icon'></img> Subscription & Plan
//                                 </NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/settings" >
//                                 <img src='/images/Settings-icon.svg' alt='Dataset-icon'></img> Settings
//                                 </NavLink>
//                             </li>
//                         </ul>
//                     </nav>
//                     <div className="flex gap-3 align-items-center px-3 py-3" style={{boxShadow:"0 -4px 8px rgba(0, 0, 0, 0.2)"}}>
//                             <div className='user-image-sec'>
//                                 <img src='/images/avatar-user-img.png' alt='Avatar Use Imange'></img>
//                             </div>
//                            <div>
//                             {
//                                 cookies?.access_token ?
//                                 <Button onClick={handleLogout} className="bg-transparent text-white border-0 p-0" style={{fontSize:"16px"}}>Logout <LogoutOutlined style={{margin:"3px 0 0 3px"}} /></Button>
//                                 :
//                                 <Link style={{textDecoration:"none",color:"#fff"}} to="/registration">Sign in <LoginOutlined style={{margin:"3px 0 0 3px"}} /></Link>  
//                             }
//                            </div>
//                         </div>
//                 </aside>
//                 <main className="content-area">
//                     <Outlet />
//                 </main>
//             </div>

//             {dialog}

            
//         </div>
//     );
// };

// export default DashboardLayout;



// components/DashboardLayout.js
import React, { useEffect, useState } from 'react';
import { Accordion } from 'react-bootstrap';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useConfirmation } from '../constants/ConfirmationDialog';
import { Button, message } from 'antd';
import { useCookies } from 'react-cookie';
import { TbMessageChatbotFilled } from 'react-icons/tb';
import { LoginOutlined, LogoutOutlined, WechatOutlined } from '@ant-design/icons';

const DashboardLayout = () => {
    const location = useLocation();
    const { showConfirm, dialog } = useConfirmation();
    const [cookies, setCookie, removeCookie] = useCookies();
    const [isInnerRouteActive,setIsInnerRouteActive] = useState(false);
  
    useEffect(()=>{
            setIsInnerRouteActive(location.pathname.startsWith('/mlops-solution'));
    },[location.pathname])
    
    useEffect(()=>{
        if(cookies?.access_token===undefined){
            window.location.href = '/login';
        }
    },[cookies?.access_token])

    const _logout = () => {
        message.success("Logout successfully")
        setTimeout(() => {
            removeCookie("access_token",{path:"/"});            
        }, 1000);
    };

    const handleLogout =()=>{
        showConfirm(_logout); 
    }
    
    return (
        <div className="dashboard-layout">
            <div className="dashboard-body">
                <aside className="sidebar">
                     <div className="siteLogo">
                        <img src='/images/datasaki-logo.svg' alt='Dataski Logo' />
                    </div>
                    <nav className="py-8 h-full overflow-auto sideNav">
                        <ul>
                            <li>
                             <NavLink to="/" >
                             <img src='/images/Dashboard-icon.svg' alt='Dataset-icon'></img> Dashboard
                                </NavLink>
                            </li>
                            <li>
                            <Accordion defaultActiveKey={isInnerRouteActive? "0" :""}>
                                <Accordion.Item eventKey="0" className='bg-transparent border-0'>
                                    <Accordion.Header className='bg-none'><img src='/images/Solution-icon.svg' alt='Dataset-icon'></img> MLOPS Solution</Accordion.Header>
                                    <Accordion.Body style={{padding:"10px 20px 10px 50px"}}>
                                        <ul>
                                            <li>
                                                <NavLink to="/mlops-solution/data-preparation" >
                                                    Data Preparation
                                                </NavLink>
                                            </li>
                                            <li>
                                                <Accordion>
                                                    <Accordion.Item eventKey="1" className='bg-transparent border-0'>
                                                        <Accordion.Header className='bg-none'>
                                                            <NavLink to="/mlops-solution/visualization" style={{flex: 1}}>
                                                                Visualization
                                                            </NavLink>
                                                        </Accordion.Header>
                                                        <Accordion.Body style={{padding:"10px 20px 10px 30px"}}>
                                                            <ul>
                                                                <li>
                                                                    <NavLink to="/mlops-solution/visualization/catalog">
                                                                        Catalog
                                                                    </NavLink>
                                                                </li>
                                                            </ul>
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                </Accordion>
                                            </li>
                                        </ul>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                            </li>
                            <li>
                                <NavLink to="/extensions" >
                                    <img src='/images/Extensions-icon.svg' alt='Dataset-icon'></img> Extensions
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/chatbot" >
                                <WechatOutlined style={{marginRight:"10px",fontSize:"20px"}} /> Chatbot
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/plugins" >
                                <img src='/images/Plugins-icon.svg' alt='Dataset-icon'></img> Plugins
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/connection" >
                                <img src='/images/Connection-icon.svg' alt='Dataset-icon'></img> Connection
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/user-profile-group" >
                                <img src='/images/Users-icon.svg' alt='Dataset-icon'></img> Users, Profiles & Group
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/subscription-plan" >
                                <img src='/images/Subscription-icon.svg' alt='Dataset-icon'></img> Subscription & Plan
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/settings" >
                                <img src='/images/Settings-icon.svg' alt='Dataset-icon'></img> Settings
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                    <div className="flex gap-3 align-items-center px-3 py-3" style={{boxShadow:"0 -4px 8px rgba(0, 0, 0, 0.2)"}}>
                            <div className='user-image-sec'>
                                <img src='/images/avatar-user-img.png' alt='Avatar Use Imange'></img>
                            </div>
                           <div>
                            {
                                cookies?.access_token ?
                                <Button onClick={handleLogout} className="bg-transparent text-white border-0 p-0" style={{fontSize:"16px"}}>Logout <LogoutOutlined style={{margin:"3px 0 0 3px"}} /></Button>
                                :
                                <Link style={{textDecoration:"none",color:"#fff"}} to="/registration">Sign in <LoginOutlined style={{margin:"3px 0 0 3px"}} /></Link>  
                            }
                           </div>
                        </div>
                </aside>
                <main className="content-area">
                    <Outlet />
                </main>
            </div>

            {dialog}
        </div>
    );
};

export default DashboardLayout;