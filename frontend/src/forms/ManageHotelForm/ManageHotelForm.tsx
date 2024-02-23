import { FormProvider, useForm } from "react-hook-form"
import DetailsSection from "./DetailsSection"
import { useState } from "react"
import TypeSection from "./TypeSection"
import FacilitiesSection from "./FacilitiesSection"
import GuestSection from "./GuestSection"
import ImagesSection from "./ImagesSection"

export type HotelFormData = {
  name: string
  city: string
  country: string
  description: string
  type: string
  pricePerNight: number
  starRating: number
  facilities: string[]
  imageFiles: FileList
  adultCount: number
  childCount: number
}

const ManageHotelForm = () => {
  const FormMethods = useForm<HotelFormData>()
  const [ isLoading, setLoading ] = useState()
  return (
    <>
      <FormProvider {...FormMethods}>
        <form className="flex flex-col gap-10">
          <DetailsSection />
          <TypeSection />
          <FacilitiesSection />
          <GuestSection />
          <ImagesSection />
          <span className="flex justify-end">
          <button
            disabled={isLoading}
            type="submit"
            className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-500 text-md"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </span>

        </form>
      </FormProvider>
    </>
  )
}

export default ManageHotelForm