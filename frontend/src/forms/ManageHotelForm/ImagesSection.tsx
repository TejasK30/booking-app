import { useFormContext } from "react-hook-form"
import { HotelFormData } from "./ManageHotelForm"
import { MdDelete } from "react-icons/md"


const ImagesSection = () => {
  const { register, formState: {errors}, watch, setValue } = useFormContext<HotelFormData>()
  const existingImageUrls = watch("imageUrls")

  const handleDeleteButton = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, imageUrl: string) => {
    e.preventDefault()

    setValue("imageUrls", 
      existingImageUrls.filter((url) => url != imageUrl)
    )
  }

  return (
    <>
      <div>
        <h2 className="text-2xl font-bold mb-3">Images</h2>
        {
          existingImageUrls && (
            <div className="grid grid-cols-6 gap-4">
              {
                existingImageUrls.map((url) => (
                  <div className="relative group">
                    <img src={url} className="h-full object-contain" />
                    <button onClick={(e) => handleDeleteButton(e, url )} className="absolute inset-0 flex items-center justify-center"><MdDelete className="text-red-600 text-xl hover:bg-red-400 rounded" /></button>
                  </div>
                ))
              }
            </div>
          )
        }
        <div className="border rounded p-4 flex flex-col gap-4">
          <input type="file"
            multiple
            accept="image/*" 
            className="w-full text-gray font-normal"
            {...register("imageFiles", {
            validate: (imageFiles) => {
              const totalLength = imageFiles.length + (existingImageUrls?.length || 0)

              if(totalLength === 0){
                return "At least one image should be added"
              }
              if(totalLength > 6){
                return "Total number of images cannot be more than 6"
              }
              return true
            }
          })} />
        </div>
        {errors.imageFiles && (
          <span className="text-red-500">{errors.imageFiles.message}</span>
        )}
      </div>
    </>
  )
}

export default ImagesSection