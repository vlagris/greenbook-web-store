import { renderWithProviders } from "@/utils/utilsForTests.tsx";
import Accordion from "@components/UI/Accordion/Accordion.tsx";





describe('Accordion component', () => {
  it('should return Accordion', () => {
    const component = renderWithProviders(<Accordion>children</Accordion>);

    expect(component).toMatchSnapshot();
  });
});
