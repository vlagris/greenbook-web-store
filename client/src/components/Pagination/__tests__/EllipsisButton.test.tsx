import {renderWithProviders} from "@/utils/utilsForTests.tsx";
import EllipsisButton from "@components/Pagination/EllipsisButton.tsx";

describe('EllipsisButton pagination component', () => {
  it('should return the EllipsisButton', () => {
    const component = renderWithProviders(<EllipsisButton/>);
    const button = component.container.querySelectorAll('button')[0];

    expect(component).toMatchSnapshot();
    expect(button.className).toBe('btn_page disabled');
  });
});