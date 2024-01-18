import React from "react";
import { hotelFacilities } from "../../config/Hotel-option-config";
import { useFormContext } from "react-hook-form";

const FacilitiesSection = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Facilities</h2>
      <div className="grid grid-cols-5 gap-3 ">
        {hotelFacilities.map((facility) => (
          <label key={facility} className="flex gap-1 text-sm text-gray-700">
            <input type="checkbox" value={facility} {...register('facilities',{
                validate:(facilities)=>{
                    if(facilities&&facilities.length>0) return true;
                    else return'Atleas one facility required';
                }
            })}/>
            {facility}
          </label>
        ))}
      </div>
      {errors.facilities && (
        <span className="text-red-500 font-bold">{errors.facilities.message}</span>
      )}
    </div>
  );
};

export default FacilitiesSection;
