/*! Built with http://stenciljs.com */
const { h } = window.StencilStateTunnel;

class ContextConsumer {
    constructor() {
        this.context = {};
        this.renderer = (props) => {
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

export { ContextConsumer };
