"use client";
import React from "react";
import { motion } from "framer-motion";
import { IconCloudDemo } from "../../components/ui/icon";
import AdvanceSelect from "../../components/ui/advance-select";

export default function ContactClient() {

    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    const sentToDiscord = async (e: React.MouseEvent<HTMLButtonElement>) => {
        // Contoh URL dari Firebase Function
        const apiUrl = 'https://sendtodiscord-qxjcz4kj6a-uc.a.run.app/';
        setIsLoading(true);
        try {

            fetch('/api/send-to-discord', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: firstName + ' ' + lastName,
                    number: phone,
                    email: email,
                    message: message,
                }),
            }).then(res => res.json())
                .then(data => {
                    console.log('Response dari Cloud Function:', data);
                })
                .catch(err => console.error('Error:', err));

            console.log('Data yang dikirim:', {
                nama: firstName + ' ' + lastName,
                email: email,
                message: message,
            });
            console.log('Request dikirim ke:', apiUrl);
            console.log('Response dari Cloud Function:');
            setIsLoading(false);
            setFirstName('');
            setLastName('');
            setPhone('');
            setEmail('');
            setMessage('');
            alert('Pesan berhasil dikirim!');
        } catch (error) {
            console.error('Error sending message:', error);
        }

    }

    return (
        <section className={` bg-darkPrimary py-16`}>
            <div className={`container flex flex-col md:items-center justify-center md:flex-row gap-4  w-full`}>
                <div className={`md:w-1/2 flex justify-center items-center`}>
                    <IconCloudDemo />
                </div>
                <div className={`md:w-1/2 flex items-center justify-center`}>
                    <div className={`flex w-full h-full flex-col text-white justify-center gap-4`}>
                        <h1 className={`md:text-xl lg:text-3xl`}>Let&apos;s Get In Touch</h1>
                        <p>Or just reach manually to <a className={`text-primary cursor-pointer hover:underline`} href="mailto:irsyadagung08@gmail.com">irsyadagung08@gmail.com</a></p>

                        <div className={`flex flex-col lg:flex-row flex-grow w-full gap-4`}>
                            <div className={`flex lg:w-full flex-col gap-4`}>
                                <label htmlFor="First Name">First Name</label>
                                <input
                                    type="text"
                                    id="First Name"
                                    placeholder="Enter your first name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className={`bg-blue-950 border-2 border-primary rounded-lg p-2 text-white focus:outline-none focus:border-primary`}
                                />
                            </div>
                            <div className={`flex lg:w-full flex-col gap-4`}>
                                <label htmlFor="First Name">Last Name</label>
                                <input
                                    type="text"
                                    id="Last Name"
                                    placeholder="Enter your last name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className={`bg-blue-950 border-2 border-primary rounded-lg p-2 text-white focus:outline-none focus:border-primary`}
                                />
                            </div>
                        </div>

                        <div className={`flex flex-col gap-4`}>
                            <label htmlFor="First Name">Phone Number</label>
                            <div className="flex items-center bg-blue-950 border-2 border-primary rounded-lg p-2 text-white">
                                <input
                                    type="text"
                                    id="phone"
                                    placeholder="8123456789"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="bg-blue-950 focus:outline-none w-full text-white"
                                />
                            </div>

                        </div>
                        <div className={`flex flex-col gap-4`}>
                            <label htmlFor="First Name">Email</label>
                            <input
                                type="text"
                                id="First Name"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`bg-blue-950 border-2 border-primary rounded-lg p-2 text-white focus:outline-none focus:border-primary`}
                            />
                        </div>
                        <div className={`flex flex-col gap-4`}>
                            <label htmlFor="First Name">Message</label>
                            <textarea
                                rows={5}
                                cols={5}
                                id="First Name"
                                placeholder="Type your message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className={`bg-blue-950 border-2 border-primary rounded-lg p-2 text-white focus:outline-none focus:border-primary`}
                            />
                        </div>
                        <button
                            onClick={sentToDiscord}
                            type="button"
                            className={`bg-primary text-white rounded-lg p-2 hover:bg-blue-500 transition duration-300`}
                        >
                            {isLoading ? "Loading..." : "Send Message"}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}