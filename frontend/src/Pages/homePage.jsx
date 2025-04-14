import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Briefcase,
  DollarSign,
  Monitor,
  Users,
  BookOpen,
  TrendingUp,
  Quote,
  Facebook,
  Instagram,
  Linkedin,
  Twitter
} from "lucide-react";
const HomePage = () => {
  const sliderSettings = {
    dots: true, // Pagination dots
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000, // Auto slide every 4 sec
    fade: true, // Smooth fade transition
    cssEase: "linear",
    arrows: true, // Navigation arrows
    pauseOnHover: true,
  };

  const images = [
    "https://img.freepik.com/free-vector/abstract-blue-light-pipe-speed-zoom-black-background-technology_1142-9980.jpg?semt=ais_hybrid&w=740",
    "https://static.vecteezy.com/system/resources/previews/023/517/333/non_2x/digital-marketing-internet-marketing-and-digital-marketing-background-photo.jpg",
    "https://png.pngtree.com/thumb_back/fh260/background/20230716/pngtree-illustration-of-social-media-and-digital-marketing-hands-holding-tablet-with-image_3879893.jpg",
  ];
  const services = [
    {
      title: "Entrepreneurship Growth",
      description:
        "We provide structured programs and mentorship to help individuals transition from employees to successful entrepreneurs.",
      icon: <Briefcase size={40} className="text-blue-600" />,
    },
    {
      title: "Financial Freedom Strategies",
      description:
        "Our business model ensures long-term passive income streams, allowing you to achieve true financial independence.",
      icon: <DollarSign size={40} className="text-green-500" />,
    },
    {
      title: "Advanced Digital Solutions",
      description:
        "Utilizing technology and digital tools, we help businesses scale and optimize their operations for success.",
      icon: <Monitor size={40} className="text-purple-500" />,
    },
    {
      title: "Network Marketing Mastery",
      description:
        "Learn how to leverage professional networking and structured marketing strategies to expand your business exponentially.",
      icon: <Users size={40} className="text-yellow-500" />,
    },
    {
      title: "Business Mentorship & Training",
      description:
        "Our experts provide hands-on training and mentorship to ensure you have the knowledge and skills to thrive in any market.",
      icon: <BookOpen size={40} className="text-red-500" />,
    },
    {
      title: "Investment & Wealth Growth",
      description:
        "We guide you in making smart investment decisions to multiply your wealth over time and secure your financial future.",
      icon: <TrendingUp size={40} className="text-teal-500" />,
    },
  ];

  const testimonials = [
    {
      quote:
        "Joining NetVers was the best decision of my life! It transformed my financial situation and gave me complete freedom.",
      name: "Amit Sharma",
      title: "Independent Business Owner",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      quote:
        "The training and mentorship at NetVers are unparalleled. They provide every tool needed to build a strong financial future.",
      name: "Priya Mehta",
      title: "Senior Network Leader",
      image: "https://randomuser.me/api/portraits/women/45.jpg",
    },
    {
      quote:
        "I was skeptical at first, but NetVers truly delivers what they promise. Their business model is future-proof and highly rewarding.",
      name: "Rahul Verma",
      title: "Entrepreneur & Investor",
      image: "https://randomuser.me/api/portraits/men/50.jpg",
    },
  ];
  return (
    <div className="font-sans bg-gray-50  pb-2">
      {/* Hero Section - Carousel */}
      <div className="font-sans bg-gray-50 pt-2">
        {/* Hero Section - Full-Width Carousel with Overlay */}
        <div className="relative w-screen overflow-hidden m-0 p-0">
          <Slider {...sliderSettings}>
            {images.map((src, index) => (
              <div key={index} className="relative w-screen">
                {/* Image */}
                <img
                  src={src}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-[600px] object-cover rounded-none shadow-xl"
                />

                {/* Welcome Text Overlay (No Black BG) */}
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-6">
                  <h1 className="text-4xl md:text-6xl font-bold text-shadow-lg">
                    Welcome to <span className="text-yellow-400">NetVers</span>
                  </h1>
                  <p className="mt-4 text-lg md:text-2xl max-w-3xl leading-relaxed text-shadow-lg">
                    Empowering businesses & individuals through network
                    marketing, strategic collaborations, and technology.
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* About Section */}
      <section
        className="relative py-20 px-6 text-center bg-fixed bg-cover bg-center pt-16"
        style={{
          backgroundImage: `url('https://png.pngtree.com/thumb_back/fh260/background/20221203/pngtree-global-business-network-market-technology-network-photo-image_7491190.jpg')`, // Replace with your actual image URL
        }}
      >
        {/* Content Box */}
        <div className="max-w-3xl mx-auto bg-white/70 backdrop-blur-lg p-8 md:p-12 rounded-xl shadow-lg">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            About <span className="text-blue-500">NetVers</span>
          </h2>
          <p className="text-gray-800 mt-6 text-lg leading-relaxed tracking-wide">
            At <span className="font-semibold text-blue-600">NetVers</span>, we
            empower individuals and businesses with
            <span className="text-indigo-600 font-semibold">
              {" "}
              financial independence, business growth, and long-term success.
            </span>
            <br />
            <br />
            Our platform helps entrepreneurs leverage
            <span className="text-green-600 font-semibold">
              {" "}
              network marketing, strategic collaborations, and modern technology
            </span>
            to create a{" "}
            <span className="text-red-600 font-semibold">
              {" "}
              stable and sustainable income stream.
            </span>
            <br />
            <br />
            With a{" "}
            <span className="text-purple-600 font-semibold">
              vision to revolutionize the digital business landscape
            </span>
            , we provide structured pathways that ensure
            <span className="text-pink-600 font-semibold">
              {" "}
              scalability, profitability, and empowerment.
            </span>
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-gradient-to-b from-blue-50 to-gray-100 py-16 px-4 md:px-10">
        <div className="max-w-6xl mx-auto text-center">
          {/* Title */}
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Our <span className="text-blue-600">Services</span>
          </h2>
          <p className="text-gray-700 mt-4 md:mt-6 text-lg leading-relaxed max-w-2xl mx-auto">
            At <span className="font-semibold text-blue-700">NetVers</span>, we
            believe in providing
            <span className="font-semibold text-gray-900">
              {" "}
              dynamic business solutions
            </span>{" "}
            that empower individuals to
            <span className="text-blue-600"> achieve financial freedom</span>,
            build strong networks, and scale their ventures.
          </p>

          {/* Services Grid */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white/80 p-8 rounded-xl shadow-lg backdrop-blur-md border border-gray-200 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              >
                {/* Icon */}
                <div className="flex justify-center mb-4">{service.icon}</div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-900">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-700 mt-3 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-gray-100 px-6 md:px-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Section Title */}
          <h2 className="text-4xl font-extrabold text-gray-900">
            What Our <span className="text-blue-600">Members Say</span>
          </h2>
          <p className="text-lg text-gray-600 mt-4">
            Real stories from people who transformed their lives with NetVers.
          </p>

          {/* Testimonials Slider */}
          <div className="mt-10">
            <Slider {...sliderSettings}>
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white/90 p-8 rounded-2xl shadow-xl backdrop-blur-md border border-gray-200 mx-4 transition-all transform hover:scale-105 hover:shadow-2xl duration-300"
                >
                  {/* Quote Icon */}
                  <div className="flex justify-center mb-4">
                    <Quote size={40} className="text-blue-500" />
                  </div>

                  {/* Testimonial Text */}
                  <p className="italic text-gray-700 text-lg leading-relaxed">
                    "{testimonial.quote}"
                  </p>

                  {/* User Details */}
                  <div className="mt-6 flex flex-col items-center">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full shadow-lg border-2 border-gray-300"
                    />
                    <h4 className="mt-4 font-semibold text-gray-900 text-lg">
                      {testimonial.name}
                    </h4>
                    <p className="text-blue-500 font-medium">
                      {testimonial.title}
                    </p>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6 md:px-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Logo & Description */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-white">NetVers</h2>
          <p className="mt-3 text-gray-400 text-sm">
            Empowering individuals with business solutions that create financial freedom and growth.
          </p>
        </div>

        {/* Quick Links */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold text-gray-200">Quick Links</h3>
          <ul className="mt-3 space-y-2 text-gray-400 text-sm">
            <li><a href="#" className="hover:text-blue-400 transition">About Us</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Our Services</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Testimonials</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Contact</a></li>
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold text-gray-200">Stay Updated</h3>
          <p className="text-gray-400 text-sm mt-2">Subscribe to our newsletter for the latest updates.</p>
          <div className="mt-4 flex justify-center md:justify-start">
            <input
              type="email"
              placeholder="Your email"
              className="w-2/3 p-2 text-gray-800 rounded-l-md focus:ring-2 focus:ring-blue-400"
            />
            <button className="bg-blue-600 hover:bg-blue-500 px-4 py-2 text-white rounded-r-md">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
        {/* Copyright */}
        <p className="text-gray-400 text-sm">&copy; 2025 NetVers. All rights reserved.</p>

        {/* Social Media Icons */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#" className="text-gray-400 hover:text-blue-400 transition">
            <Facebook size={20} />
          </a>
          <a href="#" className="text-gray-400 hover:text-pink-400 transition">
            <Instagram size={20} />
          </a>
          <a href="#" className="text-gray-400 hover:text-blue-600 transition">
            <Linkedin size={20} />
          </a>
          <a href="#" className="text-gray-400 hover:text-blue-300 transition">
            <Twitter size={20} />
          </a>
        </div>
      </div>
    </footer>
    </div>
  );
};

export default HomePage;
