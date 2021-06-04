import { useState } from "react";

// write your custom hook here to control your checkout form
const useForm = (emptyFormData) => {
  const [formData, setFormData] = useState(emptyFormData);

  const handleChange = e => {
    // console.log(e)
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const clearForm = e => {
    setFormData(emptyFormData);
  }

  return [formData, handleChange, clearForm];
}

export default useForm;