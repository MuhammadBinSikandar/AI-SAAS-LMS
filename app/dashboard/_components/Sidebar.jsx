"use client"
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { LayoutDashboard, Shield, UserCircle } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Progress } from "@/components/ui/progress"


function Sidebar() {
    const MenuList = [
        {
            name: 'Dashboard',
            icon: LayoutDashboard,
            path: '/dashboard',
        },
        {
            name: 'Upgarde',
            icon: Shield,
            path: '/dashboard/upgrade',
        },
        {
            name: 'Profile',
            icon: UserCircle,
            path: '/dashboard/profile',
        },
    ]
    const path = usePathname();

    return (
        <div className='h-screen shadow-md bg-white p-5'>
            <div className='flex gap-2 items-center '>
                <Image src={'/logo.svg'} alt='logo' height={40} width={40} />
                <h2 className='font-bold text-2xl'>SkillPilot</h2>
            </div>
            <div className='mt-10'>
                <Link className='w-full' href={'/create'}>
                    <Button className="w-full cursor-pointer">+ Create New</Button>
                </Link>
                <div className='mt-5'>
                    {MenuList.map((menu, index) => (
                        <div key={index} className={`flex gap-5 items-center p-3 hover:bg-slate-200 rounded-lg cursor-pointer mt-3 ${path == menu.path && 'bg-slate-200'}`}>
                            <menu.icon />
                            <h2>{menu.name}</h2>
                        </div>
                    ))}
                </div>
            </div>
            <div className='border bg-slate-100 rounded-lg p-3 absolute bottom-10 w-[85%] '>
                <h2 className='text-lg mb-2'>Available Credits : 5</h2>
                <Progress value={20} />
                <h2 className='text-sm'>1 out of 5 Credits used</h2>
                <Link href={'/dashboard/upgrade'} className='text-primary text-xs'>Upgrade to create more</Link>
            </div>
        </div>
    )
}

export default Sidebar
