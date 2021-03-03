declare type UseMaruReturn<T> = [T, (value: T) => void];
export declare const useMaruInitialization: (initialData: Record<string, any>) => void;
export declare const useMaru: <T>(key: string) => UseMaruReturn<T>;
export declare const clearStore: () => void;
export {};
