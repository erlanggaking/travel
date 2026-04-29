export default function HeroSlider() {
  return (
    <div className="w-full relative h-[500px] md:h-[550px] bg-slate-900 overflow-hidden">
      {/* Simple static banner logic for mockup */}
      <div className="absolute inset-0 opacity-60">
        <img
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&h=800&fit=crop"
          alt="Destination Banner"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4 -mt-10">
        <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-2xl">
          Your World, Your Way
        </h2>
        <p className="text-white text-xl md:text-2xl font-medium drop-shadow-xl max-w-2xl opacity-90">
          Everything you need for your next adventure in one place.
        </p>
      </div>
    </div>
  );
}
