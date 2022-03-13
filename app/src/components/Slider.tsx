import React from 'react';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDebounce } from './debounce';

type Props = {
  defaultValue: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  step: number;
  labelRenderer: (value: number) => string;
};

const Slider = ({
  defaultValue,
  min,
  max,
  onChange,
  step,
  labelRenderer,
}: Props) => {
  const [value, setValue] = useState(defaultValue);
  const [dragging, setDragging] = useState(false);
  const debounce = useDebounce<number>(onChange, 100);

  const handleChange = (newValue: number): void => {
    setValue(newValue);
    if (!dragging) {
      debounce(newValue);
    }
  };

  return (
    <>
      <Form.Label>{labelRenderer(value)}</Form.Label>
      <Form.Range
        min={min}
        max={max}
        defaultValue={defaultValue}
        onChange={(e) => handleChange(parseFloat(e.target.value))}
        onMouseDown={() => setDragging(true)}
        onMouseUp={() => {
          console.log('mouse up');
          setDragging(false);
          onChange(value);
        }}
        step={step}
      />
    </>
  );
};

export default Slider;
