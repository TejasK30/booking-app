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
  bookings: BookingType[]
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

export type BookingType = {
  _id: string
  userId: string
  firstname: string
  lastname: string
  email: string
  checkIn: Date
  checkOut: Date
  adultCount: number
  childCount: number
  totalCost: number
}
