import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, Menu, User2, X } from 'lucide-react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    }

    // Same links as before: recruiters see admin pages, everyone else sees the public pages
    const links = user && user.role === 'recruiter'
        ? [
            { to: "/admin/companies", label: "Companies" },
            { to: "/admin/jobs", label: "Jobs" },
        ]
        : [
            { to: "/", label: "Home" },
            { to: "/jobs", label: "Jobs" },
            { to: "/browse", label: "Browse" },
        ];

    const linkClass = ({ isActive }) =>
        `rounded-full px-4 py-2 text-sm font-medium transition ${
            isActive
                ? 'bg-[#6A38C2]/10 text-[#6A38C2]'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
        }`;

    return (
        <header className='sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur'>
            <div className='mx-auto flex h-16 max-w-7xl items-center justify-between px-4'>
                {/* Logo */}
                <Link to="/" className='text-2xl font-extrabold tracking-tight'>
                    Hire<span className='text-[#F83002]'>Hub</span>
                </Link>

                {/* Desktop links */}
                <nav className='hidden items-center gap-1 md:flex'>
                    {links.map((item) => (
                        <NavLink key={item.to} to={item.to} end={item.to === "/"} className={linkClass}>
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                <div className='flex items-center gap-3'>
                    {
                        !user ? (
                            <div className='hidden items-center gap-2 md:flex'>
                                <Link to="/login"><Button variant="outline" className='rounded-full'>Login</Button></Link>
                                <Link to="/signup"><Button className="rounded-full bg-[#6A38C2] hover:bg-[#5b30a6]">Signup</Button></Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer ring-2 ring-transparent transition hover:ring-[#6A38C2]/40">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-72 rounded-xl p-4 shadow-xl">
                                    <div className='flex items-center gap-3'>
                                        <Avatar>
                                            <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                                        </Avatar>
                                        <div className='min-w-0'>
                                            <h4 className='truncate font-semibold'>{user?.fullname}</h4>
                                            <p className='truncate text-sm text-muted-foreground'>{user?.profile?.bio || user?.email}</p>
                                        </div>
                                    </div>

                                    <div className='mt-3 flex flex-col gap-1 border-t pt-3 text-gray-700'>
                                        {
                                            user && user.role === 'student' && (
                                                <Link
                                                    to="/profile"
                                                    className='flex items-center gap-2 rounded-lg px-2 py-2 text-sm transition hover:bg-gray-100'
                                                >
                                                    <User2 className='h-4 w-4' /> View Profile
                                                </Link>
                                            )
                                        }
                                        <button
                                            onClick={logoutHandler}
                                            className='flex items-center gap-2 rounded-lg px-2 py-2 text-left text-sm text-red-600 transition hover:bg-red-50'
                                        >
                                            <LogOut className='h-4 w-4' /> Logout
                                        </button>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }

                    {/* Mobile menu button */}
                    <button
                        className='rounded-lg p-2 text-gray-700 hover:bg-gray-100 md:hidden'
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                    >
                        {menuOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
                    </button>
                </div>
            </div>

            {/* Mobile menu panel */}
            {menuOpen && (
                <div className='border-t border-gray-100 bg-white px-4 pb-4 md:hidden'>
                    <nav className='flex flex-col gap-1 pt-3'>
                        {links.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                end={item.to === "/"}
                                className={linkClass}
                                onClick={() => setMenuOpen(false)}
                            >
                                {item.label}
                            </NavLink>
                        ))}
                    </nav>
                    {!user && (
                        <div className='mt-3 flex gap-2'>
                            <Link to="/login" className='flex-1' onClick={() => setMenuOpen(false)}>
                                <Button variant="outline" className='w-full rounded-full'>Login</Button>
                            </Link>
                            <Link to="/signup" className='flex-1' onClick={() => setMenuOpen(false)}>
                                <Button className='w-full rounded-full bg-[#6A38C2] hover:bg-[#5b30a6]'>Signup</Button>
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </header>
    )
}

export default Navbar
