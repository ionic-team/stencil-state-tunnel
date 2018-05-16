import '../../stencil.core';
export declare class ContextConsumer {
    el: HTMLStencilElement;
    context: {
        [key: string]: any;
    };
    renderer: any;
    subscribe: (el: HTMLStencilElement, props: string[] | string) => () => void;
    unsubscribe: () => void;
    componentWillLoad(): void;
    componentDidUnload(): void;
    render(): any;
}
export declare function createProviderConsumer<T extends object>(defaultState: T): {
    Provider: ({ state, children }: {
        state: T;
        children?: any[];
    }) => any[];
    Consumer: ({ children }: any) => JSX.Element;
    wrapConsumer: (childComponent: any, fieldList: string | (keyof T)[]) => ({ children, ...props }: any) => JSX.Element;
    subscribe: (el: HTMLStencilElement, propList: string | (keyof T)[]) => () => void;
};
