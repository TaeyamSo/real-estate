import Image from "next/image";

function FacebookIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
function InstagramIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}
function XIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "For Residents", href: "#residents" },
  { label: "For Owners", href: "#owners" },
  { label: "Available Units", href: "#units" },
  { label: "Reviews", href: "#reviews" },
];

const services = [
  "Tenant Screening",
  "Rent Collection",
  "Maintenance Coordination",
  "Owner Reporting",
  "Lease Management",
  "Vacancy Marketing",
];

const serviceAreas = [
  "Columbus, OH",
  "Hilliard, OH",
  "Grove City, OH",
  "Worthington, OH",
  "Central Ohio",
];

export default function Footer() {
  return (
    <footer style={{ background: "#000d1c", color: "#cbd5e1" }}>
      <div className="max-w-[1300px] mx-auto px-[5%] pt-[70px] pb-[30px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div
              className="rounded-full border-2 overflow-hidden mb-4"
              style={{
                width: 56,
                height: 56,
                borderColor: "#C5A021",
                background: "white",
              }}
            >
              <Image
                src="/newlogo2.png"
                alt="PNE Logo"
                width={56}
                height={56}
                className="object-contain w-full h-full"
              />
            </div>
            <p className="text-sm leading-relaxed mb-3">
              Central Ohio&apos;s premier property management company. Serving
              residents and investors across Columbus, Hilliard, Grove City, and
              Worthington.
            </p>
            <div className="flex gap-3 items-start mb-4">
              <div
                className="flex items-center justify-center flex-shrink-0 font-black text-[0.65rem] tracking-[1px]"
                style={{
                  width: 44,
                  height: 44,
                  border: "2px solid #C5A021",
                  background: "white",
                  color: "#002147",
                }}
              >
                EHO
              </div>
              <p className="text-[0.78rem] leading-relaxed" style={{ color: "#94a3b8" }}>
                PNE Property Management is an Equal Housing Opportunity provider.
                We comply with the Fair Housing Act.
              </p>
            </div>
            <div className="flex gap-3">
              <a
                href="#"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-200 hover:text-[#C5A021]"
                style={{ color: "#cbd5e1" }}
              >
                <FacebookIcon size={18} />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-200 hover:text-[#C5A021]"
                style={{ color: "#cbd5e1" }}
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href="#"
                aria-label="X (Twitter)"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-200 hover:text-[#C5A021]"
                style={{ color: "#cbd5e1" }}
              >
                <XIcon size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5
              className="text-[0.8rem] tracking-[2px] uppercase mb-[18px] font-black"
              style={{ color: "#C5A021" }}
            >
              Quick Links
            </h5>
            <ul className="list-none p-0 m-0">
              {quickLinks.map((link) => (
                <li key={link.href} className="mb-[10px]">
                  <a
                    href={link.href}
                    className="text-sm transition-colors duration-200 hover:text-[#C5A021]"
                    style={{ color: "#cbd5e1", textDecoration: "none" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h5
              className="text-[0.8rem] tracking-[2px] uppercase mb-[18px] font-black"
              style={{ color: "#C5A021" }}
            >
              Services
            </h5>
            <ul className="list-none p-0 m-0">
              {services.map((s) => (
                <li key={s} className="mb-[10px] text-sm">
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5
              className="text-[0.8rem] tracking-[2px] uppercase mb-[18px] font-black"
              style={{ color: "#C5A021" }}
            >
              Contact Us
            </h5>
            <p className="text-sm mb-2">Grove City, Ohio</p>
            <p className="text-sm mb-3">Central Ohio Area</p>
            <h5
              className="text-[0.8rem] tracking-[2px] uppercase mb-3 font-black mt-6"
              style={{ color: "#C5A021" }}
            >
              Service Areas
            </h5>
            <ul className="list-none p-0 m-0">
              {serviceAreas.map((area) => (
                <li key={area} className="mb-[8px] text-sm">
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="pt-6 text-center text-[0.8rem]"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            color: "#64748b",
          }}
        >
          © {new Date().getFullYear()} PNE Property Management. All rights
          reserved. · Equal Housing Opportunity Provider
        </div>
      </div>
    </footer>
  );
}
