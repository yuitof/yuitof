import { useState } from 'react';
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
                state.setter("rejected");
                throw new Error("Error occurred while sending the email.")
            }
            state.setter("fulfilled");
            const result = await response.json();
            console.log(result);
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    }

    let form = <></>

    switch (state.value) {
        case "pending":
            form =  <div role="status" className="fixed inset-0 flex items-center justify-center z-10">
                        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 m-auto" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
            break;
        case "rejected":
            form =  <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    <span className="font-medium">Operation failed. Please try again.</span>
                </div>
            break;
        default:
    }

    return (
        <>
        {form}
        <div className="h-screen w-screen grid min-h-full place-items-center"> 
        <div className="isolate bg-white">
            <form className="mx-auto mt-16 max-w-xl sm:mt-20" onSubmit={(e) => {
                e.preventDefault();
                sendMessage(formData);
                setForm(emptyForm);
            }}>
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                <div>
                    <label htmlFor="first-name" className="block text-sm/6 font-semibold text-gray-900">First name</label>
                    <div className="mt-2.5">
                    <input id="first-name" type="text" name="first-name" autoComplete="given-name" className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" value={formData.firstname}
                                onChange={e => setForm(prevFormData => ({
                                        ...prevFormData,
                                        firstname: e.target.value
                                }))} />
                    </div>
                </div>
                <div>
                    <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-900">Last name</label>
                    <div className="mt-2.5">
                    <input id="last-name" type="text" name="last-name" autoComplete="family-name" className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" value={formData.lastname}
                                onChange={e => setForm(prevFormData => ({
                                        ...prevFormData,
                                        lastname: e.target.value
                                }))} />
                    </div>
                </div>
                <div className="sm:col-span-2">
                    <label htmlFor="email" className="block text-sm/6 font-semibold text-gray-900">Email</label>
                    <div className="mt-2.5">
                    <input id="email" type="email" name="email" autoComplete="email" className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" value={formData.email}
                                onChange={e => setForm(prevFormData => ({
                                        ...prevFormData,
                                        email: e.target.value
                                }))} />
                    </div>
                </div>
                <div className="sm:col-span-2">
                    <label htmlFor="message" className="block text-sm/6 font-semibold text-gray-900">Message</label>
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
        </div>
        <Footer />
        </>
    );
}
