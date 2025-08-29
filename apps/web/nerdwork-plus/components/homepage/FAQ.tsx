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
      "Nerdwork is a creative entertainment studio and thriving fan community, best known for its annual Nerdwork Comic-Con. Nerdwork is an intersection of storytelling, tech, culture and fandom. From cosplay Showcases and gaming tournaments to animation screenings and tech exhibitions. Nerdwork celebrates creativity in all forms. We are not just an event, we're the home for fans.",
  },
  {
    id: 2,
    question: "Do I need to be a weeb/nerd to attend a comic con?",
    answer:
      "Not at all! Comic-Con is open to everyone, whether you're deep into fandom or just curious. Come as you are and enjoy the vibe.",
  },
  {
    id: 3,
    question: "Do I have to wear a costume?",
    answer:
      "Nope! While we love seeing amazing cosplays, costumes are totally optional. Dress however you feel comfortable.",
  },
  {
    id: 4,
    question: "Can I buy tickets at the door?",
    answer:
      "Absolutely! Tickets for Nerdwork Comic-Con will be available at the venue. However please note that Early Bird or Clan tickets will not be available at the door, only Regular tickets.",
  },
  {
    id: 5,
    question: "What activities can I expect at a comic con?",
    intro:
      "Nerdwork Comic-Con is packed with diverse and exciting experiences. You can look forward to;",
    answer: [
      "Live performances",
      "Cosplay Showcase",
      "Gaming tournaments",
      "Mini Sidequest games",
      "Tabletop games",
      "Vendor exhibitions",
      "Anime Swap",
      "Meet & Greets",
      "Panel Sessions",
      "After Party vibes",
    ],
    outro: "Each year comes with unique twists!",
  },
  {
    id: 6,
    question: "Are there age restrictions for attendees?",
    answer:
      "Minors under the age of 12 must be accompanied by an adult or guardian at all times.",
  },
  {
    id: 7,
    question: "Can I meet my favorite creators or celebrities?",
    answer:
      "Yes! Creators and special guests are announced ahead of time BUT don't be surprised if you spot an unannounced celeb walking around too.",
  },
  {
    id: 8,
    question: "Will there be merchandise available for purchase?",
    answer:
      "Absolutely! You'll find a lot of fandom inspired Merch, from art prints and collectibles to apparels and handmade items. Make sure to explore our Vendor section!",
  },
  {
    id: 9,
    question: "Are pets allowed at the event?",
    answer:
      "Unfortunately, no pets or animals are not allowed at Comic-Con (with exception of service animals).",
  },
  {
    id: 10,
    question: "What are the health and safety guidelines for attendees?",
    answer: [
      "Security checks will be conducted at all entrances. Please cooperate with the team.",
      "No weapons or sharp objects (real or replica) are allowed. Cosplay props will be inspected.",
      "If you're feeling unwell or showing symptoms of illness, we kindly advise that you stay home.",
      "Minors under 13 must be accompanied by an adult or guardian.",
      "Use of narcotic, unprescribed drugs, edibles, cigarettes, vapes etc. are prohibited.",
    ],
  },
];

export default function FAQ() {
  return (
    <section
      data-testid="faq"
      className="flex max-lg:flex-col max-w-[1130px] font-inter mx-auto text-white py-20 px-7"
    >
      <div className="lg:w-1/2 flex flex-col gap-6">
        <h2 className="font-obostar text-[40px] max-md:text-2xl">
          Frequently Asked Questions
        </h2>
        <p className="font-semibold">
          What fans everywhere have been asking.
          <br />
          Can’t find the answer? Ask us directly!
        </p>
        <Button className="bg-[#343435] w-fit max-md:hidden">
          Contact Support
        </Button>
      </div>
      <div className="lg:w-1/2">
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
              <AccordionContent className="whitespace-pre-line">
                {typeof faq.answer === "string" ? (
                  <div>{faq.answer}</div>
                ) : (
                  <>
                    <p className="mb-2">{faq.intro}</p>
                    <ul className="list-disc pl-6 list-outside">
                      {faq.answer.map((point, index) => (
                        <li className="mb-1" key={index}>
                          {point}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-2">{faq.outro}</p>
                  </>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <p className="text-sm md:hidden my-4">
        Can’t find the answer? Ask us directly!
      </p>
      <Button className="w-fit md:hidden">Contact Support</Button>
    </section>
  );
}
