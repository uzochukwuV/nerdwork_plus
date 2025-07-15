"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ProductHero;
const react_1 = __importDefault(require("react"));
const Navbar_1 = __importDefault(require("../homepage/Navbar"));
const input_1 = require("../ui/input");
const button_1 = require("../ui/button");
function ProductHero() {
    return (<header className="relative min-h-screen w-full">
      <div className="absolute inset-0 bg-[url('/nerdwork+/plus-hero.png')] bg-cover bg-center bg-no-repeat z-0"/>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#0D0D0D_0%,rgba(13,13,13,0)_30%,#0D0D0D_95%)] z-10"/>
      <div className="relative z-20 text-white h-screen max-w-[1440px] mx-auto">
        <Navbar_1.default />
        <section data-testid="hero" className="flex flex-col max-w-[600px] w-full md:ml-24 font-inter -mb-px max-md:gap-6 md:gap-8 items-start justify-center max-md:justify-end h-screen pb-10 px-7">
          <p className="bg-[#0856D3] text-sm max-md:text-[13px] rounded-[8px] px-5 py-1.5 font-medium">
            Coming Soon
          </p>
          <h1 className="font-obostar text-[52px] max-md:text-[32px]">
            African
            <br />
            Stories
            <br /> Redefined
          </h1>
          <p className="font-semibold max-md:text-sm">
            Discover comics rooted in Africa’s past, present, and future—all
            created by African storytellers.
          </p>
          <form className="max-w-[704px] w-full flex gap-3 justify-center items-stretch">
            <input_1.Input type="email" className="bg-[#17171A] outline-none border-none w-full rounded-[8px] py-2.5 pl-4 w-" placeholder="Email address"/>
            <button_1.Button variant={"primary"} className="h-full font-inter">
              Join Waitlist
            </button_1.Button>
          </form>
        </section>
      </div>
    </header>);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSGVyby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkhlcm8udHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBS0EsOEJBc0NDO0FBM0NELGtEQUEwQjtBQUMxQixnRUFBd0M7QUFDeEMsdUNBQW9DO0FBQ3BDLHlDQUFzQztBQUV0QyxTQUF3QixXQUFXO0lBQ2pDLE9BQU8sQ0FDTCxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsOEJBQThCLENBQzlDO01BQUEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLDJGQUEyRixFQUMxRztNQUFBLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxnR0FBZ0csRUFDL0c7TUFBQSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsMERBQTBELENBQ3ZFO1FBQUEsQ0FBQyxnQkFBTSxDQUFDLEFBQUQsRUFDUDtRQUFBLENBQUMsT0FBTyxDQUNOLFdBQVcsQ0FBQyxNQUFNLENBQ2xCLFNBQVMsQ0FBQyx1SkFBdUosQ0FFaks7VUFBQSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsK0VBQStFLENBQzFGOztVQUNGLEVBQUUsQ0FBQyxDQUNIO1VBQUEsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLDZDQUE2QyxDQUN6RDs7WUFDQSxDQUFDLEVBQUUsQ0FBQyxBQUFELEVBQ0g7O1lBQ0EsQ0FBQyxFQUFFLENBQUMsQUFBRCxFQUFJO1VBQ1QsRUFBRSxFQUFFLENBQ0o7VUFBQSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsOEJBQThCLENBQ3pDOzs7VUFFRixFQUFFLENBQUMsQ0FDSDtVQUFBLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyw4REFBOEQsQ0FDNUU7WUFBQSxDQUFDLGFBQUssQ0FDSixJQUFJLENBQUMsT0FBTyxDQUNaLFNBQVMsQ0FBQywyRUFBMkUsQ0FDckYsV0FBVyxDQUFDLGVBQWUsRUFFN0I7WUFBQSxDQUFDLGVBQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxTQUFTLENBQUMsbUJBQW1CLENBQ3ZEOztZQUNGLEVBQUUsZUFBTSxDQUNWO1VBQUEsRUFBRSxJQUFJLENBQ1I7UUFBQSxFQUFFLE9BQU8sQ0FDWDtNQUFBLEVBQUUsR0FBRyxDQUNQO0lBQUEsRUFBRSxNQUFNLENBQUMsQ0FDVixDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IE5hdmJhciBmcm9tIFwiLi4vaG9tZXBhZ2UvTmF2YmFyXCI7XHJcbmltcG9ydCB7IElucHV0IH0gZnJvbSBcIi4uL3VpL2lucHV0XCI7XHJcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gXCIuLi91aS9idXR0b25cIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFByb2R1Y3RIZXJvKCkge1xyXG4gIHJldHVybiAoXHJcbiAgICA8aGVhZGVyIGNsYXNzTmFtZT1cInJlbGF0aXZlIG1pbi1oLXNjcmVlbiB3LWZ1bGxcIj5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIGJnLVt1cmwoJy9uZXJkd29yaysvcGx1cy1oZXJvLnBuZycpXSBiZy1jb3ZlciBiZy1jZW50ZXIgYmctbm8tcmVwZWF0IHotMFwiIC8+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCBiZy1bbGluZWFyLWdyYWRpZW50KDE4MGRlZywjMEQwRDBEXzAlLHJnYmEoMTMsMTMsMTMsMClfMzAlLCMwRDBEMERfOTUlKV0gei0xMFwiIC8+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgei0yMCB0ZXh0LXdoaXRlIGgtc2NyZWVuIG1heC13LVsxNDQwcHhdIG14LWF1dG9cIj5cclxuICAgICAgICA8TmF2YmFyIC8+XHJcbiAgICAgICAgPHNlY3Rpb25cclxuICAgICAgICAgIGRhdGEtdGVzdGlkPVwiaGVyb1wiXHJcbiAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIG1heC13LVs2MDBweF0gdy1mdWxsIG1kOm1sLTI0IGZvbnQtaW50ZXIgLW1iLXB4IG1heC1tZDpnYXAtNiBtZDpnYXAtOCBpdGVtcy1zdGFydCBqdXN0aWZ5LWNlbnRlciBtYXgtbWQ6anVzdGlmeS1lbmQgaC1zY3JlZW4gcGItMTAgcHgtN1wiXHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwiYmctWyMwODU2RDNdIHRleHQtc20gbWF4LW1kOnRleHQtWzEzcHhdIHJvdW5kZWQtWzhweF0gcHgtNSBweS0xLjUgZm9udC1tZWRpdW1cIj5cclxuICAgICAgICAgICAgQ29taW5nIFNvb25cclxuICAgICAgICAgIDwvcD5cclxuICAgICAgICAgIDxoMSBjbGFzc05hbWU9XCJmb250LW9ib3N0YXIgdGV4dC1bNTJweF0gbWF4LW1kOnRleHQtWzMycHhdXCI+XHJcbiAgICAgICAgICAgIEFmcmljYW5cclxuICAgICAgICAgICAgPGJyIC8+XHJcbiAgICAgICAgICAgIFN0b3JpZXNcclxuICAgICAgICAgICAgPGJyIC8+IFJlZGVmaW5lZFxyXG4gICAgICAgICAgPC9oMT5cclxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGQgbWF4LW1kOnRleHQtc21cIj5cclxuICAgICAgICAgICAgRGlzY292ZXIgY29taWNzIHJvb3RlZCBpbiBBZnJpY2HigJlzIHBhc3QsIHByZXNlbnQsIGFuZCBmdXR1cmXigJRhbGxcclxuICAgICAgICAgICAgY3JlYXRlZCBieSBBZnJpY2FuIHN0b3J5dGVsbGVycy5cclxuICAgICAgICAgIDwvcD5cclxuICAgICAgICAgIDxmb3JtIGNsYXNzTmFtZT1cIm1heC13LVs3MDRweF0gdy1mdWxsIGZsZXggZ2FwLTMganVzdGlmeS1jZW50ZXIgaXRlbXMtc3RyZXRjaFwiPlxyXG4gICAgICAgICAgICA8SW5wdXRcclxuICAgICAgICAgICAgICB0eXBlPVwiZW1haWxcIlxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJnLVsjMTcxNzFBXSBvdXRsaW5lLW5vbmUgYm9yZGVyLW5vbmUgdy1mdWxsIHJvdW5kZWQtWzhweF0gcHktMi41IHBsLTQgdy1cIlxyXG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRW1haWwgYWRkcmVzc1wiXHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDxCdXR0b24gdmFyaWFudD17XCJwcmltYXJ5XCJ9IGNsYXNzTmFtZT1cImgtZnVsbCBmb250LWludGVyXCI+XHJcbiAgICAgICAgICAgICAgSm9pbiBXYWl0bGlzdFxyXG4gICAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgIDwvZm9ybT5cclxuICAgICAgICA8L3NlY3Rpb24+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9oZWFkZXI+XHJcbiAgKTtcclxufVxyXG4iXX0=