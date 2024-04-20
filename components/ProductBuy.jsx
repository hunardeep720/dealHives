import Space from '@/components/Space'
import React from 'react'
import { useUserAuth } from "@/utils/auth-context";
import Account from './Account';
import Link from 'next/link';

function ProductBuy() {
    const { user } = useUserAuth();
  return (
    <div><div>
    <Space />
    {user ? (
        <div className='max-w-screen-2xl mx-auto flex flex-col justify-center items-center text-center w-full p-5'>
            <p className='text-4xl font-extrabold m-3'>Purchase option is currently unavailable.</p>
            <p className='text-xl font-bold m-3'>We will inform you when they become available</p>
            <p className='text-md font-semibold m-3'>Thanks for your patients!</p>
            <div className='grid grid-cols-2 gap-6 w-full justify-center items-center text-center'>
                <Link className='col-span-1 text-center w-full' href='./'>
                    <p className='hover:text-slate-400 text-md font-semibold hover:font-bold'>See more options</p>
                </Link>
                <Link className='col-span-1 text-center w-full' href='./Account'>
                    <p className='hover:text-slate-400 hover:font-bold text-md font-semibold'>
                        You can see or edit your information
                    </p>
                </Link>
            </div>
        </div>
    ):(<AccountPage />)}
</div></div>
  )
}

export default ProductBuy