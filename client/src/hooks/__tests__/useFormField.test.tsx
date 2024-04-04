import {renderHook, render, fireEvent, screen, act} from "@testing-library/react";
import useFormField from "@/hooks/useFormField.ts";

describe('useFormField',  () => {
  it('should return initial useFormField', async () => {
    const {result} = renderHook(() =>  useFormField({
        validate: (state) => state.length > 5}
    ))

    expect(result.current.value).toEqual("");
    expect(result.current.error).toEqual(false);
    await act( async () =>
      expect(result.current.isValid()).toEqual(false)
    )
  });


  it('should call onChange in useFormField', async () => {
    const {result} = renderHook(() =>  useFormField({
      initialState: "asd",
      validate: (state) => state.length > 5}
    ))

    await act( async () =>
      expect(result.current.onBlur()).toEqual(false)
    )
  });


  it('should call onChange in useFormField', async () => {
    const {result} = renderHook(() =>  useFormField({
      validate: (state) => state.length > 5
    }));
    render(<input role="input" type="text" onChange={result.current.onChange}/>);

    await act( async () => {
      fireEvent.change(screen.getByRole("input"), {target: {value: "result"}})
    });

    expect(result.current.value).toEqual("result");
  });


  it('should return required useFormField', async () => {
    const {result} = renderHook(
      () => useFormField({required: true})
    );

    expect(result.current.value).toEqual("");
    await act( async () =>
      expect(result.current.onBlur()).toEqual(true)
    )
    await act( async () =>
      expect(result.current.isValid()).toEqual(false)
    )
  });
});