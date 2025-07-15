"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.metadata = void 0;
exports.default = RootLayout;
const google_1 = require("next/font/google");
const local_1 = __importDefault(require("next/font/local"));
require("./globals.css");
const LoadingProvider_1 = __importDefault(require("@/components/LoadingProvider"));
const geistSans = (0, google_1.Geist)({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});
const geistMono = (0, google_1.Geist_Mono)({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});
const inter = (0, google_1.Inter)({
    variable: "--font-inter",
    subsets: ["latin"],
});
const obostar = (0, local_1.default)({
    src: "../public/obostartest-regular.otf",
    variable: "--font-obostar",
});
exports.metadata = {
    title: "Nerdwork",
    description: "Where Passion meets Community",
};
function RootLayout({ children, }) {
    return (<html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${obostar.variable} antialiased`}>
        <LoadingProvider_1.default logoSrc={"/nerdwork.svg"} logoAlt="Nerwork Logo">
          {children}
        </LoadingProvider_1.default>
      </body>
    </html>);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibGF5b3V0LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUErQkEsNkJBZ0JDO0FBOUNELDZDQUE0RDtBQUM1RCw0REFBd0M7QUFDeEMseUJBQXVCO0FBQ3ZCLG1GQUEyRDtBQUUzRCxNQUFNLFNBQVMsR0FBRyxJQUFBLGNBQUssRUFBQztJQUN0QixRQUFRLEVBQUUsbUJBQW1CO0lBQzdCLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQztDQUNuQixDQUFDLENBQUM7QUFFSCxNQUFNLFNBQVMsR0FBRyxJQUFBLG1CQUFVLEVBQUM7SUFDM0IsUUFBUSxFQUFFLG1CQUFtQjtJQUM3QixPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUM7Q0FDbkIsQ0FBQyxDQUFDO0FBRUgsTUFBTSxLQUFLLEdBQUcsSUFBQSxjQUFLLEVBQUM7SUFDbEIsUUFBUSxFQUFFLGNBQWM7SUFDeEIsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDO0NBQ25CLENBQUMsQ0FBQztBQUVILE1BQU0sT0FBTyxHQUFHLElBQUEsZUFBUyxFQUFDO0lBQ3hCLEdBQUcsRUFBRSxtQ0FBbUM7SUFDeEMsUUFBUSxFQUFFLGdCQUFnQjtDQUMzQixDQUFDLENBQUM7QUFFVSxRQUFBLFFBQVEsR0FBYTtJQUNoQyxLQUFLLEVBQUUsVUFBVTtJQUNqQixXQUFXLEVBQUUsK0JBQStCO0NBQzdDLENBQUM7QUFFRixTQUF3QixVQUFVLENBQUMsRUFDakMsUUFBUSxHQUdSO0lBQ0EsT0FBTyxDQUNMLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQ2I7TUFBQSxDQUFDLElBQUksQ0FDSCxTQUFTLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxRQUFRLElBQUksU0FBUyxDQUFDLFFBQVEsSUFBSSxLQUFLLENBQUMsUUFBUSxJQUFJLE9BQU8sQ0FBQyxRQUFRLGNBQWMsQ0FBQyxDQUUzRztRQUFBLENBQUMseUJBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUMvRDtVQUFBLENBQUMsUUFBUSxDQUNYO1FBQUEsRUFBRSx5QkFBZSxDQUNuQjtNQUFBLEVBQUUsSUFBSSxDQUNSO0lBQUEsRUFBRSxJQUFJLENBQUMsQ0FDUixDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgTWV0YWRhdGEgfSBmcm9tIFwibmV4dFwiO1xyXG5pbXBvcnQgeyBHZWlzdCwgR2Vpc3RfTW9ubywgSW50ZXIgfSBmcm9tIFwibmV4dC9mb250L2dvb2dsZVwiO1xyXG5pbXBvcnQgbG9jYWxGb250IGZyb20gXCJuZXh0L2ZvbnQvbG9jYWxcIjtcclxuaW1wb3J0IFwiLi9nbG9iYWxzLmNzc1wiO1xyXG5pbXBvcnQgTG9hZGluZ1Byb3ZpZGVyIGZyb20gXCJAL2NvbXBvbmVudHMvTG9hZGluZ1Byb3ZpZGVyXCI7XHJcblxyXG5jb25zdCBnZWlzdFNhbnMgPSBHZWlzdCh7XHJcbiAgdmFyaWFibGU6IFwiLS1mb250LWdlaXN0LXNhbnNcIixcclxuICBzdWJzZXRzOiBbXCJsYXRpblwiXSxcclxufSk7XHJcblxyXG5jb25zdCBnZWlzdE1vbm8gPSBHZWlzdF9Nb25vKHtcclxuICB2YXJpYWJsZTogXCItLWZvbnQtZ2Vpc3QtbW9ub1wiLFxyXG4gIHN1YnNldHM6IFtcImxhdGluXCJdLFxyXG59KTtcclxuXHJcbmNvbnN0IGludGVyID0gSW50ZXIoe1xyXG4gIHZhcmlhYmxlOiBcIi0tZm9udC1pbnRlclwiLFxyXG4gIHN1YnNldHM6IFtcImxhdGluXCJdLFxyXG59KTtcclxuXHJcbmNvbnN0IG9ib3N0YXIgPSBsb2NhbEZvbnQoe1xyXG4gIHNyYzogXCIuLi9wdWJsaWMvb2Jvc3RhcnRlc3QtcmVndWxhci5vdGZcIixcclxuICB2YXJpYWJsZTogXCItLWZvbnQtb2Jvc3RhclwiLFxyXG59KTtcclxuXHJcbmV4cG9ydCBjb25zdCBtZXRhZGF0YTogTWV0YWRhdGEgPSB7XHJcbiAgdGl0bGU6IFwiTmVyZHdvcmtcIixcclxuICBkZXNjcmlwdGlvbjogXCJXaGVyZSBQYXNzaW9uIG1lZXRzIENvbW11bml0eVwiLFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUm9vdExheW91dCh7XHJcbiAgY2hpbGRyZW4sXHJcbn06IFJlYWRvbmx5PHtcclxuICBjaGlsZHJlbjogUmVhY3QuUmVhY3ROb2RlO1xyXG59Pikge1xyXG4gIHJldHVybiAoXHJcbiAgICA8aHRtbCBsYW5nPVwiZW5cIj5cclxuICAgICAgPGJvZHlcclxuICAgICAgICBjbGFzc05hbWU9e2Ake2dlaXN0U2Fucy52YXJpYWJsZX0gJHtnZWlzdE1vbm8udmFyaWFibGV9ICR7aW50ZXIudmFyaWFibGV9ICR7b2Jvc3Rhci52YXJpYWJsZX0gYW50aWFsaWFzZWRgfVxyXG4gICAgICA+XHJcbiAgICAgICAgPExvYWRpbmdQcm92aWRlciBsb2dvU3JjPXtcIi9uZXJkd29yay5zdmdcIn0gbG9nb0FsdD1cIk5lcndvcmsgTG9nb1wiPlxyXG4gICAgICAgICAge2NoaWxkcmVufVxyXG4gICAgICAgIDwvTG9hZGluZ1Byb3ZpZGVyPlxyXG4gICAgICA8L2JvZHk+XHJcbiAgICA8L2h0bWw+XHJcbiAgKTtcclxufVxyXG4iXX0=