import { useFormContext } from "react-hook-form"
import { HotelFormData } from "./ManageHotelForm"
import { hotelTypes } from "../../hotel-options-configs"

const TypeSection = () => {
  const { register, watch, formState: {errors} } = useFormContext<HotelFormData>()
  const typeWatch = watch("type")
  return (
    <>
      <div>
        <h2 className="text-2xl font-bold mb-3">Type</h2>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {
            hotelTypes.map((type) => (
              <label key={type} className={
                typeWatch === type ? "cursor-pointer bg-blue-300 text-sm rounded-full px-4 py-2" : "cursor-pointer bg-gray-300 text-sm rounded-full px-4 py-2 hover:bg-blue-300"
              }>
                <input type="radio" value={type} className="hidden" {...register("type", {required: "This field is required !"})} />
                <span>{type}</span>
              </label>
            ))}
        </div>
        {
          errors.type && 
          <span className="text-red-500 text-sm font-bold">
            {errors.type.message}
          </span>
        }
      </div>
    </>
  )
}

export default TypeSection