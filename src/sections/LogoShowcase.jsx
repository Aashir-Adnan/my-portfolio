import { logoIconsList } from "../constants";
import sinkhole from "/videos/skills-bg.webm";

const LogoIcon = ({ icon }) => {
  return (
    <div className="flex-none flex-center marquee-item">
      <img src={icon.imgPath} alt={icon.name} />
    </div>
  );
};

const LogoShowcaseContent = () => (
  <div className="md:my-20 my-10 relative">
    <div className="gradient-edge" />
    <div className="gradient-edge" />

    <div className="marquee h-52">
      <div className="marquee-box md:gap-12 gap-5">
        {logoIconsList.map((icon, index) => (
          <LogoIcon key={index} icon={icon} />
        ))}

        {logoIconsList.map((icon, index) => (
          <LogoIcon key={index} icon={icon} />
        ))}
      </div>
    </div>
  </div>
);

export const LogoShowcase = () => {
  return (
    <div className="relative flex flex-col h-full w-full">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute opacity-20   bg-cover left-0 w-full h-full object-cover z-0"
      >
        <source src={sinkhole} type="video/webm" />
      </video>

      {/* Hero Content */}
      <LogoShowcaseContent />
    </div>
  );
};
export default LogoShowcase;
