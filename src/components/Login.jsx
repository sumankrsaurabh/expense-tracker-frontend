import { useState } from 'react';
import { loginFields } from "../constants/formFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";

const fields = loginFields;
let fieldsState = {};
fields.forEach(field => fieldsState[field.id] = '');

export default function Login() {
    const [loginState, setLoginState] = useState(fieldsState);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setLoginState(prevState => ({
            ...prevState,
            [id]: value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        authenticateUser();
    }

    //Handle Login API Integration here
    const authenticateUser = () => {
        const endpoint = `${import.meta.env.VITE_BASE_URL}users/login`;
        fetch(endpoint,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginState)
            }).then(response => response.json())
            .then(data => {
                //API Success from LoginRadius Login API
                console.log(data);
            })
            .catch(error => console.log(error))
    }

    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="-space-y-px">
                {
                    fields.map(field =>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={loginState[field.id]}
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
            </div>

            <FormExtra />
            <FormAction handleSubmit={handleSubmit} text="Login" />

        </form>
    )
}