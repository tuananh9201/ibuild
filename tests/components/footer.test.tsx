import Footer from "@/components/layouts/footer";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe("Footer Component", () => {
  it("Copyright Text", () => {
    render(<Footer />);
    const copyright = screen.getByText(
      "Bản quyền thuộc về VDI - Giấy phép số: 134/CP-CBC - Cục báo chí, Bộ Thông tin và Truyền thông."
    );
    expect(copyright).toBeInTheDocument();
  });
  it("Input Subcriber email", () => {
    render(<Footer />);
    const input = screen.getByPlaceholderText("info@gmail.com");
    expect(input).toBeInTheDocument();
    fireEvent.change(input, { target: { value: "info1@gmail.com" } });
    const value = screen.getByDisplayValue("info1@gmail.com");
    expect(value).toBeInTheDocument();
  });
});
