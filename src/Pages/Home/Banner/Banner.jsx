import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import banner3 from "../../../Imag/banner3.png";
import bannerAnimation from "../../../Imag/banneranimation.json";
import banner2Animation from "../../../Imag/banner2animation.json";
import Lottie from "lottie-react";

const Banner = () => {
  return (
    <>
      <div className="flex flex-col lg:flex-row items-center justify-between bg-gradient-to-r from-blue-100 via-purple-200 to-pink-100 p-8 lg:p-16 shadow-xl rounded-lg space-y-8 lg:space-y-0 lg:space-x-12">
        {/* Text Section */}
        <div className="text-center lg:text-left flex-1">
          <h1 className="text-4xl lg:text-5xl font-bold text-amber-500 mb-6">
            Achieve Financial Freedom with Micro Tasking and Earning Platform!
          </h1>
          <p className="text-lg text-gray-700">
            Take charge of your income with our Micro Tasking and Earning
            Platform. Join a global community where you can complete simple
            tasks, connect with opportunities, and earn securely—anytime,
            anywhere. Whether you're at home or on the go, turn your skills into
            steady rewards and start building your financial independence
            today!
          </p>
        </div>

        {/* Slider Section */}
        <div className="relative flex-1 w-full lg:w-2/3">
          <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            className="hero-slider"
            interval={3000} // Set interval for slide change
            transitionTime={500} // Smooth transition time
          >
            {/* Slide 1 with Animation */}
            <div className="relative h-[60vh] lg:h-[70vh] flex flex-col items-center justify-center text-center bg-cover bg-center bg-no-repeat">
              <Lottie
                animationData={bannerAnimation}
                loop
                autoplay
                className="absolute top-0 left-0 w-full h-full object-cover opacity-40"
              />
              <div className="relative z-10 px-4 md:px-0">
                <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">
                  Welcome to Micro Tasking
                </h1>
                <p className="text-md md:text-lg text-black max-w-xl">
                  Discover opportunities, complete tasks, and earn rewards
                  seamlessly!
                </p>
              </div>
            </div>

            {/* Slide 2 with Animation */}
            <div className="relative h-[60vh] lg:h-[70vh] flex flex-col items-center justify-center text-center bg-cover bg-center bg-no-repeat">
              <Lottie
                animationData={banner2Animation}
                loop
                autoplay
                className="absolute top-0 left-0 w-full h-full object-cover opacity-40"
              />
              <div className="relative z-10 px-4 md:px-0">
                <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">
                  Connect with Buyers
                </h1>
                <p className="text-md md:text-lg text-black max-w-xl">
                  Deliver high-quality work and build your reputation.
                </p>
              </div>
            </div>

            {/* Slide 3 with Image */}
            <div
              className="relative h-[60vh] lg:h-[70vh] flex flex-col items-center justify-center text-center bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${banner3})`,
              }}
            >
              <div className="relative z-10 px-4 md:px-0">
                <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">
                  Earn as You Work
                </h1>
                <p className="text-md md:text-lg text-black max-w-xl">
                  Simple, secure, and fast task completion for guaranteed
                  earnings.
                </p>
              </div>
            </div>
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default Banner;
