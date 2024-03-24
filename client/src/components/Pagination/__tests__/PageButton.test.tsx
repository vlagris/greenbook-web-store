import {fireEvent} from "@testing-library/react";
import {renderWithProviders} from "@/utils/utilsForTests.tsx";
import PageButton from "@components/Pagination/PageButton.tsx";
import {PaginationItemTypes} from "@components/Pagination/Item.tsx";

describe('pageButton pagination component', () => {
  it('should ', () => {
    const onClick = jest.fn();
    const component = renderWithProviders(<PageButton type={PaginationItemTypes.current} page={1} onClick={onClick}/>);
    const button = component.container.querySelectorAll('button')[0];

    expect(component).toMatchSnapshot();
    expect(button.className).toBe('btn_page');
    expect(button.innerHTML).toBe('1');

    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });

  it('should ', () => {
    const onClick = jest.fn();
    const component = renderWithProviders(<PageButton type={PaginationItemTypes.current} page={1} onClick={onClick}/>);
    const button = component.container.querySelectorAll('button')[0];

    expect(component).toMatchSnapshot();
    expect(button.className).toBe('btn_page');
    expect(button.innerHTML).toBe('1');

    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });
});