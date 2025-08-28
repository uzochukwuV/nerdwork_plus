import Product from "@/app/(external)/nerdwork+/page";
import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";

describe("Home Page", () => {
  beforeEach(() => {
    render(<Product />);
  });

  // NAVIGATION BAR TESTS
  it("renders navigation menu", () => {
    const nav = screen.getByRole("navigation");
    const navLogo = within(nav).getAllByAltText(/nerdwork logo/i);
    const loginButton = within(nav).getByRole("link", { name: /log in/i });
    const signupButton = within(nav).getByRole("link", { name: /sign up/i });

    expect(nav).toBeInTheDocument();
    expect(navLogo).toHaveLength(2);
    expect(screen.getByRole("link", { name: /events/i })).toBeInTheDocument();
    expect(
      screen.getAllByRole("link", { name: /nerdwork+/i })[0]
    ).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(signupButton).toBeInTheDocument();
  });

  // HERO SECTION TESTS
  it("renders hero section", () => {
    const hero = screen.getByTestId("hero");
    const heading = screen.getByRole("heading", { level: 1 });
    const input = within(hero).getByPlaceholderText(/email address/i);
    const joinButton = within(hero).getByRole("button", {
      name: /join waitlist/i,
    });

    expect(hero).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(joinButton).toBeInTheDocument();
  });

  // STORIES SECTION
  it("renders stories section", () => {
    const stories = screen.getByTestId("stories");
    const headings = within(stories).getAllByRole("heading", { level: 2 });
    const gallery = within(stories).getByTestId("gallery");
    const african = within(stories).getByAltText(/black african man/i);
    const users = within(stories).getAllByAltText(/user icons/i);

    expect(stories).toBeInTheDocument();
    expect(headings).toHaveLength(3);
    expect(gallery).toHaveClass("bg-[url('/nerdwork+/gallery.png')]");
    expect(african).toBeInTheDocument();
    expect(users).toHaveLength(2);
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
