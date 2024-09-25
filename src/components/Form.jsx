import { useState } from "react";
import PetsInput from "./PetsInput";

export default function Form() {
  const [formData, setFormData] = useState({
    name: "",
    pets: [],
  });
  const [numberOfPets, setNumberOfPets] = useState(1);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
        />
        <p>Current value is: {formData.name}</p>
        {new Array(numberOfPets).fill("").map((element, index) => {
          console.log("tried to make pet #", index);
          return (
            <PetsInput
              key={index}
              id={index}
              formData={formData}
              handleChange={handlePetsChange}
            />
          );
        })}
        <button type="submit">Submit</button>
      </form>
      <button onClick={addPetInput}>Add another pet</button>
    </>
  );

  function addPetInput() {
    setNumberOfPets(numberOfPets + 1);
  }

  function handleChange(event) {
    event.preventDefault();
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  function handlePetsChange(event) {
    event.preventDefault();
    // copy formData but replace the relevant element in the pets array with our new one
    setFormData({
      ...formData,
      pets: replaceElement(event.target.id, event.target.value),
    });
    console.log(formData.pets);
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  function replaceElement(index, element) {
    let newArray = formData.pets;
    newArray[index] = element;
    return newArray;
  }
}
