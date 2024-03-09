export type UserType = {
  _id: string
  email: string
  password: string
  firstname: string
  lastname: string
}

export type HotelType = {
  _id: string
  userId: string
  name: string
  city: string
  country: string
  description: string
  type: string
  adultCount: number 
  childCount: number 
  facilities: string[]
  pricePerNight: number
  starRating: number
  imageUrls: string[]
  lastUpdated: Date
}

export type HotelSearchResponse = {
  data: HotelType[]
  pagination: {
    total: number
    page: number
    pages: number
  }
}

export type paymentIntentResponse = {
  paymentIntentId: string
  clientSecret: string
  totalCost: number
}