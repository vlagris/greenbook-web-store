import {renderWithProviders} from "@/utils/utilsForTests.tsx";
import Item, {PaginationItemTypes} from "@components/Pagination/Item.tsx";
import PageButton from "@components/Pagination/PageButton.tsx";
import {fireEvent} from "@testing-library/react";
import EllipsisButton from "@components/Pagination/EllipsisButton.tsx";


describe('item pagination component', () => {
  it('should return the arrowButton to the left', () => {
    const component = renderWithProviders(<Item type={PaginationItemTypes.prev}/>);
    const button = component.container.querySelectorAll('button')[0];
    const svgIcon = component.container.querySelectorAll('.arrow')[0];

    expect(component).toMatchSnapshot();
    expect(button.className).toBe('btn_arrow disabled');
    expect(svgIcon.className).toBe('arrow arrow_left');
  });

  it('should return the disabled arrowButton to the right', () => {
    const component = renderWithProviders(<Item type={PaginationItemTypes.next}/>);
    const button = component.container.querySelectorAll('button')[0];
    const svgIcon = component.container.querySelectorAll('.arrow')[0];

    expect(component).toMatchSnapshot();
    expect(button.className).toBe('btn_arrow disabled');
    expect(svgIcon.className).toBe('arrow');
  });

  it('should return the currentPageButton', () => {
    const component = renderWithProviders(<Item type={PaginationItemTypes.current} page={1}/>);
    const button = component.container.querySelectorAll('button')[0];

    expect(component).toMatchSnapshot();
    expect(button.className).toBe('btn_page active');
    expect(button.innerHTML).toBe('1');
  });

  it('should return the pageButton', () => {
    const component = renderWithProviders(<PageButton type={PaginationItemTypes.page} page={1} onClick={jest.fn()}/>);
    const button = component.container.querySelectorAll('button')[0];

    expect(component).toMatchSnapshot();
    expect(button.className).toBe('btn_page');
    expect(button.innerHTML).toBe('1');
  });

  it('should return the EllipsisButton', () => {
    const component = renderWithProviders(<EllipsisButton/>);
    const button = component.container.querySelectorAll('button')[0];

    expect(component).toMatchSnapshot();
    expect(button.className).toBe('btn_page disabled');
  });
});