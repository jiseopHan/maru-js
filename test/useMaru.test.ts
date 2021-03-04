import { renderHook, act } from "@testing-library/react-hooks";
import { clearStore, useMaru, useMaruInitialization } from "../lib";

describe("useMaru", () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => clearStore());

  test("should be initialized", () => {
    renderHook(() => useMaruInitialization({ count: 0 }));
    const { result } = renderHook(() => useMaru("count"));
    expect(result.current[0]).toBe(0);
  });

  test("should be updated on setState", () => {
    renderHook(() => useMaruInitialization({ count: 0 }));
    const { result } = renderHook(() => useMaru("count"));
    act(() => {
      result.current[1](1);
      jest.runAllTimers();
    });
    expect(result.current[0]).toBe(1);
  });

  test("should return same initialValue", () => {
    renderHook(() => useMaruInitialization({ count: 0 }));
    const { result: resultA } = renderHook(() => useMaru("count"));
    const { result: resultB } = renderHook(() => useMaru("count"));

    expect(resultB.current[0]).toEqual(resultA.current[0]);
  });

  test("should update other components on setState", () => {
    renderHook(() => useMaruInitialization({ count: 0 }));
    const { result: resultA } = renderHook(() => useMaru("count"));
    const { result: resultB } = renderHook(() => useMaru("count"));

    act(() => {
      resultA.current[1](1);
      jest.runAllTimers();
    });
    expect(resultB.current[0]).toBe(1);
  });
});
