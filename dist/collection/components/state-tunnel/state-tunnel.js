var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
export class ContextConsumer {
    constructor() {
        this.context = {};
        this.renderer = (props) => {
            props;
            return null;
        };
    }
    componentWillLoad() {
        this.unsubscribe = this.subscribe(this.el, 'context');
    }
    componentDidUnload() {
        this.unsubscribe();
    }
    render() {
        return this.renderer(Object.assign({}, this.context));
    }
    static get is() { return "context-consumer"; }
    static get properties() { return {
        "context": {
            "type": "Any",
            "attr": "context"
        },
        "el": {
            "elementRef": true
        },
        "renderer": {
            "type": "Any",
            "attr": "renderer"
        },
        "subscribe": {
            "type": "Any",
            "attr": "subscribe"
        },
        "unsubscribe": {
            "state": true
        }
    }; }
}
export function createProviderConsumer(defaultState) {
    let listeners = new Map();
    let currentState = defaultState;
    function notifyConsumers() {
        listeners.forEach(updateListener);
    }
    function updateListener(fields, listener) {
        if (Array.isArray(fields)) {
            [...fields].forEach(fieldName => {
                listener[fieldName] = currentState[fieldName];
            });
        }
        else {
            listener[fields] = Object.assign({}, currentState);
        }
        listener.forceUpdate();
    }
    function attachListener(propList) {
        return (el) => {
            if (listeners.has(el)) {
                return;
            }
            listeners.set(el, propList);
            updateListener(propList, el);
        };
    }
    function subscribe(el, propList) {
        attachListener(propList)(el);
        return function () {
            listeners.delete(el);
        };
    }
    function Provider({ state, children }) {
        currentState = state;
        notifyConsumers();
        return children;
    }
    function Consumer({ children }) {
        return (h("context-consumer", { subscribe: subscribe, renderer: children[0] }));
    }
    function wrapConsumer(childComponent, fieldList) {
        const Child = childComponent.is;
        return (_a) => {
            var { children } = _a, props = __rest(_a, ["children"]);
            return (h(Child, Object.assign({ ref: attachListener(fieldList) }, props), children));
        };
    }
    return {
        Provider,
        Consumer,
        wrapConsumer,
        subscribe
    };
}
