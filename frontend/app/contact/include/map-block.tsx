import { cx, reveal } from "../../home/include/ui";

const hours = [
  { day: "Monday – Friday", time: "9:00 AM – 7:00 PM" },
  { day: "Saturday", time: "10:00 AM – 5:00 PM" },
  { day: "Sunday", time: "Closed" },
];

export default function MapBlock() {
  return (
    <div className={cx("flex flex-col gap-[28px]", reveal)}>
      <iframe
        title="Madras Modern Tourism office location, Chennai"
        src="https://www.openstreetmap.org/export/embed.html?bbox=80.24,13.04,80.28,13.08&layer=mapnik"
        loading="lazy"
        className="w-full h-[380px] rounded-[10px] [border:0] max767:h-[300px]"
      />
      <div className="p-[30px] rounded-[10px] bg-blue text-white">
        <h3 className="flex items-center gap-[10px] !text-white text-[24px] leading-[30px]">
          <i className="fa-regular fa-clock" /> Office Hours
        </h3>
        <ul className="mt-[16px]">
          {hours.map((h) => (
            <li key={h.day} className="flex justify-between gap-[16px] py-[10px] border-b border-b-white/20 last:border-b-0 text-[16px] font-medium">
              <span>{h.day}</span>
              <span className="font-semibold">{h.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
