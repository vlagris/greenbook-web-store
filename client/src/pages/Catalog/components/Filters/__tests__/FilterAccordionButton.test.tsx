import { renderWithProviders } from "@/utils/utilsForTests.tsx";
import FilterAccordionButton from "@pages/Catalog/components/Filter/FilterAccordionButton.tsx";



describe('FilterAccordionButton component', () => {

  it('should return FilterAccordionButton', () => {
    const component = renderWithProviders(
        <FilterAccordionButton>children</FilterAccordionButton>
    );

    expect(component).toMatchSnapshot();
  });
});