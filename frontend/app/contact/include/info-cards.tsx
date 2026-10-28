import { contact } from "../../home/include/data";
import { container, cx, Heading, reveal } from "../../home/include/ui";

const cards = [
  { icon: "fa-solid fa-location-dot", label: "Our Address", value: contact.address, href: undefined },
  { icon: "fa-solid fa-phone", label: "Call Us", value: contact.phone, href: `tel:${contact.phone.replace(/\s+/g, "")}` },
  { icon: "fa-solid fa-envelope", label: "Email Us", value: contact.email, href: `mailto:${contact.email}` },
];

export default function InfoCards() {
  return (
    <section className="pt-[120px] pb-[60px] max1024:pt-[90px] max767:pt-[70px] max767:pb-[40px]">
      <div className={container}>
        <Heading
          tag="Get in touch"
          title="We'd Love to Hear From You"
          text="Questions about a tour, a booking or a custom trip? Reach us any way you like."
          center
        />
        <div className="grid grid-cols-[repeat(3,1fr)] gap-[28px] max1024:grid-cols-[1fr_1fr] max767:grid-cols-[1fr]">
          {cards.map((c) => (
            <div key={c.label} className={cx("group flex items-center gap-[20px] p-[30px] rounded-[10px] bg-[#f2f5f9]", reveal)}>
              <span className="flex shrink-0 items-center justify-center w-[64px] h-[64px] rounded-[50%] bg-blue text-white text-[24px] [transition:background_0.3s_ease] group-hover:bg-orange group-hover:text-white">
                <i className={c.icon} />
              </span>
              <div className="min-w-0">
                <h4 className="text-[20px] leading-[26px]">{c.label}</h4>
                {c.href ? (
                  <a href={c.href} className="mt-[6px] block break-words text-body text-[16px] font-medium hover:text-orange">
                    {c.value}
                  </a>
                ) : (
                  <p className="mt-[6px] text-[16px] font-medium">{c.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
