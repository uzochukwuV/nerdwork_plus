import React from "react";
import { Button } from "../ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const faqs = [
  {
    id: 1,
    question: "What is Nerdwork all about?",
    answer:
      "Nerdwork is a community of creatives, enthusiasts and fun oving people who are looking to celebrate art, pop culture, and entertainment. The comic convention will feature panels, exhibits, cosplay, games, and guest appearances from creators and celebrities.",
  },
  {
    id: 2,
    question: "Do I need to be a weeb/nerd to attend a comic con?",
    answer:
      "Nerdwork is a community of creatives, enthusiasts and fun oving people who are looking to celebrate art, pop culture, and entertainment. The comic convention will feature panels, exhibits, cosplay, games, and guest appearances from creators and celebrities.",
  },
  {
    id: 3,
    question: "Do I have to wear a costume?",
    answer:
      "Nerdwork is a community of creatives, enthusiasts and fun oving people who are looking to celebrate art, pop culture, and entertainment. The comic convention will feature panels, exhibits, cosplay, games, and guest appearances from creators and celebrities.",
  },
  {
    id: 4,
    question: "Can I buy tickets at the door",
    answer:
      "Nerdwork is a community of creatives, enthusiasts and fun oving people who are looking to celebrate art, pop culture, and entertainment. The comic convention will feature panels, exhibits, cosplay, games, and guest appearances from creators and celebrities.",
  },
  {
    id: 5,
    question: "What activities can I expect at a comic con?",
    answer:
      "Nerdwork is a community of creatives, enthusiasts and fun oving people who are looking to celebrate art, pop culture, and entertainment. The comic convention will feature panels, exhibits, cosplay, games, and guest appearances from creators and celebrities.",
  },
  {
    id: 6,
    question: "Are there age restrictions for attendees?",
    answer:
      "Nerdwork is a community of creatives, enthusiasts and fun oving people who are looking to celebrate art, pop culture, and entertainment. The comic convention will feature panels, exhibits, cosplay, games, and guest appearances from creators and celebrities.",
  },
  {
    id: 7,
    question: "Can I meet my favorite creators or celebrities?",
    answer:
      "Nerdwork is a community of creatives, enthusiasts and fun oving people who are looking to celebrate art, pop culture, and entertainment. The comic convention will feature panels, exhibits, cosplay, games, and guest appearances from creators and celebrities.",
  },
  {
    id: 8,
    question: "Will there be merchandise available for purchase?",
    answer:
      "Nerdwork is a community of creatives, enthusiasts and fun oving people who are looking to celebrate art, pop culture, and entertainment. The comic convention will feature panels, exhibits, cosplay, games, and guest appearances from creators and celebrities.",
  },
  {
    id: 9,
    question: "Are pets allowed at the event?",
    answer:
      "Nerdwork is a community of creatives, enthusiasts and fun oving people who are looking to celebrate art, pop culture, and entertainment. The comic convention will feature panels, exhibits, cosplay, games, and guest appearances from creators and celebrities.",
  },
  {
    id: 10,
    question: "What are the health and safety guidelines for attendees?",
    answer:
      "Nerdwork is a community of creatives, enthusiasts and fun oving people who are looking to celebrate art, pop culture, and entertainment. The comic convention will feature panels, exhibits, cosplay, games, and guest appearances from creators and celebrities.",
  },
];

export default function FAQ() {
  return (
    <section className="flex max-w-[1130px] font-inter mx-auto text-white py-20">
      <div className="w-1/2 flex flex-col gap-6">
        <h2 className="font-obostar text-[40px]">Frequently Asked Questions</h2>
        <p className="font-semibold">
          What fans everywhere have been asking.
          <br />
          Can’t find the answer? Ask us directly!
        </p>
        <Button className="bg-[#343435] w-fit">Contact Support</Button>
      </div>
      <div className="w-1/2">
        <Accordion type="single" collapsible>
          {faqs.map((faq) => (
            <AccordionItem
              className="border-none text-base"
              key={faq.id}
              value={faq.id.toString()}
            >
              <AccordionTrigger className="font-semibold">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
