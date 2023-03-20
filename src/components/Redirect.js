import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

const Redirect = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();

    useState(() => {
        const token = searchParams.get('token')
        localStorage.setItem('token', token)
    }, [])

    useEffect(()=> {
        navigate("/")
        
    }, [navigate])

    return (
        <>
        <h1>Authenticated Successfully...👍</h1>
        <Link to="/" className='hover:bg-gray-200 p-1 my-2 rounded '>Go to Home (Click here if not Redirected)</Link>
        </>
    )
}

export default Redirect