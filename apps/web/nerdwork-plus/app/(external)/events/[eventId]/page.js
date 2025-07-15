"use client";
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("@/components/data");
const FAQ_1 = __importDefault(require("@/components/homepage/FAQ"));
const Footer_1 = __importDefault(require("@/components/homepage/Footer"));
const Navbar_1 = __importDefault(require("@/components/homepage/Navbar"));
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
const separator_1 = require("@/components/ui/separator");
const image_1 = __importDefault(require("next/image"));
const react_1 = __importStar(require("react"));
const carry1st_svg_1 = __importDefault(require("@/assets/sponsors/carry1st.svg"));
const itel_svg_1 = __importDefault(require("@/assets/sponsors/itel.svg"));
const filmhouse_svg_1 = __importDefault(require("@/assets/sponsors/filmhouse.svg"));
const tribe_svg_1 = __importDefault(require("@/assets/sponsors/tribe.svg"));
const link_1 = __importDefault(require("next/link"));
const RegisterEvent = ({ params, }) => {
    const { eventId } = (0, react_1.use)(params);
    const events = data_1.eventsData ?? [];
    const event = events.find((elect) => parseInt(eventId) === elect.id);
    const [ticketCount, setTicketCount] = react_1.default.useState(1);
    const [expanded, setExpanded] = react_1.default.useState(false);
    const BASE_PRICE = 25000;
    const description = "Nerdwork is one of Nigeria’s biggest comic conventions, where all aspects of geek culture collide. It features intense gaming tournaments, thrilling cosplay competitions, and creative writing and art contests. Attendees also enjoy a variety of live onstage performances, as well as thought-provoking and engaging panel sessions led by industry experts, creators, and influencers, providing valuable insights and inspiration. The convention boasts of a diverse lineup of vendors and sponsors who contribute significantly to the growth and vibrancy of the nerd community, creating a space where creativity, innovation, and passion for all things geek thrive. Nerdwork isn’t just a convention; it's a platform where enthusiasts of all kinds can connect, showcase their skills, and contribute to the development of a thriving creative community in Africa.";
    const addTicket = (e) => {
        e.preventDefault();
        setTicketCount((prevCount) => prevCount + 1);
    };
    const removeTicket = (e) => {
        e.preventDefault();
        if (ticketCount > 1) {
            setTicketCount((prevCount) => prevCount - 1);
        }
    };
    const ticketPrice = ticketCount * BASE_PRICE;
    const handleTicketCountChange = (e) => {
        const value = parseInt(e.target.value) || 1;
        const validValue = Math.max(1, value); // Ensure minimum of 1
        setTicketCount(validValue);
    };
    const toggleExpanded = () => {
        setExpanded(!expanded);
    };
    const displayedText = expanded
        ? description
        : description.substring(0, 300) + "...";
    return (<section className="bg-[#0D0D0D] text-white font-inter">
      <Navbar_1.default />
      <section className="relative min-h-[80vh] w-full">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0" style={{ backgroundImage: `url(${event?.src})` }}/>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,13,13,0)_0%,#0D0D0D_83%)] z-10"/>
        <section className="relative z-20 text-white h-[80vh] max-w-[1130px] mx-auto flex flex-col justify-end px-7">
          <h1 className="font-obostar text-[52px] max-md:text-[32px]">
            {event?.title}
          </h1>
          <p className="max-md:text-sm text-[#FFFFFFE5]">
            {event?.date} | Port Harcourt | 500 People attending
          </p>
        </section>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-20 max-w-[1130px] mx-auto my-10 px-7">
        <section className="flex flex-col gap-16">
          <div className="">
            <p className="font-semibold">INFORMATION</p>
            <div className="text-[#FFFFFFE5] text-sm flex flex-col gap-3 my-6">
              <p>{displayedText}</p>
            </div>
            <button onClick={toggleExpanded}>
              {expanded ? "View Less" : "View More"}
            </button>
          </div>
          <div className="">
            <p className="mb-6 font-semibold">ATTENDING</p>
            <div className="flex gap-6">
              <div className="flex flex-col gap-3 items-center">
                <div className="bg-[#D9D9D9] w-20 h-20 rounded-full"></div>
                <span>Odumodu</span>
              </div>
              <div className="flex flex-col gap-3 items-center">
                <div className="bg-[#D9D9D9] w-20 h-20 rounded-full"></div>
                <span>Olabode</span>
              </div>
              <div className="flex flex-col gap-3 items-center">
                <div className="bg-[#D9D9D9] w-20 h-20 rounded-full"></div>
                <span>Folasade</span>
              </div>
            </div>
          </div>
          <div>
            <p className="font-semibold uppercase mb-6">Sponsors</p>
            <div className="flex justify-between flex-wrap gap-4 ">
              <image_1.default src={itel_svg_1.default} width={75} height={48} alt="itel logo"/>
              <image_1.default src={carry1st_svg_1.default} width={49} height={48} alt="carry1st logo"/>
              <image_1.default src={filmhouse_svg_1.default} width={137} height={48} alt="filmhouse logo"/>
              <image_1.default src={tribe_svg_1.default} width={93} height={48} alt="tribe logo"/>
            </div>
          </div>
        </section>
        <form className="bg-[#141414] border border-[#262626] rounded-[20px]">
          <div className="max-md:p-5 md:p-10 flex flex-col gap-6">
            <h3 className="font-obostar text-[28px]">Register</h3>
            <input_1.Input type="text" placeholder="First Name" className="w-full outline-none border border-[#FFFFFF0D] ring-0 bg-[#292930]"/>
            <input_1.Input type="text" placeholder="Last Name" className="w-full outline-none border border-[#FFFFFF0D] ring-0 bg-[#292930]"/>
            <input_1.Input type="email" placeholder="Email" className="w-full outline-none border border-[#FFFFFF0D] ring-0 bg-[#292930]"/>

            <p>TICKETS</p>
            <div className="border border-[#FFFFFF66] bg-[#FFFFFF05] rounded-[16px] p-5">
              <p className="font-semibold mb-2">Early Bird</p>
              <p className="text-sm text-[#FFFFFF99]">
                Connect with one of the largest nerd community
              </p>
            </div>
            <div className=" bg-[#FFFFFF05] rounded-[16px] p-5">
              <p className="font-semibold mb-2">Early Bird</p>
              <div className="text-sm text-[#FFFFFF99]">
                <p>Step into the ultimate nerdverse:</p>
                <ul className="list-disc ml-5">
                  <li>Explore exclusive comics on the Nerdwork+ platform</li>
                  <li>Attend the most exciting comic conventions</li>
                  <li>Connect with one of the largest nerd community</li>
                </ul>
              </div>
            </div>
          </div>
          <separator_1.Separator className="bg-[#404040]"/>
          <div className="flex justify-between items-center max-md:flex-col max-md:items-center max-md:gap-4 p-10">
            <div className="flex gap-5 items-center">
              <button onClick={removeTicket} disabled={ticketCount <= 1} className="bg-[#FFFFFF1A] w-[50px] h-[50px] rounded-full hover:opacity-85 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                -
              </button>
              <input_1.Input type="text" value={ticketCount} onChange={handleTicketCountChange} className="outline-none border-[#FFFFFF33] ring-0 w-10 h-10"/>
              <button onClick={addTicket} className="bg-[#FFFFFF1A] w-[50px] h-[50px] rounded-full hover:opacity-85 cursor-pointer">
                +
              </button>
            </div>
            <button_1.Button variant={"primary"}>
              <link_1.default href={`${event?.link}`} target="_blank">
                Buy N{ticketPrice.toLocaleString()}
              </link_1.default>
            </button_1.Button>
          </div>
        </form>
      </section>
      <FAQ_1.default />
      <Footer_1.default />
    </section>);
};
exports.default = RegisterEvent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBhZ2UudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDYiw0Q0FBK0M7QUFDL0Msb0VBQTRDO0FBQzVDLDBFQUFrRDtBQUNsRCwwRUFBa0Q7QUFDbEQsbURBQWdEO0FBQ2hELGlEQUE4QztBQUM5Qyx5REFBc0Q7QUFDdEQsdURBQStCO0FBQy9CLCtDQUFtQztBQUNuQyxrRkFBc0Q7QUFDdEQsMEVBQThDO0FBQzlDLG9GQUF3RDtBQUN4RCw0RUFBZ0Q7QUFDaEQscURBQTZCO0FBRTdCLE1BQU0sYUFBYSxHQUFHLENBQUMsRUFDckIsTUFBTSxHQUdQLEVBQUUsRUFBRTtJQUNILE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxJQUFBLFdBQUcsRUFBQyxNQUFNLENBQUMsQ0FBQztJQUNoQyxNQUFNLE1BQU0sR0FBRyxpQkFBVSxJQUFJLEVBQUUsQ0FBQztJQUNoQyxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBRXJFLE1BQU0sQ0FBQyxXQUFXLEVBQUUsY0FBYyxDQUFDLEdBQUcsZUFBSyxDQUFDLFFBQVEsQ0FBUyxDQUFDLENBQUMsQ0FBQztJQUNoRSxNQUFNLENBQUMsUUFBUSxFQUFFLFdBQVcsQ0FBQyxHQUFHLGVBQUssQ0FBQyxRQUFRLENBQVUsS0FBSyxDQUFDLENBQUM7SUFFL0QsTUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDO0lBRXpCLE1BQU0sV0FBVyxHQUNmLHExQkFBcTFCLENBQUM7SUFFeDFCLE1BQU0sU0FBUyxHQUFHLENBQUMsQ0FBbUIsRUFBRSxFQUFFO1FBQ3hDLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUNuQixjQUFjLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUMvQyxDQUFDLENBQUM7SUFFRixNQUFNLFlBQVksR0FBRyxDQUFDLENBQW1CLEVBQUUsRUFBRTtRQUMzQyxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDbkIsSUFBSSxXQUFXLEdBQUcsQ0FBQyxFQUFFLENBQUM7WUFDcEIsY0FBYyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDL0MsQ0FBQztJQUNILENBQUMsQ0FBQztJQUVGLE1BQU0sV0FBVyxHQUFHLFdBQVcsR0FBRyxVQUFVLENBQUM7SUFFN0MsTUFBTSx1QkFBdUIsR0FBRyxDQUFDLENBQXNDLEVBQUUsRUFBRTtRQUN6RSxNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUMsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxzQkFBc0I7UUFDN0QsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzdCLENBQUMsQ0FBQztJQUVGLE1BQU0sY0FBYyxHQUFHLEdBQUcsRUFBRTtRQUMxQixXQUFXLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN6QixDQUFDLENBQUM7SUFFRixNQUFNLGFBQWEsR0FBRyxRQUFRO1FBQzVCLENBQUMsQ0FBQyxXQUFXO1FBQ2IsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztJQUUxQyxPQUFPLENBQ0wsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLG9DQUFvQyxDQUNyRDtNQUFBLENBQUMsZ0JBQU0sQ0FBQyxBQUFELEVBQ1A7TUFBQSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsOEJBQThCLENBQy9DO1FBQUEsQ0FBQyxHQUFHLENBQ0YsU0FBUyxDQUFDLHNEQUFzRCxDQUNoRSxLQUFLLENBQUMsQ0FBQyxFQUFFLGVBQWUsRUFBRSxPQUFPLEtBQUssRUFBRSxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBRW5EO1FBQUEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLG9GQUFvRixFQUNuRztRQUFBLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyx5RkFBeUYsQ0FDMUc7VUFBQSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsNkNBQTZDLENBQ3pEO1lBQUEsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUNmO1VBQUEsRUFBRSxFQUFFLENBQ0o7VUFBQSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsaUNBQWlDLENBQzVDO1lBQUEsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFFO1VBQ2hCLEVBQUUsQ0FBQyxDQUNMO1FBQUEsRUFBRSxPQUFPLENBQ1g7TUFBQSxFQUFFLE9BQU8sQ0FDVDtNQUFBLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQywwRUFBMEUsQ0FDM0Y7UUFBQSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsc0JBQXNCLENBQ3ZDO1VBQUEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FDZjtZQUFBLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FDM0M7WUFBQSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsbURBQW1ELENBQ2hFO2NBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLENBQ3ZCO1lBQUEsRUFBRSxHQUFHLENBQ0w7WUFBQSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FDOUI7Y0FBQSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQ3ZDO1lBQUEsRUFBRSxNQUFNLENBQ1Y7VUFBQSxFQUFFLEdBQUcsQ0FDTDtVQUFBLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQ2Y7WUFBQSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsb0JBQW9CLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FDOUM7WUFBQSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUN6QjtjQUFBLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxrQ0FBa0MsQ0FDL0M7Z0JBQUEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLHFDQUFxQyxDQUFDLEVBQUUsR0FBRyxDQUMxRDtnQkFBQSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUNyQjtjQUFBLEVBQUUsR0FBRyxDQUNMO2NBQUEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLGtDQUFrQyxDQUMvQztnQkFBQSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMscUNBQXFDLENBQUMsRUFBRSxHQUFHLENBQzFEO2dCQUFBLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQ3JCO2NBQUEsRUFBRSxHQUFHLENBQ0w7Y0FBQSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsa0NBQWtDLENBQy9DO2dCQUFBLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxxQ0FBcUMsQ0FBQyxFQUFFLEdBQUcsQ0FDMUQ7Z0JBQUEsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FDdEI7Y0FBQSxFQUFFLEdBQUcsQ0FDUDtZQUFBLEVBQUUsR0FBRyxDQUNQO1VBQUEsRUFBRSxHQUFHLENBQ0w7VUFBQSxDQUFDLEdBQUcsQ0FDRjtZQUFBLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyw4QkFBOEIsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUN2RDtZQUFBLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyx1Q0FBdUMsQ0FDcEQ7Y0FBQSxDQUFDLGVBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxrQkFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFDeEQ7Y0FBQSxDQUFDLGVBQUssQ0FDSixHQUFHLENBQUMsQ0FBQyxzQkFBUSxDQUFDLENBQ2QsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQ1YsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQ1gsR0FBRyxDQUFDLGVBQWUsRUFFckI7Y0FBQSxDQUFDLGVBQUssQ0FDSixHQUFHLENBQUMsQ0FBQyx1QkFBUyxDQUFDLENBQ2YsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQ1gsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQ1gsR0FBRyxDQUFDLGdCQUFnQixFQUV0QjtjQUFBLENBQUMsZUFBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLG1CQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUM1RDtZQUFBLEVBQUUsR0FBRyxDQUNQO1VBQUEsRUFBRSxHQUFHLENBQ1A7UUFBQSxFQUFFLE9BQU8sQ0FDVDtRQUFBLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxxREFBcUQsQ0FDbkU7VUFBQSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsd0NBQXdDLENBQ3JEO1lBQUEsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLDBCQUEwQixDQUFDLFFBQVEsRUFBRSxFQUFFLENBQ3JEO1lBQUEsQ0FBQyxhQUFLLENBQ0osSUFBSSxDQUFDLE1BQU0sQ0FDWCxXQUFXLENBQUMsWUFBWSxDQUN4QixTQUFTLENBQUMsbUVBQW1FLEVBRS9FO1lBQUEsQ0FBQyxhQUFLLENBQ0osSUFBSSxDQUFDLE1BQU0sQ0FDWCxXQUFXLENBQUMsV0FBVyxDQUN2QixTQUFTLENBQUMsbUVBQW1FLEVBRS9FO1lBQUEsQ0FBQyxhQUFLLENBQ0osSUFBSSxDQUFDLE9BQU8sQ0FDWixXQUFXLENBQUMsT0FBTyxDQUNuQixTQUFTLENBQUMsbUVBQW1FLEVBRy9FOztZQUFBLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQ2I7WUFBQSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsNkRBQTZELENBQzFFO2NBQUEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLG9CQUFvQixDQUFDLFVBQVUsRUFBRSxDQUFDLENBQy9DO2NBQUEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLDBCQUEwQixDQUNyQzs7Y0FDRixFQUFFLENBQUMsQ0FDTDtZQUFBLEVBQUUsR0FBRyxDQUNMO1lBQUEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLG9DQUFvQyxDQUNqRDtjQUFBLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUMvQztjQUFBLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQywwQkFBMEIsQ0FDdkM7Z0JBQUEsQ0FBQyxDQUFDLENBQUMsaUNBQWlDLEVBQUUsQ0FBQyxDQUN2QztnQkFBQSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQzVCO2tCQUFBLENBQUMsRUFBRSxDQUFDLGtEQUFrRCxFQUFFLEVBQUUsQ0FDMUQ7a0JBQUEsQ0FBQyxFQUFFLENBQUMsMENBQTBDLEVBQUUsRUFBRSxDQUNsRDtrQkFBQSxDQUFDLEVBQUUsQ0FBQyw4Q0FBOEMsRUFBRSxFQUFFLENBQ3hEO2dCQUFBLEVBQUUsRUFBRSxDQUNOO2NBQUEsRUFBRSxHQUFHLENBQ1A7WUFBQSxFQUFFLEdBQUcsQ0FDUDtVQUFBLEVBQUUsR0FBRyxDQUNMO1VBQUEsQ0FBQyxxQkFBUyxDQUFDLFNBQVMsQ0FBQyxjQUFjLEVBQ25DO1VBQUEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLHlGQUF5RixDQUN0RztZQUFBLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyx5QkFBeUIsQ0FDdEM7Y0FBQSxDQUFDLE1BQU0sQ0FDTCxPQUFPLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FDdEIsUUFBUSxDQUFDLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQyxDQUMzQixTQUFTLENBQUMsK0hBQStILENBRXpJOztjQUNGLEVBQUUsTUFBTSxDQUNSO2NBQUEsQ0FBQyxhQUFLLENBQ0osSUFBSSxDQUFDLE1BQU0sQ0FDWCxLQUFLLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FDbkIsUUFBUSxDQUFDLENBQUMsdUJBQXVCLENBQUMsQ0FDbEMsU0FBUyxDQUFDLGtEQUFrRCxFQUU5RDtjQUFBLENBQUMsTUFBTSxDQUNMLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUNuQixTQUFTLENBQUMsK0VBQStFLENBRXpGOztjQUNGLEVBQUUsTUFBTSxDQUNWO1lBQUEsRUFBRSxHQUFHLENBQ0w7WUFBQSxDQUFDLGVBQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FDekI7Y0FBQSxDQUFDLGNBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQzNDO3FCQUFLLENBQUMsV0FBVyxDQUFDLGNBQWMsRUFBRSxDQUNwQztjQUFBLEVBQUUsY0FBSSxDQUNSO1lBQUEsRUFBRSxlQUFNLENBQ1Y7VUFBQSxFQUFFLEdBQUcsQ0FDUDtRQUFBLEVBQUUsSUFBSSxDQUNSO01BQUEsRUFBRSxPQUFPLENBQ1Q7TUFBQSxDQUFDLGFBQUcsQ0FBQyxBQUFELEVBQ0o7TUFBQSxDQUFDLGdCQUFNLENBQUMsQUFBRCxFQUNUO0lBQUEsRUFBRSxPQUFPLENBQUMsQ0FDWCxDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBRUYsa0JBQWUsYUFBYSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2UgY2xpZW50XCI7XHJcbmltcG9ydCB7IGV2ZW50c0RhdGEgfSBmcm9tIFwiQC9jb21wb25lbnRzL2RhdGFcIjtcclxuaW1wb3J0IEZBUSBmcm9tIFwiQC9jb21wb25lbnRzL2hvbWVwYWdlL0ZBUVwiO1xyXG5pbXBvcnQgRm9vdGVyIGZyb20gXCJAL2NvbXBvbmVudHMvaG9tZXBhZ2UvRm9vdGVyXCI7XHJcbmltcG9ydCBOYXZiYXIgZnJvbSBcIkAvY29tcG9uZW50cy9ob21lcGFnZS9OYXZiYXJcIjtcclxuaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSBcIkAvY29tcG9uZW50cy91aS9idXR0b25cIjtcclxuaW1wb3J0IHsgSW5wdXQgfSBmcm9tIFwiQC9jb21wb25lbnRzL3VpL2lucHV0XCI7XHJcbmltcG9ydCB7IFNlcGFyYXRvciB9IGZyb20gXCJAL2NvbXBvbmVudHMvdWkvc2VwYXJhdG9yXCI7XHJcbmltcG9ydCBJbWFnZSBmcm9tIFwibmV4dC9pbWFnZVwiO1xyXG5pbXBvcnQgUmVhY3QsIHsgdXNlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBDYXJyeTFzdCBmcm9tIFwiQC9hc3NldHMvc3BvbnNvcnMvY2Fycnkxc3Quc3ZnXCI7XHJcbmltcG9ydCBJdGVsIGZyb20gXCJAL2Fzc2V0cy9zcG9uc29ycy9pdGVsLnN2Z1wiO1xyXG5pbXBvcnQgRmlsbWhvdXNlIGZyb20gXCJAL2Fzc2V0cy9zcG9uc29ycy9maWxtaG91c2Uuc3ZnXCI7XHJcbmltcG9ydCBUcmliZSBmcm9tIFwiQC9hc3NldHMvc3BvbnNvcnMvdHJpYmUuc3ZnXCI7XHJcbmltcG9ydCBMaW5rIGZyb20gXCJuZXh0L2xpbmtcIjtcclxuXHJcbmNvbnN0IFJlZ2lzdGVyRXZlbnQgPSAoe1xyXG4gIHBhcmFtcyxcclxufToge1xyXG4gIHBhcmFtczogUHJvbWlzZTx7IGV2ZW50SWQ6IHN0cmluZyB9PjtcclxufSkgPT4ge1xyXG4gIGNvbnN0IHsgZXZlbnRJZCB9ID0gdXNlKHBhcmFtcyk7XHJcbiAgY29uc3QgZXZlbnRzID0gZXZlbnRzRGF0YSA/PyBbXTtcclxuICBjb25zdCBldmVudCA9IGV2ZW50cy5maW5kKChlbGVjdCkgPT4gcGFyc2VJbnQoZXZlbnRJZCkgPT09IGVsZWN0LmlkKTtcclxuXHJcbiAgY29uc3QgW3RpY2tldENvdW50LCBzZXRUaWNrZXRDb3VudF0gPSBSZWFjdC51c2VTdGF0ZTxudW1iZXI+KDEpO1xyXG4gIGNvbnN0IFtleHBhbmRlZCwgc2V0RXhwYW5kZWRdID0gUmVhY3QudXNlU3RhdGU8Ym9vbGVhbj4oZmFsc2UpO1xyXG5cclxuICBjb25zdCBCQVNFX1BSSUNFID0gMjUwMDA7XHJcblxyXG4gIGNvbnN0IGRlc2NyaXB0aW9uID1cclxuICAgIFwiTmVyZHdvcmsgaXMgb25lIG9mIE5pZ2VyaWHigJlzIGJpZ2dlc3QgY29taWMgY29udmVudGlvbnMsIHdoZXJlIGFsbCBhc3BlY3RzIG9mIGdlZWsgY3VsdHVyZSBjb2xsaWRlLiBJdCBmZWF0dXJlcyBpbnRlbnNlIGdhbWluZyB0b3VybmFtZW50cywgdGhyaWxsaW5nIGNvc3BsYXkgY29tcGV0aXRpb25zLCBhbmQgY3JlYXRpdmUgd3JpdGluZyBhbmQgYXJ0IGNvbnRlc3RzLiBBdHRlbmRlZXMgYWxzbyBlbmpveSBhIHZhcmlldHkgb2YgbGl2ZSBvbnN0YWdlIHBlcmZvcm1hbmNlcywgYXMgd2VsbCBhcyB0aG91Z2h0LXByb3Zva2luZyBhbmQgZW5nYWdpbmcgcGFuZWwgc2Vzc2lvbnMgbGVkIGJ5IGluZHVzdHJ5IGV4cGVydHMsIGNyZWF0b3JzLCBhbmQgaW5mbHVlbmNlcnMsIHByb3ZpZGluZyB2YWx1YWJsZSBpbnNpZ2h0cyBhbmQgaW5zcGlyYXRpb24uIFRoZSBjb252ZW50aW9uIGJvYXN0cyBvZiBhIGRpdmVyc2UgbGluZXVwIG9mIHZlbmRvcnMgYW5kIHNwb25zb3JzIHdobyBjb250cmlidXRlIHNpZ25pZmljYW50bHkgdG8gdGhlIGdyb3d0aCBhbmQgdmlicmFuY3kgb2YgdGhlIG5lcmQgY29tbXVuaXR5LCBjcmVhdGluZyBhIHNwYWNlIHdoZXJlIGNyZWF0aXZpdHksIGlubm92YXRpb24sIGFuZCBwYXNzaW9uIGZvciBhbGwgdGhpbmdzIGdlZWsgdGhyaXZlLiBOZXJkd29yayBpc27igJl0IGp1c3QgYSBjb252ZW50aW9uOyBpdCdzIGEgcGxhdGZvcm0gd2hlcmUgZW50aHVzaWFzdHMgb2YgYWxsIGtpbmRzIGNhbiBjb25uZWN0LCBzaG93Y2FzZSB0aGVpciBza2lsbHMsIGFuZCBjb250cmlidXRlIHRvIHRoZSBkZXZlbG9wbWVudCBvZiBhIHRocml2aW5nIGNyZWF0aXZlIGNvbW11bml0eSBpbiBBZnJpY2EuXCI7XHJcblxyXG4gIGNvbnN0IGFkZFRpY2tldCA9IChlOiBSZWFjdC5Nb3VzZUV2ZW50KSA9PiB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBzZXRUaWNrZXRDb3VudCgocHJldkNvdW50KSA9PiBwcmV2Q291bnQgKyAxKTtcclxuICB9O1xyXG5cclxuICBjb25zdCByZW1vdmVUaWNrZXQgPSAoZTogUmVhY3QuTW91c2VFdmVudCkgPT4ge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgaWYgKHRpY2tldENvdW50ID4gMSkge1xyXG4gICAgICBzZXRUaWNrZXRDb3VudCgocHJldkNvdW50KSA9PiBwcmV2Q291bnQgLSAxKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBjb25zdCB0aWNrZXRQcmljZSA9IHRpY2tldENvdW50ICogQkFTRV9QUklDRTtcclxuXHJcbiAgY29uc3QgaGFuZGxlVGlja2V0Q291bnRDaGFuZ2UgPSAoZTogUmVhY3QuQ2hhbmdlRXZlbnQ8SFRNTElucHV0RWxlbWVudD4pID0+IHtcclxuICAgIGNvbnN0IHZhbHVlID0gcGFyc2VJbnQoZS50YXJnZXQudmFsdWUpIHx8IDE7XHJcbiAgICBjb25zdCB2YWxpZFZhbHVlID0gTWF0aC5tYXgoMSwgdmFsdWUpOyAvLyBFbnN1cmUgbWluaW11bSBvZiAxXHJcbiAgICBzZXRUaWNrZXRDb3VudCh2YWxpZFZhbHVlKTtcclxuICB9O1xyXG5cclxuICBjb25zdCB0b2dnbGVFeHBhbmRlZCA9ICgpID0+IHtcclxuICAgIHNldEV4cGFuZGVkKCFleHBhbmRlZCk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgZGlzcGxheWVkVGV4dCA9IGV4cGFuZGVkXHJcbiAgICA/IGRlc2NyaXB0aW9uXHJcbiAgICA6IGRlc2NyaXB0aW9uLnN1YnN0cmluZygwLCAzMDApICsgXCIuLi5cIjtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cImJnLVsjMEQwRDBEXSB0ZXh0LXdoaXRlIGZvbnQtaW50ZXJcIj5cclxuICAgICAgPE5hdmJhciAvPlxyXG4gICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBtaW4taC1bODB2aF0gdy1mdWxsXCI+XHJcbiAgICAgICAgPGRpdlxyXG4gICAgICAgICAgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCBiZy1jb3ZlciBiZy1jZW50ZXIgYmctbm8tcmVwZWF0IHotMFwiXHJcbiAgICAgICAgICBzdHlsZT17eyBiYWNrZ3JvdW5kSW1hZ2U6IGB1cmwoJHtldmVudD8uc3JjfSlgIH19XHJcbiAgICAgICAgLz5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgYmctW2xpbmVhci1ncmFkaWVudCgxODBkZWcscmdiYSgxMywxMywxMywwKV8wJSwjMEQwRDBEXzgzJSldIHotMTBcIiAvPlxyXG4gICAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cInJlbGF0aXZlIHotMjAgdGV4dC13aGl0ZSBoLVs4MHZoXSBtYXgtdy1bMTEzMHB4XSBteC1hdXRvIGZsZXggZmxleC1jb2wganVzdGlmeS1lbmQgcHgtN1wiPlxyXG4gICAgICAgICAgPGgxIGNsYXNzTmFtZT1cImZvbnQtb2Jvc3RhciB0ZXh0LVs1MnB4XSBtYXgtbWQ6dGV4dC1bMzJweF1cIj5cclxuICAgICAgICAgICAge2V2ZW50Py50aXRsZX1cclxuICAgICAgICAgIDwvaDE+XHJcbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJtYXgtbWQ6dGV4dC1zbSB0ZXh0LVsjRkZGRkZGRTVdXCI+XHJcbiAgICAgICAgICAgIHtldmVudD8uZGF0ZX0gfCBQb3J0IEhhcmNvdXJ0IHwgNTAwIFBlb3BsZSBhdHRlbmRpbmdcclxuICAgICAgICAgIDwvcD5cclxuICAgICAgICA8L3NlY3Rpb24+XHJcbiAgICAgIDwvc2VjdGlvbj5cclxuICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiBnYXAtMjAgbWF4LXctWzExMzBweF0gbXgtYXV0byBteS0xMCBweC03XCI+XHJcbiAgICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBnYXAtMTZcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiXCI+XHJcbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGRcIj5JTkZPUk1BVElPTjwvcD5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsjRkZGRkZGRTVdIHRleHQtc20gZmxleCBmbGV4LWNvbCBnYXAtMyBteS02XCI+XHJcbiAgICAgICAgICAgICAgPHA+e2Rpc3BsYXllZFRleHR9PC9wPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0b2dnbGVFeHBhbmRlZH0+XHJcbiAgICAgICAgICAgICAge2V4cGFuZGVkID8gXCJWaWV3IExlc3NcIiA6IFwiVmlldyBNb3JlXCJ9XHJcbiAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIlwiPlxyXG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJtYi02IGZvbnQtc2VtaWJvbGRcIj5BVFRFTkRJTkc8L3A+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBnYXAtNlwiPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBnYXAtMyBpdGVtcy1jZW50ZXJcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctWyNEOUQ5RDldIHctMjAgaC0yMCByb3VuZGVkLWZ1bGxcIj48L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxzcGFuPk9kdW1vZHU8L3NwYW4+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGdhcC0zIGl0ZW1zLWNlbnRlclwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1bI0Q5RDlEOV0gdy0yMCBoLTIwIHJvdW5kZWQtZnVsbFwiPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPHNwYW4+T2xhYm9kZTwvc3Bhbj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgZ2FwLTMgaXRlbXMtY2VudGVyXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLVsjRDlEOUQ5XSB3LTIwIGgtMjAgcm91bmRlZC1mdWxsXCI+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8c3Bhbj5Gb2xhc2FkZTwvc3Bhbj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGQgdXBwZXJjYXNlIG1iLTZcIj5TcG9uc29yczwvcD5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiBmbGV4LXdyYXAgZ2FwLTQgXCI+XHJcbiAgICAgICAgICAgICAgPEltYWdlIHNyYz17SXRlbH0gd2lkdGg9ezc1fSBoZWlnaHQ9ezQ4fSBhbHQ9XCJpdGVsIGxvZ29cIiAvPlxyXG4gICAgICAgICAgICAgIDxJbWFnZVxyXG4gICAgICAgICAgICAgICAgc3JjPXtDYXJyeTFzdH1cclxuICAgICAgICAgICAgICAgIHdpZHRoPXs0OX1cclxuICAgICAgICAgICAgICAgIGhlaWdodD17NDh9XHJcbiAgICAgICAgICAgICAgICBhbHQ9XCJjYXJyeTFzdCBsb2dvXCJcclxuICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgIDxJbWFnZVxyXG4gICAgICAgICAgICAgICAgc3JjPXtGaWxtaG91c2V9XHJcbiAgICAgICAgICAgICAgICB3aWR0aD17MTM3fVxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0PXs0OH1cclxuICAgICAgICAgICAgICAgIGFsdD1cImZpbG1ob3VzZSBsb2dvXCJcclxuICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgIDxJbWFnZSBzcmM9e1RyaWJlfSB3aWR0aD17OTN9IGhlaWdodD17NDh9IGFsdD1cInRyaWJlIGxvZ29cIiAvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvc2VjdGlvbj5cclxuICAgICAgICA8Zm9ybSBjbGFzc05hbWU9XCJiZy1bIzE0MTQxNF0gYm9yZGVyIGJvcmRlci1bIzI2MjYyNl0gcm91bmRlZC1bMjBweF1cIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWF4LW1kOnAtNSBtZDpwLTEwIGZsZXggZmxleC1jb2wgZ2FwLTZcIj5cclxuICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cImZvbnQtb2Jvc3RhciB0ZXh0LVsyOHB4XVwiPlJlZ2lzdGVyPC9oMz5cclxuICAgICAgICAgICAgPElucHV0XHJcbiAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRmlyc3QgTmFtZVwiXHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIG91dGxpbmUtbm9uZSBib3JkZXIgYm9yZGVyLVsjRkZGRkZGMERdIHJpbmctMCBiZy1bIzI5MjkzMF1cIlxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8SW5wdXRcclxuICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXHJcbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJMYXN0IE5hbWVcIlxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBvdXRsaW5lLW5vbmUgYm9yZGVyIGJvcmRlci1bI0ZGRkZGRjBEXSByaW5nLTAgYmctWyMyOTI5MzBdXCJcclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPElucHV0XHJcbiAgICAgICAgICAgICAgdHlwZT1cImVtYWlsXCJcclxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkVtYWlsXCJcclxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgb3V0bGluZS1ub25lIGJvcmRlciBib3JkZXItWyNGRkZGRkYwRF0gcmluZy0wIGJnLVsjMjkyOTMwXVwiXHJcbiAgICAgICAgICAgIC8+XHJcblxyXG4gICAgICAgICAgICA8cD5USUNLRVRTPC9wPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJvcmRlciBib3JkZXItWyNGRkZGRkY2Nl0gYmctWyNGRkZGRkYwNV0gcm91bmRlZC1bMTZweF0gcC01XCI+XHJcbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZm9udC1zZW1pYm9sZCBtYi0yXCI+RWFybHkgQmlyZDwvcD5cclxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNtIHRleHQtWyNGRkZGRkY5OV1cIj5cclxuICAgICAgICAgICAgICAgIENvbm5lY3Qgd2l0aCBvbmUgb2YgdGhlIGxhcmdlc3QgbmVyZCBjb21tdW5pdHlcclxuICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIiBiZy1bI0ZGRkZGRjA1XSByb3VuZGVkLVsxNnB4XSBwLTVcIj5cclxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkIG1iLTJcIj5FYXJseSBCaXJkPC9wPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LVsjRkZGRkZGOTldXCI+XHJcbiAgICAgICAgICAgICAgICA8cD5TdGVwIGludG8gdGhlIHVsdGltYXRlIG5lcmR2ZXJzZTo8L3A+XHJcbiAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwibGlzdC1kaXNjIG1sLTVcIj5cclxuICAgICAgICAgICAgICAgICAgPGxpPkV4cGxvcmUgZXhjbHVzaXZlIGNvbWljcyBvbiB0aGUgTmVyZHdvcmsrIHBsYXRmb3JtPC9saT5cclxuICAgICAgICAgICAgICAgICAgPGxpPkF0dGVuZCB0aGUgbW9zdCBleGNpdGluZyBjb21pYyBjb252ZW50aW9uczwvbGk+XHJcbiAgICAgICAgICAgICAgICAgIDxsaT5Db25uZWN0IHdpdGggb25lIG9mIHRoZSBsYXJnZXN0IG5lcmQgY29tbXVuaXR5PC9saT5cclxuICAgICAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8U2VwYXJhdG9yIGNsYXNzTmFtZT1cImJnLVsjNDA0MDQwXVwiIC8+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuIGl0ZW1zLWNlbnRlciBtYXgtbWQ6ZmxleC1jb2wgbWF4LW1kOml0ZW1zLWNlbnRlciBtYXgtbWQ6Z2FwLTQgcC0xMFwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZ2FwLTUgaXRlbXMtY2VudGVyXCI+XHJcbiAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgb25DbGljaz17cmVtb3ZlVGlja2V0fVxyXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3RpY2tldENvdW50IDw9IDF9XHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJiZy1bI0ZGRkZGRjFBXSB3LVs1MHB4XSBoLVs1MHB4XSByb3VuZGVkLWZ1bGwgaG92ZXI6b3BhY2l0eS04NSBjdXJzb3ItcG9pbnRlciBkaXNhYmxlZDpvcGFjaXR5LTUwIGRpc2FibGVkOmN1cnNvci1ub3QtYWxsb3dlZFwiXHJcbiAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgLVxyXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgIDxJbnB1dFxyXG4gICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgICAgICAgdmFsdWU9e3RpY2tldENvdW50fVxyXG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZVRpY2tldENvdW50Q2hhbmdlfVxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwib3V0bGluZS1ub25lIGJvcmRlci1bI0ZGRkZGRjMzXSByaW5nLTAgdy0xMCBoLTEwXCJcclxuICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2FkZFRpY2tldH1cclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJnLVsjRkZGRkZGMUFdIHctWzUwcHhdIGgtWzUwcHhdIHJvdW5kZWQtZnVsbCBob3ZlcjpvcGFjaXR5LTg1IGN1cnNvci1wb2ludGVyXCJcclxuICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICArXHJcbiAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8QnV0dG9uIHZhcmlhbnQ9e1wicHJpbWFyeVwifT5cclxuICAgICAgICAgICAgICA8TGluayBocmVmPXtgJHtldmVudD8ubGlua31gfSB0YXJnZXQ9XCJfYmxhbmtcIj5cclxuICAgICAgICAgICAgICAgIEJ1eSBOe3RpY2tldFByaWNlLnRvTG9jYWxlU3RyaW5nKCl9XHJcbiAgICAgICAgICAgICAgPC9MaW5rPlxyXG4gICAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZm9ybT5cclxuICAgICAgPC9zZWN0aW9uPlxyXG4gICAgICA8RkFRIC8+XHJcbiAgICAgIDxGb290ZXIgLz5cclxuICAgIDwvc2VjdGlvbj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgUmVnaXN0ZXJFdmVudDtcclxuIl19