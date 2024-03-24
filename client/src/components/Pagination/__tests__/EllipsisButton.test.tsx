import {renderWithProviders} from "@/utils/utilsForTests.tsx";
import EllipsisButton from "@components/Pagination/EllipsisButton.tsx";

describe('arrow button pagination component', () => {
  it('should ', () => {
    const component = renderWithProviders(<EllipsisButton/>);
    const button = component.container.querySelectorAll('button')[0];

    expect(component).toMatchSnapshot();
    expect(button.className).toBe('btn_page disabled');
  });
});