import { HotelSearchResponse, HotelType } from '../../backend/src/shared/types';
import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

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
  
  return response.json()
}

export const fetchMyHotelById = async( hotelId: string ): Promise<HotelType> => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
    credentials: "include",
  })

  if (!response.ok) {
    throw new Error("Error fetching hotel")
  }  
  
  return response.json()
}

export const updateMyHotelById = async(hotelFormData: FormData) => {

  const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelFormData.get("hotelId")}`,{
    method: "PUT",
    body: hotelFormData,
    credentials: "include",
  })

  if (!response.ok) {
    throw new Error("Failed to edit hotel")
  }  
  
  return response.json()
}

export type SearchParams = {
  destination?: string
  checkIn?: string
  checkOut?: string
  adultCount?: string
  childCount?: string
  page?: string
  facilities?: string[]
  types?: string[]
  stars?: string[]
  maxPrice?: string
  sortOption?: string
}

export const searchHotel = async(SearchParams: SearchParams): Promise<HotelSearchResponse> => {
  
  const queryParams = new URLSearchParams()

  queryParams.append("destination", SearchParams.destination || '')
  queryParams.append("checkIn", SearchParams.checkIn || '')
  queryParams.append("checkOut", SearchParams.checkOut || '')
  queryParams.append("adultCount", SearchParams.adultCount || '')
  queryParams.append("childCount", SearchParams.childCount || '')
  queryParams.append("page", SearchParams.page || '')
  
  queryParams.append("maxPrice", SearchParams.maxPrice || '')
  queryParams.append("sortOption", SearchParams.sortOption || '')

  SearchParams.types?.forEach((type) => queryParams.append("types", type))
  SearchParams.facilities?.forEach((facility) => queryParams.append("facilities", facility))
  SearchParams.stars?.forEach((star) => queryParams.append("stars", star))

  const response = await fetch(`${API_BASE_URL}/api/hotels/search?${queryParams}`)

  if(!response.ok){
    throw new Error("Error fetching the hotels !")
  }

  return response.json()
} 