import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div>
            <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
                <div>
                    <img src={assets.logo} className="mb-5 w-32"/>
                    <p className="w-full md:w-2/3 text-gray-600">
                    Our eCommerce platform offers a wide range of high-quality dresswares across various categories. With a user-friendly interface, secure payment options, and fast shipping, we aim to provide a seamless and personalized shopping experience. Plus, enjoy exclusive deals and discounts when you subscribe to our platform!
                    </p>
                </div>

                <div>
                    <p className="text-xl font-medium mb-5">COMPANY</p>
                    <ul className="flex flex-col gap-1 text-gray-600">
                        <Link to = "/"><li>Home</li></Link>
                        <Link to = "/about"><li>About us</li></Link>
                        <li>delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>

                <div>
                    <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
                    <ul className="flex flex-col gap-1 text-gray-600">
                        <li>+91-9014028449</li>
                        <li>vallamkondasandeep04@gmail.com</li>
                    </ul>
                </div>
            </div>

            <div>
                <hr />
                <p className="py-5 text-sm text-center">Copyright 2024@forever.com-All Rights Reserved</p>
            </div>
        </div>
    )
}

export default Footer;