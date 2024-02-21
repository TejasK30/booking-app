import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query"
import { Link, useNavigate } from "react-router-dom"
import * as apiClient from "../api-client"
import useAppContext from "../hooks/useAppContext"

export type RegisterFormData = {
  firstname: string
  lastname: string
  email: string
  password: string
  confirmPassword: string
}

const Register = () => {

  const navigate = useNavigate()
  const { showToast } = useAppContext()
  const queryClient = useQueryClient()

  const { 
    register, 
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormData>()

  const mutation = useMutation(apiClient.register, {
    onSuccess: async () => {
      showToast({message: "Registration success", type: "SUCCESS"})      
      await queryClient.invalidateQueries("validateToken")
      navigate("/")
    },
    onError: (error: Error) => {
      showToast({message: error.message, type: "ERROR"}) 
    }
  })

  const onsubmit = handleSubmit((data) => {
    mutation.mutate(data)
  })
  return (
    <>
      <form className="flex flex-col gap-5" onSubmit={onsubmit}>
      <h2 className="text-3xl font-bold">Create an Account</h2>
      <div className="flex flex-col md:flex-row gap-5">
        <label className="text-gray-700 text-sm font-bold flex-1">
          First Name
          <input
            className="border-2 rounded w-full py-1 px-2 font-normal"
            {...register("firstname", { required: "This field is required" })}
          ></input>
          {errors.firstname && (
            <span className="text-red-500">{errors.firstname.message}</span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Last Name
          <input
            className="border-2 rounded w-full py-1 px-2 font-normal"
            {...register("lastname", { required: "This field is required" })}
          ></input>
          {errors.lastname && (
            <span className="text-red-500">{errors.lastname.message}</span>
          )}
        </label>
      </div>
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
      <label className="text-gray-700 text-sm font-bold flex-1">
        Confirm Password
        <input
          type="password"
          className="border-2 rounded w-full py-1 px-2 font-normal"
          {...register("confirmPassword", {
            validate: (val) => {
              if (!val) {
                return "This field is required";
              } else if (watch("password") !== val) {
                return "Your passwords do no match";
              }
            },
          })}
        ></input>
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}
      </label>
      <span className="flex items-center justify-between">
          <span className="text-sm">
            Already have an account ? <Link className="text-blue-600" to={'/sign-in'}>Login here</Link>            
          </span>
          <button
          type="submit"
          className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
        >
          Create Account
          </button>
        </span>
    </form>
    </>
  )
}

export default Register