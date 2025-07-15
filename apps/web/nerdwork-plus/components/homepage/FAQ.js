"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FAQ;
const react_1 = __importDefault(require("react"));
const button_1 = require("../ui/button");
const accordion_1 = require("../ui/accordion");
const faqs = [
    {
        id: 1,
        question: "What is Nerdwork all about?",
        answer: "Nerdwork is a community of creatives, enthusiasts and fun loving people who are looking to celebrate art, pop culture, and entertainment. The comic convention will feature panels, exhibits, cosplay, games, and guest appearances from creators and celebrities.",
    },
    {
        id: 2,
        question: "Do I need to be a weeb/nerd to attend a comic con?",
        answer: "Nerdwork is a community of creatives, enthusiasts and fun loving people who are looking to celebrate art, pop culture, and entertainment. The comic convention will feature panels, exhibits, cosplay, games, and guest appearances from creators and celebrities.",
    },
    {
        id: 3,
        question: "Do I have to wear a costume?",
        answer: "Nerdwork is a community of creatives, enthusiasts and fun loving people who are looking to celebrate art, pop culture, and entertainment. The comic convention will feature panels, exhibits, cosplay, games, and guest appearances from creators and celebrities.",
    },
    {
        id: 4,
        question: "Can I buy tickets at the door",
        answer: "Nerdwork is a community of creatives, enthusiasts and fun loving people who are looking to celebrate art, pop culture, and entertainment. The comic convention will feature panels, exhibits, cosplay, games, and guest appearances from creators and celebrities.",
    },
    {
        id: 5,
        question: "What activities can I expect at a comic con?",
        answer: "Nerdwork is a community of creatives, enthusiasts and fun loving people who are looking to celebrate art, pop culture, and entertainment. The comic convention will feature panels, exhibits, cosplay, games, and guest appearances from creators and celebrities.",
    },
    {
        id: 6,
        question: "Are there age restrictions for attendees?",
        answer: "Nerdwork is a community of creatives, enthusiasts and fun loving people who are looking to celebrate art, pop culture, and entertainment. The comic convention will feature panels, exhibits, cosplay, games, and guest appearances from creators and celebrities.",
    },
    {
        id: 7,
        question: "Can I meet my favorite creators or celebrities?",
        answer: "Nerdwork is a community of creatives, enthusiasts and fun loving people who are looking to celebrate art, pop culture, and entertainment. The comic convention will feature panels, exhibits, cosplay, games, and guest appearances from creators and celebrities.",
    },
    {
        id: 8,
        question: "Will there be merchandise available for purchase?",
        answer: "Nerdwork is a community of creatives, enthusiasts and fun loving people who are looking to celebrate art, pop culture, and entertainment. The comic convention will feature panels, exhibits, cosplay, games, and guest appearances from creators and celebrities.",
    },
    {
        id: 9,
        question: "Are pets allowed at the event?",
        answer: "Nerdwork is a community of creatives, enthusiasts and fun loving people who are looking to celebrate art, pop culture, and entertainment. The comic convention will feature panels, exhibits, cosplay, games, and guest appearances from creators and celebrities.",
    },
    {
        id: 10,
        question: "What are the health and safety guidelines for attendees?",
        answer: "Nerdwork is a community of creatives, enthusiasts and fun loving people who are looking to celebrate art, pop culture, and entertainment. The comic convention will feature panels, exhibits, cosplay, games, and guest appearances from creators and celebrities.",
    },
];
function FAQ() {
    return (<section data-testid="faq" className="flex max-lg:flex-col max-w-[1130px] font-inter mx-auto text-white py-20 px-7">
      <div className="lg:w-1/2 flex flex-col gap-6">
        <h2 className="font-obostar text-[40px] max-md:text-2xl">
          Frequently Asked Questions
        </h2>
        <p className="font-semibold">
          What fans everywhere have been asking.
          <br />
          Can’t find the answer? Ask us directly!
        </p>
        <button_1.Button className="bg-[#343435] w-fit max-md:hidden">
          Contact Support
        </button_1.Button>
      </div>
      <div className="lg:w-1/2">
        <accordion_1.Accordion type="single" collapsible>
          {faqs.map((faq) => (<accordion_1.AccordionItem className="border-none text-base" key={faq.id} value={faq.id.toString()}>
              <accordion_1.AccordionTrigger className="font-semibold">
                {faq.question}
              </accordion_1.AccordionTrigger>
              <accordion_1.AccordionContent>{faq.answer}</accordion_1.AccordionContent>
            </accordion_1.AccordionItem>))}
        </accordion_1.Accordion>
      </div>
      <p className="text-sm md:hidden my-4">
        Can’t find the answer? Ask us directly!
      </p>
      <button_1.Button className="w-fit md:hidden">Contact Support</button_1.Button>
    </section>);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRkFRLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiRkFRLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQXdFQSxzQkF5Q0M7QUFqSEQsa0RBQTBCO0FBQzFCLHlDQUFzQztBQUN0QywrQ0FLeUI7QUFFekIsTUFBTSxJQUFJLEdBQUc7SUFDWDtRQUNFLEVBQUUsRUFBRSxDQUFDO1FBQ0wsUUFBUSxFQUFFLDZCQUE2QjtRQUN2QyxNQUFNLEVBQ0osb1FBQW9RO0tBQ3ZRO0lBQ0Q7UUFDRSxFQUFFLEVBQUUsQ0FBQztRQUNMLFFBQVEsRUFBRSxvREFBb0Q7UUFDOUQsTUFBTSxFQUNKLG9RQUFvUTtLQUN2UTtJQUNEO1FBQ0UsRUFBRSxFQUFFLENBQUM7UUFDTCxRQUFRLEVBQUUsOEJBQThCO1FBQ3hDLE1BQU0sRUFDSixvUUFBb1E7S0FDdlE7SUFDRDtRQUNFLEVBQUUsRUFBRSxDQUFDO1FBQ0wsUUFBUSxFQUFFLCtCQUErQjtRQUN6QyxNQUFNLEVBQ0osb1FBQW9RO0tBQ3ZRO0lBQ0Q7UUFDRSxFQUFFLEVBQUUsQ0FBQztRQUNMLFFBQVEsRUFBRSw4Q0FBOEM7UUFDeEQsTUFBTSxFQUNKLG9RQUFvUTtLQUN2UTtJQUNEO1FBQ0UsRUFBRSxFQUFFLENBQUM7UUFDTCxRQUFRLEVBQUUsMkNBQTJDO1FBQ3JELE1BQU0sRUFDSixvUUFBb1E7S0FDdlE7SUFDRDtRQUNFLEVBQUUsRUFBRSxDQUFDO1FBQ0wsUUFBUSxFQUFFLGlEQUFpRDtRQUMzRCxNQUFNLEVBQ0osb1FBQW9RO0tBQ3ZRO0lBQ0Q7UUFDRSxFQUFFLEVBQUUsQ0FBQztRQUNMLFFBQVEsRUFBRSxtREFBbUQ7UUFDN0QsTUFBTSxFQUNKLG9RQUFvUTtLQUN2UTtJQUNEO1FBQ0UsRUFBRSxFQUFFLENBQUM7UUFDTCxRQUFRLEVBQUUsZ0NBQWdDO1FBQzFDLE1BQU0sRUFDSixvUUFBb1E7S0FDdlE7SUFDRDtRQUNFLEVBQUUsRUFBRSxFQUFFO1FBQ04sUUFBUSxFQUFFLDBEQUEwRDtRQUNwRSxNQUFNLEVBQ0osb1FBQW9RO0tBQ3ZRO0NBQ0YsQ0FBQztBQUVGLFNBQXdCLEdBQUc7SUFDekIsT0FBTyxDQUNMLENBQUMsT0FBTyxDQUNOLFdBQVcsQ0FBQyxLQUFLLENBQ2pCLFNBQVMsQ0FBQyw4RUFBOEUsQ0FFeEY7TUFBQSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsOEJBQThCLENBQzNDO1FBQUEsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLDBDQUEwQyxDQUN0RDs7UUFDRixFQUFFLEVBQUUsQ0FDSjtRQUFBLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQzFCOztVQUNBLENBQUMsRUFBRSxDQUFDLEFBQUQsRUFDSDs7UUFDRixFQUFFLENBQUMsQ0FDSDtRQUFBLENBQUMsZUFBTSxDQUFDLFNBQVMsQ0FBQyxrQ0FBa0MsQ0FDbEQ7O1FBQ0YsRUFBRSxlQUFNLENBQ1Y7TUFBQSxFQUFFLEdBQUcsQ0FDTDtNQUFBLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQ3ZCO1FBQUEsQ0FBQyxxQkFBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUNsQztVQUFBLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FDakIsQ0FBQyx5QkFBYSxDQUNaLFNBQVMsQ0FBQyx1QkFBdUIsQ0FDakMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUNaLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FFekI7Y0FBQSxDQUFDLDRCQUFnQixDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQ3pDO2dCQUFBLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FDZjtjQUFBLEVBQUUsNEJBQWdCLENBQ2xCO2NBQUEsQ0FBQyw0QkFBZ0IsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSw0QkFBZ0IsQ0FDbEQ7WUFBQSxFQUFFLHlCQUFhLENBQUMsQ0FDakIsQ0FBQyxDQUNKO1FBQUEsRUFBRSxxQkFBUyxDQUNiO01BQUEsRUFBRSxHQUFHLENBQ0w7TUFBQSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsd0JBQXdCLENBQ25DOztNQUNGLEVBQUUsQ0FBQyxDQUNIO01BQUEsQ0FBQyxlQUFNLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLGVBQWUsRUFBRSxlQUFNLENBQzdEO0lBQUEsRUFBRSxPQUFPLENBQUMsQ0FDWCxDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSBcIi4uL3VpL2J1dHRvblwiO1xyXG5pbXBvcnQge1xyXG4gIEFjY29yZGlvbixcclxuICBBY2NvcmRpb25Db250ZW50LFxyXG4gIEFjY29yZGlvbkl0ZW0sXHJcbiAgQWNjb3JkaW9uVHJpZ2dlcixcclxufSBmcm9tIFwiLi4vdWkvYWNjb3JkaW9uXCI7XHJcblxyXG5jb25zdCBmYXFzID0gW1xyXG4gIHtcclxuICAgIGlkOiAxLFxyXG4gICAgcXVlc3Rpb246IFwiV2hhdCBpcyBOZXJkd29yayBhbGwgYWJvdXQ/XCIsXHJcbiAgICBhbnN3ZXI6XHJcbiAgICAgIFwiTmVyZHdvcmsgaXMgYSBjb21tdW5pdHkgb2YgY3JlYXRpdmVzLCBlbnRodXNpYXN0cyBhbmQgZnVuIGxvdmluZyBwZW9wbGUgd2hvIGFyZSBsb29raW5nIHRvIGNlbGVicmF0ZSBhcnQsIHBvcCBjdWx0dXJlLCBhbmQgZW50ZXJ0YWlubWVudC4gVGhlIGNvbWljIGNvbnZlbnRpb24gd2lsbCBmZWF0dXJlIHBhbmVscywgZXhoaWJpdHMsIGNvc3BsYXksIGdhbWVzLCBhbmQgZ3Vlc3QgYXBwZWFyYW5jZXMgZnJvbSBjcmVhdG9ycyBhbmQgY2VsZWJyaXRpZXMuXCIsXHJcbiAgfSxcclxuICB7XHJcbiAgICBpZDogMixcclxuICAgIHF1ZXN0aW9uOiBcIkRvIEkgbmVlZCB0byBiZSBhIHdlZWIvbmVyZCB0byBhdHRlbmQgYSBjb21pYyBjb24/XCIsXHJcbiAgICBhbnN3ZXI6XHJcbiAgICAgIFwiTmVyZHdvcmsgaXMgYSBjb21tdW5pdHkgb2YgY3JlYXRpdmVzLCBlbnRodXNpYXN0cyBhbmQgZnVuIGxvdmluZyBwZW9wbGUgd2hvIGFyZSBsb29raW5nIHRvIGNlbGVicmF0ZSBhcnQsIHBvcCBjdWx0dXJlLCBhbmQgZW50ZXJ0YWlubWVudC4gVGhlIGNvbWljIGNvbnZlbnRpb24gd2lsbCBmZWF0dXJlIHBhbmVscywgZXhoaWJpdHMsIGNvc3BsYXksIGdhbWVzLCBhbmQgZ3Vlc3QgYXBwZWFyYW5jZXMgZnJvbSBjcmVhdG9ycyBhbmQgY2VsZWJyaXRpZXMuXCIsXHJcbiAgfSxcclxuICB7XHJcbiAgICBpZDogMyxcclxuICAgIHF1ZXN0aW9uOiBcIkRvIEkgaGF2ZSB0byB3ZWFyIGEgY29zdHVtZT9cIixcclxuICAgIGFuc3dlcjpcclxuICAgICAgXCJOZXJkd29yayBpcyBhIGNvbW11bml0eSBvZiBjcmVhdGl2ZXMsIGVudGh1c2lhc3RzIGFuZCBmdW4gbG92aW5nIHBlb3BsZSB3aG8gYXJlIGxvb2tpbmcgdG8gY2VsZWJyYXRlIGFydCwgcG9wIGN1bHR1cmUsIGFuZCBlbnRlcnRhaW5tZW50LiBUaGUgY29taWMgY29udmVudGlvbiB3aWxsIGZlYXR1cmUgcGFuZWxzLCBleGhpYml0cywgY29zcGxheSwgZ2FtZXMsIGFuZCBndWVzdCBhcHBlYXJhbmNlcyBmcm9tIGNyZWF0b3JzIGFuZCBjZWxlYnJpdGllcy5cIixcclxuICB9LFxyXG4gIHtcclxuICAgIGlkOiA0LFxyXG4gICAgcXVlc3Rpb246IFwiQ2FuIEkgYnV5IHRpY2tldHMgYXQgdGhlIGRvb3JcIixcclxuICAgIGFuc3dlcjpcclxuICAgICAgXCJOZXJkd29yayBpcyBhIGNvbW11bml0eSBvZiBjcmVhdGl2ZXMsIGVudGh1c2lhc3RzIGFuZCBmdW4gbG92aW5nIHBlb3BsZSB3aG8gYXJlIGxvb2tpbmcgdG8gY2VsZWJyYXRlIGFydCwgcG9wIGN1bHR1cmUsIGFuZCBlbnRlcnRhaW5tZW50LiBUaGUgY29taWMgY29udmVudGlvbiB3aWxsIGZlYXR1cmUgcGFuZWxzLCBleGhpYml0cywgY29zcGxheSwgZ2FtZXMsIGFuZCBndWVzdCBhcHBlYXJhbmNlcyBmcm9tIGNyZWF0b3JzIGFuZCBjZWxlYnJpdGllcy5cIixcclxuICB9LFxyXG4gIHtcclxuICAgIGlkOiA1LFxyXG4gICAgcXVlc3Rpb246IFwiV2hhdCBhY3Rpdml0aWVzIGNhbiBJIGV4cGVjdCBhdCBhIGNvbWljIGNvbj9cIixcclxuICAgIGFuc3dlcjpcclxuICAgICAgXCJOZXJkd29yayBpcyBhIGNvbW11bml0eSBvZiBjcmVhdGl2ZXMsIGVudGh1c2lhc3RzIGFuZCBmdW4gbG92aW5nIHBlb3BsZSB3aG8gYXJlIGxvb2tpbmcgdG8gY2VsZWJyYXRlIGFydCwgcG9wIGN1bHR1cmUsIGFuZCBlbnRlcnRhaW5tZW50LiBUaGUgY29taWMgY29udmVudGlvbiB3aWxsIGZlYXR1cmUgcGFuZWxzLCBleGhpYml0cywgY29zcGxheSwgZ2FtZXMsIGFuZCBndWVzdCBhcHBlYXJhbmNlcyBmcm9tIGNyZWF0b3JzIGFuZCBjZWxlYnJpdGllcy5cIixcclxuICB9LFxyXG4gIHtcclxuICAgIGlkOiA2LFxyXG4gICAgcXVlc3Rpb246IFwiQXJlIHRoZXJlIGFnZSByZXN0cmljdGlvbnMgZm9yIGF0dGVuZGVlcz9cIixcclxuICAgIGFuc3dlcjpcclxuICAgICAgXCJOZXJkd29yayBpcyBhIGNvbW11bml0eSBvZiBjcmVhdGl2ZXMsIGVudGh1c2lhc3RzIGFuZCBmdW4gbG92aW5nIHBlb3BsZSB3aG8gYXJlIGxvb2tpbmcgdG8gY2VsZWJyYXRlIGFydCwgcG9wIGN1bHR1cmUsIGFuZCBlbnRlcnRhaW5tZW50LiBUaGUgY29taWMgY29udmVudGlvbiB3aWxsIGZlYXR1cmUgcGFuZWxzLCBleGhpYml0cywgY29zcGxheSwgZ2FtZXMsIGFuZCBndWVzdCBhcHBlYXJhbmNlcyBmcm9tIGNyZWF0b3JzIGFuZCBjZWxlYnJpdGllcy5cIixcclxuICB9LFxyXG4gIHtcclxuICAgIGlkOiA3LFxyXG4gICAgcXVlc3Rpb246IFwiQ2FuIEkgbWVldCBteSBmYXZvcml0ZSBjcmVhdG9ycyBvciBjZWxlYnJpdGllcz9cIixcclxuICAgIGFuc3dlcjpcclxuICAgICAgXCJOZXJkd29yayBpcyBhIGNvbW11bml0eSBvZiBjcmVhdGl2ZXMsIGVudGh1c2lhc3RzIGFuZCBmdW4gbG92aW5nIHBlb3BsZSB3aG8gYXJlIGxvb2tpbmcgdG8gY2VsZWJyYXRlIGFydCwgcG9wIGN1bHR1cmUsIGFuZCBlbnRlcnRhaW5tZW50LiBUaGUgY29taWMgY29udmVudGlvbiB3aWxsIGZlYXR1cmUgcGFuZWxzLCBleGhpYml0cywgY29zcGxheSwgZ2FtZXMsIGFuZCBndWVzdCBhcHBlYXJhbmNlcyBmcm9tIGNyZWF0b3JzIGFuZCBjZWxlYnJpdGllcy5cIixcclxuICB9LFxyXG4gIHtcclxuICAgIGlkOiA4LFxyXG4gICAgcXVlc3Rpb246IFwiV2lsbCB0aGVyZSBiZSBtZXJjaGFuZGlzZSBhdmFpbGFibGUgZm9yIHB1cmNoYXNlP1wiLFxyXG4gICAgYW5zd2VyOlxyXG4gICAgICBcIk5lcmR3b3JrIGlzIGEgY29tbXVuaXR5IG9mIGNyZWF0aXZlcywgZW50aHVzaWFzdHMgYW5kIGZ1biBsb3ZpbmcgcGVvcGxlIHdobyBhcmUgbG9va2luZyB0byBjZWxlYnJhdGUgYXJ0LCBwb3AgY3VsdHVyZSwgYW5kIGVudGVydGFpbm1lbnQuIFRoZSBjb21pYyBjb252ZW50aW9uIHdpbGwgZmVhdHVyZSBwYW5lbHMsIGV4aGliaXRzLCBjb3NwbGF5LCBnYW1lcywgYW5kIGd1ZXN0IGFwcGVhcmFuY2VzIGZyb20gY3JlYXRvcnMgYW5kIGNlbGVicml0aWVzLlwiLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgaWQ6IDksXHJcbiAgICBxdWVzdGlvbjogXCJBcmUgcGV0cyBhbGxvd2VkIGF0IHRoZSBldmVudD9cIixcclxuICAgIGFuc3dlcjpcclxuICAgICAgXCJOZXJkd29yayBpcyBhIGNvbW11bml0eSBvZiBjcmVhdGl2ZXMsIGVudGh1c2lhc3RzIGFuZCBmdW4gbG92aW5nIHBlb3BsZSB3aG8gYXJlIGxvb2tpbmcgdG8gY2VsZWJyYXRlIGFydCwgcG9wIGN1bHR1cmUsIGFuZCBlbnRlcnRhaW5tZW50LiBUaGUgY29taWMgY29udmVudGlvbiB3aWxsIGZlYXR1cmUgcGFuZWxzLCBleGhpYml0cywgY29zcGxheSwgZ2FtZXMsIGFuZCBndWVzdCBhcHBlYXJhbmNlcyBmcm9tIGNyZWF0b3JzIGFuZCBjZWxlYnJpdGllcy5cIixcclxuICB9LFxyXG4gIHtcclxuICAgIGlkOiAxMCxcclxuICAgIHF1ZXN0aW9uOiBcIldoYXQgYXJlIHRoZSBoZWFsdGggYW5kIHNhZmV0eSBndWlkZWxpbmVzIGZvciBhdHRlbmRlZXM/XCIsXHJcbiAgICBhbnN3ZXI6XHJcbiAgICAgIFwiTmVyZHdvcmsgaXMgYSBjb21tdW5pdHkgb2YgY3JlYXRpdmVzLCBlbnRodXNpYXN0cyBhbmQgZnVuIGxvdmluZyBwZW9wbGUgd2hvIGFyZSBsb29raW5nIHRvIGNlbGVicmF0ZSBhcnQsIHBvcCBjdWx0dXJlLCBhbmQgZW50ZXJ0YWlubWVudC4gVGhlIGNvbWljIGNvbnZlbnRpb24gd2lsbCBmZWF0dXJlIHBhbmVscywgZXhoaWJpdHMsIGNvc3BsYXksIGdhbWVzLCBhbmQgZ3Vlc3QgYXBwZWFyYW5jZXMgZnJvbSBjcmVhdG9ycyBhbmQgY2VsZWJyaXRpZXMuXCIsXHJcbiAgfSxcclxuXTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEZBUSgpIHtcclxuICByZXR1cm4gKFxyXG4gICAgPHNlY3Rpb25cclxuICAgICAgZGF0YS10ZXN0aWQ9XCJmYXFcIlxyXG4gICAgICBjbGFzc05hbWU9XCJmbGV4IG1heC1sZzpmbGV4LWNvbCBtYXgtdy1bMTEzMHB4XSBmb250LWludGVyIG14LWF1dG8gdGV4dC13aGl0ZSBweS0yMCBweC03XCJcclxuICAgID5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJsZzp3LTEvMiBmbGV4IGZsZXgtY29sIGdhcC02XCI+XHJcbiAgICAgICAgPGgyIGNsYXNzTmFtZT1cImZvbnQtb2Jvc3RhciB0ZXh0LVs0MHB4XSBtYXgtbWQ6dGV4dC0yeGxcIj5cclxuICAgICAgICAgIEZyZXF1ZW50bHkgQXNrZWQgUXVlc3Rpb25zXHJcbiAgICAgICAgPC9oMj5cclxuICAgICAgICA8cCBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkXCI+XHJcbiAgICAgICAgICBXaGF0IGZhbnMgZXZlcnl3aGVyZSBoYXZlIGJlZW4gYXNraW5nLlxyXG4gICAgICAgICAgPGJyIC8+XHJcbiAgICAgICAgICBDYW7igJl0IGZpbmQgdGhlIGFuc3dlcj8gQXNrIHVzIGRpcmVjdGx5IVxyXG4gICAgICAgIDwvcD5cclxuICAgICAgICA8QnV0dG9uIGNsYXNzTmFtZT1cImJnLVsjMzQzNDM1XSB3LWZpdCBtYXgtbWQ6aGlkZGVuXCI+XHJcbiAgICAgICAgICBDb250YWN0IFN1cHBvcnRcclxuICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGc6dy0xLzJcIj5cclxuICAgICAgICA8QWNjb3JkaW9uIHR5cGU9XCJzaW5nbGVcIiBjb2xsYXBzaWJsZT5cclxuICAgICAgICAgIHtmYXFzLm1hcCgoZmFxKSA9PiAoXHJcbiAgICAgICAgICAgIDxBY2NvcmRpb25JdGVtXHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYm9yZGVyLW5vbmUgdGV4dC1iYXNlXCJcclxuICAgICAgICAgICAgICBrZXk9e2ZhcS5pZH1cclxuICAgICAgICAgICAgICB2YWx1ZT17ZmFxLmlkLnRvU3RyaW5nKCl9XHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICA8QWNjb3JkaW9uVHJpZ2dlciBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkXCI+XHJcbiAgICAgICAgICAgICAgICB7ZmFxLnF1ZXN0aW9ufVxyXG4gICAgICAgICAgICAgIDwvQWNjb3JkaW9uVHJpZ2dlcj5cclxuICAgICAgICAgICAgICA8QWNjb3JkaW9uQ29udGVudD57ZmFxLmFuc3dlcn08L0FjY29yZGlvbkNvbnRlbnQ+XHJcbiAgICAgICAgICAgIDwvQWNjb3JkaW9uSXRlbT5cclxuICAgICAgICAgICkpfVxyXG4gICAgICAgIDwvQWNjb3JkaW9uPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbSBtZDpoaWRkZW4gbXktNFwiPlxyXG4gICAgICAgIENhbuKAmXQgZmluZCB0aGUgYW5zd2VyPyBBc2sgdXMgZGlyZWN0bHkhXHJcbiAgICAgIDwvcD5cclxuICAgICAgPEJ1dHRvbiBjbGFzc05hbWU9XCJ3LWZpdCBtZDpoaWRkZW5cIj5Db250YWN0IFN1cHBvcnQ8L0J1dHRvbj5cclxuICAgIDwvc2VjdGlvbj5cclxuICApO1xyXG59XHJcbiJdfQ==