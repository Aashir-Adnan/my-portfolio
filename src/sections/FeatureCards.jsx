import { abilities } from "../constants";

const FeatureCards = () => (
  <div className="w-full padding-x-lg">
    <div
      className="
        mx-auto grid 
        grid-cols-2         /* Mobile: 2 columns */
        md:grid-cols-3      /* Tablet & up: 3 columns */
        gap-3 md:gap-6 overflow-visible
      "
    >
      {abilities.map(({ imgPath, title, desc }) => (
        <div
          key={title}
          className="card-border rounded-xl p-4 md:p-8 z-[1] flex flex-col gap-2 md:gap-4 last:col-span-2 md:last:col-span-1 
                     transition-transform duration-300 hover:-translate-y-2"
        >
          <div className="size-10 md:size-14 flex items-center justify-center rounded-full">
            <img src={imgPath} alt={title} />
          </div>
          <h3 className="text-white text-base md:text-2xl font-semibold md:mt-2">{title}</h3>
          <p className="text-white-50 text-sm md:text-lg">{desc}</p>
        </div>
      ))}
    </div>
  </div>
);

export default FeatureCards;
