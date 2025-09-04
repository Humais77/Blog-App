
import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems } from 'flowbite-react'
import { HiArrowSmRight, HiUser } from "react-icons/hi";
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { signoutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
const DashSideBar = () => {
    const location = useLocation();
    const [tab, setTab] = useState('');
    const dispatch = useDispatch() 
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get('tab');
        if (tabFromUrl) {
            setTab(tabFromUrl);
        }
    }, [location.search])
    const handleSignout = async ()=>{
        try {
          const res = await fetch('api/user/signout',{
            method:"POST"
          });
          const data = res.json();
          if(!res.ok){
            console.log(data.message);
          }else{
            dispatch(signoutSuccess());
          }
        } catch (error) {
          console.log(error.message);
          
        }
      }
    return (
        <Sidebar className='w-full md:w-56'>
            <SidebarItems>
                <SidebarItemGroup>
                    <SidebarItem
                        as={Link}  
                        to="/dashboard?tab=profile"
                        active={tab === 'profile'}
                        icon={HiUser}
                        label="User"
                        labelColor="dark"
                    >
                        Profile
                    </SidebarItem>
                    <SidebarItem icon={HiArrowSmRight} className='cursor-pointer' onClick={handleSignout}>
                        Sign Out
                    </SidebarItem>
                </SidebarItemGroup>
            </SidebarItems>
        </Sidebar>
    )
}

export default DashSideBar