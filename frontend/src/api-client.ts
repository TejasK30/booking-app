import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";
import { HotelType } from '../../backend/src/models/Hotels' 

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export async function register (formData: RegisterFormData) {
  const response = await fetch(`${API_BASE_URL}/api/users/register`,{
    method: 'POST',
    credentials: "include",
    headers:{
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  })
  const responseBody = await response.json()

  if(!response.ok){
    throw new Error(responseBody.message)
  }
}

export const signIn = async (formData: SignInFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })

  const body = await response.json()
  if (!response.ok) {
    throw new Error(body.message)
  }
  return body
}

export const validateToken = async() => {
  const response = await fetch(`${API_BASE_URL}/api/auth/verify-token`,{
    credentials: "include"
  })
  if(!response.ok){
    throw new Error("token invalid")
  }
  return response.json()
}

export const SignOut = async() => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`,{
    method: 'POST',
    credentials: "include"
  })

  if(!response.ok){
    throw new Error("Error signing out")
  }
} 

export const addMyHotel = async(hotelFormData: FormData) => { 
  const response = await fetch(`${API_BASE_URL}/api/my-hotels`,{
    method: 'POST',
    credentials: "include",
    body: hotelFormData
  })

  if(!response.ok){
    throw new Error("Failed to add the hotel !")
  }

  return response.json()
}

export const fetchMyHotels = async (): Promise<HotelType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    credentials: "include",
  })

  if (!response.ok) {
    throw new Error("Error fetching hotels")
  }
  console.log(response)
  
  return response.json()
}