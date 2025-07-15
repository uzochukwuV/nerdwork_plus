"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Waitlist;
const react_1 = __importDefault(require("react"));
const input_1 = require("../ui/input");
const button_1 = require("../ui/button");
const image_1 = __importDefault(require("next/image"));
const comis_png_1 = __importDefault(require("@/assets/nerdwork+/comis.png"));
function Waitlist() {
    return (<section className="text-white font-inter md:text-center max-w-[1600px] max-lg:py-10 mx-auto flex flex-col gap-5 md:items-center">
      <h2 className="font-obostar text-[40px] max-md:text-2xl px-7">
        Join Today
      </h2>
      <p className="px-7">Free to join, pay as you go</p>

      <form className="max-w-[600px] px-7 mb-12 w-full flex gap-3 justify-center items-stretch">
        <input_1.Input type="email" className="bg-[#17171A] outline-none border-none w-full rounded-[8px] py-2.5 pl-4 w-" placeholder="Email address"/>
        <button_1.Button variant={"primary"} className="h-full font-inter">
          Join Waitlist
        </button_1.Button>
      </form>

      <figure className="relative">
        <image_1.default src={comis_png_1.default} width={2867} height={911} alt="comic images"/>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#0D0D0D_0%,rgba(13,13,13,0)_70%)] z-10"/>
      </figure>
    </section>);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2FpdGxpc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJXYWl0bGlzdC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFNQSwyQkE4QkM7QUFwQ0Qsa0RBQTBCO0FBQzFCLHVDQUFvQztBQUNwQyx5Q0FBc0M7QUFDdEMsdURBQStCO0FBQy9CLDZFQUF3RDtBQUV4RCxTQUF3QixRQUFRO0lBQzlCLE9BQU8sQ0FDTCxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsOEdBQThHLENBQy9IO01BQUEsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLCtDQUErQyxDQUMzRDs7TUFDRixFQUFFLEVBQUUsQ0FDSjtNQUFBLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsMkJBQTJCLEVBQUUsQ0FBQyxDQUVsRDs7TUFBQSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMseUVBQXlFLENBQ3ZGO1FBQUEsQ0FBQyxhQUFLLENBQ0osSUFBSSxDQUFDLE9BQU8sQ0FDWixTQUFTLENBQUMsMkVBQTJFLENBQ3JGLFdBQVcsQ0FBQyxlQUFlLEVBRTdCO1FBQUEsQ0FBQyxlQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsU0FBUyxDQUFDLG1CQUFtQixDQUN2RDs7UUFDRixFQUFFLGVBQU0sQ0FDVjtNQUFBLEVBQUUsSUFBSSxDQUVOOztNQUFBLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQzFCO1FBQUEsQ0FBQyxlQUFLLENBQ0osR0FBRyxDQUFDLENBQUMsbUJBQVksQ0FBQyxDQUNsQixLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FDWixNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FDWixHQUFHLENBQUMsY0FBYyxFQUVwQjtRQUFBLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxvRkFBb0YsRUFDckc7TUFBQSxFQUFFLE1BQU0sQ0FDVjtJQUFBLEVBQUUsT0FBTyxDQUFDLENBQ1gsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IElucHV0IH0gZnJvbSBcIi4uL3VpL2lucHV0XCI7XHJcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gXCIuLi91aS9idXR0b25cIjtcclxuaW1wb3J0IEltYWdlIGZyb20gXCJuZXh0L2ltYWdlXCI7XHJcbmltcG9ydCBDb21pY0dhbGxlcnkgZnJvbSBcIkAvYXNzZXRzL25lcmR3b3JrKy9jb21pcy5wbmdcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFdhaXRsaXN0KCkge1xyXG4gIHJldHVybiAoXHJcbiAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJ0ZXh0LXdoaXRlIGZvbnQtaW50ZXIgbWQ6dGV4dC1jZW50ZXIgbWF4LXctWzE2MDBweF0gbWF4LWxnOnB5LTEwIG14LWF1dG8gZmxleCBmbGV4LWNvbCBnYXAtNSBtZDppdGVtcy1jZW50ZXJcIj5cclxuICAgICAgPGgyIGNsYXNzTmFtZT1cImZvbnQtb2Jvc3RhciB0ZXh0LVs0MHB4XSBtYXgtbWQ6dGV4dC0yeGwgcHgtN1wiPlxyXG4gICAgICAgIEpvaW4gVG9kYXlcclxuICAgICAgPC9oMj5cclxuICAgICAgPHAgY2xhc3NOYW1lPVwicHgtN1wiPkZyZWUgdG8gam9pbiwgcGF5IGFzIHlvdSBnbzwvcD5cclxuXHJcbiAgICAgIDxmb3JtIGNsYXNzTmFtZT1cIm1heC13LVs2MDBweF0gcHgtNyBtYi0xMiB3LWZ1bGwgZmxleCBnYXAtMyBqdXN0aWZ5LWNlbnRlciBpdGVtcy1zdHJldGNoXCI+XHJcbiAgICAgICAgPElucHV0XHJcbiAgICAgICAgICB0eXBlPVwiZW1haWxcIlxyXG4gICAgICAgICAgY2xhc3NOYW1lPVwiYmctWyMxNzE3MUFdIG91dGxpbmUtbm9uZSBib3JkZXItbm9uZSB3LWZ1bGwgcm91bmRlZC1bOHB4XSBweS0yLjUgcGwtNCB3LVwiXHJcbiAgICAgICAgICBwbGFjZWhvbGRlcj1cIkVtYWlsIGFkZHJlc3NcIlxyXG4gICAgICAgIC8+XHJcbiAgICAgICAgPEJ1dHRvbiB2YXJpYW50PXtcInByaW1hcnlcIn0gY2xhc3NOYW1lPVwiaC1mdWxsIGZvbnQtaW50ZXJcIj5cclxuICAgICAgICAgIEpvaW4gV2FpdGxpc3RcclxuICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgPC9mb3JtPlxyXG5cclxuICAgICAgPGZpZ3VyZSBjbGFzc05hbWU9XCJyZWxhdGl2ZVwiPlxyXG4gICAgICAgIDxJbWFnZVxyXG4gICAgICAgICAgc3JjPXtDb21pY0dhbGxlcnl9XHJcbiAgICAgICAgICB3aWR0aD17Mjg2N31cclxuICAgICAgICAgIGhlaWdodD17OTExfVxyXG4gICAgICAgICAgYWx0PVwiY29taWMgaW1hZ2VzXCJcclxuICAgICAgICAvPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCBiZy1bbGluZWFyLWdyYWRpZW50KDE4MGRlZywjMEQwRDBEXzAlLHJnYmEoMTMsMTMsMTMsMClfNzAlKV0gei0xMFwiIC8+XHJcbiAgICAgIDwvZmlndXJlPlxyXG4gICAgPC9zZWN0aW9uPlxyXG4gICk7XHJcbn1cclxuIl19