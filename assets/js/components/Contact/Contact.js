import React, {useRef, useState} from "react";
import * as contactService from "../../services/contactService";
import {useNavigate} from "react-router-dom";
import FlashMessage from 'react-flash-message'

const Contact = () => {
    const navigate = useNavigate();
    const [taskInp, setTaskInp] = useState("")
    const formRef = useRef();
    const [message, setMessage] = useState(false)



    const onScheduleCreate = (e) => {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);
        let name = formData.get('full_name');
        let email = formData.get('email');
        let phone_number = formData.get('phone_number');
        let message = formData.get('message');
        e.target.reset();
        setMessage(true)

        contactService.create({
            name,
            email,
            phone_number,
            message
        },)
            .then(result => {
                setMessage(false)
                navigate('/');
            })
    }


    return (

        <div className=" flex z-0 py-16 bg-white">

            <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
                <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
                    <div className="md:7/12 lg:w-6/12">
                        <h2 className="bg-gradient-to-r from-red-500 flex justify-center content-center text-white md:text-4xl">ВРЪЗКА
                            С НАС </h2>
                        <p className="mt-6 text-black-500 font-bold">
                            За контакти 0896703833 0899961648</p>
                        <p className="text-black-500 font-bold"> e-mail: kostinbrodbus@abv.bg</p>

                    </div>

                    {message &&
                        <FlashMessage className=" flex z-20" duration={5000}>
                            <div
                                className="  p-4 mb-8 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
                                role="alert">
                                <span className="font-medium">Съобщението е изпратено!</span>
                            </div>
                        </FlashMessage>
                    }

                    <div className="md:5/12 lg:w-5/12">
                        <form ref={formRef} onSubmit={onScheduleCreate} onChange={e => {
                            setTaskInp(e.target.value);
                        }} method="POST">
                            <div className="mb-6">
                                <input
                                    type="text"
                                    placeholder="Име"
                                    className="
                                    w-full
                                    rounded
                                    p-3
                                    text-gray-800
                                    dark:text-gray-50
                                    dark:bg-slate-700
                                    border-gray-500
                                    dark:border-slate-600
                                    outline-none
                                    focus-visible:shadow-none
                                    focus:border-primary
                                    "
                                    name="full_name"
                                    id="full_name"
                                    required
                                />

                            </div>
                            <div className="mb-6">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="
                                    w-full
                                    rounded
                                    p-3
                                    text-gray-800
                                    dark:text-gray-50
                                    dark:bg-slate-700
                                    border-gray-500
                                    dark:border-slate-600
                                    outline-none
                                    focus-visible:shadow-none
                                    focus:border-primary
                                    "
                                    name="email"
                                    id="email"
                                    required
                                />

                            </div>
                            <div className="mb-6">
                                <input
                                    type="text"
                                    placeholder="Телефон"
                                    className="
                                    w-full
                                    rounded
                                    p-3
                                    text-gray-800
                                    dark:text-gray-50
                                    dark:bg-slate-700
                                    border-gray-500
                                    dark:border-slate-600
                                    outline-none
                                    focus-visible:shadow-none
                                    focus:border-primary
                                    "
                                    name="phone_number"
                                    id="phone_number"
                                    required
                                />


                            </div>
                            <div className="mb-6">
                                <textarea
                                    rows="6"
                                    placeholder="Съобщение"
                                    className="
                                    w-full
                                    rounded
                                    p-3
                                    text-gray-800
                                    dark:text-gray-50
                                    dark:bg-slate-700
                                    border-gray-500
                                    dark:border-slate-600
                                    outline-none
                                    focus-visible:shadow-none
                                    focus:border-primary
                                    "
                                    name="message"
                                    id="message"
                                    required
                                />

                            </div>
                            <div>

                                <button
                                    type="submit"
                                    className="
                                    w-full
                                    text-gray-100

                                    bg-red-500
                                    rounded
                                    border border-primary
                                    dark:border-slate-600
                                    p-3
                                    transition
                                    ease-in-out
                                    duration-500"

                                >
                                    Изпрати
                                </button>

                            </div>
                        </form>
                    </div>

                </div>
            </div>

        </div>

    );

}


export default Contact;