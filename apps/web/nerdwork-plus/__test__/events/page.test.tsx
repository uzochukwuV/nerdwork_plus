import Events from "@/app/(external)/events/page";
import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";

describe("Events Page", () => {
  beforeEach(() => {
    render(<Events />);
  });

  // NAVIGATION BAR TESTS
  it("renders navigation menu", () => {
    const nav = screen.getByRole("navigation");
    const navLogo = within(nav).getAllByAltText(/nerdwork logo/i);
    const loginButton = within(nav).getByRole("link", { name: /log in/i });
    const signupButton = within(nav).getByRole("link", { name: /sign up/i });

    expect(nav).toBeInTheDocument();
    expect(navLogo).toHaveLength(2);
    expect(
      screen.getAllByRole("link", { name: /events/i })[0]
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("link", { name: /nerdwork+/i })[0]
    ).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(signupButton).toBeInTheDocument();
  });

  // HERO SECTION TESTS
  it("renders events hero section", () => {
    const hero = screen.getByTestId("event-hero");
    const heading = screen.getByRole("heading", { level: 1 });
    const registerButton = within(hero).getByRole("button", {
      name: /register/i,
    });
    const eventsButton = within(hero).getByRole("button", { name: /events/i });
    const prevButton = within(hero).getByTestId("previous-slide");
    const nextButton = within(hero).getByTestId("next-slide");

    expect(hero).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
    expect(eventsButton).toBeInTheDocument();
    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });

  // EVENTS LIST SECTION TESTS
  it("renders events list section", () => {
    const community = screen.getByTestId("events-list");
    const heading = within(community).getByRole("heading", { level: 3 });
    const allEvents = within(community).getAllByRole("button", {
      name: /all events/i,
    });

    expect(community).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
    expect(allEvents[0]).toBeInTheDocument();
    expect(allEvents).toHaveLength(2);
  });

  // EVENT STATS SECTION
  it("renders events statistics section", () => {
    const eventStats = screen.getByTestId("events-stats");
    const heading = within(eventStats).getAllByRole("heading", { level: 2 });
    const hofImages = within(eventStats).getAllByAltText(/fame image/i);
    const sponsors = within(eventStats).getAllByAltText(/logo/i);

    expect(eventStats).toBeInTheDocument();
    expect(heading).toHaveLength(3);
    expect(hofImages).toHaveLength(18);
    expect(sponsors).toHaveLength(10);
  });

  // FAQ SECTION TESTS
  it("renders the faq section", () => {
    const faq = screen.getByTestId("faq");
    const heading = within(faq).getByRole("heading", { level: 2 });
    const contact = within(faq).getAllByRole("button", {
      name: /contact support/i,
    });

    const accordionItems = within(faq).getAllByRole("button", {
      expanded: false,
    });

    expect(faq).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
    expect(contact).toHaveLength(2);
    expect(accordionItems).toHaveLength(10);
  });

  // FOOTER TESTS
  it("renders footer section", () => {
    const footer = screen.getByRole("contentinfo");
    const footerLogo = within(footer).getByAltText(/nerdwork logo/i);
    const footerImage = within(footer).getByAltText(/footer image/i);
    const input = within(footer).getByPlaceholderText(/email address/i);
    const signupButton = within(footer).getByRole("button", {
      name: /sign up/i,
    });

    expect(footer).toBeInTheDocument();
    expect(footerLogo).toBeInTheDocument();
    expect(footerImage).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(signupButton).toBeInTheDocument();
  });
});
