/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { contact, footerLinks } from "./data";
import Newsletter from "./newsletter";
import { container, cx } from "./ui";

const social = "inline-flex items-center justify-center w-[38px] h-[38px] rounded-[50%] text-white text-[16px] [transition:background_0.25s_ease,transform_0.25s_ease] hover:bg-orange hover:text-white hover:[transform:translateY(-2px)]";
const socialDim = "bg-[rgba(255,255,255,0.1)]";
// Column headings carry a short orange underline so all four columns line up on one rule.
const h4 = "relative mb-[22px] pb-[12px] text-white text-[17px] leading-[22px] after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-[28px] after:h-[2px] after:rounded-[2px] after:bg-orange";
const contactIcon = "inline-flex shrink-0 items-center justify-center w-[30px] h-[30px] rounded-[8px] bg-[rgba(255,157,61,0.12)] text-orange text-[13px]";
const link = "group/link inline-flex items-center gap-[8px] text-[#8297b0] text-[15px] font-medium [transition:color_0.2s_ease] hover:text-orange";

export default function Footer() {
  return (
    <footer className="bg-[#16243d] text-[#8a9ab5] text-[16px]">
      {/* main area carries the reference's faint white map texture (20% opacity); the bottom bar doesn't */}
      <div className="relative before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:bg-[url(/images/shared/footer-bg.webp)] before:bg-cover before:bg-center before:bg-no-repeat before:opacity-20">
      <div className={cx(container, "relative")}>
        <div className="flex items-center justify-between pt-[44px] pb-[28px] border-b border-b-[rgba(255,255,255,0.1)] max767:pt-[36px] max767:flex-col max767:items-start max767:gap-[20px]">
          {/* brand logo on a white badge so its navy lettering reads on the dark footer */}
          <Link href="/" aria-label="Madras Modern Tourism home" className="inline-flex items-center px-[16px] py-[10px] rounded-[12px] bg-white">
            <img src="/images/shared/logo.png" alt="Madras Modern Tourism LLC" width={530} height={190} className="w-auto h-[44px]" />
          </Link>
          <div className="flex items-center gap-[5px]">
            <a className={cx(social, socialDim)} href="#" aria-label="Facebook"><i className="fa-brands fa-facebook-f" /></a>
            {/* the second icon is always highlighted */}
            <a className={cx(social, "bg-orange !text-white")} href="#" aria-label="X"><i className="fa-brands fa-x-twitter" /></a>
            <a className={cx(social, socialDim)} href="#" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in" /></a>
            <a className={cx(social, socialDim)} href="#" aria-label="Instagram"><i className="fa-brands fa-instagram" /></a>
          </div>
        </div>
        <div className="grid grid-cols-[minmax(0,0.8fr)_minmax(0,0.8fr)_minmax(0,1.25fr)_minmax(0,1.45fr)] gap-[40px] pt-[36px] pb-[40px] max1024:grid-cols-[1fr_1fr] max1024:gap-[32px] max767:grid-cols-[1fr] max767:gap-[28px] max767:pb-[32px]">
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className={h4}>{title}</h4>
              <ul className="leading-[24px] [&>li+li]:mt-[10px]">
                {links.map((l) => (
                  <li key={l.label}>
                    <Link className={link} href={l.href}>
                      <i className="fa-solid fa-angle-right text-[11px] text-orange [transition:transform_0.2s_ease] group-hover/link:[transform:translateX(3px)]" aria-hidden />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h4 className={h4}>Contact</h4>
            <ul className="text-[#8297b0] text-[15px] leading-[22px] [&>li+li]:mt-[12px]">
              <li className="flex items-center gap-[12px]"><span className={contactIcon}><i className="fa-solid fa-location-dot" aria-hidden /></span><span>{contact.address}</span></li>
              <li className="flex items-center gap-[12px]"><span className={contactIcon}><i className="fa-solid fa-phone" aria-hidden /></span><a className="hover:text-orange" href={`tel:${contact.phone.replace(/\s/g, "")}`}>{contact.phone}</a></li>
              <li className="flex items-center gap-[12px]"><span className={contactIcon}><i className="fa-solid fa-envelope" aria-hidden /></span><a className="min-w-0 break-all hover:text-orange" href={`mailto:${contact.email}`}>{contact.email}</a></li>
            </ul>
          </div>
          <div className="p-[24px] rounded-[20px] bg-[#101a2c] [border:1px_solid_rgba(255,255,255,0.06)]">
            <h4 className="mb-[14px] text-white text-[18px] leading-[26px] font-semibold [letter-spacing:normal]">Signup for our latest news & articles</h4>
            <Newsletter />
          </div>
        </div>
      </div>
      </div>
      <div className="bg-[#101a2c] text-[14px] font-normal text-[#8297b0]">
        <div className={cx(container, "flex items-center justify-between gap-[8px] py-[16px] max767:flex-col max767:text-center")}>
          <p className="m-0">© {new Date().getFullYear()} Copyrights by Madras Modern Tourism LLC. All Rights Reserved</p>
          <nav aria-label="Policies" className="flex flex-wrap justify-center gap-x-[16px] gap-y-[4px]">
            <Link href="/privacy-policy" className="text-[#8297b0] hover:text-orange">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="text-[#8297b0] hover:text-orange">Terms &amp; Conditions</Link>
            <Link href="/refund-policy" className="text-[#8297b0] hover:text-orange">Refund Policy</Link>
          </nav>
          <p className="m-0">Designed &amp; Managed by <strong className="text-orange font-semibold tracking-[0.5px]">EC4YOU</strong></p>
        </div>
      </div>
    </footer>
  );
}
