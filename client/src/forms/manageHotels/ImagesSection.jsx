import React from 'react'
import { useFormContext } from 'react-hook-form'

const ImagesSection = () => {

    const {register,formState:{errors}} = useFormContext()

  return (
    <div>
        <h2 className="text-2xl font-bold mb-3">Images</h2>

        <div className='border rounded p-4 flex flex-col gap-4'>
            <input multiple type='file' accept='image/*' className='w-full text-gray-700 font-normal' {...register('imageFiles',{
                validate:(imageFiles)=>{
                    const totalLength = imageFiles.length;

                    if (totalLength ===0){
                        return "At least 1 image required"
                    }
                    if(totalLength >6){
                        return "Maximum images can be added is 6"
                    }
                    return true
                }
            })}/>
        </div>
            {errors.imageFiles && (
                 <span className="text-red-500 font-bold">{errors.imageFiles.message}</span>
            )}
    </div>
  )
}

export default ImagesSection