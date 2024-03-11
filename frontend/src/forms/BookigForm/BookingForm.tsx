import { useForm } from "react-hook-form"
import {
  UserType,
  paymentIntentResponse,
} from "../../../../backend/src/shared/types"
import { CardElement, PaymentElement } from "@stripe/react-stripe-js"

type Props = {
  currentUser: UserType
  paymentIntent: paymentIntentResponse
}

type BookigFormData = {
  firstname: string
  lastname: string
  email: string
}

const BookingForm = ({ currentUser, paymentIntent }: Props) => {
  const { handleSubmit, register } = useForm<BookigFormData>({
    defaultValues: {
      firstname: currentUser.firstname,
      lastname: currentUser.lastname,
      email: currentUser.email,
    },
  })

  return (
    <>
      <form className="grid grid-cols-1 rounded-lg gap-5 border border-slate-300 p-3">
        <span className="text-3xl font-bold"> Confirm Your Details: </span>
        <div className="grid grid-cols-2 gap-6">
          <label className="text-gray-700 text-sm font-bold flex-1">
            First name
            <input
              type="text"
              className="mt-1 border rounded-md w-full p-2 text-gray-700 bg-gray-200"
              readOnly
              disabled
              {...register("firstname")}
            />
          </label>
          <label className="text-gray-700 text-sm font-bold flex-1">
            Last name
            <input
              type="text"
              className="mt-1 border rounded-md w-full p-2 text-gray-700 bg-gray-200"
              readOnly
              disabled
              {...register("lastname")}
            />
          </label>
          <label className="text-gray-700 text-sm font-bold flex-1">
            Email
            <input
              type="email"
              className="mt-1 border rounded-md w-full p-2 text-gray-700 bg-gray-200"
              readOnly
              disabled
              {...register("email")}
            />
          </label>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Your Price Summary: </h2>
          <div className="bg-blue-200 p-4 rounded-md">
            <div className="font-semibold text-lg">
              Total Cost: ₹{paymentIntent.totalCost.toFixed(2)}
            </div>
            <div className="text-xs">Includes taxes and charges</div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-semibold"> Payment Details</h3>
          <PaymentElement
            id="payment-element"
            className="border rounded-md p-2 text-sm"
          />
        </div>
      </form>
    </>
  )
}

export default BookingForm
