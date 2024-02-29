import { useContext } from "react"
import { SearchContext } from "../contexts/SearchContext"

const useSearchContext = () => {
  const context = useContext(SearchContext)
  return context as SearchContext
}

export default useSearchContext