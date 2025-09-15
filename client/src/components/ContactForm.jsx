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
        <div className="isolate bg-white">
        <form className="mx-auto mt-16 max-w-xl sm:mt-20" onSubmit={(e) => {
            e.preventDefault();
            sendMessage(formData);
            setForm(emptyForm);
        }}>
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
                <label for="first-name" className="block text-sm/6 font-semibold text-gray-900">First name</label>
                <div className="mt-2.5">
                <input id="first-name" type="text" name="first-name" autocomplete="given-name" className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" value={formData.firstname}
                            onChange={e => setForm(prevFormData => ({
                                    ...prevFormData,
                                    firstname: e.target.value
                            }))} />
                </div>
            </div>
            <div>
                <label for="last-name" className="block text-sm/6 font-semibold text-gray-900">Last name</label>
                <div className="mt-2.5">
                <input id="last-name" type="text" name="last-name" autocomplete="family-name" className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" value={formData.lastname}
                            onChange={e => setForm(prevFormData => ({
                                    ...prevFormData,
                                    lastname: e.target.value
                            }))} />
                </div>
            </div>
            <div className="sm:col-span-2">
                <label for="email" className="block text-sm/6 font-semibold text-gray-900">Email</label>
                <div className="mt-2.5">
                <input id="email" type="email" name="email" autocomplete="email" className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" value={formData.email}
                            onChange={e => setForm(prevFormData => ({
                                    ...prevFormData,
                                    email: e.target.value
                            }))} />
                </div>
            </div>
            <div className="sm:col-span-2">
                <label for="message" className="block text-sm/6 font-semibold text-gray-900">Message</label>
                <div className="mt-2.5">
                <textarea id="message" name="message" rows="4" className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" value={formData.message}
                        onChange={e => setForm(prevFormData => ({
                                ...prevFormData,
                                message: e.target.value
                        }))} />
                </div>
            </div>
            </div>
            <div className="mt-10">
            <button type="submit" className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Submit</button>
            </div>
        </form>
        </div>
    );
}