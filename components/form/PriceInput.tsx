import { Label } from '../ui/label';
import { Input } from '../ui/input';

const name = 'price';
type FormInputNumberProps = {
  defaultValue?: number;
};

import React from 'react'

function PriceInput({defaultValue}: FormInputNumberProps) {
  return (
    <div className='mb-2'>PriceInput
        <Label htmlFor={name} className='capitalize'>Price (£)</Label>
        <Input id={name} type='number' name={name} min={0} defaultValue={defaultValue || 100} required/>
    </div>
  )
}

export default PriceInput