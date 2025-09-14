import { useState } from 'react';

const url =  "https://www.yuitof.com/api";

export default function ContactForm() {
    const emptyForm = {
        form: {
            message: '',
            email: '',
            firstname: '',
            lastname: '',
        }
    }
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
                value={formData.form.message}
                onChange={e => setForm(prevFormData => ({
                    form: {
                        ...prevFormData.form,
                        message: e.target.value
                    }
                }))}
            />
            <textarea
                placeholder="Email"
                value={formData.form.email}
                onChange={e => setForm(prevFormData => ({
                    form: {
                        ...prevFormData.form,
                        email: e.target.value
                    }
                }))}
            />
            <textarea
                placeholder="First Name"
                value={formData.form.firstname}
                onChange={e => setForm(prevFormData => ({
                    form: {
                        ...prevFormData.form,
                        firstname: e.target.value
                    }
                }))}
            />
            <textarea
                placeholder="Last Name"
                value={formData.form.lastname}
                onChange={e => setForm(prevFormData => ({
                    form: {
                        ...prevFormData.form,
                        lastname: e.target.value
                    }
                }))}
            />
            <button type="submit">Send</button>
        </form>
    );
}