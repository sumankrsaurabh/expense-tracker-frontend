import { useState } from 'react';
import { loginFields } from "../constants/formFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";
import { Navigate, useNavigate } from 'react-router-dom';

const fields = loginFields;
let fieldsState = {};
fields.forEach(field => fieldsState[field.id] = '');

export default function Login() {
    const [loginState, setLoginState] = useState(fieldsState);
    const navigator = useNavigate()
    const handleChange = (e) => {
        const { id, value } = e.target;
        setLoginState(prevState => ({
            ...prevState,
            [id]: value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        authenticateUser(loginState);
        setLoginState(fieldsState)
    }

    //Handle Login API Integration here
    const authenticateUser = (data) => {
        const endpoint = `${import.meta.env.VITE_BASE_URL}users/login`;
        fetch(endpoint,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(response => response.json())
            .then(data => {
                console.log(data);
                //API Success from LoginRadius Login API
                if (data.statusCode >= 200) {
                    navigator("/", {
                        replace: true
                    })
                }
                else (
                    alert("faild")
                )
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