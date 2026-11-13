import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({ job }) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    }

    const daysAgo = daysAgoFunction(job?.createdAt);
    const postedLabel = daysAgo === 0 ? "Today" : daysAgo === 1 ? "1 day ago" : `${daysAgo} days ago`;

    return (
        <div className='group flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-md transition duration-200 hover:-translate-y-1 hover:border-[#6A38C2]/30 hover:shadow-xl'>
            {/* Top row: posted time and bookmark */}
            <div className='flex items-center justify-between'>
                <span className='rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600'>
                    {postedLabel}
                </span>
                <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full text-gray-500 hover:bg-[#6A38C2]/10 hover:text-[#6A38C2]"
                    aria-label="Bookmark job"
                >
                    <Bookmark className='h-5 w-5' />
                </Button>
            </div>

            {/* Company */}
            <div className='mt-4 flex items-center gap-3'>
                <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white'>
                    <Avatar className="h-9 w-9">
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                </div>
                <div className='min-w-0'>
                    <h2 className='truncate font-semibold text-gray-900'>{job?.company?.name}</h2>
                    <p className='text-sm text-gray-500'>India</p>
                </div>
            </div>

            {/* Title and description */}
            <div className='mt-4 flex-1'>
                <h1 className='text-lg font-bold text-gray-900'>{job?.title}</h1>
                <p className='mt-1 line-clamp-2 text-sm text-gray-600'>{job?.description}</p>
            </div>

            {/* Badges */}
            <div className='mt-4 flex flex-wrap items-center gap-2'>
                <Badge className='bg-blue-50 font-semibold text-blue-700 hover:bg-blue-50' variant="ghost">
                    {job?.position} {job?.position === 1 ? "Position" : "Positions"}
                </Badge>
                <Badge className='bg-orange-50 font-semibold text-[#F83002] hover:bg-orange-50' variant="ghost">
                    {job?.jobType}
                </Badge>
                <Badge className='bg-purple-50 font-semibold text-[#7209b7] hover:bg-purple-50' variant="ghost">
                    {job?.salary} LPA
                </Badge>
            </div>

            {/* Actions */}
            <div className='mt-5 flex items-center gap-3'>
                <Button
                    onClick={() => navigate(`/description/${job?._id}`)}
                    className='flex-1 rounded-full bg-[#6A38C2] hover:bg-[#5b30a6]'
                >
                    Details
                </Button>
                <Button variant="outline" className='flex-1 rounded-full'>
                    Save For Later
                </Button>
            </div>
        </div>
    )
}

export default Job
