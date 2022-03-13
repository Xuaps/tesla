import React from 'react';
import { useState } from 'react';
import { Form } from 'react-bootstrap';

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

  const handleChange = (newValue: number): void => {
    setValue(newValue);
    if (!dragging) {
      onChange(newValue);
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
          setDragging(false);
          onChange(value);
        }}
        step={step}
      />
    </>
  );
};

export default Slider;
