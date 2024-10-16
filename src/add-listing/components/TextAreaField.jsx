import React from 'react'
import { Textarea } from "@/components/ui/textarea"

const TextAreaField = ({item,handleInputChange,carInfo}) => {
  return (
    <div>
      <Textarea defaultValue={carInfo?.[item.name]} required={item?.required} onChange={(e)=>handleInputChange(item.name,e.target.value)} name={item.name} />
    </div>
  )
}

export default TextAreaField
