import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './Home.css'

export default function Home() {

  const navigate = useNavigate();

  useEffect( () => {
    
    const token = JSON.parse(localStorage.getItem('Token'));
    if (token){
      navigate('/dashboard');
    } 
  }, [])

  return (
    <div className='homeMain'>
      <h2>Home Page Under Construction...</h2>
    </div>
  )
}
