import { renderWithProviders } from "@/utils/utilsForTests.tsx";
import Group from "@components/UI/Radio/Group.tsx";



describe('Radio Group component', () => {
  it('should return Radio Group', () => {
    const component = renderWithProviders(<Group>children</Group>);

    expect(component).toMatchSnapshot();
  });
});
