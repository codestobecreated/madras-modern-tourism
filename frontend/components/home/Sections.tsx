/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import {
  aboutChecks,
  aboutFeatures,
  asset,
  brands,
  contact,
  footerLinks,
  gallery,
  posts,
  promos,
  tourTypes,
  tours,
  whyChoose,
} from "./data";
import { Logo } from "./Header";
import { Newsletter, TourPrice, WishButton } from "./Interactive";

export function Heading({ tag, title, text, center, reveal = true }: { tag: string; title: React.ReactNode; text?: string; center?: boolean; reveal?: boolean }) {
  return (
    <div className={`mmt-heading${reveal ? " mmt-reveal" : ""}${center ? " center" : ""}`}>
      <span className="mmt-pill"><i className="fa-solid fa-plane" />{tag}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

export function About() {
  return (
    <section className="mmt-section mmt-about">
      <img className="mmt-about-tower" src={asset("about-tower")} alt="" />
      <div className="mmt-container mmt-two-col">
        <div className="mmt-about-images">
          <img className="main" src={asset("about-couple")} alt="Couple planning a trip with a map" loading="lazy" />
          <img className="discount" src={asset("about-discount")} alt="50% discount" />
          <img className="small" src={asset("about-beach")} alt="Beach lounge" loading="lazy" />
          <img className="palms" src={asset("about-palms")} alt="" />
        </div>
        <div>
          <Heading
            reveal={false}
            tag="Get to know us"
            title="Experience Tamil Nadu with Our Company"
            text="From the shores of Marina Beach to the misty Nilgiris, we design trips that let you slow down, eat well and see the real South India."
          />
          <div className="mmt-feature-row">
            {aboutFeatures.map((f) => (
              <div className="mmt-feature" key={f.title}>
                <div className="mmt-feature-head">
                  <span className="mmt-feature-icon"><i className={f.icon} /></span>
                  <h4>{f.title}</h4>
                </div>
                <p>{f.text}</p>
              </div>
            ))}
          </div>
          <div className="mmt-about-bottom">
            <div className="mmt-award">
              <i className="fa-solid fa-trophy" />
              <span>Award Winning Agency</span>
            </div>
            <div>
              <ul className="mmt-checks">
                {aboutChecks.map((c) => (
                  <li key={c}><i className="fa-solid fa-circle-check" />{c}</li>
                ))}
              </ul>
              <Link href="/about" className="mmt-btn">Explore More</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FeaturedTours() {
  return (
    <section className="mmt-section mmt-tours">
      <img className="mmt-tours-globe" src={asset("tours-globe")} alt="" />
      <div className="mmt-container">
        <Heading tag="Featured Tours" title="Most Favorite Tour Place" center />
        <div className="mmt-grid-3 mmt-tour-grid">
          {tours.map((t) => (
            <article className="mmt-tour mmt-reveal" key={t.title}>
              <div className="mmt-tour-media">
                <img src={t.image} alt={t.title} loading="lazy" />
                {t.badge && <span className="mmt-tour-badge">{t.badge}</span>}
                <div className="mmt-tour-chips">
                  <span><i className="fa-solid fa-camera" /></span>
                  <span><i className="fa-solid fa-video" /></span>
                </div>
                <WishButton />
              </div>
              <div className="mmt-tour-body">
                <h3><Link href="/tours-page">{t.title}</Link></h3>
                <p>{t.text}</p>
                <div className="mmt-tour-meta">
                  <div className="mmt-tour-rating">
                    {Array.from({ length: 5 }, (_, i) => (
                      <i key={i} className={i < Math.round(t.rating) ? "fa-solid fa-star" : "fa-regular fa-star"} />
                    ))}
                    <span>{t.rating} ({t.reviews} Reviews)</span>
                  </div>
                  <div>
                    <span><i className="fa-solid fa-clock" />{t.duration}</span>
                    <span><i className="fa-solid fa-user-group" />{t.group}</span>
                  </div>
                  <div><span><i className="fa-solid fa-location-dot" />{t.location}</span></div>
                </div>
                <div className="mmt-tour-foot">
                  <TourPrice tour={t} />
                  <Link href="/tours-page" className="mmt-btn blue">Book Now</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TourTypes() {
  return (
    <section className="mmt-types-wrap">
      <div className="mmt-container">
        <div className="mmt-types">
          <svg className="mmt-types-doodle" viewBox="0 0 900 300" fill="none" aria-hidden="true">
            <path d="M-20 180 C 80 60, 160 260, 260 150 S 380 20, 420 90" stroke="#c5cfdd" strokeWidth="2" strokeDasharray="8 8" />
            <path d="M560 10 C 640 120, 760 20, 800 110 S 880 220, 940 160" stroke="#c5cfdd" strokeWidth="2" strokeDasharray="8 8" />
            <circle cx="820" cy="80" r="34" stroke="#c5cfdd" strokeWidth="2" strokeDasharray="6 6" />
          </svg>
          <Heading tag="Service" title={<>Choose Our Tour Types<br />& Enjoy Now</>} center />
          <div className="mmt-types-grid">
            {tourTypes.map((t, i) => (
              <Link href="/tour-types" className={`mmt-type mmt-reveal${i === 1 ? " active" : ""}`} key={t.title}>
                <span className="mmt-type-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="mmt-type-icon"><i className={t.icon} /></span>
                <h4>{t.title}</h4>
                <p>Curated trips planned around what you love.</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function OfferBanner() {
  return (
    <section className="mmt-offer">
      <img className="mmt-offer-bg" src={asset("offer-bg")} alt="" />
      <div className="mmt-container mmt-offer-inner">
        <div className="mmt-offer-text">
          <span className="mmt-script">Special offer for you</span>
          <h2>Let’s Make Your Travel Dreams Come True</h2>
          <p>Get up to 50% off on hand-picked Tamil Nadu packages when you book this season.</p>
          <Link href="/tours-page" className="mmt-btn white">Start Booking</Link>
          <img className="mmt-offer-plane" src={asset("about-plane")} alt="" />
        </div>
        <div className="mmt-offer-art">
          <img className="suitcase" src={asset("offer-suitcase")} alt="" />
          <img className="man" src={asset("offer-man")} alt="Excited traveller with a backpack" loading="lazy" />
          <img className="discount" src={asset("offer-discount")} alt="50% discount" />
        </div>
      </div>
    </section>
  );
}

export function Gallery() {
  return (
    <section className="mmt-gallery" aria-label="Instagram gallery">
      {gallery.map((src, i) => (
        <a href="#" key={src} aria-label={`Gallery photo ${i + 1}`}>
          <img src={src} alt="" loading="lazy" />
        </a>
      ))}
    </section>
  );
}

export function WhyChoose() {
  return (
    <section className="mmt-why">
      <span className="mmt-why-shape" aria-hidden="true" />
      <div className="mmt-container mmt-two-col">
        <div className="mmt-reveal">
          <Heading tag="Why choose us" title={<>Why You Should Choose<br />Our Company</>} />
          <div className="mmt-why-grid">
            {whyChoose.map((w) => (
              <div className="mmt-why-item" key={w.title}>
                <i className={w.icon} />
                <h4>{w.title}</h4>
              </div>
            ))}
          </div>
          <Link href="/about" className="mmt-btn blue">Explore More</Link>
        </div>
        <div className="mmt-why-image mmt-reveal">
          <div className="big"><img src={asset("about-couple")} alt="Travellers exploring together" /></div>
          <div className="small"><img src={asset("tour-hiker")} alt="Hiker enjoying the mountain view" /></div>
        </div>
      </div>
    </section>
  );
}

export function Blog() {
  return (
    <section className="mmt-section" id="news">
      <div className="mmt-container">
        <Heading tag="Articles" title={<>Latest News & Articles from<br />the Blog Posts</>} center />
        <div className="mmt-grid-3 mmt-post-grid">
          {posts.map((p) => (
            <article className="mmt-post mmt-reveal" key={p.title}>
              <div className="mmt-post-media">
                <img src={p.image} alt={p.title} loading="lazy" />
                <span className="mmt-post-date"><b>{p.date}</b> {p.month}</span>
              </div>
              <div className="mmt-post-body">
                <div className="mmt-post-meta">
                  <span><i className="fa-regular fa-circle-user" />admin</span>
                  <span><i className="fa-regular fa-comments" />0 Comments</span>
                </div>
                <h3><a href="#">{p.title}</a></h3>
              </div>
              <a href="#" className="mmt-read-more">Read More <i className="fa-solid fa-arrow-right" /></a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Brands() {
  return (
    <section className="mmt-brands">
      <div className="mmt-container">
        <p className="mmt-brands-title"><span>2k + Brands Trust Us</span></p>
        <div className="mmt-brands-list">
          {brands.map((b, i) => (
            <span className={`mmt-brand${i === 2 ? " active" : ""}`} key={`${b}-${i}`}><i className="fa-solid fa-leaf" />{b}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Promos() {
  return (
    <section className="mmt-promos">
      <div className="mmt-container mmt-promo-grid">
        {promos.map((p) => (
          <div className={`mmt-promo ${p.tone} mmt-reveal`} key={p.title}>
            <div className="mmt-promo-text">
              <span className="mmt-script">{p.tag}</span>
              <h3>{p.title}</h3>
              <Link href="/tours-page" className={`mmt-btn ${p.tone === "blue" ? "" : "white"}`}>Book Now</Link>
            </div>
            <img className="mmt-promo-img" src={p.image} alt="" loading="lazy" />
            {p.tone === "blue" && <img className="mmt-promo-leaf" src={asset("promo-leaf")} alt="" />}
          </div>
        ))}
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="mmt-footer">
      <div className="mmt-container">
        <div className="mmt-footer-top">
          <Logo />
          <div className="mmt-socials">
            <a href="#" aria-label="Facebook"><i className="fa-brands fa-facebook-f" /></a>
            <a href="#" aria-label="X"><i className="fa-brands fa-x-twitter" /></a>
            <a href="#" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in" /></a>
            <a href="#" aria-label="Instagram"><i className="fa-brands fa-instagram" /></a>
          </div>
        </div>
        <div className="mmt-footer-main">
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4>{title}</h4>
              <ul className="mmt-footer-links">
                {links.map((l) => (
                  <li key={l.label}><Link href={l.href}>{l.label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h4>Contact</h4>
            <ul className="mmt-footer-contact">
              <li>{contact.address}</li>
              <li><i className="fa-solid fa-phone" /><a href={`tel:${contact.phone.replace(/\s/g, "")}`}>{contact.phone}</a></li>
              <li><i className="fa-solid fa-envelope" /><a href={`mailto:${contact.email}`}>{contact.email}</a></li>
            </ul>
          </div>
          <div className="mmt-footer-news">
            <h4>Signup for our latest news & articles</h4>
            <Newsletter />
          </div>
        </div>
      </div>
      <div className="mmt-copyright">
        © {new Date().getFullYear()} Copyrights by Madras Modern Tourism LLC. All Rights Reserved
      </div>
    </footer>
  );
}
