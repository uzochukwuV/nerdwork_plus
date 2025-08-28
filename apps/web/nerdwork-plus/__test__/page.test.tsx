import Home from "@/app/page";
import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";

describe("Home Page", () => {
  beforeEach(() => {
    render(<Home />);
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
    const signupButton = within(hero).getByRole("button", { name: /sign up/i });

    expect(hero).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(signupButton).toBeInTheDocument();
  });

  // COMMUNITY SECTION TESTS
  it("renders community section", () => {
    const community = screen.getByTestId("community");
    const heading = within(community).getByRole("heading", { level: 2 });
    const joinButton = within(community).getAllByRole("button", {
      name: /join community/i,
    });
    const comicImages = within(community).getAllByAltText(/comic con image/i);

    expect(community).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
    expect(joinButton[0]).toBeInTheDocument();
    expect(comicImages).toHaveLength(7);
  });

  // MERDWORK+ SECTION
  it("renders nerdwork+ section", () => {
    const nerdwork = screen.getByTestId("nerdwork");
    const heading = within(nerdwork).getByRole("heading", { level: 2 });
    const creators = within(nerdwork).getByRole("heading", { level: 3 });
    const nerworkPlus = within(nerdwork).getByRole("button", {
      name: /nerdwork+/i,
    });
    const learnMore = within(nerdwork).getByRole("button", {
      name: /learn more/i,
    });

    expect(nerdwork).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
    expect(creators).toBeInTheDocument();
    expect(nerworkPlus).toBeInTheDocument();
    expect(learnMore).toBeInTheDocument();
  });

  // COMIC CON SECTION
  it("renders comic con section", () => {
    const comiccon = screen.getByTestId("comic-con");
    const heading = within(comiccon).getByRole("heading", { level: 2 });
    const register = within(comiccon).getByRole("button", {
      name: /register for comic con 2025/i,
    });
    const lastYear = within(comiccon).getByRole("button", {
      name: /see last year's comic con/i,
    });
    const comicImages = within(comiccon).getAllByAltText(/comic con image/i);
    const sponsors = within(comiccon).getAllByAltText(/logo/i);

    expect(comiccon).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
    expect(register).toBeInTheDocument();
    expect(lastYear).toBeInTheDocument();
    expect(comicImages).toHaveLength(5);
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
