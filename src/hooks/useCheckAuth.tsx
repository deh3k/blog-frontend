import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "./redux"

export const useCheckAuth = () => {
  const navigate = useNavigate()
  
  const isAuth = useAppSelector(state => state.authReducer.isAuth)

  useEffect(() => {
    if(!isAuth) {
      navigate('/login')
    }
  }, [isAuth])
}