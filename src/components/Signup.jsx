import { useRef, useState } from 'react';
import { signupFields } from "../constants/formFields"
import FormAction from "./FormAction";
import Input from "./Input";
import Avatar from "../assets/avatar.svg"

const fields = signupFields;
let fieldsState = {};

fields.forEach(field => fieldsState[field.id] = '');

export default function Signup() {
  const [signupState, setSignupState] = useState(fieldsState);
  const [image, setImage] = useState(null); // Declare image state
  const avatarRef = useRef(null);

  const handleChange = (e) => setSignupState({ ...signupState, [e.target.id]: e.target.value });

  const selectImage = () => {
    avatarRef.current.click();
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(signupState)
    createAccount(signupState)
  }

  //handle Signup API Integration here
  const createAccount = async (data) => {
    const endpoint = `${import.meta.env.VITE_BASE_URL}users/register`;
    try {
      await fetch(endpoint,
        {
          method: 'POST',
          body: JSON.stringify(data)
        }).then(response => response.json())
        .then(data => {
          //API Success from LoginRadius Login API
          console.log(data);
        })
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <>
      {/* <div className="center w-full content-center m-auto" onClick={selectImage}>
        <img src={image ? URL.createObjectURL(image) : Avatar} alt="avatar" className='flex m-auto h-24 w-24 rounded-full border ' />
        <input type="file" accept="image/png,image/jpeg,image/gif"
          className='hidden'
          ref={avatarRef}
          id='avatar'
          name='avatar'
          onChange={handleImageChange} /> 
      </div> */},
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="">
          {
            fields.map(field =>
              <Input
                key={field.id}
                handleChange={handleChange}
                value={signupState[field.id]}
                labelText={field.labelText}
                labelFor={field.labelFor}
                id={field.id}
                name={field.name}
                type={field.type}
                isRequired={field.isRequired}
                placeholder={field.placeholder}
              />

            )
          }
          <FormAction handleSubmit={handleSubmit} text="Signup" />
        </div>

      </form></>
  )
}
