import { render, screen, waitFor } from "@testing-library/react";
import Faq from "./faq.page";

describe("Faq Page", () => {
    describe("when rendering default", () => {
        it("should render the informations",
            async () => {
                render(
                    <Faq />
                );
                const title = screen.getByText(/TIRE SUAS DÚVIDAS :D/i);
                const question = screen.getByText(/Quantos comics eles têm\?/i);
                await waitFor(() => {
                    expect(title).toBeInTheDocument()
                });
                await waitFor(() => {
                    expect(question).toBeInTheDocument()
                });
            });
    });
});
