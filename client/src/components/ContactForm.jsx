import { useState } from 'react';

const url =  "https://www.yuitof.com/api";

export default function ContactForm() {
    const emptyForm = {
        message: '',
        email: '',
        firstname: '',
        lastname: '',
    };
    const [formData, setForm] = useState(emptyForm);

    async function sendMessage(formData) {
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            
            if (!response.ok) {
                throw new Error("Error occurred while sending the email.")
            }
            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            sendMessage(formData);
            setForm(emptyForm);
        }}>
            <textarea
                placeholder="Message"
                value={formData.message}
                onChange={e => setForm(prevFormData => ({
                        ...prevFormData,
                        message: e.target.value
                }))}
            />
            <textarea
                placeholder="Email"
                value={formData.email}
                onChange={e => setForm(prevFormData => ({
                        ...prevFormData,
                        email: e.target.value
                }))}
            />
            <textarea
                placeholder="First Name"
                value={formData.firstname}
                onChange={e => setForm(prevFormData => ({
                        ...prevFormData,
                        firstname: e.target.value
                }))}
            />
            <textarea
                placeholder="Last Name"
                value={formData.lastname}
                onChange={e => setForm(prevFormData => ({
                        ...prevFormData,
                        lastname: e.target.value
                }))}
            />
            <button type="submit">Send</button>
        </form>
    );
}