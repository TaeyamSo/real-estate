interface ContactSectionProps {
  onContactOpen: (type: "tenant" | "owner") => void;
}

export default function ContactSection({ onContactOpen }: ContactSectionProps) {
  return (
    <section
      style={{
        background: "linear-gradient(135deg, #002147, #000d1c)",
        padding: "50px 5%",
        borderTop: "4px solid #C5A021",
      }}
    >
      <div
        className="max-w-[1200px] mx-auto grid gap-10 items-center"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))" }}
      >
        <div>
          <span
            className="inline-block text-[0.7rem] font-black tracking-[4px] uppercase px-[18px] py-[6px] rounded-full mb-[14px]"
            style={{ background: "#C5A021", color: "#002147" }}
          >
            Get In Touch
          </span>
          <h2
            className="font-black text-[1.8rem] mb-2"
            style={{ color: "white" }}
          >
            Ready to talk?
          </h2>
          <p className="leading-[1.7]" style={{ color: "rgba(255,255,255,0.75)" }}>
            Whether you&apos;re listing a property or searching for your next home,
            our team replies within one business day.
          </p>
        </div>

        <div className="flex gap-[14px] flex-wrap justify-start lg:justify-end">
          <button
            onClick={() => onContactOpen("owner")}
            className="px-8 py-3 rounded-full font-black text-[0.85rem] tracking-[1px] cursor-pointer transition-all duration-300"
            style={{ background: "#C5A021", color: "#002147", border: "none" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "white";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "#C5A021";
            }}
          >
            I&apos;m a Property Owner
          </button>
          <button
            onClick={() => onContactOpen("tenant")}
            className="px-8 py-3 rounded-full font-bold text-[0.85rem] cursor-pointer transition-all duration-300"
            style={{
              background: "transparent",
              border: "2px solid white",
              color: "white",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "white";
              (e.currentTarget as HTMLButtonElement).style.color = "#002147";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "transparent";
              (e.currentTarget as HTMLButtonElement).style.color = "white";
            }}
          >
            I&apos;m a Tenant
          </button>
        </div>
      </div>
    </section>
  );
}
