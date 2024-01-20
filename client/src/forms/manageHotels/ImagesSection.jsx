import React from 'react'
import { useFormContext } from 'react-hook-form'

const ImagesSection = () => {

    const {register,formState:{errors},watch,setValue} = useFormContext()

    const exsitingImageUrl = watch('imageUrls')

    const handleDelete = async(event,imageUrl)=>{
        event.preventDefault();
        setValue('imageUrls',exsitingImageUrl.filter((url)=>url!== imageUrl))
    }

  return (
    <div>
        <h2 className="text-2xl font-bold mb-3">Images</h2>

        <div className='border rounded p-4 flex flex-col gap-4'>
            {exsitingImageUrl && (
                <div className='grid grid-cols-6 gap-4'>
                    {exsitingImageUrl.map((url)=>(
                        <div key={url} className='relative group'>
                            <img src={url} className='min-h-full object-cover' />
                            <button onClick={(e)=>handleDelete(e,url)} className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white'>Delete</button>
                        </div>
                    ))}
                </div>
            )}
            <input multiple type='file' accept='image/*' className='w-full text-gray-700 font-normal' {...register('imageFiles',{
                validate:(imageFiles)=>{
                    const totalLength = imageFiles.length+ (exsitingImageUrl.length ||0);

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