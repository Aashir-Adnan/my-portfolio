import { abilities } from "../constants";

const FeatureCards = () => (
  <div className="w-full padding-x-lg">
    <div
      className="
        mx-auto grid 
        grid-cols-1         /* Mobile: 1 column */
        md:grid-cols-3      /* Tablet & up: 3 columns */
        gap-6 overflow-visible
      "
    >
      {abilities.map(({ imgPath, title, desc }) => (
        <div
          key={title}
          className="card-border rounded-xl p-8 z-[1] flex flex-col gap-4 
                     transition-transform duration-300 hover:-translate-y-2"
        >
          <div className="lg: size-14  flex items-center justify-center rounded-full">
            <img src={imgPath} alt={title} />
          </div>
          <h3 className="text-white text-2xl font-semibold mt-2">{title}</h3>
          <p className="text-white-50 text-lg">{desc}</p>
        </div>
      ))}
    </div>
  </div>
);

export default FeatureCards;
