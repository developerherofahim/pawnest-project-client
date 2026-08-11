import Image from "next/image";
import logo from '../../assets/Pawnest-logo.png'
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedinIn,
    FaPhoneAlt,
} from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { GrLocationPin } from "react-icons/gr";

const Footer = () => {
    return (
        <footer className="bg-primary-800 py-16">
            <div className="container mx-auto max-w-7xl px-6 mb-8">
                <div className="flex flex-wrap">
                    {/* Company */}
                    <div className="w-full px-4 mb-8 sm:w-1/2 lg:w-1/4">
                        <div className="mb-8">
                            <Image
                                src={logo}
                                alt='pawnest-logo'
                                height={150}
                                width={150} />
                        </div>
                        <p className="text-[#f7f2e899]">Connecting loving families with pets who need a home. Every adoption changes two lives.</p>

                    </div>

                    {/* Get Help */}
                    <div className="w-full px-4 mb-8 sm:w-1/2 lg:w-1/4">
                        <h4 className="relative mb-3 text-lg font-semibold capitalize text-secondary-800">
                            Quick Links
                        </h4>

                        <ul className="space-y-3">
                            <li>
                                <a
                                    href="#"
                                    className="block text-[#f7f2e899] transition-all duration-300 hover:pl-2 hover:text-white"
                                >
                                    Home
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="block text-[#f7f2e899] transition-all duration-300 hover:pl-2 hover:text-white"
                                >
                                    All Pets
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="block text-[#f7f2e899] transition-all duration-300 hover:pl-2 hover:text-white"
                                >
                                    My Requests
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="block text-[#f7f2e899] transition-all duration-300 hover:pl-2 hover:text-white"
                                >
                                    Add Pet
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="w-full px-4 mb-8 sm:w-1/2 lg:w-1/4">
                        <h4 className="relative mb-3 text-lg font-semibold capitalize text-secondary-800">
                            Contract
                        </h4>

                        <ul className="space-y-3">
                            <li>
                                <p
                                    className="flex items-center gap-2 text-[#f7f2e899]"
                                >
                                    <span><MdOutlineMailOutline /></span>
                                    <span>pawnest@gmail.com</span>
                                </p>
                            </li>
                            <li>
                                <p
                                    className="flex items-center gap-2 text-[#f7f2e899]"
                                >
                                    <span><FaPhoneAlt /></span>
                                    <span>+8801966333666</span>
                                </p>
                            </li>
                            <li>
                                <p
                                    className="flex items-center gap-2 text-[#f7f2e899]"
                                >
                                    <span><GrLocationPin /></span>
                                    <span>Gazipur, Dhaka, Bangladesh</span>
                                </p>
                            </li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div className="w-full px-4 mb-8 sm:w-1/2 lg:w-1/4">
                        <h4 className="relative mb-3 text-lg font-semibold capitalize text-secondary-800">
                            Follow Us
                        </h4>

                        <div className="flex gap-3">
                            <a
                                href="#"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white transition-all duration-500 hover:bg-white hover:text-earth-900"
                            >
                                <FaFacebookF />
                            </a>

                            <a
                                href="#"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white transition-all duration-500 hover:bg-white hover:text-earth-900"
                            >
                                <FaTwitter />
                            </a>

                            <a
                                href="#"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white transition-all duration-500 hover:bg-white hover:text-earth-900"
                            >
                                <FaInstagram />
                            </a>

                            <a
                                href="#"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white transition-all duration-500 hover:bg-white hover:text-earth-900"
                            >
                                <FaLinkedinIn />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto max-w-7xl px-6 border-t border-white/10 mt-10">
                <div className="container mx-auto max-w-7xl px-6 py-6 flex flex-col items-center justify-center gap-3 text-center md:flex-row">
                    <p className="text-[#f7f2e899]">
                        © {new Date().getFullYear()}{" "}
                        <span className="font-semibold text-white">PawNest</span>. -Pet Adoption Platform All rights
                        reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;