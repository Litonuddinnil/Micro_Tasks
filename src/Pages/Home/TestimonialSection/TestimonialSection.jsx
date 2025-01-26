import { Swiper, SwiperSlide } from "swiper/react";
import { FaStar } from "react-icons/fa"; // for star rating (optional)
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination } from 'swiper/modules';

const TestimonialSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Alice Smith",
      photoURL: "https://i.ibb.co.com/r2ZKbfk/lovepik-fashionable-male-fashion-designer-png-image-401805573-wh1200.png",
      quote: "This platform is amazing! I earned so much and completed many tasks easily.",
      rating: 5,
    },
    {
      id: 2,
      name: "Jane Smith",
      photoURL: "https://i.ibb.co.com/6RbQ3kj/istockphoto-1733124463-612x612.jpg",
      quote: "Great user experience! I found it very easy to complete my tasks and get paid.",
      rating: 4,
    },
    {
      id: 3,
      name: "Michael Johnson",
      photoURL: "https://i.ibb.co.com/McQKHP5/business-job-concept-elegant-man-suit-holding-resume-job-hiring-bright-white-interior-1258-80192.jpg",
      quote: "An outstanding platform with excellent features for earning money. Highly recommend!",
      rating: 5,
    },
    {
      id: 4,
      name: "Emily Davis",
      photoURL: "https://i.ibb.co.com/F4ydxvL/images-3.jpg",
      quote: "Fantastic experience! I made a good amount of money in a short period of time.",
      rating: 4,
    },
  ];

  return (
    <div className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">What Our Users Say</h2>
        
        {/* Swiper Slider */}
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="bg-white p-6 rounded-lg shadow-lg text-center transition-transform transform hover:scale-105 hover:shadow-xl">
                <img
                  src={testimonial.photoURL}
                  alt={testimonial.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-blue-500"
                />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{testimonial.name}</h3>
                
                {/* Dynamic Star Rating */}
                <div className="text-yellow-400 flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={`text-xl ${i < testimonial.rating ? 'fill-current' : 'text-gray-300'}`} />
                  ))}
                </div>

                <p className="text-gray-600 italic">{testimonial.quote}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TestimonialSection;
