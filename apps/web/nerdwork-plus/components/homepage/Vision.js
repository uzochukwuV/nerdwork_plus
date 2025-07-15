"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Vision;
const react_1 = __importDefault(require("react"));
const button_1 = require("../ui/button");
function Vision() {
    return (<section className="relative lg:min-h-screen w-full">
      <div className="absolute inset-0 bg-[url('/vision.png')] bg-cover bg-center bg-no-repeat z-0 px-7"/>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#0D0D0D_0%,rgba(13,13,13,0)_100%)] z-10"/>
      <div className="relative z-20 flex flex-col items-center max-md:items-start gap-6 text-center max-md:text-left text-white max-lg:h-[75vh] h-screen max-w-[1130px] mx-auto py-20 px-7">
        <h2 className="font-obostar text-[40px] max-md:text-2xl">
          Passion meets
          <br />
          Community
        </h2>
        <p className="font-semibold max-md:text-sm">
          Where your passions bring people together. Our goal is to create the
          <br className="max-md:hidden"/>
          best ecosystem for storytellers, artists, and nerds in Africa.
        </p>
        <button_1.Button variant={"primary"}>Our Vision</button_1.Button>
      </div>
    </section>);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmlzaW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiVmlzaW9uLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUdBLHlCQW9CQztBQXZCRCxrREFBMEI7QUFDMUIseUNBQXNDO0FBRXRDLFNBQXdCLE1BQU07SUFDNUIsT0FBTyxDQUNMLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxpQ0FBaUMsQ0FDbEQ7TUFBQSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsbUZBQW1GLEVBQ2xHO01BQUEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLHFGQUFxRixFQUNwRztNQUFBLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxzS0FBc0ssQ0FDbkw7UUFBQSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsMENBQTBDLENBQ3REOztVQUNBLENBQUMsRUFBRSxDQUFDLEFBQUQsRUFDSDs7UUFDRixFQUFFLEVBQUUsQ0FDSjtRQUFBLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyw4QkFBOEIsQ0FDekM7O1VBQ0EsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLGVBQWUsRUFDN0I7O1FBQ0YsRUFBRSxDQUFDLENBQ0g7UUFBQSxDQUFDLGVBQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxVQUFVLEVBQUUsZUFBTSxDQUNoRDtNQUFBLEVBQUUsR0FBRyxDQUNQO0lBQUEsRUFBRSxPQUFPLENBQUMsQ0FDWCxDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSBcIi4uL3VpL2J1dHRvblwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gVmlzaW9uKCkge1xyXG4gIHJldHVybiAoXHJcbiAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBsZzptaW4taC1zY3JlZW4gdy1mdWxsXCI+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCBiZy1bdXJsKCcvdmlzaW9uLnBuZycpXSBiZy1jb3ZlciBiZy1jZW50ZXIgYmctbm8tcmVwZWF0IHotMCBweC03XCIgLz5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIGJnLVtsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCMwRDBEMERfMCUscmdiYSgxMywxMywxMywwKV8xMDAlKV0gei0xMFwiIC8+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgei0yMCBmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciBtYXgtbWQ6aXRlbXMtc3RhcnQgZ2FwLTYgdGV4dC1jZW50ZXIgbWF4LW1kOnRleHQtbGVmdCB0ZXh0LXdoaXRlIG1heC1sZzpoLVs3NXZoXSBoLXNjcmVlbiBtYXgtdy1bMTEzMHB4XSBteC1hdXRvIHB5LTIwIHB4LTdcIj5cclxuICAgICAgICA8aDIgY2xhc3NOYW1lPVwiZm9udC1vYm9zdGFyIHRleHQtWzQwcHhdIG1heC1tZDp0ZXh0LTJ4bFwiPlxyXG4gICAgICAgICAgUGFzc2lvbiBtZWV0c1xyXG4gICAgICAgICAgPGJyIC8+XHJcbiAgICAgICAgICBDb21tdW5pdHlcclxuICAgICAgICA8L2gyPlxyXG4gICAgICAgIDxwIGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGQgbWF4LW1kOnRleHQtc21cIj5cclxuICAgICAgICAgIFdoZXJlIHlvdXIgcGFzc2lvbnMgYnJpbmcgcGVvcGxlIHRvZ2V0aGVyLiBPdXIgZ29hbCBpcyB0byBjcmVhdGUgdGhlXHJcbiAgICAgICAgICA8YnIgY2xhc3NOYW1lPVwibWF4LW1kOmhpZGRlblwiIC8+XHJcbiAgICAgICAgICBiZXN0IGVjb3N5c3RlbSBmb3Igc3Rvcnl0ZWxsZXJzLCBhcnRpc3RzLCBhbmQgbmVyZHMgaW4gQWZyaWNhLlxyXG4gICAgICAgIDwvcD5cclxuICAgICAgICA8QnV0dG9uIHZhcmlhbnQ9e1wicHJpbWFyeVwifT5PdXIgVmlzaW9uPC9CdXR0b24+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9zZWN0aW9uPlxyXG4gICk7XHJcbn1cclxuIl19