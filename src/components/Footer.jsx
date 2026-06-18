import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaHeart} from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="container mx-auto bg-[#0F172A] text-gray-300">
            <div className="px-6 py-14">
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
                    {/* Logo & About */}
                    <div>
                        <h2 className="text-3xl font-bold text-[#f58f95]">
                            StayNest
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-gray-400">
                            StayNest helps loving families connect with rescued pets.
                            Discover pets waiting for a forever home and make a
                            difference by adopting instead of shopping.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="mb-5 text-lg font-semibold text-white">
                            Quick Links
                        </h3>

                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="/"
                                    className="hover:text-[#f58f95] transition"
                                >
                                    Home
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/pets"
                                    className="hover:text-[#f58f95] transition"
                                >
                                    Pets
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/adoption"
                                    className="hover:text-[#f58f95] transition"
                                >
                                    Adopt
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/about"
                                    className="hover:text-[#f58f95] transition"
                                >
                                    About
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/contact"
                                    className="hover:text-[#f58f95] transition"
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="mb-5 text-lg font-semibold text-white">
                            Support
                        </h3>

                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="/faq"
                                    className="hover:text-[#f58f95] transition"
                                >
                                    FAQ
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/privacy"
                                    className="hover:text-[#f58f95] transition"
                                >
                                    Privacy Policy
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/terms"
                                    className="hover:text-[#f58f95] transition"
                                >
                                    Terms & Conditions
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/help"
                                    className="hover:text-[#f58f95] transition"
                                >
                                    Help Center
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="mb-5 text-lg font-semibold text-white">
                            Contact
                        </h3>

                        <div className="space-y-3 text-sm">
                            <p>Email: support@pawnest.com</p>
                            <p>Phone: +880 1234-567890</p>
                            <p>Location: Dhaka, Bangladesh</p>
                        </div>

                        <div className="mt-6 flex gap-4">
                            <a
                                href="#"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 hover:bg-[#f58f95] transition"
                            >
                                <FaFacebookF />
                            </a>

                            <a
                                href="#"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 hover:bg-[#f58f95] transition"
                            >
                                <FaTwitter />
                            </a>

                            <a
                                href="#"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 hover:bg-[#f58f95] transition"
                            >
                                <FaInstagram />
                            </a>

                            <a
                                href="#"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 hover:bg-[#f58f95] transition"
                            >
                                <FaLinkedinIn />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
                    © {new Date().getFullYear()} StayNest. Made with{" "}
                    <FaHeart className="inline text-[#f58f95]" /> for every pet
                    looking for a home.
                </div>
            </div>
        </footer>
    );
}
