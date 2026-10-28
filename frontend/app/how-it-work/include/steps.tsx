import { container, cx, Heading, reveal, section } from "../../home/include/ui";

const steps = [
  { icon: "fa-solid fa-map-location-dot", title: "Choose destination", text: "Browse hill stations, temple towns and beaches across Tamil Nadu." },
  { icon: "fa-solid fa-suitcase-rolling", title: "Pick a tour", text: "Compare itineraries, durations and prices, then pick the one that fits." },
  { icon: "fa-solid fa-calendar-check", title: "Book online", text: "Choose your date and group size and confirm in a couple of minutes." },
  { icon: "fa-solid fa-umbrella-beach", title: "Enjoy the trip", text: "Your guide meets you at pick-up. We handle the rest of the day." },
];

/** Four numbered steps joined by a dashed line (horizontal on desktop, hidden when cards stack). */
export default function Steps() {
  return (
    <section className={section}>
      <div className={container}>
        <Heading tag="How It Works" title="Plan Your Trip in Four Easy Steps" center />
        <div className="relative grid grid-cols-[repeat(4,1fr)] gap-[30px] max1024:grid-cols-[1fr_1fr] max767:grid-cols-[1fr]">
          <span aria-hidden className="absolute top-[50px] left-[12%] right-[12%] border-t-[2px] border-dashed border-[#c5cfdd] max1024:hidden" />
          {steps.map((s, i) => (
            <div key={s.title} className={cx(reveal, "relative text-center")}>
              <span className="relative inline-flex items-center justify-center w-[100px] h-[100px] rounded-full bg-blue text-white text-[36px] [box-shadow:0_0_0_10px_#fff]">
                <i className={s.icon} />
                <span className="absolute top-[-4px] right-[-4px] inline-flex items-center justify-center w-[34px] h-[34px] rounded-full border-[3px] border-white bg-orange text-white text-[14px] font-bold">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </span>
              <h3 className="mt-[26px] text-[22px] leading-[28px]">{s.title}</h3>
              <p className="mt-[10px] mx-auto max-w-[260px] text-[15px] font-medium leading-[26px]">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
