"use client";
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EventsHero;
const lucide_react_1 = require("lucide-react");
const image_1 = __importDefault(require("next/image"));
const react_1 = __importStar(require("react"));
const comic_con_jpg_1 = __importDefault(require("@/assets/events/comic-con.jpg"));
const tech_summit_jpg_1 = __importDefault(require("@/assets/events/tech-summit.jpg"));
const arts_fair_jpg_1 = __importDefault(require("@/assets/events/arts-fair.jpg"));
const Navbar_1 = __importDefault(require("../homepage/Navbar"));
const button_1 = require("../ui/button");
const link_1 = __importDefault(require("next/link"));
function EventsHero() {
    const slides = [
        {
            id: 1,
            src: comic_con_jpg_1.default,
            alt: "Comic con",
            link: "https://www.tketnation.com/nwcc25",
            title: "Comic Con 2025",
            subtitle: "Discover one of the biggest comic conventions in Nigeria, where all geek culture collide.",
        },
        {
            id: 2,
            src: tech_summit_jpg_1.default,
            alt: "tech summit",
            link: "",
            title: "Tech Innovation Summit 2025",
            subtitle: "Join industry leaders to explore the latest in technology and innovation.",
        },
        {
            id: 3,
            src: arts_fair_jpg_1.default,
            alt: "arts fair",
            link: "",
            title: "Arts & Crafts Fair 2025",
            subtitle: "Showcase your talents and discover new art at our annual fair!",
        },
    ];
    const [currentSlide, setCurrentSlide] = (0, react_1.useState)(0);
    const [isPlaying, setIsPlaying] = (0, react_1.useState)(true);
    const [progress, setProgress] = (0, react_1.useState)(0);
    const SLIDE_DURATION = 5000; // 5 seconds per slide
    const nextSlide = (0, react_1.useCallback)(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, [slides.length]);
    const prevSlide = (0, react_1.useCallback)(() => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }, [slides.length]);
    const goToSlide = (0, react_1.useCallback)((index) => {
        setCurrentSlide(index);
    }, []);
    (0, react_1.useEffect)(() => {
        if (!isPlaying)
            return;
        setProgress(0);
        const startTime = Date.now();
        const timer = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const progressPercent = (elapsed / SLIDE_DURATION) * 100;
            if (progressPercent >= 100) {
                nextSlide();
                return;
            }
            setProgress(progressPercent);
        }, 50);
        return () => clearInterval(timer);
    }, [currentSlide, isPlaying, nextSlide]);
    // Keyboard navigation
    (0, react_1.useEffect)(() => {
        const handleKeyPress = (e) => {
            if (e.key === "ArrowLeft") {
                e.preventDefault();
                prevSlide();
            }
            if (e.key === "ArrowRight") {
                e.preventDefault();
                nextSlide();
            }
            if (e.key === " ") {
                e.preventDefault();
                setIsPlaying(!isPlaying);
            }
        };
        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [nextSlide, prevSlide, isPlaying]);
    return (<header data-testid="event-hero">
      <div className="relative h-[95vh] w-full overflow-hidden" data-testid="hero-slideshow">
        {/* Background Images */}
        <div className="absolute inset-0">
          {slides.map((slide, index) => (<div key={slide.id} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100" : "opacity-0"}`}>
              <image_1.default width={1600} height={1052} src={slide.src} alt={slide.alt} className="h-full w-full object-cover" loading={index === 0 ? "eager" : "lazy"}/>
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,13,13,0)_0%,#0D0D0D_63%)]"/>
            </div>))}
        </div>
        {/* Content Overlay */}
        <>
          <Navbar_1.default />
          <div className="relative z-10 flex h-full items-end -mt-24">
            <div className="container mx-auto flex flex-col items-center text-white md:text-center px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl flex flex-col gap-6 md:items-center max-md:items-start px-7">
                <p className="bg-nerd-blue text-white text-center max-md:text-[13px] rounded-[20px] px-5 py-1.5 font-medium">
                  {slides[currentSlide].title} is here, Register now
                </p>
                <h1 className="md:text-[52px] max-md:text-[32px] font-obostar tracking-tight text-white animate-fade-in" key={`title-${currentSlide}`}>
                  {slides[currentSlide].title}
                </h1>
                <p className="animate-fade-in delay-200 max-md::text-sm font-semibold" key={`subtitle-${currentSlide}`}>
                  {slides[currentSlide].subtitle}
                </p>
                <div className="flex gap-4 justify-center">
                  {slides[currentSlide].link == "" ? (<button_1.Button variant={"primary"} disabled className="disabled:cursor-not-allowed w-fit">
                      Coming Soon
                    </button_1.Button>) : (<link_1.default target="_blank" href={`${slides[currentSlide].link}`}>
                      <button_1.Button variant={"primary"}>Register</button_1.Button>
                    </link_1.default>)}
                  <link_1.default href={"#events"}>
                    <button_1.Button>See all Events</button_1.Button>
                  </link_1.default>
                </div>
              </div>
            </div>
          </div>
        </>
        {/* Navigation Arrows */}
        <button onClick={prevSlide} className="absolute max-sm:hidden left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white backdrop-blur-sm transition-all hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50" aria-label="Previous slide" data-testid="previous-slide">
          <lucide_react_1.ChevronLeft className="h-6 w-6"/>
        </button>
        <button onClick={nextSlide} className="absolute max-sm:hidden right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white backdrop-blur-sm transition-all hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50" aria-label="Next slide" data-testid="next-slide">
          <lucide_react_1.ChevronRight className="h-6 w-6"/>
        </button>
        {/* Play/Pause Button */}
        <button onClick={() => setIsPlaying(!isPlaying)} className="absolute max-sm:hidden bottom-20 left-4 z-20 rounded-full bg-white/20 p-3 text-white backdrop-blur-sm transition-all hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 sm:bottom-8" aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}>
          {isPlaying ? (<lucide_react_1.Pause className="h-5 w-5"/>) : (<lucide_react_1.Play className="h-5 w-5"/>)}
        </button>
        {/* Progress Bars */}
        <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 space-x-2">
          {slides.map((_, index) => (<button key={index} onClick={() => goToSlide(index)} className="group relative h-1 w-16 overflow-hidden rounded-full bg-white/30 transition-all hover:bg-white/40 focus:outline-none focus:ring-2 focus:ring-white/50" aria-label={`Go to slide ${index + 1}`}>
              {/* Background bar */}
              <div className="absolute inset-0 bg-white/30"/>
              {/* Progress bar */}
              <div className={`absolute left-0 top-0 h-full bg-white transition-all duration-75 ease-linear ${index === currentSlide ? "opacity-100" : "opacity-60"}`} style={{
                width: index === currentSlide
                    ? `${progress}%`
                    : index < currentSlide
                        ? "100%"
                        : "0%",
            }}/>
              {/* Hover effect */}
              <div className="absolute inset-0 scale-0 bg-white/20 transition-transform group-hover:scale-100"/>
            </button>))}
        </div>
        {/* Slide Indicators (dots) */}
        <div className="absolute max-md:hidden bottom-20 right-4 z-20 flex flex-col space-y-2 sm:bottom-8">
          {slides.map((_, index) => (<button key={index} onClick={() => goToSlide(index)} className={`h-3 w-3 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-white/50 ${index === currentSlide
                ? "bg-white scale-125"
                : "bg-white/50 hover:bg-white/70"}`} aria-label={`Go to slide ${index + 1}`}/>))}
        </div>
      </div>
    </header>);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSGVyby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkhlcm8udHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFXYiw2QkE2T0M7QUF2UEQsK0NBQXNFO0FBQ3RFLHVEQUErQjtBQUMvQiwrQ0FBZ0U7QUFDaEUsa0ZBQXFEO0FBQ3JELHNGQUF5RDtBQUN6RCxrRkFBcUQ7QUFDckQsZ0VBQXdDO0FBQ3hDLHlDQUFzQztBQUN0QyxxREFBNkI7QUFFN0IsU0FBd0IsVUFBVTtJQUNoQyxNQUFNLE1BQU0sR0FBRztRQUNiO1lBQ0UsRUFBRSxFQUFFLENBQUM7WUFDTCxHQUFHLEVBQUUsdUJBQVE7WUFDYixHQUFHLEVBQUUsV0FBVztZQUNoQixJQUFJLEVBQUUsbUNBQW1DO1lBQ3pDLEtBQUssRUFBRSxnQkFBZ0I7WUFDdkIsUUFBUSxFQUNOLDJGQUEyRjtTQUM5RjtRQUNEO1lBQ0UsRUFBRSxFQUFFLENBQUM7WUFDTCxHQUFHLEVBQUUseUJBQVU7WUFDZixHQUFHLEVBQUUsYUFBYTtZQUNsQixJQUFJLEVBQUUsRUFBRTtZQUNSLEtBQUssRUFBRSw2QkFBNkI7WUFDcEMsUUFBUSxFQUNOLDJFQUEyRTtTQUM5RTtRQUNEO1lBQ0UsRUFBRSxFQUFFLENBQUM7WUFDTCxHQUFHLEVBQUUsdUJBQVE7WUFDYixHQUFHLEVBQUUsV0FBVztZQUNoQixJQUFJLEVBQUUsRUFBRTtZQUNSLEtBQUssRUFBRSx5QkFBeUI7WUFDaEMsUUFBUSxFQUNOLGdFQUFnRTtTQUNuRTtLQUNGLENBQUM7SUFFRixNQUFNLENBQUMsWUFBWSxFQUFFLGVBQWUsQ0FBQyxHQUFHLElBQUEsZ0JBQVEsRUFBQyxDQUFDLENBQUMsQ0FBQztJQUNwRCxNQUFNLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQyxHQUFHLElBQUEsZ0JBQVEsRUFBQyxJQUFJLENBQUMsQ0FBQztJQUNqRCxNQUFNLENBQUMsUUFBUSxFQUFFLFdB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TDtRQUFBLENBQUMsNkJBQTZCLENBQzlCO1FBQUEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLG1GQUFtRixDQUNoRztVQUFBLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQ3hCLENBQUMsTUFBTSxDQUNMLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUNYLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUNoQyxTQUFTLENBQUMsQ0FBQywyRkFDVCxLQUFLLEtBQUssWUFBWTtnQkFDcEIsQ0FBQyxDQUFDLG9CQUFvQjtnQkFDdEIsQ0FBQyxDQUFDLCtCQUNOLEVBQUUsQ0FBQyxDQUNILFVBQVUsQ0FBQyxDQUFDLGVBQWUsS0FBSyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQ3ZDLENBQ0gsQ0FBQyxDQUNKO1FBQUEsRUFBRSxHQUFHLENBQ1A7TUFBQSxFQUFFLEdBQUcsQ0FDUDtJQUFBLEVBQUUsTUFBTSxDQUFDLENBQ1YsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBjbGllbnRcIjtcclxuaW1wb3J0IHsgQ2hldnJvbkxlZnQsIENoZXZyb25SaWdodCwgUGF1c2UsIFBsYXkgfSBmcm9tIFwibHVjaWRlLXJlYWN0XCI7XHJcbmltcG9ydCBJbWFnZSBmcm9tIFwibmV4dC9pbWFnZVwiO1xyXG5pbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IENvbWljQ29uIGZyb20gXCJAL2Fzc2V0cy9ldmVudHMvY29taWMtY29uLmpwZ1wiO1xyXG5pbXBvcnQgVGVjaFN1bW1pdCBmcm9tIFwiQC9hc3NldHMvZXZlbnRzL3RlY2gtc3VtbWl0LmpwZ1wiO1xyXG5pbXBvcnQgQXJ0c0ZhaXIgZnJvbSBcIkAvYXNzZXRzL2V2ZW50cy9hcnRzLWZhaXIuanBnXCI7XHJcbmltcG9ydCBOYXZiYXIgZnJvbSBcIi4uL2hvbWVwYWdlL05hdmJhclwiO1xyXG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tIFwiLi4vdWkvYnV0dG9uXCI7XHJcbmltcG9ydCBMaW5rIGZyb20gXCJuZXh0L2xpbmtcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEV2ZW50c0hlcm8oKSB7XHJcbiAgY29uc3Qgc2xpZGVzID0gW1xyXG4gICAge1xyXG4gICAgICBpZDogMSxcclxuICAgICAgc3JjOiBDb21pY0NvbixcclxuICAgICAgYWx0OiBcIkNvbWljIGNvblwiLFxyXG4gICAgICBsaW5rOiBcImh0dHBzOi8vd3d3LnRrZXRuYXRpb24uY29tL253Y2MyNVwiLFxyXG4gICAgICB0aXRsZTogXCJDb21pYyBDb24gMjAyNVwiLFxyXG4gICAgICBzdWJ0aXRsZTpcclxuICAgICAgICBcIkRpc2NvdmVyIG9uZSBvZiB0aGUgYmlnZ2VzdCBjb21pYyBjb252ZW50aW9ucyBpbiBOaWdlcmlhLCB3aGVyZSBhbGwgZ2VlayBjdWx0dXJlIGNvbGxpZGUuXCIsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogMixcclxuICAgICAgc3JjOiBUZWNoU3VtbWl0LFxyXG4gICAgICBhbHQ6IFwidGVjaCBzdW1taXRcIixcclxuICAgICAgbGluazogXCJcIixcclxuICAgICAgdGl0bGU6IFwiVGVjaCBJbm5vdmF0aW9uIFN1bW1pdCAyMDI1XCIsXHJcbiAgICAgIHN1YnRpdGxlOlxyXG4gICAgICAgIFwiSm9pbiBpbmR1c3RyeSBsZWFkZXJzIHRvIGV4cGxvcmUgdGhlIGxhdGVzdCBpbiB0ZWNobm9sb2d5IGFuZCBpbm5vdmF0aW9uLlwiLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6IDMsXHJcbiAgICAgIHNyYzogQXJ0c0ZhaXIsXHJcbiAgICAgIGFsdDogXCJhcnRzIGZhaXJcIixcclxuICAgICAgbGluazogXCJcIixcclxuICAgICAgdGl0bGU6IFwiQXJ0cyAmIENyYWZ0cyBGYWlyIDIwMjVcIixcclxuICAgICAgc3VidGl0bGU6XHJcbiAgICAgICAgXCJTaG93Y2FzZSB5b3VyIHRhbGVudHMgYW5kIGRpc2NvdmVyIG5ldyBhcnQgYXQgb3VyIGFubnVhbCBmYWlyIVwiLFxyXG4gICAgfSxcclxuICBdO1xyXG5cclxuICBjb25zdCBbY3VycmVudFNsaWRlLCBzZXRDdXJyZW50U2xpZGVdID0gdXNlU3RhdGUoMCk7XHJcbiAgY29uc3QgW2lzUGxheWluZywgc2V0SXNQbGF5aW5nXSA9IHVzZVN0YXRlKHRydWUpO1xyXG4gIGNvbnN0IFtwcm9ncmVzcywgc2V0UHJvZ3Jlc3NdID0gdXNlU3RhdGUoMCk7XHJcblxyXG4gIGNvbnN0IFNMSURFX0RVUkFUSU9OID0gNTAwMDsgLy8gNSBzZWNvbmRzIHBlciBzbGlkZVxyXG5cclxuICBjb25zdCBuZXh0U2xpZGUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBzZXRDdXJyZW50U2xpZGUoKHByZXYpID0+IChwcmV2ICsgMSkgJSBzbGlkZXMubGVuZ3RoKTtcclxuICB9LCBbc2xpZGVzLmxlbmd0aF0pO1xyXG5cclxuICBjb25zdCBwcmV2U2xpZGUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBzZXRDdXJyZW50U2xpZGUoKHByZXYpID0+IChwcmV2IC0gMSArIHNsaWRlcy5sZW5ndGgpICUgc2xpZGVzLmxlbmd0aCk7XHJcbiAgfSwgW3NsaWRlcy5sZW5ndGhdKTtcclxuXHJcbiAgY29uc3QgZ29Ub1NsaWRlID0gdXNlQ2FsbGJhY2soKGluZGV4OiBudW1iZXIpID0+IHtcclxuICAgIHNldEN1cnJlbnRTbGlkZShpbmRleCk7XHJcbiAgfSwgW10pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFpc1BsYXlpbmcpIHJldHVybjtcclxuICAgIHNldFByb2dyZXNzKDApO1xyXG5cclxuICAgIGNvbnN0IHN0YXJ0VGltZSA9IERhdGUubm93KCk7XHJcbiAgICBjb25zdCB0aW1lciA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgY29uc3QgZWxhcHNlZCA9IERhdGUubm93KCkgLSBzdGFydFRpbWU7XHJcbiAgICAgIGNvbnN0IHByb2dyZXNzUGVyY2VudCA9IChlbGFwc2VkIC8gU0xJREVfRFVSQVRJT04pICogMTAwO1xyXG5cclxuICAgICAgaWYgKHByb2dyZXNzUGVyY2VudCA+PSAxMDApIHtcclxuICAgICAgICBuZXh0U2xpZGUoKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgc2V0UHJvZ3Jlc3MocHJvZ3Jlc3NQZXJjZW50KTtcclxuICAgIH0sIDUwKTtcclxuXHJcbiAgICByZXR1cm4gKCkgPT4gY2xlYXJJbnRlcnZhbCh0aW1lcik7XHJcbiAgfSwgW2N1cnJlbnRTbGlkZSwgaXNQbGF5aW5nLCBuZXh0U2xpZGVdKTtcclxuXHJcbiAgLy8gS2V5Ym9hcmQgbmF2aWdhdGlvblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBoYW5kbGVLZXlQcmVzcyA9IChlOiBLZXlib2FyZEV2ZW50KSA9PiB7XHJcbiAgICAgIGlmIChlLmtleSA9PT0gXCJBcnJvd0xlZnRcIikge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBwcmV2U2xpZGUoKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoZS5rZXkgPT09IFwiQXJyb3dSaWdodFwiKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIG5leHRTbGlkZSgpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChlLmtleSA9PT0gXCIgXCIpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgc2V0SXNQbGF5aW5nKCFpc1BsYXlpbmcpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBoYW5kbGVLZXlQcmVzcyk7XHJcbiAgICByZXR1cm4gKCkgPT4gd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGhhbmRsZUtleVByZXNzKTtcclxuICB9LCBbbmV4dFNsaWRlLCBwcmV2U2xpZGUsIGlzUGxheWluZ10pO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGhlYWRlciBkYXRhLXRlc3RpZD1cImV2ZW50LWhlcm9cIj5cclxuICAgICAgPGRpdlxyXG4gICAgICAgIGNsYXNzTmFtZT1cInJlbGF0aXZlIGgtWzk1dmhdIHctZnVsbCBvdmVyZmxvdy1oaWRkZW5cIlxyXG4gICAgICAgIGRhdGEtdGVzdGlkPVwiaGVyby1zbGlkZXNob3dcIlxyXG4gICAgICA+XHJcbiAgICAgICAgey8qIEJhY2tncm91bmQgSW1hZ2VzICovfVxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMFwiPlxyXG4gICAgICAgICAge3NsaWRlcy5tYXAoKHNsaWRlLCBpbmRleCkgPT4gKFxyXG4gICAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgICAga2V5PXtzbGlkZS5pZH1cclxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2BhYnNvbHV0ZSBpbnNldC0wIHRyYW5zaXRpb24tb3BhY2l0eSBkdXJhdGlvbi0xMDAwIGVhc2UtaW4tb3V0ICR7XHJcbiAgICAgICAgICAgICAgICBpbmRleCA9PT0gY3VycmVudFNsaWRlID8gXCJvcGFjaXR5LTEwMFwiIDogXCJvcGFjaXR5LTBcIlxyXG4gICAgICAgICAgICAgIH1gfVxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgPEltYWdlXHJcbiAgICAgICAgICAgICAgICB3aWR0aD17MTYwMH1cclxuICAgICAgICAgICAgICAgIGhlaWdodD17MTA1Mn1cclxuICAgICAgICAgICAgICAgIHNyYz17c2xpZGUuc3JjfVxyXG4gICAgICAgICAgICAgICAgYWx0PXtzbGlkZS5hbHR9XHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJoLWZ1bGwgdy1mdWxsIG9iamVjdC1jb3ZlclwiXHJcbiAgICAgICAgICAgICAgICBsb2FkaW5nPXtpbmRleCA9PT0gMCA/IFwiZWFnZXJcIiA6IFwibGF6eVwifVxyXG4gICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgey8qIEdyYWRpZW50IE92ZXJsYXkgKi99XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIGJnLVtsaW5lYXItZ3JhZGllbnQoMTgwZGVnLHJnYmEoMTMsMTMsMTMsMClfMCUsIzBEMEQwRF82MyUpXVwiIC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgKSl9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgey8qIENvbnRlbnQgT3ZlcmxheSAqL31cclxuICAgICAgICA8PlxyXG4gICAgICAgICAgPE5hdmJhciAvPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSB6LTEwIGZsZXggaC1mdWxsIGl0ZW1zLWVuZCAtbXQtMjRcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXIgbXgtYXV0byBmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciB0ZXh0LXdoaXRlIG1kOnRleHQtY2VudGVyIHB4LTQgc206cHgtNiBsZzpweC04XCI+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYXgtdy0zeGwgZmxleCBmbGV4LWNvbCBnYXAtNiBtZDppdGVtcy1jZW50ZXIgbWF4LW1kOml0ZW1zLXN0YXJ0IHB4LTdcIj5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImJnLW5lcmQtYmx1ZSB0ZXh0LXdoaXRlIHRleHQtY2VudGVyIG1heC1tZDp0ZXh0LVsxM3B4XSByb3VuZGVkLVsyMHB4XSBweC01IHB5LTEuNSBmb250LW1lZGl1bVwiPlxyXG4gICAgICAgICAgICAgICAgICB7c2xpZGVzW2N1cnJlbnRTbGlkZV0udGl0bGV9IGlzIGhlcmUsIFJlZ2lzdGVyIG5vd1xyXG4gICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgPGgxXHJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1kOnRleHQtWzUycHhdIG1heC1tZDp0ZXh0LVszMnB4XSBmb250LW9ib3N0YXIgdHJhY2tpbmctdGlnaHQgdGV4dC13aGl0ZSBhbmltYXRlLWZhZGUtaW5cIlxyXG4gICAgICAgICAgICAgICAgICBrZXk9e2B0aXRsZS0ke2N1cnJlbnRTbGlkZX1gfVxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICB7c2xpZGVzW2N1cnJlbnRTbGlkZV0udGl0bGV9XHJcbiAgICAgICAgICAgICAgICA8L2gxPlxyXG4gICAgICAgICAgICAgICAgPHBcclxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYW5pbWF0ZS1mYWRlLWluIGRlbGF5LTIwMCBtYXgtbWQ6OnRleHQtc20gZm9udC1zZW1pYm9sZFwiXHJcbiAgICAgICAgICAgICAgICAgIGtleT17YHN1YnRpdGxlLSR7Y3VycmVudFNsaWRlfWB9XHJcbiAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgIHtzbGlkZXNbY3VycmVudFNsaWRlXS5zdWJ0aXRsZX1cclxuICAgICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBnYXAtNCBqdXN0aWZ5LWNlbnRlclwiPlxyXG4gICAgICAgICAgICAgICAgICB7c2xpZGVzW2N1cnJlbnRTbGlkZV0ubGluayA9PSBcIlwiID8gKFxyXG4gICAgICAgICAgICAgICAgICAgIDxCdXR0b25cclxuICAgICAgICAgICAgICAgICAgICAgIHZhcmlhbnQ9e1wicHJpbWFyeVwifVxyXG4gICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWRcclxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImRpc2FibGVkOmN1cnNvci1ub3QtYWxsb3dlZCB3LWZpdFwiXHJcbiAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgQ29taW5nIFNvb25cclxuICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgKSA6IChcclxuICAgICAgICAgICAgICAgICAgICA8TGluayB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPXtgJHtzbGlkZXNbY3VycmVudFNsaWRlXS5saW5rfWB9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiB2YXJpYW50PXtcInByaW1hcnlcIn0+UmVnaXN0ZXI8L0J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8L0xpbms+XHJcbiAgICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICAgIDxMaW5rIGhyZWY9e1wiI2V2ZW50c1wifT5cclxuICAgICAgICAgICAgICAgICAgICA8QnV0dG9uPlNlZSBhbGwgRXZlbnRzPC9CdXR0b24+XHJcbiAgICAgICAgICAgICAgICAgIDwvTGluaz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvPlxyXG4gICAgICAgIHsvKiBOYXZpZ2F0aW9uIEFycm93cyAqL31cclxuICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICBvbkNsaWNrPXtwcmV2U2xpZGV9XHJcbiAgICAgICAgICBjbGFzc05hbWU9XCJhYnNvbHV0ZSBtYXgtc206aGlkZGVuIGxlZnQtNCB0b3AtMS8yIHotMjAgLXRyYW5zbGF0ZS15LTEvMiByb3VuZGVkLWZ1bGwgYmctd2hpdGUvMjAgcC0zIHRleHQtd2hpdGUgYmFja2Ryb3AtYmx1ci1zbSB0cmFuc2l0aW9uLWFsbCBob3ZlcjpiZy13aGl0ZS8zMCBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctd2hpdGUvNTBcIlxyXG4gICAgICAgICAgYXJpYS1sYWJlbD1cIlByZXZpb3VzIHNsaWRlXCJcclxuICAgICAgICAgIGRhdGEtdGVzdGlkPVwicHJldmlvdXMtc2xpZGVcIlxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxDaGV2cm9uTGVmdCBjbGFzc05hbWU9XCJoLTYgdy02XCIgLz5cclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICBvbkNsaWNrPXtuZXh0U2xpZGV9XHJcbiAgICAgICAgICBjbGFzc05hbWU9XCJhYnNvbHV0ZSBtYXgtc206aGlkZGVuIHJpZ2h0LTQgdG9wLTEvMiB6LTIwIC10cmFuc2xhdGUteS0xLzIgcm91bmRlZC1mdWxsIGJnLXdoaXRlLzIwIHAtMyB0ZXh0LXdoaXRlIGJhY2tkcm9wLWJsdXItc20gdHJhbnNpdGlvbi1hbGwgaG92ZXI6Ymctd2hpdGUvMzAgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLXdoaXRlLzUwXCJcclxuICAgICAgICAgIGFyaWEtbGFiZWw9XCJOZXh0IHNsaWRlXCJcclxuICAgICAgICAgIGRhdGEtdGVzdGlkPVwibmV4dC1zbGlkZVwiXHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPENoZXZyb25SaWdodCBjbGFzc05hbWU9XCJoLTYgdy02XCIgLz5cclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICB7LyogUGxheS9QYXVzZSBCdXR0b24gKi99XHJcbiAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0SXNQbGF5aW5nKCFpc1BsYXlpbmcpfVxyXG4gICAgICAgICAgY2xhc3NOYW1lPVwiYWJzb2x1dGUgbWF4LXNtOmhpZGRlbiBib3R0b20tMjAgbGVmdC00IHotMjAgcm91bmRlZC1mdWxsIGJnLXdoaXRlLzIwIHAtMyB0ZXh0LXdoaXRlIGJhY2tkcm9wLWJsdXItc20gdHJhbnNpdGlvbi1hbGwgaG92ZXI6Ymctd2hpdGUvMzAgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLXdoaXRlLzUwIHNtOmJvdHRvbS04XCJcclxuICAgICAgICAgIGFyaWEtbGFiZWw9e2lzUGxheWluZyA/IFwiUGF1c2Ugc2xpZGVzaG93XCIgOiBcIlBsYXkgc2xpZGVzaG93XCJ9XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAge2lzUGxheWluZyA/IChcclxuICAgICAgICAgICAgPFBhdXNlIGNsYXNzTmFtZT1cImgtNSB3LTVcIiAvPlxyXG4gICAgICAgICAgKSA6IChcclxuICAgICAgICAgICAgPFBsYXkgY2xhc3NOYW1lPVwiaC01IHctNVwiIC8+XHJcbiAgICAgICAgICApfVxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIHsvKiBQcm9ncmVzcyBCYXJzICovfVxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgYm90dG9tLTggbGVmdC0xLzIgei0yMCBmbGV4IC10cmFuc2xhdGUteC0xLzIgc3BhY2UteC0yXCI+XHJcbiAgICAgICAgICB7c2xpZGVzLm1hcCgoXywgaW5kZXgpID0+IChcclxuICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgIGtleT17aW5kZXh9XHJcbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gZ29Ub1NsaWRlKGluZGV4KX1cclxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJncm91cCByZWxhdGl2ZSBoLTEgdy0xNiBvdmVyZmxvdy1oaWRkZW4gcm91bmRlZC1mdWxsIGJnLXdoaXRlLzMwIHRyYW5zaXRpb24tYWxsIGhvdmVyOmJnLXdoaXRlLzQwIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy13aGl0ZS81MFwiXHJcbiAgICAgICAgICAgICAgYXJpYS1sYWJlbD17YEdvIHRvIHNsaWRlICR7aW5kZXggKyAxfWB9XHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICB7LyogQmFja2dyb3VuZCBiYXIgKi99XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIGJnLXdoaXRlLzMwXCIgLz5cclxuICAgICAgICAgICAgICB7LyogUHJvZ3Jlc3MgYmFyICovfVxyXG4gICAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGFic29sdXRlIGxlZnQtMCB0b3AtMCBoLWZ1bGwgYmctd2hpdGUgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tNzUgZWFzZS1saW5lYXIgJHtcclxuICAgICAgICAgICAgICAgICAgaW5kZXggPT09IGN1cnJlbnRTbGlkZSA/IFwib3BhY2l0eS0xMDBcIiA6IFwib3BhY2l0eS02MFwiXHJcbiAgICAgICAgICAgICAgICB9YH1cclxuICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgIHdpZHRoOlxyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID09PSBjdXJyZW50U2xpZGVcclxuICAgICAgICAgICAgICAgICAgICAgID8gYCR7cHJvZ3Jlc3N9JWBcclxuICAgICAgICAgICAgICAgICAgICAgIDogaW5kZXggPCBjdXJyZW50U2xpZGVcclxuICAgICAgICAgICAgICAgICAgICAgID8gXCIxMDAlXCJcclxuICAgICAgICAgICAgICAgICAgICAgIDogXCIwJVwiLFxyXG4gICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgIHsvKiBIb3ZlciBlZmZlY3QgKi99XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIHNjYWxlLTAgYmctd2hpdGUvMjAgdHJhbnNpdGlvbi10cmFuc2Zvcm0gZ3JvdXAtaG92ZXI6c2NhbGUtMTAwXCIgLz5cclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICApKX1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICB7LyogU2xpZGUgSW5kaWNhdG9ycyAoZG90cykgKi99XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBtYXgtbWQ6aGlkZGVuIGJvdHRvbS0yMCByaWdodC00IHotMjAgZmxleCBmbGV4LWNvbCBzcGFjZS15LTIgc206Ym90dG9tLThcIj5cclxuICAgICAgICAgIHtzbGlkZXMubWFwKChfLCBpbmRleCkgPT4gKFxyXG4gICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAga2V5PXtpbmRleH1cclxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBnb1RvU2xpZGUoaW5kZXgpfVxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YGgtMyB3LTMgcm91bmRlZC1mdWxsIHRyYW5zaXRpb24tYWxsIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy13aGl0ZS81MCAke1xyXG4gICAgICAgICAgICAgICAgaW5kZXggPT09IGN1cnJlbnRTbGlkZVxyXG4gICAgICAgICAgICAgICAgICA/IFwiYmctd2hpdGUgc2NhbGUtMTI1XCJcclxuICAgICAgICAgICAgICAgICAgOiBcImJnLXdoaXRlLzUwIGhvdmVyOmJnLXdoaXRlLzcwXCJcclxuICAgICAgICAgICAgICB9YH1cclxuICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtgR28gdG8gc2xpZGUgJHtpbmRleCArIDF9YH1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICkpfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvaGVhZGVyPlxyXG4gICk7XHJcbn1cclxuIl19