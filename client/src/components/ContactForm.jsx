import { useState,useEffect } from 'react';
import { useNavigate } from "react-router";
import Footer from "./Footer.jsx";

const url =  "https://www.yuitof.com/api";

export default function ContactForm({state}) {
    const emptyForm = {
        message: '',
        email: '',
        firstname: '',
        lastname: '',
    };
    const [formData, setForm] = useState(emptyForm);
    const navigate = useNavigate();

    async function sendMessage(formData) {
        try {
            state.setter("pending")
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
            state.setter("fulfilled");
            navigate("/");
        } catch (error) {
            state.setter("rejected");
            console.error(error);
        } finally {
            setForm(emptyForm);
        }
    }

    useEffect(() => {
        const forms = document.getElementsByTagName('button');
        const fields = Array.from(forms);
        switch (state.value) {
            case "pending":
                fields.forEach(field => {
                    field.classList.add("cursor-not-allowed");
                })
                break;
            default:
                fields.forEach(field => {
                    field.classList.remove("cursor-not-allowed")
                })
        }

    }, [state.value])

    let alert = <></>

    if (state.value == "rejected") {
        alert =  <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    <span className="font-medium">Operation failed. Please try again.</span>
                </div>
    };

    return (
        <>
        {alert}
        <div className="h-screen w-screen grid min-h-full place-items-center"> 
            <div className="isolate bg-white">
                <form className="mx-auto max-w-xl" onSubmit={(e) => {
                    e.preventDefault();
                    sendMessage(formData);
                }}>
                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div>
                        <label htmlFor="first-name" className="block text-sm/6 font-semibold text-gray-900">First name</label>
                        <div className="mt-2.5">
                        <input id="first-name" type="text" name="first-name" autoComplete="given-name" className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                            disabled={state.value == "pending"}
                            value={formData.firstname}
                            onChange={e => setForm(prevFormData => ({
                                ...prevFormData,
                                firstname: e.target.value
                            }))} />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-900">Last name</label>
                        <div className="mt-2.5">
                        <input id="last-name" type="text" name="last-name" autoComplete="family-name" className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                            disabled={state.value == "pending"}
                            value={formData.lastname}
                            onChange={e => setForm(prevFormData => ({
                                    ...prevFormData,
                                    lastname: e.target.value
                            }))} />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="email" className="block text-sm/6 font-semibold text-gray-900">Email</label>
                        <div className="mt-2.5">
                        <input id="email" type="email" name="email" autoComplete="email" className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                            disabled={state.value == "pending"}
                            value={formData.email}
                            onChange={e => setForm(prevFormData => ({
                                ...prevFormData,
                                email: e.target.value
                            }))} />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="message" className="block text-sm/6 font-semibold text-gray-900">Message</label>
                        <div className="mt-2.5">
                        <textarea id="message" name="message" rows="4" className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                            disabled={state.value == "pending"}
                            value={formData.message}
                            onChange={e => setForm(prevFormData => ({
                                ...prevFormData,
                                message: e.target.value
                            }))} />
                        </div>
                    </div>
                    </div>
                    <div className="mt-10">
                        <button type="submit" className="flex justify-center w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            disabled={state.value == "pending" }
                        >
                            {
                                state.value != "pending" ? "Submit" : 
                                <>
                                    <svg className="mr-3 -ml-1 size-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    "Processing…"
                                </> 
                            }
                        </button>
                    </div>
                </form>
                <div className="mt-5 text-center">
                    <a href="/" className="font-semibold text-gray-900"><span aria-hidden="true">&larr;</span> Home</a>
                </div>
            </div>
        </div>
        <Footer />
        </>
    );
}
