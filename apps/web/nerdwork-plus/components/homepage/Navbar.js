"use client";
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Navbar;
const image_1 = __importDefault(require("next/image"));
const react_1 = __importDefault(require("react"));
const nerdwork_png_1 = __importDefault(require("@/assets/nerdwork.png"));
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
const link_1 = __importDefault(require("next/link"));
function Navbar() {
    const [isOpen, setIsOpen] = react_1.default.useState(false);
    const handleMenu = () => {
        setIsOpen(!isOpen);
    };
    return (<nav className="bg-[#0D0D0D1A] z-30 text-white fixed right-0 left-0 w-full border-b border-[#FFFFFF1A] backdrop-blur-[2px]">
      <section className="max-w-[1600px] mx-auto">
        <section className="lg:flex hidden gap-4 font-inter font-semibold justify-between h-[93px] items-center px-6">
          <link_1.default href={"/"}>
            <image_1.default src={nerdwork_png_1.default} width={146} height={40} alt="nerdwork logo"/>
          </link_1.default>
          <ul className="flex gap-10 items-center">
            <link_1.default href={"/communities"} className="hover:opacity-75">
              Communities
            </link_1.default>
            <link_1.default href={"/nerdwork+"} className="hover:opacity-75">
              Nerdwork+
            </link_1.default>
            <link_1.default href={"/events"} className="flex items-center gap-2 hover:opacity-75">
              Comic Con 2025{" "}
              <span className="bg-[#1BDB6C] font-medium px-2 pb-0.5 text-black rounded-[6px]">
                Soon
              </span>
            </link_1.default>
            <link_1.default href={"/events"} className="hover:opacity-75">
              Events
            </link_1.default>
            <li>Company</li>
          </ul>
          <div className="flex gap-4">
            <button_1.Button>Log In</button_1.Button>
            <button_1.Button variant={"primary"}>Sign Up</button_1.Button>
          </div>
        </section>

        {/* Mobile navbar */}
        <section className="max-lg:flex relative lg:hidden border-b border-[#FFFFFF1A] font-inter font-semibold justify-between h-[88px] items-center px-6">
          <link_1.default href={"/"}>
            <image_1.default src={nerdwork_png_1.default} width={146} height={40} alt="nerdwork logo"/>
          </link_1.default>
          <button onClick={handleMenu}>
            <lucide_react_1.MenuIcon />
          </button>
          {isOpen && (<div className="absolute right-0 top-0 flex flex-col w-full gap-8 bg-[#0D0D0D] px-5 py-7">
              <div className="flex justify-between items-center">
                <link_1.default href={"/"}>
                  <image_1.default src={nerdwork_png_1.default} width={146} height={40} alt="nerdwork logo"/>
                </link_1.default>
                <button onClick={handleMenu} className="">
                  <lucide_react_1.X />
                </button>
              </div>
              <ul className="flex flex-col gap-7">
                <link_1.default href={"/communities"}>Communities</link_1.default>
                <link_1.default href={"/nerdwork+"} className="hover:opacity-75">
                  Nerdwork+
                </link_1.default>
                <link_1.default href={"/events"} className="flex items-center gap-2">
                  Comic Con 2025{" "}
                  <span className="bg-[#1BDB6C] font-medium px-2 pb-0.5 text-black rounded-[6px]">
                    Soon
                  </span>
                </link_1.default>
                <link_1.default href={"/events"} className="hover:opacity-75">
                  Events
                </link_1.default>
                <li>Company</li>
              </ul>
              <div className="flex justify-between gap-4 w-full">
                <button_1.Button className="bg-[#343435] w-1/2">Log In</button_1.Button>
                <button_1.Button className="bg-[#3373D9] w-1/2">Sign Up</button_1.Button>
              </div>
            </div>)}
        </section>
      </section>
    </nav>);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTmF2YmFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiTmF2YmFyLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7Ozs7OztBQVFiLHlCQTBGQztBQWpHRCx1REFBK0I7QUFDL0Isa0RBQTBCO0FBQzFCLHlFQUF5QztBQUN6QyxtREFBZ0Q7QUFDaEQsK0NBQTJDO0FBQzNDLHFEQUE2QjtBQUU3QixTQUF3QixNQUFNO0lBQzVCLE1BQU0sQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLEdBQUcsZUFBSyxDQUFDLFFBQVEsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUUzRCxNQUFNLFVBQVUsR0FBRyxHQUFHLEVBQUU7UUFDdEIsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDckIsQ0FBQyxDQUFDO0lBRUYsT0FBTyxDQUNMLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyw0R0FBNEcsQ0FDekg7TUFBQSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsd0JBQXdCLENBQ3pDO1FBQUEsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLDBGQUEwRixDQUMzRztVQUFBLENBQUMsY0FBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUNkO1lBQUEsQ0FBQyxlQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsc0JBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQy9EO1VBQUEsRUFBRSxjQUFJLENBQ047VUFBQSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsMEJBQTBCLENBQ3RDO1lBQUEsQ0FBQyxjQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUN0RDs7WUFDRixFQUFFLGNBQUksQ0FDTjtZQUFBLENBQUMsY0FBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FDcEQ7O1lBQ0YsRUFBRSxjQUFJLENBQ047WUFBQSxDQUFDLGNBQUksQ0FDSCxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FDaEIsU0FBUyxDQUFDLDBDQUEwQyxDQUVwRDs0QkFBYyxDQUFDLEdBQUcsQ0FDbEI7Y0FBQSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsK0RBQStELENBQzdFOztjQUNGLEVBQUUsSUFBSSxDQUNSO1lBQUEsRUFBRSxjQUFJLENBQ047WUFBQSxDQUFDLGNBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQ2pEOztZQUNGLEVBQUUsY0FBSSxDQUNOO1lBQUEsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FDakI7VUFBQSxFQUFFLEVBQUUsQ0FDSjtVQUFBLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQ3pCO1lBQUEsQ0FBQyxlQUFNLENBQUMsTUFBTSxFQUFFLGVBQU0sQ0FDdEI7WUFBQSxDQUFDLGVBQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLEVBQUUsZUFBTSxDQUM3QztVQUFBLEVBQUUsR0FBRyxDQUNQO1FBQUEsRUFBRSxPQUFPLENBRVQ7O1FBQUEsQ0FBQyxtQkFBbUIsQ0FDcEI7UUFBQSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsZ0lBQWdJLENBQ2pKO1VBQUEsQ0FBQyxjQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQ2Q7WUFBQSxDQUFDLGVBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxzQkFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFDL0Q7VUFBQSxFQUFFLGNBQUksQ0FDTjtVQUFBLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUMxQjtZQUFBLENBQUMsdUJBQVEsQ0FBQyxBQUFELEVBQ1g7VUFBQSxFQUFFLE1BQU0sQ0FDUjtVQUFBLENBQUMsTUFBTSxJQUFJLENBQ1QsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLDBFQUEwRSxDQUN2RjtjQUFBLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxtQ0FBbUMsQ0FDaEQ7Z0JBQUEsQ0FBQyxjQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQ2Q7a0JBQUEsQ0FBQyxlQUFLLENBQ0osR0FBRyxDQUFDLENBQUMsc0JBQUksQ0FBQyxDQUNWLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUNYLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUNYLEdBQUcsQ0FBQyxlQUFlLEVBRXZCO2dCQUFBLEVBQUUsY0FBSSxDQUNOO2dCQUFBLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQ3ZDO2tCQUFBLENBQUMsZ0JBQUMsQ0FBQyxBQUFELEVBQ0o7Z0JBQUEsRUFBRSxNQUFNLENBQ1Y7Y0FBQSxFQUFFLEdBQUcsQ0FDTDtjQUFBLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsQ0FDakM7Z0JBQUEsQ0FBQyxjQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsV0FBVyxFQUFFLGNBQUksQ0FDN0M7Z0JBQUEsQ0FBQyxjQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUNwRDs7Z0JBQ0YsRUFBRSxjQUFJLENBQ047Z0JBQUEsQ0FBQyxjQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsU0FBUyxDQUFDLHlCQUF5QixDQUN4RDtnQ0FBYyxDQUFDLEdBQUcsQ0FDbEI7a0JBQUEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLCtEQUErRCxDQUM3RTs7a0JBQ0YsRUFBRSxJQUFJLENBQ1I7Z0JBQUEsRUFBRSxjQUFJLENBQ047Z0JBQUEsQ0FBQyxjQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUNqRDs7Z0JBQ0YsRUFBRSxjQUFJLENBQ047Z0JBQUEsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FDakI7Y0FBQSxFQUFFLEVBQUUsQ0FDSjtjQUFBLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxtQ0FBbUMsQ0FDaEQ7Z0JBQUEsQ0FBQyxlQUFNLENBQUMsU0FBUyxDQUFDLG9CQUFvQixDQUFDLE1BQU0sRUFBRSxlQUFNLENBQ3JEO2dCQUFBLENBQUMsZUFBTSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLEVBQUUsZUFBTSxDQUN4RDtjQUFBLEVBQUUsR0FBRyxDQUNQO1lBQUEsRUFBRSxHQUFHLENBQUMsQ0FDUCxDQUNIO1FBQUEsRUFBRSxPQUFPLENBQ1g7TUFBQSxFQUFFLE9BQU8sQ0FDWDtJQUFBLEVBQUUsR0FBRyxDQUFDLENBQ1AsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBjbGllbnRcIjtcclxuaW1wb3J0IEltYWdlIGZyb20gXCJuZXh0L2ltYWdlXCI7XHJcbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IExvZ28gZnJvbSBcIkAvYXNzZXRzL25lcmR3b3JrLnBuZ1wiO1xyXG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tIFwiQC9jb21wb25lbnRzL3VpL2J1dHRvblwiO1xyXG5pbXBvcnQgeyBNZW51SWNvbiwgWCB9IGZyb20gXCJsdWNpZGUtcmVhY3RcIjtcclxuaW1wb3J0IExpbmsgZnJvbSBcIm5leHQvbGlua1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTmF2YmFyKCkge1xyXG4gIGNvbnN0IFtpc09wZW4sIHNldElzT3Blbl0gPSBSZWFjdC51c2VTdGF0ZTxib29sZWFuPihmYWxzZSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZU1lbnUgPSAoKSA9PiB7XHJcbiAgICBzZXRJc09wZW4oIWlzT3Blbik7XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxuYXYgY2xhc3NOYW1lPVwiYmctWyMwRDBEMEQxQV0gei0zMCB0ZXh0LXdoaXRlIGZpeGVkIHJpZ2h0LTAgbGVmdC0wIHctZnVsbCBib3JkZXItYiBib3JkZXItWyNGRkZGRkYxQV0gYmFja2Ryb3AtYmx1ci1bMnB4XVwiPlxyXG4gICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJtYXgtdy1bMTYwMHB4XSBteC1hdXRvXCI+XHJcbiAgICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwibGc6ZmxleCBoaWRkZW4gZ2FwLTQgZm9udC1pbnRlciBmb250LXNlbWlib2xkIGp1c3RpZnktYmV0d2VlbiBoLVs5M3B4XSBpdGVtcy1jZW50ZXIgcHgtNlwiPlxyXG4gICAgICAgICAgPExpbmsgaHJlZj17XCIvXCJ9PlxyXG4gICAgICAgICAgICA8SW1hZ2Ugc3JjPXtMb2dvfSB3aWR0aD17MTQ2fSBoZWlnaHQ9ezQwfSBhbHQ9XCJuZXJkd29yayBsb2dvXCIgLz5cclxuICAgICAgICAgIDwvTGluaz5cclxuICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJmbGV4IGdhcC0xMCBpdGVtcy1jZW50ZXJcIj5cclxuICAgICAgICAgICAgPExpbmsgaHJlZj17XCIvY29tbXVuaXRpZXNcIn0gY2xhc3NOYW1lPVwiaG92ZXI6b3BhY2l0eS03NVwiPlxyXG4gICAgICAgICAgICAgIENvbW11bml0aWVzXHJcbiAgICAgICAgICAgIDwvTGluaz5cclxuICAgICAgICAgICAgPExpbmsgaHJlZj17XCIvbmVyZHdvcmsrXCJ9IGNsYXNzTmFtZT1cImhvdmVyOm9wYWNpdHktNzVcIj5cclxuICAgICAgICAgICAgICBOZXJkd29yaytcclxuICAgICAgICAgICAgPC9MaW5rPlxyXG4gICAgICAgICAgICA8TGlua1xyXG4gICAgICAgICAgICAgIGhyZWY9e1wiL2V2ZW50c1wifVxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIGhvdmVyOm9wYWNpdHktNzVcIlxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgQ29taWMgQ29uIDIwMjV7XCIgXCJ9XHJcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYmctWyMxQkRCNkNdIGZvbnQtbWVkaXVtIHB4LTIgcGItMC41IHRleHQtYmxhY2sgcm91bmRlZC1bNnB4XVwiPlxyXG4gICAgICAgICAgICAgICAgU29vblxyXG4gICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgPC9MaW5rPlxyXG4gICAgICAgICAgICA8TGluayBocmVmPXtcIi9ldmVudHNcIn0gY2xhc3NOYW1lPVwiaG92ZXI6b3BhY2l0eS03NVwiPlxyXG4gICAgICAgICAgICAgIEV2ZW50c1xyXG4gICAgICAgICAgICA8L0xpbms+XHJcbiAgICAgICAgICAgIDxsaT5Db21wYW55PC9saT5cclxuICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZ2FwLTRcIj5cclxuICAgICAgICAgICAgPEJ1dHRvbj5Mb2cgSW48L0J1dHRvbj5cclxuICAgICAgICAgICAgPEJ1dHRvbiB2YXJpYW50PXtcInByaW1hcnlcIn0+U2lnbiBVcDwvQnV0dG9uPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9zZWN0aW9uPlxyXG5cclxuICAgICAgICB7LyogTW9iaWxlIG5hdmJhciAqL31cclxuICAgICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJtYXgtbGc6ZmxleCByZWxhdGl2ZSBsZzpoaWRkZW4gYm9yZGVyLWIgYm9yZGVyLVsjRkZGRkZGMUFdIGZvbnQtaW50ZXIgZm9udC1zZW1pYm9sZCBqdXN0aWZ5LWJldHdlZW4gaC1bODhweF0gaXRlbXMtY2VudGVyIHB4LTZcIj5cclxuICAgICAgICAgIDxMaW5rIGhyZWY9e1wiL1wifT5cclxuICAgICAgICAgICAgPEltYWdlIHNyYz17TG9nb30gd2lkdGg9ezE0Nn0gaGVpZ2h0PXs0MH0gYWx0PVwibmVyZHdvcmsgbG9nb1wiIC8+XHJcbiAgICAgICAgICA8L0xpbms+XHJcbiAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e2hhbmRsZU1lbnV9PlxyXG4gICAgICAgICAgICA8TWVudUljb24gLz5cclxuICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAge2lzT3BlbiAmJiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgcmlnaHQtMCB0b3AtMCBmbGV4IGZsZXgtY29sIHctZnVsbCBnYXAtOCBiZy1bIzBEMEQwRF0gcHgtNSBweS03XCI+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiBpdGVtcy1jZW50ZXJcIj5cclxuICAgICAgICAgICAgICAgIDxMaW5rIGhyZWY9e1wiL1wifT5cclxuICAgICAgICAgICAgICAgICAgPEltYWdlXHJcbiAgICAgICAgICAgICAgICAgICAgc3JjPXtMb2dvfVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoPXsxNDZ9XHJcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0PXs0MH1cclxuICAgICAgICAgICAgICAgICAgICBhbHQ9XCJuZXJkd29yayBsb2dvXCJcclxuICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgIDwvTGluaz5cclxuICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17aGFuZGxlTWVudX0gY2xhc3NOYW1lPVwiXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxYIC8+XHJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBnYXAtN1wiPlxyXG4gICAgICAgICAgICAgICAgPExpbmsgaHJlZj17XCIvY29tbXVuaXRpZXNcIn0+Q29tbXVuaXRpZXM8L0xpbms+XHJcbiAgICAgICAgICAgICAgICA8TGluayBocmVmPXtcIi9uZXJkd29yaytcIn0gY2xhc3NOYW1lPVwiaG92ZXI6b3BhY2l0eS03NVwiPlxyXG4gICAgICAgICAgICAgICAgICBOZXJkd29yaytcclxuICAgICAgICAgICAgICAgIDwvTGluaz5cclxuICAgICAgICAgICAgICAgIDxMaW5rIGhyZWY9e1wiL2V2ZW50c1wifSBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxyXG4gICAgICAgICAgICAgICAgICBDb21pYyBDb24gMjAyNXtcIiBcIn1cclxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYmctWyMxQkRCNkNdIGZvbnQtbWVkaXVtIHB4LTIgcGItMC41IHRleHQtYmxhY2sgcm91bmRlZC1bNnB4XVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIFNvb25cclxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9MaW5rPlxyXG4gICAgICAgICAgICAgICAgPExpbmsgaHJlZj17XCIvZXZlbnRzXCJ9IGNsYXNzTmFtZT1cImhvdmVyOm9wYWNpdHktNzVcIj5cclxuICAgICAgICAgICAgICAgICAgRXZlbnRzXHJcbiAgICAgICAgICAgICAgICA8L0xpbms+XHJcbiAgICAgICAgICAgICAgICA8bGk+Q29tcGFueTwvbGk+XHJcbiAgICAgICAgICAgICAgPC91bD5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuIGdhcC00IHctZnVsbFwiPlxyXG4gICAgICAgICAgICAgICAgPEJ1dHRvbiBjbGFzc05hbWU9XCJiZy1bIzM0MzQzNV0gdy0xLzJcIj5Mb2cgSW48L0J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDxCdXR0b24gY2xhc3NOYW1lPVwiYmctWyMzMzczRDldIHctMS8yXCI+U2lnbiBVcDwvQnV0dG9uPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICl9XHJcbiAgICAgICAgPC9zZWN0aW9uPlxyXG4gICAgICA8L3NlY3Rpb24+XHJcbiAgICA8L25hdj5cclxuICApO1xyXG59XHJcbiJdfQ==