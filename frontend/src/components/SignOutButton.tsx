import { useMutation, useQueryClient } from "react-query"
import { useNavigate } from "react-router-dom"
import * as apiClient from "../api-client"
import useAppContext from "../hooks/useAppContext"
import Button from "./ui/Button"

const SignOutButton = () => {

  const queryClient = useQueryClient()
  const { showToast } = useAppContext()
  const navigate = useNavigate() 

  const mutation = useMutation(apiClient.SignOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken")
      // to refetch and verify the token
      showToast({message: "Signed Out!", type: "SUCCESS"})      
      navigate("/")
    },
    onError: (error: Error) => {
      showToast({message: error.message, type: "ERROR"}) 
    }
  })

  const handleClick = () => {
    mutation.mutate()
  }

  return (
    <>
      <Button type="submit" text="Sign Out" onClick={handleClick}/>
    </>
  )
}

export default SignOutButton