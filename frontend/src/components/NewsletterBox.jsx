import React from "react";
import { useMemo } from "react";

const NewsletterBox = () => {
    const onSubmitHandler= (event) => {
        event.preventDefault();//it helps in not reloading the web page
    }

    return (
        <div className="text-center">
            <p className="text-2xl font-medium text-gray-800">Subscribe now & get 20% off</p>
            <p className="text-xl text-gray-300 mt-3">Unlock exclusive deals, personalized recommendations, and seamless shopping experiences - subscribe today and elevate your shopping journey!</p>
            <form onSubmit={onSubmitHandler} className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3">
                <input className="w-full sm:flex-1 outline-none" type="email" placeholder="Enter your emailId" required/>
                <button type="submit" className="bg-black text-white text-xs px-10 py-4">SUBSCRIBE</button>
            </form>
        </div>
    )
}

export default NewsletterBox;