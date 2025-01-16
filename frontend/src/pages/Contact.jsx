import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';
import { BsTelephoneOutboundFill } from "react-icons/bs";
import { IoLogoTwitter } from "react-icons/io";
import { FaFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";

const Contact = () => {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm('service_pecmzvk', 'template_d00fahf', form.current, {
                publicKey: '3DpYcNGFmdRsBHvKV',
            })
            .then(
                () => {
                    console.log('SUCCESS!');
                    toast.success('Message sent successfully');
                    e.target.reset(); // Reset the form fields
                },
                (error) => {
                    console.log('FAILED...', error.text);
                    toast.error('Failed to send message');
                },
            );
    };

    return (
        <section className="bg-white">
            {/* Header Section */}
            <div className="text-center py-10">
                <h2 className="text-xl md:text-3xl font-bold">Contact Us</h2>
                <p className="text-xs my-5 w-3/4 md:w-1/2 mx-auto md:text-sm text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. 
                    Proin aliquet, ipsum eget eleifend accumsan, libero arcu interdum nulla, 
                    vitae cursus justo arcu at justo.
                </p>
            </div>

            {/* Contact Section */}
            <section className="container mx-auto flex flex-col md:flex-row justify-between gap-6 px-4 pb-12">
                {/* Google Map */}
                <div className="w-full md:w-1/2">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26573.9455955192!2d72.87941192650361!3d33.63789992208627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df981df9efa4c5%3A0x1a6a4d85a019aab4!2sBenazir%20Chowk%2C%20Islamabad%2C%20Islamabad%20Capital%20Territory%2C%20Pakistan!5e0!3m2!1sen!2s!4v1736076413620!5m2!1sen!2s"
                        width="100%"
                        height="500"
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="rounded-lg shadow-lg"
                        title="Google Map Location"
                    ></iframe>
                </div>

                {/* Contact Form */}
                <div className="w-full md:w-1/2">
                    <div className="shadow-lg p-6 rounded-lg bg-white">
                        <h2 className="text-sm md:text-xl text-center font-semibold mb-4">Send Message</h2>
                        <form ref={form} onSubmit={sendEmail} className='space-y-4'>
                            <div className="flex flex-col">
                                <label htmlFor="user_name" className="text-gray-700">Name</label>
                                <input
                                    type="text"
                                    id="user_name"
                                    name="user_name"
                                    className="p-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-teal-600"
                                    placeholder="Your Name"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="user_email" className="text-gray-700">Email</label>
                                <input
                                    type="email"
                                    id="user_email"
                                    name="user_email"
                                    className="p-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-teal-600"
                                    placeholder="Your Email"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="user_subject" className="text-gray-700">Subject</label>
                                <input
                                    type="text"
                                    id="user_subject"
                                    name="user_subject"
                                    className="p-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-teal-600"
                                    placeholder="Subject"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="message" className="text-gray-700">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    className="p-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-teal-600"
                                    rows="3"
                                    placeholder="Your Message"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full py-2 rounded-lg bg-teal-600 text-white uppercase font-semibold hover:bg-teal-700 transition-opacity"
                            >
                                Send
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            <section>
                  <div className='flex flex-col md:flex-row justify-around items-center gap-4 py-10 container mx-auto'>
                
                        <div className=" flex items-center gap-8 p-4">
                            <h2 className='font-bold text-xl md:text-2xl'>Call Us:</h2>
                            <div>
                            <span className='flex gap-2 items-center'><BsTelephoneOutboundFill />923455231199</span>
                            <span className='flex gap-2 items-center'><BsTelephoneOutboundFill />923455886452</span>
                            </div>
                        </div>
                        <div className=" flex items-center gap-8 p-4">
                            <h2 className='font-bold text-xl md:text-2xl'>Follow Us:</h2>
                            <div>
                            <span className='flex gap-2 items-center'><IoLogoTwitter  />Twitter</span>
                            <span className='flex gap-2 items-center'>< FaFacebook />Facebook</span>
                            <span className='flex gap-2 items-center'><FaInstagram />Instagram</span>
                            </div>
                        </div>
                      </div>
            </section>
        </section>
    );
};

export default Contact;
