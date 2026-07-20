"use client";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full border-t border-[#2A2A2A] bg-[#0A0A0A]">
      <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-8 py-8">

        {/* Desktop */}
        <div className="hidden sm:flex items-center justify-between">
          {/* Left */}
          <p className="text-[14px] font-normal text-[#A1A1AA] font-geist">
            © 2026 MD Mannan Sarder. All rights reserved.
          </p>

          {/* Center */}
          <p className="text-[14px] font-medium text-white font-geist text-center">
            Designed &amp; Developed by{" "}
            <span
              className="text-violet-400"
              style={{ transition: "text-shadow 0.3s ease" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.textShadow =
                  "0 0 12px rgba(139,92,246,0.7)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.textShadow = "none";
              }}
            >
              MD Mannan Sarder
            </span>
          </p>

          {/* Right */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-[18px] py-3 rounded-xl border border-[#2A2A2A] bg-transparent text-[14px] font-medium text-[#A1A1AA] font-geist cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
            style={{ transition: "border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease" }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.borderColor = "#8B5CF6";
              el.style.transform = "translateY(-2px)";
              el.style.boxShadow = "0 0 12px rgba(139,92,246,0.25)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.borderColor = "#2A2A2A";
              el.style.transform = "translateY(0)";
              el.style.boxShadow = "none";
            }}
            aria-label="Back to top"
          >
            ↑ Back to Top
          </button>
        </div>

        {/* Mobile */}
        <div className="flex sm:hidden flex-col items-center gap-4 text-center">
          <p className="text-[14px] font-normal text-[#A1A1AA] font-geist">
            © 2026 MD Mannan Sarder. All rights reserved.
          </p>
          <p className="text-[14px] font-medium text-white font-geist">
            Designed &amp; Developed by{" "}
            <span className="text-violet-400">MD Mannan Sarder</span>
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-[18px] py-3 rounded-xl border border-[#2A2A2A] bg-transparent text-[14px] font-medium text-[#A1A1AA] font-geist cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
            style={{ transition: "border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease" }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.borderColor = "#8B5CF6";
              el.style.transform = "translateY(-2px)";
              el.style.boxShadow = "0 0 12px rgba(139,92,246,0.25)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.borderColor = "#2A2A2A";
              el.style.transform = "translateY(0)";
              el.style.boxShadow = "none";
            }}
            aria-label="Back to top"
          >
            ↑ Back to Top
          </button>
        </div>

      </div>
    </footer>
  );
}
