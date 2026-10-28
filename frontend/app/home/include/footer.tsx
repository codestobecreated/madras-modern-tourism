/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { contact, footerLinks } from "./data";
import Newsletter from "./newsletter";
import { container, cx } from "./ui";

const social = "inline-flex items-center justify-center w-[34px] h-[34px] rounded-[50%] text-white text-[18px] hover:bg-orange hover:text-white";
const socialDim = "bg-[rgba(255,255,255,0.12)]";
const h4 = "mb-[30px] text-white text-[18px] leading-[18px]";
const contactIcon = "mt-[7px] text-orange text-[14px]";

export default function Footer() {
  return (
    <footer className="bg-[#16243d] text-[#8a9ab5] text-[16px]">
      {/* main area carries the reference's faint white map texture (20% opacity); the bottom bar doesn't */}
      <div className="relative before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:bg-[url(/images/shared/footer-bg.webp)] before:bg-cover before:bg-center before:bg-no-repeat before:opacity-20">
      <div className={cx(container, "relative")}>
        <div className="flex items-center justify-between pt-[80px] pb-[46px] border-b border-b-[rgba(255,255,255,0.1)] max767:flex-col max767:items-start max767:gap-[20px]">
          {/* brand logo on a white badge so its navy lettering reads on the dark footer */}
          <Link href="/" aria-label="Madras Modern Tourism home" className="inline-flex items-center px-[16px] py-[10px] rounded-[12px] bg-white">
            <img src="/images/shared/logo.png" alt="Madras Modern Tourism LLC" width={530} height={190} className="w-auto h-[52px]" />
          </Link>
          <div className="flex items-center gap-[5px]">
            <a className={cx(social, socialDim)} href="#" aria-label="Facebook"><i className="fa-brands fa-facebook-f" /></a>
            {/* the second icon is always highlighted */}
            <a className={cx(social, "bg-orange !text-white")} href="#" aria-label="X"><i className="fa-brands fa-x-twitter" /></a>
            <a className={cx(social, socialDim)} href="#" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in" /></a>
            <a className={cx(social, socialDim)} href="#" aria-label="Instagram"><i className="fa-brands fa-instagram" /></a>
          </div>
        </div>
        <div className="grid grid-cols-[202px_181px_minmax(0,1fr)_355px] gap-[30px] pt-[48px] pb-[80px] max1024:grid-cols-[1fr_1fr] max767:grid-cols-[1fr]">
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className={h4}>{title}</h4>
              <ul className="leading-[28.8px] [&>li+li]:mt-[12px]">
                {links.map((l) => (
                  <li key={l.label} className="block"><Link className="text-[#8297b0] font-medium hover:text-orange" href={l.href}>{l.label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h4 className={h4}>Contact</h4>
            <ul className="text-[#8297b0] leading-[32px]">
              <li className="flex gap-[10px]">{contact.address}</li>
              <li className="flex gap-[10px] mt-[20px] leading-[28.8px]"><i className={cx("fa-solid fa-phone", contactIcon)} /><a href={`tel:${contact.phone.replace(/\s/g, "")}`}>{contact.phone}</a></li>
              <li className="flex gap-[10px] mt-[15px] leading-[28.8px]"><i className={cx("fa-solid fa-envelope", contactIcon)} /><a href={`mailto:${contact.email}`}>{contact.email}</a></li>
            </ul>
          </div>
          <div className="pt-[25px] px-[30px] pb-[30px] rounded-[30px] bg-[#101a2c]">
            <h4 className="mb-[16px] text-white text-[20px] leading-[30px] font-semibold [letter-spacing:normal]">Signup for our latest news & articles</h4>
            <Newsletter />
          </div>
        </div>
      </div>
      </div>
      <div className="px-[16px] py-[23px] bg-[#101a2c] text-center text-[16px] font-normal text-[#8297b0]">
        © {new Date().getFullYear()} Copyrights by Madras Modern Tourism LLC. All Rights Reserved
      </div>
    </footer>
  );
}
