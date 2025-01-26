
import { FaBriefcase, FaUserCircle } from "react-icons/fa";
import { ImUsers } from "react-icons/im";
import { FaRupeeSign, FaBuilding, FaLayerGroup } from "react-icons/fa";

const HowItWorks = () => {
  const items = [
    {
      icon: <FaBriefcase className="text-primary" />,
      title: "Job Practice",
      subtitle: "Develop your Skills",
      points: [
        "Refine your skills and boost your confidence with diverse part-time job practices."
      ],
    },
    {
      icon: <FaUserCircle className="text-primary" />,
      title: "Post Your Talent",
      subtitle: "Showcase Your Expertise",
      points: [
        "Display your specialized skills and attract potential clients as a freelancer.",
        "Join a vibrant community of over 1000 clients seeking freelancers."
      ],
    },
    {
      icon: <ImUsers className="text-primary" />,
      title: "Get Hired by Clients",
      subtitle: "Abundant Opportunities Await",
      points: [
        "Explore 2000+ projects aligned with your skills and interests."
      ],
    },
    {
      icon: <FaRupeeSign className="text-primary" />,
      title: "Easy Payments",
      subtitle: "Your Hard Work, Fair Compensation",
      points: [
        "Receive hassle-free payments directly from clients.",
        "Enjoy a seamless payment process with various options available."
      ],
    },
    {
      icon: <FaBuilding className="text-primary" />,
      title: "Start Today",
      subtitle: "Start Your Freelancing Journey Today",
      points: [
        "Embark on an exciting freelancing journey.",
        "Unleash your potential, expand your professional network, and earn a substantial income."
      ],
    },
    {
      icon: <FaLayerGroup className="text-primary" />,
      title: "Enhance Yourself",
      subtitle: "Enhance Your Freelance Experience",
      points: [
        "Utilize secure communication channels to interact with clients.",
        "Stay organized and on track with project management tools.",
        "Build your reputation through the rating system."
      ],
    },
  ];

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-center text-3xl font-bold mb-8">How It Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <div
            key={index}
            className="card shadow-lg border rounded-lg p-5 text-center hover:shadow-xl transition"
          >
            <div className="text-5xl mb-4 flex items-center justify-center">{item.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600 mb-4">{item.subtitle}</p>
            <ul className="text-left text-gray-800 space-y-2">
              {item.points.map((point, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
