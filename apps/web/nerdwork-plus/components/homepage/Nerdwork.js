"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Nerdwork;
const react_1 = __importDefault(require("react"));
const button_1 = require("../ui/button");
const link_1 = __importDefault(require("next/link"));
const features = [
    {
        id: 1,
        title: "Discover African Stories",
        content: "Immerse yourself in authentic African narratives, from folklore to futuristic adventures.",
    },
    {
        id: 2,
        title: "Better Reading Experience",
        content: "Seamless, immersive, and tailored for your comfort, enjoy comics like never before.",
    },
    {
        id: 3,
        title: "Excellent Creator Management",
        content: "Empowering African creators with the tools to bring stories to life.",
    },
    {
        id: 4,
        title: "African Focused Voice",
        content: "Bringing African culture, creativity, and perspectives to the world.",
    },
];
function Nerdwork() {
    return (<section data-testid="nerdwork" className="relative min-h-screen w-full">
      <div className="absolute inset-0 bg-[url('/gallery.png')] bg-cover md:bg-center bg-no-repeat z-0"/>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#0D0D0D_0%,rgba(13,13,13,0)_40%,#0D0D0D_66%)] z-10"/>
      <div className="relative z-20 text-white max-w-[1130px] min-h-screen mx-auto flex flex-col justify-between max-lg:gap-64 gap-6 font-inter py-5 px-7 text-center">
        <div className="flex flex-col gap-6">
          <h2 className="font-obostar text-[40px] max-md:text-2xl">
            Redefining
            <br />
            African
            <br />
            Storytelling
          </h2>
          <p className="max-md:text-sm">
            Step into a universe of African comics like never before.
          </p>
          <div className="flex gap-4 max-md:w-full justify-center">
            <link_1.default href={"/nerdwork+"}>
              <button_1.Button variant={"primary"}>Go to Nerdwork+</button_1.Button>
            </link_1.default>
            <link_1.default href={"/nerdwork+"}>
              <button_1.Button>Learn More</button_1.Button>
            </link_1.default>
          </div>
        </div>
        <div>
          <h3 className="font-obostar text-[28px] max-md:text-lg max-md:text-left max-md:mb-8 mb-20">
            From Creators to Devoted
            <br />
            Readers. There&apos;s a story
            <br />
            for Everyone
          </h3>
          <section className="flex max-md:flex-col max-md:gap-6 gap-16">
            {features.map((feat) => (<div key={feat.id} className="flex max-md:flex-row flex-col gap-3 text-left">
                <h4 className="text-[28px] max-md:text-lg font-obostar">
                  {feat.id}
                </h4>
                <div className="">
                  <p className="font-semibold max-md:text-sm">{feat.title}</p>
                  <span className="text-[#FFFFFFB2] max-md:text-[13px]">
                    {feat.content}
                  </span>
                </div>
              </div>))}
          </section>
        </div>
      </div>
    </section>);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTmVyZHdvcmsuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJOZXJkd29yay50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUErQkEsMkJBd0RDO0FBdkZELGtEQUEwQjtBQUMxQix5Q0FBc0M7QUFDdEMscURBQTZCO0FBRTdCLE1BQU0sUUFBUSxHQUFHO0lBQ2Y7UUFDRSxFQUFFLEVBQUUsQ0FBQztRQUNMLEtBQUssRUFBRSwwQkFBMEI7UUFDakMsT0FBTyxFQUNMLDJGQUEyRjtLQUM5RjtJQUNEO1FBQ0UsRUFBRSxFQUFFLENBQUM7UUFDTCxLQUFLLEVBQUUsMkJBQTJCO1FBQ2xDLE9BQU8sRUFDTCxxRkFBcUY7S0FDeEY7SUFDRDtRQUNFLEVBQUUsRUFBRSxDQUFDO1FBQ0wsS0FBSyxFQUFFLDhCQUE4QjtRQUNyQyxPQUFPLEVBQ0wsc0VBQXNFO0tBQ3pFO0lBQ0Q7UUFDRSxFQUFFLEVBQUUsQ0FBQztRQUNMLEtBQUssRUFBRSx1QkFBdUI7UUFDOUIsT0FBTyxFQUNMLHNFQUFzRTtLQUN6RTtDQUNGLENBQUM7QUFFRixTQUF3QixRQUFRO0lBQzlCLE9BQU8sQ0FDTCxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyw4QkFBOEIsQ0FDdEU7TUFBQSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsa0ZBQWtGLEVBQ2pHO01BQUEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLGdHQUFnRyxFQUMvRztNQUFBLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxpSkFBaUosQ0FDOUo7UUFBQSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMscUJBQXFCLENBQ2xDO1VBQUEsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLDBDQUEwQyxDQUN0RDs7WUFDQSxDQUFDLEVBQUUsQ0FBQyxBQUFELEVBQ0g7O1lBQ0EsQ0FBQyxFQUFFLENBQUMsQUFBRCxFQUNIOztVQUNGLEVBQUUsRUFBRSxDQUNKO1VBQUEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUMzQjs7VUFDRixFQUFFLENBQUMsQ0FDSDtVQUFBLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyx5Q0FBeUMsQ0FDdEQ7WUFBQSxDQUFDLGNBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FDdkI7Y0FBQSxDQUFDLGVBQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxlQUFlLEVBQUUsZUFBTSxDQUNyRDtZQUFBLEVBQUUsY0FBSSxDQUNOO1lBQUEsQ0FBQyxjQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQ3ZCO2NBQUEsQ0FBQyxlQUFNLENBQUMsVUFBVSxFQUFFLGVBQU0sQ0FDNUI7WUFBQSxFQUFFLGNBQUksQ0FDUjtVQUFBLEVBQUUsR0FBRyxDQUNQO1FBQUEsRUFBRSxHQUFHLENBQ0w7UUFBQSxDQUFDLEdBQUcsQ0FDRjtVQUFBLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyw0RUFBNEUsQ0FDeEY7O1lBQ0EsQ0FBQyxFQUFFLENBQUMsQUFBRCxFQUNIOztZQUNBLENBQUMsRUFBRSxDQUFDLEFBQUQsRUFDSDs7VUFDRixFQUFFLEVBQUUsQ0FDSjtVQUFBLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQywwQ0FBMEMsQ0FDM0Q7WUFBQSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQ3RCLENBQUMsR0FBRyxDQUNGLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FDYixTQUFTLENBQUMsK0NBQStDLENBRXpEO2dCQUFBLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyx5Q0FBeUMsQ0FDckQ7a0JBQUEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUNWO2dCQUFBLEVBQUUsRUFBRSxDQUNKO2dCQUFBLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQ2Y7a0JBQUEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLDhCQUE4QixDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FDM0Q7a0JBQUEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLHFDQUFxQyxDQUNuRDtvQkFBQSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQ2Y7a0JBQUEsRUFBRSxJQUFJLENBQ1I7Z0JBQUEsRUFBRSxHQUFHLENBQ1A7Y0FBQSxFQUFFLEdBQUcsQ0FBQyxDQUNQLENBQUMsQ0FDSjtVQUFBLEVBQUUsT0FBTyxDQUNYO1FBQUEsRUFBRSxHQUFHLENBQ1A7TUFBQSxFQUFFLEdBQUcsQ0FDUDtJQUFBLEVBQUUsT0FBTyxDQUFDLENBQ1gsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gXCIuLi91aS9idXR0b25cIjtcclxuaW1wb3J0IExpbmsgZnJvbSBcIm5leHQvbGlua1wiO1xyXG5cclxuY29uc3QgZmVhdHVyZXMgPSBbXHJcbiAge1xyXG4gICAgaWQ6IDEsXHJcbiAgICB0aXRsZTogXCJEaXNjb3ZlciBBZnJpY2FuIFN0b3JpZXNcIixcclxuICAgIGNvbnRlbnQ6XHJcbiAgICAgIFwiSW1tZXJzZSB5b3Vyc2VsZiBpbiBhdXRoZW50aWMgQWZyaWNhbiBuYXJyYXRpdmVzLCBmcm9tIGZvbGtsb3JlIHRvIGZ1dHVyaXN0aWMgYWR2ZW50dXJlcy5cIixcclxuICB9LFxyXG4gIHtcclxuICAgIGlkOiAyLFxyXG4gICAgdGl0bGU6IFwiQmV0dGVyIFJlYWRpbmcgRXhwZXJpZW5jZVwiLFxyXG4gICAgY29udGVudDpcclxuICAgICAgXCJTZWFtbGVzcywgaW1tZXJzaXZlLCBhbmQgdGFpbG9yZWQgZm9yIHlvdXIgY29tZm9ydCwgZW5qb3kgY29taWNzIGxpa2UgbmV2ZXIgYmVmb3JlLlwiLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgaWQ6IDMsXHJcbiAgICB0aXRsZTogXCJFeGNlbGxlbnQgQ3JlYXRvciBNYW5hZ2VtZW50XCIsXHJcbiAgICBjb250ZW50OlxyXG4gICAgICBcIkVtcG93ZXJpbmcgQWZyaWNhbiBjcmVhdG9ycyB3aXRoIHRoZSB0b29scyB0byBicmluZyBzdG9yaWVzIHRvIGxpZmUuXCIsXHJcbiAgfSxcclxuICB7XHJcbiAgICBpZDogNCxcclxuICAgIHRpdGxlOiBcIkFmcmljYW4gRm9jdXNlZCBWb2ljZVwiLFxyXG4gICAgY29udGVudDpcclxuICAgICAgXCJCcmluZ2luZyBBZnJpY2FuIGN1bHR1cmUsIGNyZWF0aXZpdHksIGFuZCBwZXJzcGVjdGl2ZXMgdG8gdGhlIHdvcmxkLlwiLFxyXG4gIH0sXHJcbl07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBOZXJkd29yaygpIHtcclxuICByZXR1cm4gKFxyXG4gICAgPHNlY3Rpb24gZGF0YS10ZXN0aWQ9XCJuZXJkd29ya1wiIGNsYXNzTmFtZT1cInJlbGF0aXZlIG1pbi1oLXNjcmVlbiB3LWZ1bGxcIj5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIGJnLVt1cmwoJy9nYWxsZXJ5LnBuZycpXSBiZy1jb3ZlciBtZDpiZy1jZW50ZXIgYmctbm8tcmVwZWF0IHotMFwiIC8+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCBiZy1bbGluZWFyLWdyYWRpZW50KDE4MGRlZywjMEQwRDBEXzAlLHJnYmEoMTMsMTMsMTMsMClfNDAlLCMwRDBEMERfNjYlKV0gei0xMFwiIC8+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgei0yMCB0ZXh0LXdoaXRlIG1heC13LVsxMTMwcHhdIG1pbi1oLXNjcmVlbiBteC1hdXRvIGZsZXggZmxleC1jb2wganVzdGlmeS1iZXR3ZWVuIG1heC1sZzpnYXAtNjQgZ2FwLTYgZm9udC1pbnRlciBweS01IHB4LTcgdGV4dC1jZW50ZXJcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgZ2FwLTZcIj5cclxuICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJmb250LW9ib3N0YXIgdGV4dC1bNDBweF0gbWF4LW1kOnRleHQtMnhsXCI+XHJcbiAgICAgICAgICAgIFJlZGVmaW5pbmdcclxuICAgICAgICAgICAgPGJyIC8+XHJcbiAgICAgICAgICAgIEFmcmljYW5cclxuICAgICAgICAgICAgPGJyIC8+XHJcbiAgICAgICAgICAgIFN0b3J5dGVsbGluZ1xyXG4gICAgICAgICAgPC9oMj5cclxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cIm1heC1tZDp0ZXh0LXNtXCI+XHJcbiAgICAgICAgICAgIFN0ZXAgaW50byBhIHVuaXZlcnNlIG9mIEFmcmljYW4gY29taWNzIGxpa2UgbmV2ZXIgYmVmb3JlLlxyXG4gICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGdhcC00IG1heC1tZDp3LWZ1bGwganVzdGlmeS1jZW50ZXJcIj5cclxuICAgICAgICAgICAgPExpbmsgaHJlZj17XCIvbmVyZHdvcmsrXCJ9PlxyXG4gICAgICAgICAgICAgIDxCdXR0b24gdmFyaWFudD17XCJwcmltYXJ5XCJ9PkdvIHRvIE5lcmR3b3JrKzwvQnV0dG9uPlxyXG4gICAgICAgICAgICA8L0xpbms+XHJcbiAgICAgICAgICAgIDxMaW5rIGhyZWY9e1wiL25lcmR3b3JrK1wifT5cclxuICAgICAgICAgICAgICA8QnV0dG9uPkxlYXJuIE1vcmU8L0J1dHRvbj5cclxuICAgICAgICAgICAgPC9MaW5rPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdj5cclxuICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJmb250LW9ib3N0YXIgdGV4dC1bMjhweF0gbWF4LW1kOnRleHQtbGcgbWF4LW1kOnRleHQtbGVmdCBtYXgtbWQ6bWItOCBtYi0yMFwiPlxyXG4gICAgICAgICAgICBGcm9tIENyZWF0b3JzIHRvIERldm90ZWRcclxuICAgICAgICAgICAgPGJyIC8+XHJcbiAgICAgICAgICAgIFJlYWRlcnMuIFRoZXJlJmFwb3M7cyBhIHN0b3J5XHJcbiAgICAgICAgICAgIDxiciAvPlxyXG4gICAgICAgICAgICBmb3IgRXZlcnlvbmVcclxuICAgICAgICAgIDwvaDM+XHJcbiAgICAgICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJmbGV4IG1heC1tZDpmbGV4LWNvbCBtYXgtbWQ6Z2FwLTYgZ2FwLTE2XCI+XHJcbiAgICAgICAgICAgIHtmZWF0dXJlcy5tYXAoKGZlYXQpID0+IChcclxuICAgICAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgICAgICBrZXk9e2ZlYXQuaWR9XHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IG1heC1tZDpmbGV4LXJvdyBmbGV4LWNvbCBnYXAtMyB0ZXh0LWxlZnRcIlxyXG4gICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJ0ZXh0LVsyOHB4XSBtYXgtbWQ6dGV4dC1sZyBmb250LW9ib3N0YXJcIj5cclxuICAgICAgICAgICAgICAgICAge2ZlYXQuaWR9XHJcbiAgICAgICAgICAgICAgICA8L2g0PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJcIj5cclxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZm9udC1zZW1pYm9sZCBtYXgtbWQ6dGV4dC1zbVwiPntmZWF0LnRpdGxlfTwvcD5cclxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bI0ZGRkZGRkIyXSBtYXgtbWQ6dGV4dC1bMTNweF1cIj5cclxuICAgICAgICAgICAgICAgICAgICB7ZmVhdC5jb250ZW50fVxyXG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICA8L3NlY3Rpb24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9zZWN0aW9uPlxyXG4gICk7XHJcbn1cclxuIl19