"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Community;
const react_1 = __importDefault(require("react"));
const button_1 = require("../ui/button");
const image_1 = __importDefault(require("next/image"));
const costume_png_1 = __importDefault(require("@/assets/costume.png"));
const mask_png_1 = __importDefault(require("@/assets/mask.png"));
const arrow_png_1 = __importDefault(require("@/assets/arrow.png"));
const woman_png_1 = __importDefault(require("@/assets/woman.png"));
const comic_con1_png_1 = __importDefault(require("@/assets/comic-con1.png"));
const link_1 = __importDefault(require("next/link"));
function Community() {
    const communities = [
        "Pop Culture",
        "Video Games",
        "Comics",
        "Theatre",
        "Anime",
        "Books",
        "Movies",
        "Music",
    ];
    return (<section data-testid="community" className="z-10 flex items-center max-w-[1130px] font-inter mx-auto text-white pt-12 pb-28 px-7">
      <aside className="lg:w-2/5 max-lg::w-3/5 flex flex-col max-lg:gap-4 gap-6">
        <h2 className="font-obostar text-[40px] max-md:text-2xl">
          People
          <br />
          passion
          <br />
          community
        </h2>
        <p className="font-semibold max-md:text-sm">
          No matter your passion, there&apos;s a community for you.
        </p>
        {communities.map((community, index) => (<div key={index} className="group flex gap-4 items-center">
            <p className="text-2xl max-md:text-lg font-medium cursor-pointer text-[#9C9C9C] md:hover:text-[#EDEBEB]">
              {community}
            </p>
            <link_1.default href={"/communities"}>
              <button_1.Button variant={"primary"} className="max-md:hidden font-inter rounded-[12px] opacity-0 group-hover:opacity-100 transition duration-200 ease-in">
                Join Community
              </button_1.Button>
            </link_1.default>
          </div>))}
      </aside>

      {/* Desktop image gallery */}
      <section className="lg:w-3/5 hidden lg:flex flex-col gap-16">
        <div className="flex justify-center gap-20">
          <image_1.default src={costume_png_1.default} width={241} height={302} alt="comic con image"/>
          <image_1.default src={mask_png_1.default} width={257} height={334} alt="comic con image"/>
        </div>
        <div className="flex gap-7 -ml-20 max-xl:overflow-hidden">
          <image_1.default src={arrow_png_1.default} width={450} height={324} alt="comic con image"/>
          <image_1.default src={woman_png_1.default} width={303} height={370} alt="comic con image" className=""/>
        </div>
      </section>

      {/* Mobile image gallery */}
      <section className="lg:hidden max-lg:2/5 overflow-hidden flex flex-col items-center gap-4">
        <image_1.default src={mask_png_1.default} width={181} height={227} alt="comic con image"/>
        <image_1.default src={comic_con1_png_1.default} width={254} height={159} alt="comic con image"/>
        <image_1.default src={costume_png_1.default} width={150} height={188} alt="comic con image"/>
      </section>
    </section>);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tbXVuaXR5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQ29tbXVuaXR5LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQVVBLDRCQXNFQztBQWhGRCxrREFBMEI7QUFDMUIseUNBQXNDO0FBQ3RDLHVEQUErQjtBQUMvQix1RUFBeUM7QUFDekMsaUVBQXNDO0FBQ3RDLG1FQUF1QztBQUN2QyxtRUFBdUM7QUFDdkMsNkVBQWdEO0FBQ2hELHFEQUE2QjtBQUU3QixTQUF3QixTQUFTO0lBQy9CLE1BQU0sV0FBVyxHQUFHO1FBQ2xCLGFBQWE7UUFDYixhQUFhO1FBQ2IsUUFBUTtRQUNSLFNBQVM7UUFDVCxPQUFPO1FBQ1AsT0FBTztRQUNQLFFBQVE7UUFDUixPQUFPO0tBQ1IsQ0FBQztJQUNGLE9BQU8sQ0FDTCxDQUFDLE9BQU8sQ0FDTixXQUFXLENBQUMsV0FBVyxDQUN2QixTQUFTLENBQUMsc0ZBQXNGLENBRWhHO01BQUEsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLHlEQUF5RCxDQUN4RTtRQUFBLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQywwQ0FBMEMsQ0FDdEQ7O1VBQ0EsQ0FBQyxFQUFFLENBQUMsQUFBRCxFQUNIOztVQUNBLENBQUMsRUFBRSxDQUFDLEFBQUQsRUFDSDs7UUFDRixFQUFFLEVBQUUsQ0FDSjtRQUFBLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyw4QkFBOEIsQ0FDekM7O1FBQ0YsRUFBRSxDQUFDLENBQ0g7UUFBQSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUNyQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUFTLENBQUMsK0JBQStCLENBQ3hEO1lBQUEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLDJGQUEyRixDQUN0RztjQUFBLENBQUMsU0FBUyxDQUNaO1lBQUEsRUFBRSxDQUFDLENBQ0g7WUFBQSxDQUFDLGNBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FDekI7Y0FBQSxDQUFDLGVBQU0sQ0FDTCxPQUFPLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FDbkIsU0FBUyxDQUFDLDJHQUEyRyxDQUVySDs7Y0FDRixFQUFFLGVBQU0sQ0FDVjtZQUFBLEVBQUUsY0FBSSxDQUNSO1VBQUEsRUFBRSxHQUFHLENBQUMsQ0FDUCxDQUFDLENBQ0o7TUFBQSxFQUFFLEtBQUssQ0FFUDs7TUFBQSxDQUFDLDJCQUEyQixDQUM1QjtNQUFBLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyx5Q0FBeUMsQ0FDMUQ7UUFBQSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsNEJBQTRCLENBQ3pDO1VBQUEsQ0FBQyxlQUFLLENBQUMsR0FBRyxDQUFDLENBQUMscUJBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFDakU7VUFBQSxDQUFDLGVBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxrQkFBSyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUNuRTtRQUFBLEVBQUUsR0FBRyxDQUNMO1FBQUEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLDBDQUEwQyxDQUN2RDtVQUFBLENBQUMsZUFBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLG1CQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQ2pFO1VBQUEsQ0FBQyxlQUFLLENBQ0osR0FBRyxDQUFDLENBQUMsbUJBQUssQ0FBQyxDQUNYLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUNYLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUNaLEdBQUcsQ0FBQyxpQkFBaUIsQ0FDckIsU0FBUyxDQUFDLEVBQUUsRUFFaEI7UUFBQSxFQUFFLEdBQUcsQ0FDUDtNQUFBLEVBQUUsT0FBTyxDQUVUOztNQUFBLENBQUMsMEJBQTBCLENBQzNCO01BQUEsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLHVFQUF1RSxDQUN4RjtRQUFBLENBQUMsZUFBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLGtCQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQ2pFO1FBQUEsQ0FBQyxlQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsd0JBQVMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFDckU7UUFBQSxDQUFDLGVBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxxQkFBSyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUNuRTtNQUFBLEVBQUUsT0FBTyxDQUNYO0lBQUEsRUFBRSxPQUFPLENBQUMsQ0FDWCxDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSBcIi4uL3VpL2J1dHRvblwiO1xyXG5pbXBvcnQgSW1hZ2UgZnJvbSBcIm5leHQvaW1hZ2VcIjtcclxuaW1wb3J0IENhcmQxIGZyb20gXCJAL2Fzc2V0cy9jb3N0dW1lLnBuZ1wiO1xyXG5pbXBvcnQgQ2FyZDIgZnJvbSBcIkAvYXNzZXRzL21hc2sucG5nXCI7XHJcbmltcG9ydCBDYXJkMyBmcm9tIFwiQC9hc3NldHMvYXJyb3cucG5nXCI7XHJcbmltcG9ydCBDYXJkNCBmcm9tIFwiQC9hc3NldHMvd29tYW4ucG5nXCI7XHJcbmltcG9ydCBDb21pY0NvbjEgZnJvbSBcIkAvYXNzZXRzL2NvbWljLWNvbjEucG5nXCI7XHJcbmltcG9ydCBMaW5rIGZyb20gXCJuZXh0L2xpbmtcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIENvbW11bml0eSgpIHtcclxuICBjb25zdCBjb21tdW5pdGllcyA9IFtcclxuICAgIFwiUG9wIEN1bHR1cmVcIixcclxuICAgIFwiVmlkZW8gR2FtZXNcIixcclxuICAgIFwiQ29taWNzXCIsXHJcbiAgICBcIlRoZWF0cmVcIixcclxuICAgIFwiQW5pbWVcIixcclxuICAgIFwiQm9va3NcIixcclxuICAgIFwiTW92aWVzXCIsXHJcbiAgICBcIk11c2ljXCIsXHJcbiAgXTtcclxuICByZXR1cm4gKFxyXG4gICAgPHNlY3Rpb25cclxuICAgICAgZGF0YS10ZXN0aWQ9XCJjb21tdW5pdHlcIlxyXG4gICAgICBjbGFzc05hbWU9XCJ6LTEwIGZsZXggaXRlbXMtY2VudGVyIG1heC13LVsxMTMwcHhdIGZvbnQtaW50ZXIgbXgtYXV0byB0ZXh0LXdoaXRlIHB0LTEyIHBiLTI4IHB4LTdcIlxyXG4gICAgPlxyXG4gICAgICA8YXNpZGUgY2xhc3NOYW1lPVwibGc6dy0yLzUgbWF4LWxnOjp3LTMvNSBmbGV4IGZsZXgtY29sIG1heC1sZzpnYXAtNCBnYXAtNlwiPlxyXG4gICAgICAgIDxoMiBjbGFzc05hbWU9XCJmb250LW9ib3N0YXIgdGV4dC1bNDBweF0gbWF4LW1kOnRleHQtMnhsXCI+XHJcbiAgICAgICAgICBQZW9wbGVcclxuICAgICAgICAgIDxiciAvPlxyXG4gICAgICAgICAgcGFzc2lvblxyXG4gICAgICAgICAgPGJyIC8+XHJcbiAgICAgICAgICBjb21tdW5pdHlcclxuICAgICAgICA8L2gyPlxyXG4gICAgICAgIDxwIGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGQgbWF4LW1kOnRleHQtc21cIj5cclxuICAgICAgICAgIE5vIG1hdHRlciB5b3VyIHBhc3Npb24sIHRoZXJlJmFwb3M7cyBhIGNvbW11bml0eSBmb3IgeW91LlxyXG4gICAgICAgIDwvcD5cclxuICAgICAgICB7Y29tbXVuaXRpZXMubWFwKChjb21tdW5pdHksIGluZGV4KSA9PiAoXHJcbiAgICAgICAgICA8ZGl2IGtleT17aW5kZXh9IGNsYXNzTmFtZT1cImdyb3VwIGZsZXggZ2FwLTQgaXRlbXMtY2VudGVyXCI+XHJcbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtMnhsIG1heC1tZDp0ZXh0LWxnIGZvbnQtbWVkaXVtIGN1cnNvci1wb2ludGVyIHRleHQtWyM5QzlDOUNdIG1kOmhvdmVyOnRleHQtWyNFREVCRUJdXCI+XHJcbiAgICAgICAgICAgICAge2NvbW11bml0eX1cclxuICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICA8TGluayBocmVmPXtcIi9jb21tdW5pdGllc1wifT5cclxuICAgICAgICAgICAgICA8QnV0dG9uXHJcbiAgICAgICAgICAgICAgICB2YXJpYW50PXtcInByaW1hcnlcIn1cclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1heC1tZDpoaWRkZW4gZm9udC1pbnRlciByb3VuZGVkLVsxMnB4XSBvcGFjaXR5LTAgZ3JvdXAtaG92ZXI6b3BhY2l0eS0xMDAgdHJhbnNpdGlvbiBkdXJhdGlvbi0yMDAgZWFzZS1pblwiXHJcbiAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgSm9pbiBDb21tdW5pdHlcclxuICAgICAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgICAgPC9MaW5rPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKSl9XHJcbiAgICAgIDwvYXNpZGU+XHJcblxyXG4gICAgICB7LyogRGVza3RvcCBpbWFnZSBnYWxsZXJ5ICovfVxyXG4gICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJsZzp3LTMvNSBoaWRkZW4gbGc6ZmxleCBmbGV4LWNvbCBnYXAtMTZcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1jZW50ZXIgZ2FwLTIwXCI+XHJcbiAgICAgICAgICA8SW1hZ2Ugc3JjPXtDYXJkMX0gd2lkdGg9ezI0MX0gaGVpZ2h0PXszMDJ9IGFsdD1cImNvbWljIGNvbiBpbWFnZVwiIC8+XHJcbiAgICAgICAgICA8SW1hZ2Ugc3JjPXtDYXJkMn0gd2lkdGg9ezI1N30gaGVpZ2h0PXszMzR9IGFsdD1cImNvbWljIGNvbiBpbWFnZVwiIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGdhcC03IC1tbC0yMCBtYXgteGw6b3ZlcmZsb3ctaGlkZGVuXCI+XHJcbiAgICAgICAgICA8SW1hZ2Ugc3JjPXtDYXJkM30gd2lkdGg9ezQ1MH0gaGVpZ2h0PXszMjR9IGFsdD1cImNvbWljIGNvbiBpbWFnZVwiIC8+XHJcbiAgICAgICAgICA8SW1hZ2VcclxuICAgICAgICAgICAgc3JjPXtDYXJkNH1cclxuICAgICAgICAgICAgd2lkdGg9ezMwM31cclxuICAgICAgICAgICAgaGVpZ2h0PXszNzB9XHJcbiAgICAgICAgICAgIGFsdD1cImNvbWljIGNvbiBpbWFnZVwiXHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIlwiXHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L3NlY3Rpb24+XHJcblxyXG4gICAgICB7LyogTW9iaWxlIGltYWdlIGdhbGxlcnkgKi99XHJcbiAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cImxnOmhpZGRlbiBtYXgtbGc6Mi81IG92ZXJmbG93LWhpZGRlbiBmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciBnYXAtNFwiPlxyXG4gICAgICAgIDxJbWFnZSBzcmM9e0NhcmQyfSB3aWR0aD17MTgxfSBoZWlnaHQ9ezIyN30gYWx0PVwiY29taWMgY29uIGltYWdlXCIgLz5cclxuICAgICAgICA8SW1hZ2Ugc3JjPXtDb21pY0NvbjF9IHdpZHRoPXsyNTR9IGhlaWdodD17MTU5fSBhbHQ9XCJjb21pYyBjb24gaW1hZ2VcIiAvPlxyXG4gICAgICAgIDxJbWFnZSBzcmM9e0NhcmQxfSB3aWR0aD17MTUwfSBoZWlnaHQ9ezE4OH0gYWx0PVwiY29taWMgY29uIGltYWdlXCIgLz5cclxuICAgICAgPC9zZWN0aW9uPlxyXG4gICAgPC9zZWN0aW9uPlxyXG4gICk7XHJcbn1cclxuIl19