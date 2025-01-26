import World from "../../../Imag/earth.webp";

const DownloadAndEarn = () => {
  return (
    <div className="bg-gradient-to-r from-blue-800 to-sky-950 mb-8 md:w-11/12 w-full mx-auto p-6 md:p-8 flex flex-col md:flex-row items-center justify-between text-white gap-6 rounded-lg shadow-lg">
      <div className="md:w-1/2 w-full text-center md:text-left">
        <h1 className="text-2xl md:text-4xl font-bold mb-6">
          Download & Install Appy Now
        </h1>
        <p className="text-sm md:text-base leading-7">
          Work Up Job Site is the ultimate platform for micro-jobs and freelance
          services, connecting freelancers and businesses worldwide. Freelancers
          can earn money online by completing remote tasks, showcasing their
          skills, and working with global clients. Meanwhile, businesses can
          easily find and hire talented contractors to complete projects quickly
          and efficiently. With advanced filters, seamless communication, and
          secure payments, Work Up Job Site ensures a smooth experience for
          everyone. Join the world’s leading micro-job marketplace today and
          take the next step in your freelancing or hiring journey!
        </p>
      </div>
      <div className="md:w-1/2 w-full flex justify-center">
        <img
          src={World}
          alt="Earth"
          className="rounded-full object-cover shadow-lg max-w-[300px] md:max-w-[400px] hover:scale-105 transition-transform duration-300"
        />
      </div>
    </div>
  );
};

export default DownloadAndEarn;
