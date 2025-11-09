import React, { useEffect, useState } from 'react'
import { Button, Navbar, TextInput, NavbarCollapse, NavbarLink, NavbarToggle, Dropdown, Avatar, DropdownDivider,DropdownHeader,DropdownItem } from 'flowbite-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import { FaMoon, FaSun } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import {toggleTheme} from '../redux/theme/themeSlice.js'
import { signoutSuccess } from '../redux/user/userSlice.js'
const Header = () => {
    const path = useLocation().pathname;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser } = useSelector(state => state.user)
    const {theme} = useSelector(state=>state.theme);
    const [searchTerm, setSearchTerm] = useState('');
    const location = useLocation();
    console.log(searchTerm)
    useEffect(()=>{
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromURL = urlParams.get('searchTerm');
        if(searchTermFromURL){
            setSearchTerm(searchTermFromURL);
        }
    },[location.search])
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
    const handleSubmit = (e)=>{
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm', searchTerm);
        const newSearch = urlParams.toString();
        navigate(`/search?${newSearch}`);
    }
    return (
        <Navbar className='border-b-2' >
            <Link to='/' className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
                <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Blog-App</span>
            </Link>
            <form onSubmit={handleSubmit}>
                <TextInput
                    type='text'
                    placeholder='Search...'
                    rightIcon={AiOutlineSearch}
                    className='hidden lg:inline ' value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}
                />
            </form>
            <Button className='w-22 h-10 lg:hidden' color={'gray'} pill>
                <AiOutlineSearch />
            </Button>
            <div className="flex gap-2 md:order-2">
                <Button className='w-22 h-10 block' color={'gray'} pill  onClick={()=>dispatch(toggleTheme())} >
                    {theme === 'light'? <FaSun/>:<FaMoon/>}
                    
                </Button>
                {currentUser ? (
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <Avatar
                                alt="User settings"
                                img={currentUser.profilePicture}
                                rounded
                            />
                        }
                        
                    >
                        <DropdownHeader >
                            <span className="block text-sm font-semibold">
                                @{currentUser.username}
                            </span>
                            <span className="block truncate text-sm font-medium">
                                {currentUser.email}
                            </span>
                        </DropdownHeader>
                        <DropdownItem as={Link} to="/dashboard?tab=profile">
                            Profile
                        </DropdownItem>
                        <DropdownDivider />
                        <DropdownItem onClick={handleSignout}>
                            Sign out
                        </DropdownItem>
                    </Dropdown>
                ) :
                    (
                        <Link to="/sign-in">
                            <Button className="bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-blue-300 dark:focus:ring-blue-800" outline>
                                Sign In
                            </Button>
                        </Link>
                    )
                }
                <NavbarToggle  />



            </div>
            <NavbarCollapse>
                <NavbarLink as={Link} to="/" active={path === '/'}>
                    Home
                </NavbarLink>
                <NavbarLink as={Link} to="/about" active={path === '/about'}>
                    About
                </NavbarLink>
                <NavbarLink as={Link} to="/projects" active={path === '/projects'}>
                    Projects
                </NavbarLink>
            </NavbarCollapse>

        </Navbar>
    )
}

export default Header