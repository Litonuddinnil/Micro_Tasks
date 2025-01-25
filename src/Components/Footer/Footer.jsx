import { BsInstagram } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
import logo from "../../assets/Micro Tasking and Earning Platform logo.jpg";
 
const Footer = () => {
  return (
    <footer className="">
      <div className="footer gap-0 text-neutral-content ">
        <div className="bg-[#1F2937] p-20 w-full flex gap-4 h-full">
           <a href="/">
           <img className="w-12 md:w-32 md:h-32 rounded-b-xl object-cover h-12" src={logo} alt="" /></a>
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