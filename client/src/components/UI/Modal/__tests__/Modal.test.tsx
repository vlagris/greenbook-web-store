import { fireEvent, screen } from "@testing-library/react";
import { renderWithProviders } from "@/utils/utilsForTests.tsx";
import Modal from "@components/UI/Modal";



describe('Modal component', () => {
  it('should return empty Modal', () => {
    const component = renderWithProviders(
      <Modal show={false} onHide={jest.fn()}>
        children
      </Modal>
    );

    expect(component).toMatchSnapshot();
    expect(screen.queryByText(/children/)).toBeNull();
  });


  it('should return showing a modal with a scrollbar', () => {
    Object.defineProperty(document.body, 'offsetWidth', {
      value: 1024,
    });
    const component = renderWithProviders(
      <Modal show={true} onHide={jest.fn()}>
        children
      </Modal>
    );

    expect(component).toMatchSnapshot();
    expect(screen.queryByText(/children/)).toBeInTheDocument();
  });


  it('should return showing a modal without a scrollbar', () => {
    const component = renderWithProviders(
      <Modal show={true} onHide={jest.fn()}>
        children
      </Modal>
    );

    expect(component).toMatchSnapshot();
    expect(screen.queryByText(/children/)).toBeInTheDocument();
  });


  it('should toggle the modal', () => {
    const mockedOnHide = jest.fn();
    renderWithProviders(
      <Modal show={true} onHide={mockedOnHide}>
        children
      </Modal>
    );

    fireEvent.click(screen.getByText(/children/));
    expect(mockedOnHide).toHaveBeenCalled();
  });
});
