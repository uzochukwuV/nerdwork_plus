import Communities from "@/app/(external)/communities/page";
import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";

describe("Community Page", () => {
  beforeEach(() => {
    render(<Communities />);
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
  it("renders heading and search bar section", () => {
    const heading = screen.getByRole("heading", { level: 1 });
    const input = screen.getByPlaceholderText(/communities/i);

    expect(heading).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });

  // FAQ SECTION TESTS
  it("renders the communities section", () => {
    const accordionItems = screen.getAllByRole("button", {
      expanded: false,
    });

    accordionItems.forEach((item) => {
      expect(item).toBeInTheDocument();
      expect(within(item).getByAltText(/community image/i)).toBeInTheDocument();
      //   expect(
      //     within(item).getByRole("link", { name: /discord/i })
      //   ).toBeInTheDocument();
      //   expect(
      //     within(item).getByRole("link", { name: /whatsapp/i })
      //   ).toBeInTheDocument();
      //   expect(
      //     within(item).getByRole("link", { name: /telegram/i })
      //   ).toBeInTheDocument();
    });
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
