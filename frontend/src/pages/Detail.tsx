import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import * as apiClient from "../api-client"
import { AiFillStar } from "react-icons/ai"

const Detail = () => {
  const { hotelId } = useParams()


  const { data: hotel } = useQuery(
    "fetchHotelById",
    () => apiClient.fetchHotelById(hotelId || ""),
    {
      enabled: !!hotelId,
    }
  )
  if (!hotel) {
    return <></>
  }

  return (
    <>
      <span className="flex">
        {Array.from({ length: hotel.starRating }).map(() => (
          <>
            <AiFillStar className="fill-yellow-400" />
          </>
        ))}
      </span>
    </>
  )
}

export default Detail
