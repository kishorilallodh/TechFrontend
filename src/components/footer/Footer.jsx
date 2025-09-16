import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 rounded-tl-[4rem] ">
      {/* Top Section */}
      <div className="container py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        {/* Logo + About */}
        <div className="col-span-2 md:col-span-1">
          <h2 className="text-2xl font-bold text-white">TechDigi</h2>
          <p className="mt-4 text-sm leading-6">
            Subscribe Easy Tutorials YouTube channel to watch more videos on
            website development and press the bell icon to get immediate
            notifications of the latest videos.
          </p>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Services</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-white">
                Web Development
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Mobile App Development
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                UI/UX Design
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Digital Marketing
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                CRM
              </a>
            </li>
          </ul>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to="/service" className="hover:text-white">
                Services
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-white">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/careers" className="hover:text-white">
                Careers
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white">
                Contacts
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
          <p className="text-sm leading-6">
            Sector C-8 3rd floor, Indrapuri, Raisen Road, Bhopal
          </p>
          <p className="mt-3 text-sm">info@techdigisoftware.com</p>
          <p className="mt-1 text-sm">+91 - 9479850503</p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-6 text-xl">
            <a
              href="#"
              className="bg-gray-100 text-gray-900 p-2 rounded-full hover:bg-white transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="bg-gray-100 text-gray-900 p-2 rounded-full hover:bg-white transition"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="bg-gray-100 text-gray-900 p-2 rounded-full hover:bg-white transition"
            >
              <FaYoutube />
            </a>
            <a
              href="#"
              className="bg-gray-100 text-gray-900 p-2 rounded-full hover:bg-white transition"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 py-4 text-center text-sm">
        TechDigi Software Pvt Ltd. © 2025 - All Rights Reserved
      </div>
    </footer>
  );
}
