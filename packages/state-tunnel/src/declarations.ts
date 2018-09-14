export type SubscribeCallback<T> = (el: HTMLStencilElement, props: T[] | T) => () => void;
