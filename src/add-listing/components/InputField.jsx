import React from 'react'
import { Input } from '@/Components/ui/input'
const InputField = ({item,handleInputChange,carInfo}) => {
  return (
    <div>
        <Input onChange={(e)=>handleInputChange(item.name,e.target.value)} defaultValue={carInfo?.[item.name]} name={item?.name} required={item?.required} type={item?.fieldType} />
    </div>
  )
}

export default InputField
