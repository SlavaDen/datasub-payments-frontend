import { useState } from "react";

const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setDirty] = useState(false);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onBlur = () => {
    setDirty(true);
  };

  const onReset = () => {
    setDirty(false);
    setValue(initialValue);
  };

  return {
    value,
    onChange,
    onBlur,
    isDirty,
    onReset,
  };
};

export default useInput;
