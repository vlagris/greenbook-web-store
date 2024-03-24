import {renderWithProviders} from "@/utils/utilsForTests.tsx";
import Item, {PaginationItemTypes} from "@components/Pagination/Item.tsx";


describe('item pagination component', () => {
  it('should ', () => {
    const component = renderWithProviders(<Item type={PaginationItemTypes.prev}/>);
    const button = component.container.querySelectorAll('button')[0];
    const svgIcon = component.container.querySelectorAll('.arrow')[0];

    expect(component).toMatchSnapshot();
    expect(button.className).toBe('btn_arrow disabled');
    expect(svgIcon.className).toBe('arrow arrow_left');
  });

  it('should ', () => {
    const component = renderWithProviders(<Item type={PaginationItemTypes.next}/>);
    const button = component.container.querySelectorAll('button')[0];
    const svgIcon = component.container.querySelectorAll('.arrow')[0];

    expect(component).toMatchSnapshot();
    expect(button.className).toBe('btn_arrow disabled');
    expect(svgIcon.className).toBe('arrow');
  });

  it('should ', () => {
    const component = renderWithProviders(<Item type={PaginationItemTypes.current} page={1}/>);

    expect(component).toMatchSnapshot();
  });
});