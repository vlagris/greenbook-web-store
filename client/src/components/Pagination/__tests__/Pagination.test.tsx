import {renderWithProviders} from "@/utils/utilsForTests.tsx";
import * as useItemProps from "@components/Pagination/useItemProps.ts";
import Pagination from "@components/Pagination";
import {ItemProps, PaginationItemTypes} from "@components/Pagination/Item.tsx";


const itemsProps: ItemProps[] = [
  { type: PaginationItemTypes.prev },
  { type: PaginationItemTypes.current, page: 1 },
  { type: PaginationItemTypes.next }
]

describe('Pagination component', () => {
  it('should return a list of pagination items', () => {
    const mockedUseItemProps = jest.spyOn(useItemProps, "default").mockReturnValue({ itemsProps });
    const component = renderWithProviders(<Pagination totalPages={3}/>);

    expect(component).toMatchSnapshot();
    expect(mockedUseItemProps).toHaveBeenCalled();
    expect(mockedUseItemProps).toHaveBeenCalledWith({ totalPages: 3 });
  });
});