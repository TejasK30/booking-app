import { useContext } from "react"
import { AppContext, Appcontext } from "../contexts/AppContext"

const useAppContext = () => {
  const context = useContext(AppContext)
  return context as Appcontext
}

export default useAppContext