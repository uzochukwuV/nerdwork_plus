"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EventLists;
const react_1 = __importDefault(require("react"));
const button_1 = require("../ui/button");
const comic_con_jpg_1 = __importDefault(require("@/assets/events/comic-con.jpg"));
const tech_summit_jpg_1 = __importDefault(require("@/assets/events/tech-summit.jpg"));
const arts_fair_jpg_1 = __importDefault(require("@/assets/events/arts-fair.jpg"));
const image_1 = __importDefault(require("next/image"));
const link_1 = __importDefault(require("next/link"));
const events = [
    {
        id: 1,
        src: comic_con_jpg_1.default,
        alt: "Comic con",
        link: "https://www.straqa.events/nerdworkcomiccon",
        date: "September 6, 2025",
        title: "Comic Con 2025",
        subtitle: "Experience a day of creativity and connection at our annual community event! ",
    },
    {
        id: 2,
        src: tech_summit_jpg_1.default,
        alt: "tech summit",
        link: "",
        date: "---",
        title: "Tech Innovation Summit 2025",
        subtitle: "Join industry leaders to explore the latest in technology and innovation.",
    },
    {
        id: 3,
        src: arts_fair_jpg_1.default,
        alt: "arts fair",
        link: "",
        date: "---",
        title: "Arts & Crafts Fair 2025",
        subtitle: "Showcase your talents and discover new art at our annual fair!",
    },
];
function EventLists() {
    return (<section data-testid="events-list" className="max-w-[1130px] w-full font-inter mx-auto text-white my-20 md:py-10 px-7">
      <div className="flex justify-between mb-10">
        <h3 id="events" className="font-obostar text-[28px] max-md:text-lg">
          Upcoming Events
        </h3>
        <button_1.Button className="max-md:hidden">See all Events</button_1.Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {events.map((event) => (<div key={event.id} className="flex flex-col gap-3 justify-between">
            <image_1.default src={event.src} width={350} height={325} alt="Event image" className="rounded-[12px]"/>
            <div className="flex flex-col gap-3 max-md:text-sm">
              <p className="font-semibold uppercase">{event.title}</p>
              <p className="text-sm max-md:text-xs text-[#FFFFFF80] font-medium">
                {event.date}
              </p>
              <p className="text-[#FFFFFFCC]">{event.subtitle}</p>
            </div>
            {event.date == "---" ? (<button_1.Button disabled className="disabled:cursor-not-allowed w-fit">
                Coming Soon
              </button_1.Button>) : (<link_1.default target="_blank" href={`${event.link}`}>
                <button_1.Button variant={"primary"} className="w-fit">
                  Register
                </button_1.Button>
              </link_1.default>)}
          </div>))}
      </div>
      <button_1.Button className="md:hidden mt-8">See all Events</button_1.Button>
    </section>);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXZlbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiRXZlbnRzLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQXdDQSw2QkErQ0M7QUF2RkQsa0RBQTBCO0FBQzFCLHlDQUFzQztBQUN0QyxrRkFBcUQ7QUFDckQsc0ZBQXlEO0FBQ3pELGtGQUFxRDtBQUNyRCx1REFBK0I7QUFDL0IscURBQTZCO0FBRTdCLE1BQU0sTUFBTSxHQUFHO0lBQ2I7UUFDRSxFQUFFLEVBQUUsQ0FBQztRQUNMLEdBQUcsRUFBRSx1QkFBUTtRQUNiLEdBQUcsRUFBRSxXQUFXO1FBQ2hCLElBQUksRUFBRSw0Q0FBNEM7UUFDbEQsSUFBSSxFQUFFLG1CQUFtQjtRQUN6QixLQUFLLEVBQUUsZ0JBQWdCO1FBQ3ZCLFFBQVEsRUFDTiwrRUFBK0U7S0FDbEY7SUFDRDtRQUNFLEVBQUUsRUFBRSxDQUFDO1FBQ0wsR0FBRyxFQUFFLHlCQUFVO1FBQ2YsR0FBRyxFQUFFLGFBQWE7UUFDbEIsSUFBSSxFQUFFLEVBQUU7UUFDUixJQUFJLEVBQUUsS0FBSztRQUNYLEtBQUssRUFBRSw2QkFBNkI7UUFDcEMsUUFBUSxFQUNOLDJFQUEyRTtLQUM5RTtJQUNEO1FBQ0UsRUFBRSxFQUFFLENBQUM7UUFDTCxHQUFHLEVBQUUsdUJBQVE7UUFDYixHQUFHLEVBQUUsV0FBVztRQUNoQixJQUFJLEVBQUUsRUFBRTtRQUNSLElBQUksRUFBRSxLQUFLO1FBQ1gsS0FBSyxFQUFFLHlCQUF5QjtRQUNoQyxRQUFRLEVBQUUsZ0VBQWdFO0tBQzNFO0NBQ0YsQ0FBQztBQUVGLFNBQXdCLFVBQVU7SUFDaEMsT0FBTyxDQUNMLENBQUMsT0FBTyxDQUNOLFdBQVcsQ0FBQyxhQUFhLENBQ3pCLFNBQVMsQ0FBQyx5RUFBeUUsQ0FFbkY7TUFBQSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsNEJBQTRCLENBQ3pDO1FBQUEsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMseUNBQXlDLENBQ2pFOztRQUNGLEVBQUUsRUFBRSxDQUNKO1FBQUEsQ0FBQyxlQUFNLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxjQUFjLEVBQUUsZUFBTSxDQUMxRDtNQUFBLEVBQUUsR0FBRyxDQUVMOztNQUFBLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyx3Q0FBd0MsQ0FDckQ7UUFBQSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQ3JCLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMscUNBQXFDLENBQ2pFO1lBQUEsQ0FBQyxlQUFLLENBQ0osR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUNmLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUNYLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUNaLEdBQUcsQ0FBQyxhQUFhLENBQ2pCLFNBQVMsQ0FBQyxnQkFBZ0IsRUFFNUI7WUFBQSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsb0NBQW9DLENBQ2pEO2NBQUEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLHlCQUF5QixDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FDdkQ7Y0FBQSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMscURBQXFELENBQ2hFO2dCQUFBLENBQUMsS0FBSyxDQUFDLElBQUksQ0FDYjtjQUFBLEVBQUUsQ0FBQyxDQUNIO2NBQUEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FDckQ7WUFBQSxFQUFFLEdBQUcsQ0FDTDtZQUFBLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQ3JCLENBQUMsZUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsbUNBQW1DLENBQzVEOztjQUNGLEVBQUUsZUFBTSxDQUFDLENBQ1YsQ0FBQyxDQUFDLENBQUMsQ0FDRixDQUFDLGNBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQzFDO2dCQUFBLENBQUMsZUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQzNDOztnQkFDRixFQUFFLGVBQU0sQ0FDVjtjQUFBLEVBQUUsY0FBSSxDQUFDLENBQ1IsQ0FDSDtVQUFBLEVBQUUsR0FBRyxDQUFDLENBQ1AsQ0FBQyxDQUNKO01BQUEsRUFBRSxHQUFHLENBQ0w7TUFBQSxDQUFDLGVBQU0sQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxFQUFFLGVBQU0sQ0FDM0Q7SUFBQSxFQUFFLE9BQU8sQ0FBQyxDQUNYLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tIFwiLi4vdWkvYnV0dG9uXCI7XHJcbmltcG9ydCBDb21pY0NvbiBmcm9tIFwiQC9hc3NldHMvZXZlbnRzL2NvbWljLWNvbi5qcGdcIjtcclxuaW1wb3J0IFRlY2hTdW1taXQgZnJvbSBcIkAvYXNzZXRzL2V2ZW50cy90ZWNoLXN1bW1pdC5qcGdcIjtcclxuaW1wb3J0IEFydHNGYWlyIGZyb20gXCJAL2Fzc2V0cy9ldmVudHMvYXJ0cy1mYWlyLmpwZ1wiO1xyXG5pbXBvcnQgSW1hZ2UgZnJvbSBcIm5leHQvaW1hZ2VcIjtcclxuaW1wb3J0IExpbmsgZnJvbSBcIm5leHQvbGlua1wiO1xyXG5cclxuY29uc3QgZXZlbnRzID0gW1xyXG4gIHtcclxuICAgIGlkOiAxLFxyXG4gICAgc3JjOiBDb21pY0NvbixcclxuICAgIGFsdDogXCJDb21pYyBjb25cIixcclxuICAgIGxpbms6IFwiaHR0cHM6Ly93d3cuc3RyYXFhLmV2ZW50cy9uZXJkd29ya2NvbWljY29uXCIsXHJcbiAgICBkYXRlOiBcIlNlcHRlbWJlciA2LCAyMDI1XCIsXHJcbiAgICB0aXRsZTogXCJDb21pYyBDb24gMjAyNVwiLFxyXG4gICAgc3VidGl0bGU6XHJcbiAgICAgIFwiRXhwZXJpZW5jZSBhIGRheSBvZiBjcmVhdGl2aXR5IGFuZCBjb25uZWN0aW9uIGF0IG91ciBhbm51YWwgY29tbXVuaXR5IGV2ZW50ISBcIixcclxuICB9LFxyXG4gIHtcclxuICAgIGlkOiAyLFxyXG4gICAgc3JjOiBUZWNoU3VtbWl0LCAgXHJcbiAgICBhbHQ6IFwidGVjaCBzdW1taXRcIixcclxuICAgIGxpbms6IFwiXCIsXHJcbiAgICBkYXRlOiBcIi0tLVwiLFxyXG4gICAgdGl0bGU6IFwiVGVjaCBJbm5vdmF0aW9uIFN1bW1pdCAyMDI1XCIsXHJcbiAgICBzdWJ0aXRsZTpcclxuICAgICAgXCJKb2luIGluZHVzdHJ5IGxlYWRlcnMgdG8gZXhwbG9yZSB0aGUgbGF0ZXN0IGluIHRlY2hub2xvZ3kgYW5kIGlubm92YXRpb24uXCIsXHJcbiAgfSxcclxuICB7XHJcbiAgICBpZDogMyxcclxuICAgIHNyYzogQXJ0c0ZhaXIsXHJcbiAgICBhbHQ6IFwiYXJ0cyBmYWlyXCIsXHJcbiAgICBsaW5rOiBcIlwiLFxyXG4gICAgZGF0ZTogXCItLS1cIixcclxuICAgIHRpdGxlOiBcIkFydHMgJiBDcmFmdHMgRmFpciAyMDI1XCIsXHJcbiAgICBzdWJ0aXRsZTogXCJTaG93Y2FzZSB5b3VyIHRhbGVudHMgYW5kIGRpc2NvdmVyIG5ldyBhcnQgYXQgb3VyIGFubnVhbCBmYWlyIVwiLFxyXG4gIH0sXHJcbl07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBFdmVudExpc3RzKCkge1xyXG4gIHJldHVybiAoXHJcbiAgICA8c2VjdGlvblxyXG4gICAgICBkYXRhLXRlc3RpZD1cImV2ZW50cy1saXN0XCJcclxuICAgICAgY2xhc3NOYW1lPVwibWF4LXctWzExMzBweF0gdy1mdWxsIGZvbnQtaW50ZXIgbXgtYXV0byB0ZXh0LXdoaXRlIG15LTIwIG1kOnB5LTEwIHB4LTdcIlxyXG4gICAgPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuIG1iLTEwXCI+XHJcbiAgICAgICAgPGgzIGlkPVwiZXZlbnRzXCIgY2xhc3NOYW1lPVwiZm9udC1vYm9zdGFyIHRleHQtWzI4cHhdIG1heC1tZDp0ZXh0LWxnXCI+XHJcbiAgICAgICAgICBVcGNvbWluZyBFdmVudHNcclxuICAgICAgICA8L2gzPlxyXG4gICAgICAgIDxCdXR0b24gY2xhc3NOYW1lPVwibWF4LW1kOmhpZGRlblwiPlNlZSBhbGwgRXZlbnRzPC9CdXR0b24+XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0zIGdhcC0xMFwiPlxyXG4gICAgICAgIHtldmVudHMubWFwKChldmVudCkgPT4gKFxyXG4gICAgICAgICAgPGRpdiBrZXk9e2V2ZW50LmlkfSBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGdhcC0zIGp1c3RpZnktYmV0d2VlblwiPlxyXG4gICAgICAgICAgICA8SW1hZ2VcclxuICAgICAgICAgICAgICBzcmM9e2V2ZW50LnNyY31cclxuICAgICAgICAgICAgICB3aWR0aD17MzUwfVxyXG4gICAgICAgICAgICAgIGhlaWdodD17MzI1fVxyXG4gICAgICAgICAgICAgIGFsdD1cIkV2ZW50IGltYWdlXCJcclxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJyb3VuZGVkLVsxMnB4XVwiXHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBnYXAtMyBtYXgtbWQ6dGV4dC1zbVwiPlxyXG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGQgdXBwZXJjYXNlXCI+e2V2ZW50LnRpdGxlfTwvcD5cclxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNtIG1heC1tZDp0ZXh0LXhzIHRleHQtWyNGRkZGRkY4MF0gZm9udC1tZWRpdW1cIj5cclxuICAgICAgICAgICAgICAgIHtldmVudC5kYXRlfVxyXG4gICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsjRkZGRkZGQ0NdXCI+e2V2ZW50LnN1YnRpdGxlfTwvcD5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIHtldmVudC5kYXRlID09IFwiLS0tXCIgPyAoXHJcbiAgICAgICAgICAgICAgPEJ1dHRvbiBkaXNhYmxlZCBjbGFzc05hbWU9XCJkaXNhYmxlZDpjdXJzb3Itbm90LWFsbG93ZWQgdy1maXRcIj5cclxuICAgICAgICAgICAgICAgIENvbWluZyBTb29uXHJcbiAgICAgICAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgICAgPExpbmsgdGFyZ2V0PVwiX2JsYW5rXCIgaHJlZj17YCR7ZXZlbnQubGlua31gfT5cclxuICAgICAgICAgICAgICAgIDxCdXR0b24gdmFyaWFudD17XCJwcmltYXJ5XCJ9IGNsYXNzTmFtZT1cInctZml0XCI+XHJcbiAgICAgICAgICAgICAgICAgIFJlZ2lzdGVyXHJcbiAgICAgICAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgICAgICA8L0xpbms+XHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApKX1cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxCdXR0b24gY2xhc3NOYW1lPVwibWQ6aGlkZGVuIG10LThcIj5TZWUgYWxsIEV2ZW50czwvQnV0dG9uPlxyXG4gICAgPC9zZWN0aW9uPlxyXG4gICk7XHJcbn1cclxuIl19