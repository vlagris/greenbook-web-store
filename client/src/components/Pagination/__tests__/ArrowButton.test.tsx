import {renderWithProviders} from "@/utils/utilsForTests.tsx";
import ArrowButton from "@components/Pagination/ArrowButton.tsx";
import {PaginationItemTypes} from "@components/Pagination/Item.tsx";
import {fireEvent} from "@testing-library/react";

describe('arrowButton pagination component', () => {
  it('should ', () => {
    const onClick = jest.fn();
    const component = renderWithProviders(<ArrowButton type={PaginationItemTypes.next} onClick={onClick}/>);
    const button = component.container.querySelectorAll('button')[0];
    const svgIcon = component.container.querySelectorAll('.arrow')[0];

    expect(component).toMatchSnapshot();
    expect(button.className).toBe('btn_arrow');
    expect(svgIcon.className).toBe('arrow');

    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });

  it('should ', () => {
    const component = renderWithProviders(<ArrowButton type={PaginationItemTypes.prev}/>);
    const button = component.container.querySelectorAll('button')[0];
    const svgIcon = component.container.querySelectorAll('.arrow')[0];

    expect(component).toMatchSnapshot();
    expect(button.className).toBe('btn_arrow disabled');
    expect(svgIcon.className).toBe('arrow arrow_left');
  });
});