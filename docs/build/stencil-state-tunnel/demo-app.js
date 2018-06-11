/*! Built with http://stenciljs.com */
const { h } = window.StencilStateTunnel;

var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
function defaultConsumerRender(subscribe, child) {
    return h("context-consumer", { subscribe: subscribe, renderer: child });
}
function createProviderConsumer(defaultState, consumerRender = defaultConsumerRender) {
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
        return consumerRender(subscribe, children[0]);
    }
    function wrapConsumer(childComponent, fieldList) {
        const Child = childComponent.is;
        return (_a) => {
            var { children } = _a, props = __rest(_a, ["children"]);
            return (h(Child, Object.assign({ ref: attachListener(fieldList) }, props), children));
        };
    }
    function injectProps(childComponent, fieldList) {
        let unsubscribe = null;
        const elementRefName = Object.keys(childComponent.properties).find(propName => {
            return childComponent.properties[propName].elementRef == true;
        });
        if (elementRefName == undefined) {
            throw new Error(`Please ensure that your Component ${childComponent.is} has an attribtue with "@Element" decorator. ` +
                `This is required to be able to inject properties.`);
        }
        const prevComponentWillLoad = childComponent.prototype.componentWillLoad;
        childComponent.prototype.componentWillLoad = function () {
            unsubscribe = subscribe(this[elementRefName], fieldList);
            if (prevComponentWillLoad) {
                return prevComponentWillLoad.bind(this)();
            }
        };
        const prevComponentDidUnload = childComponent.prototype.componentDidUnload;
        childComponent.prototype.componentDidUnload = function () {
            unsubscribe();
            if (prevComponentDidUnload) {
                return prevComponentDidUnload.bind(this)();
            }
        };
    }
    return {
        Provider,
        Consumer,
        wrapConsumer,
        injectProps
    };
}

var Tunnel = createProviderConsumer({
    messageLog: [],
    sendMessage: () => Promise.resolve(),
    getReceiverList: () => Promise.resolve([]),
    availableReceivers: [],
    creatingMessage: false,
    setCreatingMessage: () => { }
}, (subscribe, child) => (h("context-consumer", { subscribe: subscribe, renderer: child })));

// Unique enough for a demo
function getUniqueId() {
    return (Math.random() * 10e16).toString().match(/.{4}/g).join('-');
}
function sendMessage(message, recipients) {
    return Promise.resolve({
        id: getUniqueId(),
        timeStamp: new Date(),
        message,
        recipients
    });
}
function getAvailableRecipients() {
    return Promise.resolve([
        {
            id: '1',
            name: 'George Washington'
        },
        {
            id: '2',
            name: 'John Adams'
        },
        {
            id: '3',
            name: 'Thomas Jefferson'
        },
        {
            id: '4',
            name: 'James Madison'
        },
        {
            id: '5',
            name: 'James Monroe'
        },
        {
            id: '6',
            name: 'John Quincy Adams'
        }
    ]);
}

var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class DemoApp {
    constructor() {
        this.availableReceivers = [];
        this.messageLog = [];
        this.creatingMessage = false;
        this.sendMessage = (msgText, recipients) => __awaiter(this, void 0, void 0, function* () {
            const newMessage = yield sendMessage(msgText, recipients);
            this.messageLog = [
                ...this.messageLog,
                newMessage
            ];
        });
        this.getReceiverList = () => __awaiter(this, void 0, void 0, function* () {
            if (this.availableReceivers.length > 0) {
                return this.availableReceivers;
            }
            return this.availableReceivers = yield getAvailableRecipients();
        });
        this.setCreatingMessage = (creatingMessage) => {
            this.creatingMessage = creatingMessage;
        };
    }
    render() {
        const tunnelState = {
            messageLog: this.messageLog,
            sendMessage: this.sendMessage,
            getReceiverList: this.getReceiverList,
            availableReceivers: this.availableReceivers,
            creatingMessage: this.creatingMessage,
            setCreatingMessage: this.setCreatingMessage
        };
        return (h(Tunnel.Provider, { state: tunnelState },
            h("header", null,
                this.creatingMessage ? null : h("button", { onClick: () => { this.creatingMessage = true; } }, "Create Message"),
                h("h1", null, "Message Demo App")),
            this.creatingMessage ?
                h("demo-create-message", { sendMessage: this.sendMessage })
                :
                    h("demo-message-log", null)));
    }
    static get is() { return "demo-app"; }
    static get properties() { return {
        "availableReceivers": {
            "state": true
        },
        "creatingMessage": {
            "state": true
        },
        "messageLog": {
            "state": true
        }
    }; }
    static get style() { return "demo-app {\n      display: block;\n      width: 700px;\n      margin: 0 auto;\n    }"; }
}

var __awaiter$1 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class DemoCreateMessage {
    constructor() {
        this.availableRecipients = [];
        this.selectedReceiverIds = [];
        this.sendToMessageQueue = (e) => {
            e.preventDefault();
            this.errorText = null;
            if (this.selectedReceiverIds.length === 0) {
                this.errorText = 'A message must have at least one receiver.';
                return;
            }
            if (this.input.value === '') {
                this.errorText = 'Message cannot be empty';
                return;
            }
            const recipients = this.availableRecipients.filter(re => this.selectedReceiverIds.indexOf(re.id) !== -1);
            this.sendMessage(this.input.value, recipients);
            this.setCreatingMessage(false);
        };
        this.updateRecipientList = () => {
            this.selectedReceiverIds = Array.from(this.select.querySelectorAll('option'))
                .filter((op) => op.selected)
                .map((op) => op.value);
        };
        this.cancelMessage = (e) => {
            e.preventDefault();
            this.setCreatingMessage(false);
        };
    }
    componentWillLoad() {
        return __awaiter$1(this, void 0, void 0, function* () {
            this.availableRecipients = yield this.getReceiverList();
        });
    }
    render() {
        return (h("form", { onSubmit: this.sendToMessageQueue },
            this.errorText != null ?
                h("p", { class: "error" }, this.errorText) : null,
            h("label", null,
                "Recipients:",
                h("select", { multiple: true, ref: (el) => this.select = el, onChange: this.updateRecipientList }, this.availableRecipients.map(recipient => (h("option", { value: recipient.id }, recipient.name))))),
            h("br", null),
            h("label", null,
                "Message Text:",
                h("input", { ref: (el) => this.input = el, type: "text" })),
            h("div", null,
                h("input", { type: "submit", value: "Send message" }),
                h("a", { href: "#", onClick: this.cancelMessage }, "Cancel"))));
    }
    static get is() { return "demo-create-message"; }
    static get properties() { return {
        "availableRecipients": {
            "state": true
        },
        "el": {
            "elementRef": true
        },
        "errorText": {
            "state": true
        },
        "getReceiverList": {
            "type": "Any",
            "attr": "get-receiver-list"
        },
        "sendMessage": {
            "type": "Any",
            "attr": "send-message"
        },
        "setCreatingMessage": {
            "type": "Any",
            "attr": "set-creating-message"
        }
    }; }
    static get style() { return ".error {\n      color: red;\n    }"; }
}
Tunnel.injectProps(DemoCreateMessage, ['sendMessage', 'getReceiverList', 'creatingMessage', 'setCreatingMessage']);

function dateToTimestamp(d) {
    const hours = d.getHours();
    const minutes = d.getMinutes();
    const seconds = d.getSeconds();
    const time = [
        (hours === 0) ? '12' : (hours > 12) ? (hours - 12) : hours,
        (minutes < 10) ? `0${minutes}` : minutes,
        (seconds < 10) ? `0${seconds}` : seconds
    ].join(':');
    return `${time} ${hours > 12 ? 'pm' : 'am'}`;
}
class DemoMessageLog {
    render() {
        return (h(Tunnel.Consumer, null, ({ messageLog }) => (h("div", null, (messageLog.length === 0) ?
            h("p", null, "No messages sent.") :
            h("ul", { class: "msg-list" }, messageLog
                .sort((a, b) => (b.timeStamp.getTime() - a.timeStamp.getTime()))
                .map(message => (h("li", { key: message.id },
                h("span", { class: "row-desc" }, "To:"),
                " ",
                message.recipients.map(re => re.name).join(', '),
                h("br", null),
                h("span", { class: "row-desc" }, "Time:"),
                " ",
                dateToTimestamp(message.timeStamp),
                h("br", null),
                h("span", { class: "row-desc" }, "Text:"),
                " ",
                message.message,
                h("br", null)))))))));
    }
    static get is() { return "demo-message-log"; }
    static get style() { return "ul.msg-list {\n    list-style: none;\n    padding-left: 10px;\n  }\n  ul.msg-list li {\n    padding: 10px 0;\n  }\n  .row-desc {\n    display: inline-block;\n    font-weight: bold;\n    width: 45px;\n  }"; }
}

export { DemoApp, DemoCreateMessage, DemoMessageLog };
