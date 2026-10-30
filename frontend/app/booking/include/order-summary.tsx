/* eslint-disable @next/next/no-img-element */
import { priceFor, type TourDetail } from "../../home/include/catalog";
import { inr } from "../../home/include/data";

export const fmtPrice = inr;

export const fmtDate = (iso: string) =>
  iso ? new Date(`${iso}T00:00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "Not selected";

const row = "flex justify-between gap-[15px] py-[10px] text-[15px] border-b border-solid border-line";

/** Tour image, title and the price breakdown for the current booking. */
export default function OrderSummary({ tour: t, date, guests }: { tour: TourDetail; date: string; guests: number }) {
  const each = priceFor(t, guests);
  return (
    <div className="p-[25px] rounded-[12px] bg-white [box-shadow:0_10px_30px_rgba(0,0,0,0.1)]">
      <h3 className="mb-[18px] text-[20px]">Order summary</h3>
      <img src={t.image} alt={t.title} className="w-full h-[180px] rounded-[10px] object-cover" />
      <h4 className="mt-[15px] text-navy text-[18px] leading-[1.3]">{t.title}</h4>
      <p className="mt-[4px] text-[14px]"><i className="fa-solid fa-location-dot mr-[6px] text-orange" />{t.location}</p>
      <div className="mt-[15px]">
        <div className={row}><span>Duration</span><span className="text-navy font-medium">{t.duration}</span></div>
        <div className={row}><span>Date</span><span className="text-navy font-medium">{fmtDate(date)}</span></div>
        <div className={row}><span>Guests</span><span className="text-navy font-medium">{guests}</span></div>
        {each > 0 && <div className={row}><span>{fmtPrice(each)} × {guests}</span><span className="text-navy font-medium">{fmtPrice(each * guests)}</span></div>}
        <div className="flex justify-between pt-[15px] text-[18px]">
          <strong className="text-navy">Total</strong>
          <strong className="text-navy">{fmtPrice(each * guests)}</strong>
        </div>
      </div>
    </div>
  );
}
