import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search, Sparkles } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const popularSearches = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Data Science",
    "Graphic Designer",
];

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (value = query) => {
        dispatch(setSearchedQuery(value.trim()));
        navigate("/browse");
    }

    const handleSubmit = (e) => {
        e.preventDefault(); // lets the Enter key trigger the search
        searchJobHandler();
    }

    return (
        <section className='relative overflow-hidden bg-gradient-to-b from-[#6A38C2]/10 via-white to-white'>
            {/* soft decorative blobs */}
            <div className='pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#6A38C2]/20 blur-3xl' />
            <div className='pointer-events-none absolute -top-10 -right-24 h-72 w-72 rounded-full bg-[#F83002]/10 blur-3xl' />

            <div className='relative mx-auto max-w-4xl px-4 py-16 text-center sm:py-24'>
                <span className='inline-flex items-center gap-2 rounded-full border border-[#6A38C2]/20 bg-white px-4 py-2 text-sm font-medium text-[#6A38C2] shadow-sm'>
                    <Sparkles className='h-4 w-4' />
                    Your next career move starts here
                </span>

                <h1 className='mt-6 text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-6xl'>
                    Find the job that <br className='hidden sm:block' />
                    <span className='bg-gradient-to-r from-[#6A38C2] to-[#F83002] bg-clip-text text-transparent'>
                        fits your future
                    </span>
                </h1>

                <p className='mx-auto mt-5 max-w-2xl text-base text-gray-600 sm:text-lg'>
                    Search openings from top companies, apply in a few clicks, and track every application in one place.
                </p>

                <form
                    onSubmit={handleSubmit}
                    className='mx-auto mt-8 flex w-full max-w-2xl items-center gap-2 rounded-full border border-gray-200 bg-white p-2 shadow-xl focus-within:border-[#6A38C2]/50 focus-within:ring-4 focus-within:ring-[#6A38C2]/10'
                >
                    <Search className='ml-3 h-5 w-5 shrink-0 text-gray-400' />
                    <input
                        type="text"
                        value={query}
                        placeholder='Job title, skill or keyword'
                        onChange={(e) => setQuery(e.target.value)}
                        className='w-full bg-transparent px-1 py-2 text-gray-900 outline-none placeholder:text-gray-400'
                    />
                    <Button
                        type="submit"
                        className='rounded-full bg-[#6A38C2] px-6 hover:bg-[#5b30a6]'
                    >
                        Search
                    </Button>
                </form>

                <div className='mt-6 flex flex-wrap items-center justify-center gap-2'>
                    <span className='text-sm text-gray-500'>Popular:</span>
                    {popularSearches.map((item) => (
                        <button
                            key={item}
                            type="button"
                            onClick={() => searchJobHandler(item)}
                            className='rounded-full border border-gray-200 bg-white px-3 py-1 text-sm text-gray-700 transition hover:border-[#6A38C2] hover:text-[#6A38C2]'
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default HeroSection
