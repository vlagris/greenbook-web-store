import { fireEvent, screen } from "@testing-library/react";
import { renderWithProviders } from "@/utils/utilsForTests.tsx";
import Checkbox from "@components/UI/Checkbox";



describe('Checkbox component', () => {
  it('should return checked Checkbox', () => {
    const component = renderWithProviders(<Checkbox isChecked={true}>children</Checkbox>);

    expect(component).toMatchSnapshot();
    expect(screen.getByRole("checkbox").hasAttribute("checked")).toBeTruthy();
  });


  it('should return not checked Checkbox', () => {
    const component = renderWithProviders(<Checkbox>children</Checkbox>);

    expect(component).toMatchSnapshot();
    expect(screen.getByRole("checkbox").hasAttribute("checked")).toBeFalsy();
  });


  it('should toggle the checkbox with status', () => {
    renderWithProviders(<Checkbox isChecked={true}>children</Checkbox>);
    const checkbox = screen.getByRole("checkbox");

    fireEvent.click(checkbox);
    expect(checkbox.hasAttribute("checked")).toBeFalsy();
  });


  it('should toggle the checkbox without state', () => {
    renderWithProviders(<Checkbox>children</Checkbox>);
    const checkbox = screen.getByRole("checkbox");

    fireEvent.click(checkbox);
    expect(checkbox.hasAttribute("checked")).toBeFalsy();
  });
});
