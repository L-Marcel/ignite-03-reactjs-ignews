import { render, screen } from "@testing-library/react";
import { useSession } from "next-auth/client";
import { mocked } from "jest-mock";
import { SignInWithGithub } from ".";

jest.mock("next-auth/client");

describe('Home component', () => {
  it("renders correctly when user is not authenticated", () => {
    const useSessionMocked = mocked(useSession);
    useSessionMocked.mockReturnValueOnce([null, false]);

    render(<SignInWithGithub/>);
  
    expect(screen.getByText("Sign in with Github")).toBeInTheDocument();
  });

  it("renders correctly when user is authenticated", () => {
    const useSessionMocked = mocked(useSession);
    useSessionMocked.mockReturnValueOnce([{
      user: {
        name: "John Doe",
        email: "jd@gmail.com"
      },
      expires: "0"
    }, false]);

    render(<SignInWithGithub/>);
  
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });
});