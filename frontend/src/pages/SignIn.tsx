import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query"
import * as apiClient from "../api-client"
import { Link, useNavigate } from "react-router-dom"
import useAppContext from "../hooks/useAppContext"

export type SignInFormData = {
  email: string
  password: string
}

const SignIn = () => {
  const { showToast } = useAppContext()
  const navigate = useNavigate()
  const { register, formState: {errors},handleSubmit } = useForm<SignInFormData>()

  const queryClient = useQueryClient()

  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      showToast({message: "Login success", type: "SUCCESS"})      
      await queryClient.invalidateQueries('validateToken')
      navigate("/")
    },
    onError: (error: Error) => {
      showToast({message: error.message, type: "ERROR"}) 
    }
  })

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data)
  })

  return (
    <>
      <form className="flex flex-col gap-5" onSubmit={onSubmit}>
        <h2 className="text-xl font-bold">Sign In</h2>
        <label className="text-gray-700 text-sm font-bold flex-1">
        Email
        <input
          type="email"
          className="border-2 rounded w-full py-1 px-2 font-normal"
          {...register("email", { required: "This field is required" })}
        ></input>
        {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Password
        <input
          type="password"
          className="border-2 rounded w-full py-1 px-2 font-normal"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        ></input>
        {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
        )}
        </label>
        <span className="flex items-center justify-between">
          <span className="text-sm">
            Not registered ? <Link className="text-blue-600" to={'/register'}>Register here</Link>            
          </span>
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-500 text-md"
          >
            Sign In
          </button>
        </span> 
      </form>
    </>
  )
}

export default SignIn