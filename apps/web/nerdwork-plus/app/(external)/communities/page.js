"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Communities;
const Footer_1 = __importDefault(require("@/components/homepage/Footer"));
const Navbar_1 = __importDefault(require("@/components/homepage/Navbar"));
const accordion_1 = require("@/components/ui/accordion");
const input_1 = require("@/components/ui/input");
const lucide_react_1 = require("lucide-react");
const link_1 = __importDefault(require("next/link"));
const react_1 = __importDefault(require("react"));
const pop_culture_jpg_1 = __importDefault(require("@/assets/community/pop-culture.jpg"));
const games_jpg_1 = __importDefault(require("@/assets/community/games.jpg"));
const comics_jpg_1 = __importDefault(require("@/assets/community/comics.jpg"));
const anime_jpg_1 = __importDefault(require("@/assets/community/anime.jpg"));
const books_jpg_1 = __importDefault(require("@/assets/community/books.jpg"));
const movies_jpg_1 = __importDefault(require("@/assets/community/movies.jpg"));
const image_1 = __importDefault(require("next/image"));
const communities = [
    {
        id: 1,
        name: "Pop Culture",
        src: pop_culture_jpg_1.default,
        members: 2000,
        desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi animi fuga officiis aliquam ullam, porro veniam, unde dolore labore quas nemo impedit repellendus",
        discord: "",
        whatsapp: "",
        telegram: "",
    },
    {
        id: 2,
        name: "Video Games",
        src: games_jpg_1.default,
        members: 2000,
        desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi animi fuga officiis aliquam ullam, porro veniam, unde dolore labore quas nemo impedit repellendus",
        discord: "",
        whatsapp: "",
        telegram: "",
    },
    {
        id: 3,
        name: "Comics",
        src: comics_jpg_1.default,
        members: 2000,
        desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi animi fuga officiis aliquam ullam, porro veniam, unde dolore labore quas nemo impedit repellendus",
        discord: "",
        whatsapp: "",
        telegram: "",
    },
    {
        id: 4,
        name: "Anime",
        src: anime_jpg_1.default,
        members: 2000,
        desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi animi fuga officiis aliquam ullam, porro veniam, unde dolore labore quas nemo impedit repellendus",
        discord: "",
        whatsapp: "",
        telegram: "",
    },
    {
        id: 5,
        name: "Books",
        src: books_jpg_1.default,
        members: 2000,
        desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi animi fuga officiis aliquam ullam, porro veniam, unde dolore labore quas nemo impedit repellendus",
        discord: "",
        whatsapp: "",
        telegram: "",
    },
    {
        id: 6,
        name: "Movies",
        src: movies_jpg_1.default,
        members: 2000,
        desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi animi fuga officiis aliquam ullam, porro veniam, unde dolore labore quas nemo impedit repellendus",
        discord: "",
        whatsapp: "",
        telegram: "",
    },
];
function Communities() {
    return (<main className="bg-[#0D0D0D] text-white">
      <Navbar_1.default />
      <section className="max-w-[1130px] mx-auto w-full font-inter text-white flex flex-col items-center mb-20 px-7">
        <h1 className="font-obostar text-[52px] max-md:text-[32px] max-md:my-10 md:mt-28 md:mb-20 text-center">
          Join Community
        </h1>
        <div className="relative max-w-[520px] w-full">
          <input_1.Input type="text" placeholder="Search Communities" className=" w-full !rounded-[4px] font-inter py-3 text-sm placeholder:text-sm outline-none border-none ring-0 bg-[#FFFFFF0A]"/>
          <lucide_react_1.Search className="absolute right-2 top-2 !size-4.5"/>
        </div>

        <section className="mt-10 max-w-[900px] w-full">
          <accordion_1.Accordion type="single" collapsible className="flex flex-col gap-5">
            {communities.map((community) => (<accordion_1.AccordionItem className="border-none text-base rounded-[16px] bg-[#FFFFFF05] px-4 md:px-6 group" key={community.id} value={community.id.toString()}>
                <accordion_1.AccordionTrigger className="font-obostar text-[28px] max-md:text-lg !no-underline ">
                  <div className="flex gap-4 items-center">
                    <image_1.default src={community.src} width={72} height={72} alt="community image" className="rounded-[12px] transition-all duration-300 w-[72px] h-[72px] group-data-[state=open]:hidden"/>
                    <h3 className="group-data-[state=open]:sr-only fade-in fade-out transition-all duration-300">
                      {community.name}
                    </h3>
                  </div>
                </accordion_1.AccordionTrigger>
                <accordion_1.AccordionContent className="flex max-md:flex-col max-md:items-center gap-5 md:gap-10 fade-in fade-out transition-all duration-300">
                  <image_1.default src={community.src} width={296} height={296} alt="community image" className="rounded-[12px] transition-all duration-300 md:max-w-1/3 w-[296px] h-[296px] object-cover"/>
                  <div className="md:w-2/3 flex flex-col gap-3 justify-center max-md:self-start max-md:pl-6">
                    <h3 className="font-obostar text-[28px] max-md:text-lg">
                      {community.name}
                    </h3>
                    <p className="text-[#FFFFFF99] font-semibold max-md:text-sm">
                      {community.members} members
                    </p>
                    <p className="max-md:text-sm">{community.desc}</p>
                    <p className="text-[#FFFFFF99] font-semibold max-md:text-sm">
                      Join
                    </p>
                    <div>
                      <link_1.default className="hover:opacity-75" href={community.discord}>
                        Discord
                      </link_1.default>{" "}
                      |{" "}
                      <link_1.default className="hover:opacity-75" href={community.whatsapp}>
                        Whatsapp
                      </link_1.default>{" "}
                      |{" "}
                      <link_1.default className="hover:opacity-75" href={community.telegram}>
                        Telegram
                      </link_1.default>
                    </div>
                  </div>
                </accordion_1.AccordionContent>
              </accordion_1.AccordionItem>))}
          </accordion_1.Accordion>
        </section>
      </section>
      <Footer_1.default />
    </main>);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBhZ2UudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBbUZBLDhCQTBGQztBQTdLRCwwRUFBa0Q7QUFDbEQsMEVBQWtEO0FBQ2xELHlEQUttQztBQUNuQyxpREFBOEM7QUFDOUMsK0NBQXNDO0FBQ3RDLHFEQUE2QjtBQUM3QixrREFBMEI7QUFDMUIseUZBQXFEO0FBQ3JELDZFQUFpRDtBQUNqRCwrRUFBbUQ7QUFDbkQsNkVBQWlEO0FBQ2pELDZFQUFpRDtBQUNqRCwrRUFBbUQ7QUFDbkQsdURBQStCO0FBRS9CLE1BQU0sV0FBVyxHQUFHO0lBQ2xCO1FBQ0UsRUFBRSxFQUFFLENBQUM7UUFDTCxJQUFJLEVBQUUsYUFBYTtRQUNuQixHQUFHLEVBQUUseUJBQUc7UUFDUixPQUFPLEVBQUUsSUFBSTtRQUNiLElBQUksRUFBRSxrS0FBa0s7UUFDeEssT0FBTyxFQUFFLEVBQUU7UUFDWCxRQUFRLEVBQUUsRUFBRTtRQUNaLFFBQVEsRUFBRSxFQUFFO0tBQ2I7SUFDRDtRQUNFLEVBQUUsRUFBRSxDQUFDO1FBQ0wsSUFBSSxFQUFFLGFBQWE7UUFDbkIsR0FBRyxFQUFFLG1CQUFLO1FBQ1YsT0FBTyxFQUFFLElBQUk7UUFDYixJQUFJLEVBQUUsa0tBQWtLO1FBQ3hLLE9BQU8sRUFBRSxFQUFFO1FBQ1gsUUFBUSxFQUFFLEVBQUU7UUFDWixRQUFRLEVBQUUsRUFBRTtLQUNiO0lBQ0Q7UUFDRSxFQUFFLEVBQUUsQ0FBQztRQUNMLElBQUksRUFBRSxRQUFRO1FBQ2QsR0FBRyxFQUFFLG9CQUFNO1FBQ1gsT0FBTyxFQUFFLElBQUk7UUFDYixJQUFJLEVBQUUsa0tBQWtLO1FBQ3hLLE9BQU8sRUFBRSxFQUFFO1FBQ1gsUUFBUSxFQUFFLEVBQUU7UUFDWixRQUFRLEVBQUUsRUFBRTtLQUNiO0lBQ0Q7UUFDRSxFQUFFLEVBQUUsQ0FBQztRQUNMLElBQUksRUFBRSxPQUFPO1FBQ2IsR0FBRyxFQUFFLG1C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Q0FDSjtVQUFBLEVBQUUscUJBQVMsQ0FDYjtRQUFBLEVBQUUsT0FBTyxDQUNYO01BQUEsRUFBRSxPQUFPLENBQ1Q7TUFBQSxDQUFDLGdCQUFNLENBQUMsQUFBRCxFQUNUO0lBQUEsRUFBRSxJQUFJLENBQUMsQ0FDUixDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBGb290ZXIgZnJvbSBcIkAvY29tcG9uZW50cy9ob21lcGFnZS9Gb290ZXJcIjtcclxuaW1wb3J0IE5hdmJhciBmcm9tIFwiQC9jb21wb25lbnRzL2hvbWVwYWdlL05hdmJhclwiO1xyXG5pbXBvcnQge1xyXG4gIEFjY29yZGlvbixcclxuICBBY2NvcmRpb25Db250ZW50LFxyXG4gIEFjY29yZGlvbkl0ZW0sXHJcbiAgQWNjb3JkaW9uVHJpZ2dlcixcclxufSBmcm9tIFwiQC9jb21wb25lbnRzL3VpL2FjY29yZGlvblwiO1xyXG5pbXBvcnQgeyBJbnB1dCB9IGZyb20gXCJAL2NvbXBvbmVudHMvdWkvaW5wdXRcIjtcclxuaW1wb3J0IHsgU2VhcmNoIH0gZnJvbSBcImx1Y2lkZS1yZWFjdFwiO1xyXG5pbXBvcnQgTGluayBmcm9tIFwibmV4dC9saW5rXCI7XHJcbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFBvcCBmcm9tIFwiQC9hc3NldHMvY29tbXVuaXR5L3BvcC1jdWx0dXJlLmpwZ1wiO1xyXG5pbXBvcnQgR2FtZXMgZnJvbSBcIkAvYXNzZXRzL2NvbW11bml0eS9nYW1lcy5qcGdcIjtcclxuaW1wb3J0IENvbWljcyBmcm9tIFwiQC9hc3NldHMvY29tbXVuaXR5L2NvbWljcy5qcGdcIjtcclxuaW1wb3J0IEFuaW1lIGZyb20gXCJAL2Fzc2V0cy9jb21tdW5pdHkvYW5pbWUuanBnXCI7XHJcbmltcG9ydCBCb29rcyBmcm9tIFwiQC9hc3NldHMvY29tbXVuaXR5L2Jvb2tzLmpwZ1wiO1xyXG5pbXBvcnQgTW92aWVzIGZyb20gXCJAL2Fzc2V0cy9jb21tdW5pdHkvbW92aWVzLmpwZ1wiO1xyXG5pbXBvcnQgSW1hZ2UgZnJvbSBcIm5leHQvaW1hZ2VcIjtcclxuXHJcbmNvbnN0IGNvbW11bml0aWVzID0gW1xyXG4gIHtcclxuICAgIGlkOiAxLFxyXG4gICAgbmFtZTogXCJQb3AgQ3VsdHVyZVwiLFxyXG4gICAgc3JjOiBQb3AsXHJcbiAgICBtZW1iZXJzOiAyMDAwLFxyXG4gICAgZGVzYzogXCJMb3JlbSBpcHN1bSBkb2xvciBzaXQsIGFtZXQgY29uc2VjdGV0dXIgYWRpcGlzaWNpbmcgZWxpdC4gTmlzaSBhbmltaSBmdWdhIG9mZmljaWlzIGFsaXF1YW0gdWxsYW0sIHBvcnJvIHZlbmlhbSwgdW5kZSBkb2xvcmUgbGFib3JlIHF1YXMgbmVtbyBpbXBlZGl0IHJlcGVsbGVuZHVzXCIsXHJcbiAgICBkaXNjb3JkOiBcIlwiLFxyXG4gICAgd2hhdHNhcHA6IFwiXCIsXHJcbiAgICB0ZWxlZ3JhbTogXCJcIixcclxuICB9LFxyXG4gIHtcclxuICAgIGlkOiAyLFxyXG4gICAgbmFtZTogXCJWaWRlbyBHYW1lc1wiLFxyXG4gICAgc3JjOiBHYW1lcyxcclxuICAgIG1lbWJlcnM6IDIwMDAsXHJcbiAgICBkZXNjOiBcIkxvcmVtIGlwc3VtIGRvbG9yIHNpdCwgYW1ldCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBOaXNpIGFuaW1pIGZ1Z2Egb2ZmaWNpaXMgYWxpcXVhbSB1bGxhbSwgcG9ycm8gdmVuaWFtLCB1bmRlIGRvbG9yZSBsYWJvcmUgcXVhcyBuZW1vIGltcGVkaXQgcmVwZWxsZW5kdXNcIixcclxuICAgIGRpc2NvcmQ6IFwiXCIsXHJcbiAgICB3aGF0c2FwcDogXCJcIixcclxuICAgIHRlbGVncmFtOiBcIlwiLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgaWQ6IDMsXHJcbiAgICBuYW1lOiBcIkNvbWljc1wiLFxyXG4gICAgc3JjOiBDb21pY3MsXHJcbiAgICBtZW1iZXJzOiAyMDAwLFxyXG4gICAgZGVzYzogXCJMb3JlbSBpcHN1bSBkb2xvciBzaXQsIGFtZXQgY29uc2VjdGV0dXIgYWRpcGlzaWNpbmcgZWxpdC4gTmlzaSBhbmltaSBmdWdhIG9mZmljaWlzIGFsaXF1YW0gdWxsYW0sIHBvcnJvIHZlbmlhbSwgdW5kZSBkb2xvcmUgbGFib3JlIHF1YXMgbmVtbyBpbXBlZGl0IHJlcGVsbGVuZHVzXCIsXHJcbiAgICBkaXNjb3JkOiBcIlwiLFxyXG4gICAgd2hhdHNhcHA6IFwiXCIsXHJcbiAgICB0ZWxlZ3JhbTogXCJcIixcclxuICB9LFxyXG4gIHtcclxuICAgIGlkOiA0LFxyXG4gICAgbmFtZTogXCJBbmltZVwiLFxyXG4gICAgc3JjOiBBbmltZSxcclxuICAgIG1lbWJlcnM6IDIwMDAsXHJcbiAgICBkZXNjOiBcIkxvcmVtIGlwc3VtIGRvbG9yIHNpdCwgYW1ldCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBOaXNpIGFuaW1pIGZ1Z2Egb2ZmaWNpaXMgYWxpcXVhbSB1bGxhbSwgcG9ycm8gdmVuaWFtLCB1bmRlIGRvbG9yZSBsYWJvcmUgcXVhcyBuZW1vIGltcGVkaXQgcmVwZWxsZW5kdXNcIixcclxuICAgIGRpc2NvcmQ6IFwiXCIsXHJcbiAgICB3aGF0c2FwcDogXCJcIixcclxuICAgIHRlbGVncmFtOiBcIlwiLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgaWQ6IDUsXHJcbiAgICBuYW1lOiBcIkJvb2tzXCIsXHJcbiAgICBzcmM6IEJvb2tzLFxyXG4gICAgbWVtYmVyczogMjAwMCxcclxuICAgIGRlc2M6IFwiTG9yZW0gaXBzdW0gZG9sb3Igc2l0LCBhbWV0IGNvbnNlY3RldHVyIGFkaXBpc2ljaW5nIGVsaXQuIE5pc2kgYW5pbWkgZnVnYSBvZmZpY2lpcyBhbGlxdWFtIHVsbGFtLCBwb3JybyB2ZW5pYW0sIHVuZGUgZG9sb3JlIGxhYm9yZSBxdWFzIG5lbW8gaW1wZWRpdCByZXBlbGxlbmR1c1wiLFxyXG4gICAgZGlzY29yZDogXCJcIixcclxuICAgIHdoYXRzYXBwOiBcIlwiLFxyXG4gICAgdGVsZWdyYW06IFwiXCIsXHJcbiAgfSxcclxuICB7XHJcbiAgICBpZDogNixcclxuICAgIG5hbWU6IFwiTW92aWVzXCIsXHJcbiAgICBzcmM6IE1vdmllcyxcclxuICAgIG1lbWJlcnM6IDIwMDAsXHJcbiAgICBkZXNjOiBcIkxvcmVtIGlwc3VtIGRvbG9yIHNpdCwgYW1ldCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBOaXNpIGFuaW1pIGZ1Z2Egb2ZmaWNpaXMgYWxpcXVhbSB1bGxhbSwgcG9ycm8gdmVuaWFtLCB1bmRlIGRvbG9yZSBsYWJvcmUgcXVhcyBuZW1vIGltcGVkaXQgcmVwZWxsZW5kdXNcIixcclxuICAgIGRpc2NvcmQ6IFwiXCIsXHJcbiAgICB3aGF0c2FwcDogXCJcIixcclxuICAgIHRlbGVncmFtOiBcIlwiLFxyXG4gIH0sXHJcbl07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDb21tdW5pdGllcygpIHtcclxuICByZXR1cm4gKFxyXG4gICAgPG1haW4gY2xhc3NOYW1lPVwiYmctWyMwRDBEMERdIHRleHQtd2hpdGVcIj5cclxuICAgICAgPE5hdmJhciAvPlxyXG4gICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJtYXgtdy1bMTEzMHB4XSBteC1hdXRvIHctZnVsbCBmb250LWludGVyIHRleHQtd2hpdGUgZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIgbWItMjAgcHgtN1wiPlxyXG4gICAgICAgIDxoMSBjbGFzc05hbWU9XCJmb250LW9ib3N0YXIgdGV4dC1bNTJweF0gbWF4LW1kOnRleHQtWzMycHhdIG1heC1tZDpteS0xMCBtZDptdC0yOCBtZDptYi0yMCB0ZXh0LWNlbnRlclwiPlxyXG4gICAgICAgICAgSm9pbiBDb21tdW5pdHlcclxuICAgICAgICA8L2gxPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgbWF4LXctWzUyMHB4XSB3LWZ1bGxcIj5cclxuICAgICAgICAgIDxJbnB1dFxyXG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiXHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoIENvbW11bml0aWVzXCJcclxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiIHctZnVsbCAhcm91bmRlZC1bNHB4XSBmb250LWludGVyIHB5LTMgdGV4dC1zbSBwbGFjZWhvbGRlcjp0ZXh0LXNtIG91dGxpbmUtbm9uZSBib3JkZXItbm9uZSByaW5nLTAgYmctWyNGRkZGRkYwQV1cIlxyXG4gICAgICAgICAgLz5cclxuICAgICAgICAgIDxTZWFyY2ggY2xhc3NOYW1lPVwiYWJzb2x1dGUgcmlnaHQtMiB0b3AtMiAhc2l6ZS00LjVcIiAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJtdC0xMCBtYXgtdy1bOTAwcHhdIHctZnVsbFwiPlxyXG4gICAgICAgICAgPEFjY29yZGlvbiB0eXBlPVwic2luZ2xlXCIgY29sbGFwc2libGUgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBnYXAtNVwiPlxyXG4gICAgICAgICAgICB7Y29tbXVuaXRpZXMubWFwKChjb21tdW5pdHkpID0+IChcclxuICAgICAgICAgICAgICA8QWNjb3JkaW9uSXRlbVxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYm9yZGVyLW5vbmUgdGV4dC1iYXNlIHJvdW5kZWQtWzE2cHhdIGJnLVsjRkZGRkZGMDVdIHB4LTQgbWQ6cHgtNiBncm91cFwiXHJcbiAgICAgICAgICAgICAgICBrZXk9e2NvbW11bml0eS5pZH1cclxuICAgICAgICAgICAgICAgIHZhbHVlPXtjb21tdW5pdHkuaWQudG9TdHJpbmcoKX1cclxuICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICA8QWNjb3JkaW9uVHJpZ2dlciBjbGFzc05hbWU9XCJmb250LW9ib3N0YXIgdGV4dC1bMjhweF0gbWF4LW1kOnRleHQtbGcgIW5vLXVuZGVybGluZSBcIj5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGdhcC00IGl0ZW1zLWNlbnRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxJbWFnZVxyXG4gICAgICAgICAgICAgICAgICAgICAgc3JjPXtjb21tdW5pdHkuc3JjfVxyXG4gICAgICAgICAgICAgICAgICAgICAgd2lkdGg9ezcyfVxyXG4gICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0PXs3Mn1cclxuICAgICAgICAgICAgICAgICAgICAgIGFsdD1cImNvbW11bml0eSBpbWFnZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJyb3VuZGVkLVsxMnB4XSB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0zMDAgdy1bNzJweF0gaC1bNzJweF0gZ3JvdXAtZGF0YS1bc3RhdGU9b3Blbl06aGlkZGVuXCJcclxuICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJncm91cC1kYXRhLVtzdGF0ZT1vcGVuXTpzci1vbmx5IGZhZGUtaW4gZmFkZS1vdXQgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMzAwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICB7Y29tbXVuaXR5Lm5hbWV9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9oMz5cclxuICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L0FjY29yZGlvblRyaWdnZXI+XHJcbiAgICAgICAgICAgICAgICA8QWNjb3JkaW9uQ29udGVudCBjbGFzc05hbWU9XCJmbGV4IG1heC1tZDpmbGV4LWNvbCBtYXgtbWQ6aXRlbXMtY2VudGVyIGdhcC01IG1kOmdhcC0xMCBmYWRlLWluIGZhZGUtb3V0IHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMFwiPlxyXG4gICAgICAgICAgICAgICAgICA8SW1hZ2VcclxuICAgICAgICAgICAgICAgICAgICBzcmM9e2NvbW11bml0eS5zcmN9XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg9ezI5Nn1cclxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ9ezI5Nn1cclxuICAgICAgICAgICAgICAgICAgICBhbHQ9XCJjb21tdW5pdHkgaW1hZ2VcIlxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInJvdW5kZWQtWzEycHhdIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMCBtZDptYXgtdy0xLzMgdy1bMjk2cHhdIGgtWzI5NnB4XSBvYmplY3QtY292ZXJcIlxyXG4gICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1kOnctMi8zIGZsZXggZmxleC1jb2wgZ2FwLTMganVzdGlmeS1jZW50ZXIgbWF4LW1kOnNlbGYtc3RhcnQgbWF4LW1kOnBsLTZcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwiZm9udC1vYm9zdGFyIHRleHQtWzI4cHhdIG1heC1tZDp0ZXh0LWxnXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICB7Y29tbXVuaXR5Lm5hbWV9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9oMz5cclxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsjRkZGRkZGOTldIGZvbnQtc2VtaWJvbGQgbWF4LW1kOnRleHQtc21cIj5cclxuICAgICAgICAgICAgICAgICAgICAgIHtjb21tdW5pdHkubWVtYmVyc30gbWVtYmVyc1xyXG4gICAgICAgICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJtYXgtbWQ6dGV4dC1zbVwiPntjb21tdW5pdHkuZGVzY308L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bI0ZGRkZGRjk5XSBmb250LXNlbWlib2xkIG1heC1tZDp0ZXh0LXNtXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICBKb2luXHJcbiAgICAgICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8TGlua1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJob3ZlcjpvcGFjaXR5LTc1XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgaHJlZj17Y29tbXVuaXR5LmRpc2NvcmR9XHJcbiAgICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIERpc2NvcmRcclxuICAgICAgICAgICAgICAgICAgICAgIDwvTGluaz57XCIgXCJ9XHJcbiAgICAgICAgICAgICAgICAgICAgICB8e1wiIFwifVxyXG4gICAgICAgICAgICAgICAgICAgICAgPExpbmtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaG92ZXI6b3BhY2l0eS03NVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhyZWY9e2NvbW11bml0eS53aGF0c2FwcH1cclxuICAgICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgV2hhdHNhcHBcclxuICAgICAgICAgICAgICAgICAgICAgIDwvTGluaz57XCIgXCJ9XHJcbiAgICAgICAgICAgICAgICAgICAgICB8e1wiIFwifVxyXG4gICAgICAgICAgICAgICAgICAgICAgPExpbmtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaG92ZXI6b3BhY2l0eS03NVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhyZWY9e2NvbW11bml0eS50ZWxlZ3JhbX1cclxuICAgICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgVGVsZWdyYW1cclxuICAgICAgICAgICAgICAgICAgICAgIDwvTGluaz5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L0FjY29yZGlvbkNvbnRlbnQ+XHJcbiAgICAgICAgICAgICAgPC9BY2NvcmRpb25JdGVtPlxyXG4gICAgICAgICAgICApKX1cclxuICAgICAgICAgIDwvQWNjb3JkaW9uPlxyXG4gICAgICAgIDwvc2VjdGlvbj5cclxuICAgICAgPC9zZWN0aW9uPlxyXG4gICAgICA8Rm9vdGVyIC8+XHJcbiAgICA8L21haW4+XHJcbiAgKTtcclxufVxyXG4iXX0=