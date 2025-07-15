"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Home;
const ComicCon_1 = __importDefault(require("@/components/homepage/ComicCon"));
const Community_1 = __importDefault(require("@/components/homepage/Community"));
const FAQ_1 = __importDefault(require("@/components/homepage/FAQ"));
const Footer_1 = __importDefault(require("@/components/homepage/Footer"));
const Hero_1 = __importDefault(require("@/components/homepage/Hero"));
const Navbar_1 = __importDefault(require("@/components/homepage/Navbar"));
const Nerdwork_1 = __importDefault(require("@/components/homepage/Nerdwork"));
const Vision_1 = __importDefault(require("@/components/homepage/Vision"));
function Home() {
    return (<div className="bg-[#0D0D0D]">
      <Navbar_1.default />
      <Hero_1.default />
      <Community_1.default />
      <Nerdwork_1.default />
      <ComicCon_1.default />
      <Vision_1.default />
      <FAQ_1.default />
      <Footer_1.default />
    </div>);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBhZ2UudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBU0EsdUJBYUM7QUF0QkQsOEVBQXNEO0FBQ3RELGdGQUF3RDtBQUN4RCxvRUFBNEM7QUFDNUMsMEVBQWtEO0FBQ2xELHNFQUE4QztBQUM5QywwRUFBa0Q7QUFDbEQsOEVBQXNEO0FBQ3RELDBFQUFrRDtBQUVsRCxTQUF3QixJQUFJO0lBQzFCLE9BQU8sQ0FDTCxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUMzQjtNQUFBLENBQUMsZ0JBQU0sQ0FBQyxBQUFELEVBQ1A7TUFBQSxDQUFDLGNBQUksQ0FBQyxBQUFELEVBQ0w7TUFBQSxDQUFDLG1CQUFTLENBQUMsQUFBRCxFQUNWO01BQUEsQ0FBQyxrQkFBUSxDQUFDLEFBQUQsRUFDVDtNQUFBLENBQUMsa0JBQVEsQ0FBQyxBQUFELEVBQ1Q7TUFBQSxDQUFDLGdCQUFNLENBQUMsQUFBRCxFQUNQO01BQUEsQ0FBQyxhQUFHLENBQUMsQUFBRCxFQUNKO01BQUEsQ0FBQyxnQkFBTSxDQUFDLEFBQUQsRUFDVDtJQUFBLEVBQUUsR0FBRyxDQUFDLENBQ1AsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29taWNDb24gZnJvbSBcIkAvY29tcG9uZW50cy9ob21lcGFnZS9Db21pY0NvblwiO1xyXG5pbXBvcnQgQ29tbXVuaXR5IGZyb20gXCJAL2NvbXBvbmVudHMvaG9tZXBhZ2UvQ29tbXVuaXR5XCI7XHJcbmltcG9ydCBGQVEgZnJvbSBcIkAvY29tcG9uZW50cy9ob21lcGFnZS9GQVFcIjtcclxuaW1wb3J0IEZvb3RlciBmcm9tIFwiQC9jb21wb25lbnRzL2hvbWVwYWdlL0Zvb3RlclwiO1xyXG5pbXBvcnQgSGVybyBmcm9tIFwiQC9jb21wb25lbnRzL2hvbWVwYWdlL0hlcm9cIjtcclxuaW1wb3J0IE5hdmJhciBmcm9tIFwiQC9jb21wb25lbnRzL2hvbWVwYWdlL05hdmJhclwiO1xyXG5pbXBvcnQgTmVyZHdvcmsgZnJvbSBcIkAvY29tcG9uZW50cy9ob21lcGFnZS9OZXJkd29ya1wiO1xyXG5pbXBvcnQgVmlzaW9uIGZyb20gXCJAL2NvbXBvbmVudHMvaG9tZXBhZ2UvVmlzaW9uXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBIb21lKCkge1xyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLVsjMEQwRDBEXVwiPlxyXG4gICAgICA8TmF2YmFyIC8+XHJcbiAgICAgIDxIZXJvIC8+XHJcbiAgICAgIDxDb21tdW5pdHkgLz5cclxuICAgICAgPE5lcmR3b3JrIC8+XHJcbiAgICAgIDxDb21pY0NvbiAvPlxyXG4gICAgICA8VmlzaW9uIC8+XHJcbiAgICAgIDxGQVEgLz5cclxuICAgICAgPEZvb3RlciAvPlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufVxyXG4iXX0=