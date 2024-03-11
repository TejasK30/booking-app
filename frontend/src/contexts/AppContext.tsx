import React, { useState } from "react"
import { useQuery } from "react-query"
import * as apiClient from "../api-client"
import Toast from "../components/Toast"
import { loadStripe, Stripe } from "@stripe/stripe-js"

const STRIPE_PUBLIC_KEY = String(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY)

type ToastMessage = {
  message: string
  type: "SUCCESS" | "ERROR"
}

export type Appcontext = {
  showToast: (toastMessage: ToastMessage) => void
  isLoggedIn: boolean
  stripePromise: Promise< Stripe | null >
}

export const AppContext = React.createContext<Appcontext | undefined>(undefined)

export const AppContextProvider = ({children}: {children: React.ReactNode}) => {

  const { isError } = useQuery("validateToken", apiClient.validateToken, {retry: false}) 

  const [toast, setToast] = useState< ToastMessage | undefined >(undefined)

  return(
    <AppContext.Provider value={{
      showToast: (toastMessage) => {
        setToast(toastMessage)
      },
      isLoggedIn: !isError,
      stripePromise
    }}>
      {toast && <Toast message={toast.message} type={toast.type} onClose={ () => setToast(undefined)}/>}
      {children}
    </AppContext.Provider>
  )
}
