"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Hero;
const button_1 = require("../ui/button");
const input_1 = require("../ui/input");
const link_1 = __importDefault(require("next/link"));
function Hero() {
    return (<header className="relative min-h-screen w-full">
      <div className="absolute inset-0 bg-[url('/hero-bg.png')] bg-cover bg-center bg-no-repeat z-0"/>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,13,13,0)_0%,#0D0D0D_61.75%)] z-10"/>
      <div className="relative z-20 text-white h-screen max-w-[1440px] mx-auto">
        <section data-testid="hero" className="flex flex-col font-inter text-center -mb-px max-md:gap-6 md:gap-8 items-center justify-end h-screen pb-10 md:pb-32 px-7">
          <link_1.default target="_blank" href={"https://www.tketnation.com/nwcc25"}>
            <button_1.Button variant={"primary"} className="max-md:text-[13px] text-base rounded-[20px] px-5 py-1.5 font-medium">
              Comic Con 2025 is here, Register now
            </button_1.Button>
          </link_1.default>
          <h1 className="font-obostar text-[52px] max-md:text-[32px]">
            Where passion
            <br />
            meets community
          </h1>
          <p className="font-semibold max-md:text-sm">
            From comics to conventions, find your people and immerse yourself in
            everything you love.
          </p>
          <form className="max-w-[704px] w-full flex gap-3 justify-center items-stretch">
            <input_1.Input type="email" className="bg-[#17171A] outline-none border-none w-full rounded-[8px] py-2.5 pl-4 w-" placeholder="Email address"/>
            <button_1.Button variant={"primary"} className="h-full font-inter">
              Sign Up
            </button_1.Button>
          </form>
          <p className="text-[#FFFFFFB2] max-md:text-[13px]">
            Step into the ultimate nerd verse:
            <br />
            Explore exclusive comics on the Nerdwork+ platform
            <br />
            Attend the most exciting comic conventions
            <br />
            Connect with one of the largest nerd community
          </p>
        </section>
      </div>
    </header>);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSGVyby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkhlcm8udHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBSUEsdUJBa0RDO0FBdERELHlDQUFzQztBQUN0Qyx1Q0FBb0M7QUFDcEMscURBQTZCO0FBRTdCLFNBQXdCLElBQUk7SUFDMUIsT0FBTyxDQUNMLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyw4QkFBOEIsQ0FDOUM7TUFBQSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsK0VBQStFLEVBQzlGO01BQUEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLHVGQUF1RixFQUN0RztNQUFBLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQywwREFBMEQsQ0FDdkU7UUFBQSxDQUFDLE9BQU8sQ0FDTixXQUFXLENBQUMsTUFBTSxDQUNsQixTQUFTLENBQUMseUhBQXlILENBRW5JO1VBQUEsQ0FBQyxjQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUM5RDtZQUFBLENBQUMsZUFBTSxDQUNMLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUNuQixTQUFTLENBQUMscUVBQXFFLENBRS9FOztZQUNGLEVBQUUsZUFBTSxDQUNWO1VBQUEsRUFBRSxjQUFJLENBQ047VUFBQSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsNkNBQTZDLENBQ3pEOztZQUNBLENBQUMsRUFBRSxDQUFDLEFBQUQsRUFDSDs7VUFDRixFQUFFLEVBQUUsQ0FDSjtVQUFBLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyw4QkFBOEIsQ0FDekM7OztVQUVGLEVBQUUsQ0FBQyxDQUNIO1VBQUEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLDhEQUE4RCxDQUM1RTtZQUFBLENBQUMsYUFBSyxDQUNKLElBQUksQ0FBQyxPQUFPLENBQ1osU0FBUyxDQUFDLDJFQUEyRSxDQUNyRixXQUFXLENBQUMsZUFBZSxFQUU3QjtZQUFBLENBQUMsZUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsQ0FDdkQ7O1lBQ0YsRUFBRSxlQUFNLENBQ1Y7VUFBQSxFQUFFLElBQUksQ0FDTjtVQUFBLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxxQ0FBcUMsQ0FDaEQ7O1lBQ0EsQ0FBQyxFQUFFLENBQUMsQUFBRCxFQUNIOztZQUNBLENBQUMsRUFBRSxDQUFDLEFBQUQsRUFDSDs7WUFDQSxDQUFDLEVBQUUsQ0FBQyxBQUFELEVBQ0g7O1VBQ0YsRUFBRSxDQUFDLENBQ0w7UUFBQSxFQUFFLE9BQU8sQ0FDWDtNQUFBLEVBQUUsR0FBRyxDQUNQO0lBQUEsRUFBRSxNQUFNLENBQUMsQ0FDVixDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJ1dHRvbiB9IGZyb20gXCIuLi91aS9idXR0b25cIjtcclxuaW1wb3J0IHsgSW5wdXQgfSBmcm9tIFwiLi4vdWkvaW5wdXRcIjtcclxuaW1wb3J0IExpbmsgZnJvbSBcIm5leHQvbGlua1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gSGVybygpIHtcclxuICByZXR1cm4gKFxyXG4gICAgPGhlYWRlciBjbGFzc05hbWU9XCJyZWxhdGl2ZSBtaW4taC1zY3JlZW4gdy1mdWxsXCI+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCBiZy1bdXJsKCcvaGVyby1iZy5wbmcnKV0gYmctY292ZXIgYmctY2VudGVyIGJnLW5vLXJlcGVhdCB6LTBcIiAvPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgYmctW2xpbmVhci1ncmFkaWVudCgxODBkZWcscmdiYSgxMywxMywxMywwKV8wJSwjMEQwRDBEXzYxLjc1JSldIHotMTBcIiAvPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIHotMjAgdGV4dC13aGl0ZSBoLXNjcmVlbiBtYXgtdy1bMTQ0MHB4XSBteC1hdXRvXCI+XHJcbiAgICAgICAgPHNlY3Rpb25cclxuICAgICAgICAgIGRhdGEtdGVzdGlkPVwiaGVyb1wiXHJcbiAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGZvbnQtaW50ZXIgdGV4dC1jZW50ZXIgLW1iLXB4IG1heC1tZDpnYXAtNiBtZDpnYXAtOCBpdGVtcy1jZW50ZXIganVzdGlmeS1lbmQgaC1zY3JlZW4gcGItMTAgbWQ6cGItMzIgcHgtN1wiXHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPExpbmsgdGFyZ2V0PVwiX2JsYW5rXCIgaHJlZj17XCJodHRwczovL3d3dy50a2V0bmF0aW9uLmNvbS9ud2NjMjVcIn0+XHJcbiAgICAgICAgICAgIDxCdXR0b25cclxuICAgICAgICAgICAgICB2YXJpYW50PXtcInByaW1hcnlcIn1cclxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJtYXgtbWQ6dGV4dC1bMTNweF0gdGV4dC1iYXNlIHJvdW5kZWQtWzIwcHhdIHB4LTUgcHktMS41IGZvbnQtbWVkaXVtXCJcclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIENvbWljIENvbiAyMDI1IGlzIGhlcmUsIFJlZ2lzdGVyIG5vd1xyXG4gICAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgIDwvTGluaz5cclxuICAgICAgICAgIDxoMSBjbGFzc05hbWU9XCJmb250LW9ib3N0YXIgdGV4dC1bNTJweF0gbWF4LW1kOnRleHQtWzMycHhdXCI+XHJcbiAgICAgICAgICAgIFdoZXJlIHBhc3Npb25cclxuICAgICAgICAgICAgPGJyIC8+XHJcbiAgICAgICAgICAgIG1lZXRzIGNvbW11bml0eVxyXG4gICAgICAgICAgPC9oMT5cclxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGQgbWF4LW1kOnRleHQtc21cIj5cclxuICAgICAgICAgICAgRnJvbSBjb21pY3MgdG8gY29udmVudGlvbnMsIGZpbmQgeW91ciBwZW9wbGUgYW5kIGltbWVyc2UgeW91cnNlbGYgaW5cclxuICAgICAgICAgICAgZXZlcnl0aGluZyB5b3UgbG92ZS5cclxuICAgICAgICAgIDwvcD5cclxuICAgICAgICAgIDxmb3JtIGNsYXNzTmFtZT1cIm1heC13LVs3MDRweF0gdy1mdWxsIGZsZXggZ2FwLTMganVzdGlmeS1jZW50ZXIgaXRlbXMtc3RyZXRjaFwiPlxyXG4gICAgICAgICAgICA8SW5wdXRcclxuICAgICAgICAgICAgICB0eXBlPVwiZW1haWxcIlxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJnLVsjMTcxNzFBXSBvdXRsaW5lLW5vbmUgYm9yZGVyLW5vbmUgdy1mdWxsIHJvdW5kZWQtWzhweF0gcHktMi41IHBsLTQgdy1cIlxyXG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRW1haWwgYWRkcmVzc1wiXHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDxCdXR0b24gdmFyaWFudD17XCJwcmltYXJ5XCJ9IGNsYXNzTmFtZT1cImgtZnVsbCBmb250LWludGVyXCI+XHJcbiAgICAgICAgICAgICAgU2lnbiBVcFxyXG4gICAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgIDwvZm9ybT5cclxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWyNGRkZGRkZCMl0gbWF4LW1kOnRleHQtWzEzcHhdXCI+XHJcbiAgICAgICAgICAgIFN0ZXAgaW50byB0aGUgdWx0aW1hdGUgbmVyZCB2ZXJzZTpcclxuICAgICAgICAgICAgPGJyIC8+XHJcbiAgICAgICAgICAgIEV4cGxvcmUgZXhjbHVzaXZlIGNvbWljcyBvbiB0aGUgTmVyZHdvcmsrIHBsYXRmb3JtXHJcbiAgICAgICAgICAgIDxiciAvPlxyXG4gICAgICAgICAgICBBdHRlbmQgdGhlIG1vc3QgZXhjaXRpbmcgY29taWMgY29udmVudGlvbnNcclxuICAgICAgICAgICAgPGJyIC8+XHJcbiAgICAgICAgICAgIENvbm5lY3Qgd2l0aCBvbmUgb2YgdGhlIGxhcmdlc3QgbmVyZCBjb21tdW5pdHlcclxuICAgICAgICAgIDwvcD5cclxuICAgICAgICA8L3NlY3Rpb24+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9oZWFkZXI+XHJcbiAgKTtcclxufVxyXG4iXX0=