import { BsInstagram } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";

 
const Footer = () => {
  return (
    <footer className="">
      <div className="footer gap-0 text-neutral-content ">
        <div className="bg-[#1F2937] p-20 w-full flex gap-4 h-full">
          <svg
            width="50"
            height="50"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
            className="fill-current"
          >
            <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
          </svg>
          <div>
            <p className="text-3xl font-semibold mb-2">CONTACT US</p>
            <p className="pt-2">
                  Email: mdniloyhasan544@gmail.com
                  <br />
                  Phone: 01309623416
                  <br />
                  Address: House 24, Road 8, Block B, Banani, Dhaka 1213,
                  Bangladesh
                </p>
          </div>
        </div>
        <div className="bg-[#111827] p-20 w-full h-full">
          <h6 className="text-white text-3xl">Follow US</h6>
          <p>Join us on social media</p>
          <div className="grid grid-flow-col gap-4">
          <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-700 hover:opacity-90"
              >
                <FaFacebook className="text-white" />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-cyan-600 hover:opacity-90"
              >
                <RiTwitterXLine className="text-white" />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-pink-700 hover:opacity-90"
              >
                <BsInstagram className="text-white" />
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-red-700 hover:opacity-90"
              >
                <IoLogoYoutube className="text-white" />
              </a>
          </div>
        </div>
      </div>
      <div className=" footer-center bg-black  text-white p-4">
      <p>&copy; Upcoming {new Date().getFullYear()}  Service Review System.</p>
          <p>
            Designed with ❤️ by{" "}
            <a
              href="https://job-portal-74d1e.web.app/"
              className="hover:text-white underline"
            >
              Liton Uddin
            </a>
          </p> 
      </div>
    </footer>
  );
};

export default Footer;