"use client"
import { useUser } from '@clerk/nextjs'
import axios from 'axios';
import React, { useEffect } from 'react'


function Provider({ children }) {
    const { user } = useUser();
    useEffect(() => {
        user&&CheckIsNewUser();
    }, [user]);

    const CheckIsNewUser = async () => {
        const res = await axios.post('/api/create-user', {user:user});
        console.log(res.data);
    }
    return (
        <div>
            {children}
        </div>
    )
}

export default Provider
