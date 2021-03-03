import { renderHook, act } from "@testing-library/react-hooks";
import { clearStore, useMaru } from "../lib";

describe("useMaru", () => {
  afterEach(() => clearStore());

  test("should be initialized", () => {
    const { result } = renderHook(() => useMaru("count", 0));
    expect(result.current[0]).toBe(0);
  });

  test("should be updated on setState", () => {
    const { result } = renderHook(() => useMaru("count", 0));
    act(() => {
      result.current[1](1);
    });
    expect(result.current[0]).toBe(1);
  });

  test("should return first initialValue", () => {
    const { result: resultA } = renderHook(() => useMaru("count", 0));
    const { result: resultB } = renderHook(() => useMaru("count", 1));

    expect(resultB.current[0]).toBe(0);
  });

  test("should return initialValue though skipped", () => {
    const { result: resultA } = renderHook(() => useMaru("count", 0));
    const { result: resultB } = renderHook(() => useMaru("count"));

    expect(resultB.current[0]).toBe(0);
  });

  test("should update other components on setState", () => {
    const { result: resultA } = renderHook(() => useMaru("count", 0));
    const { result: resultB } = renderHook(() => useMaru("count"));

    act(() => {
      resultA.current[1](1);
    });

    expect(resultB.current[0]).toBe(1);
  });
});
