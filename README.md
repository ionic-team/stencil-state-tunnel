![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)

# Stencil State Tunnel

This project was built to provide additional functionality to developers working with stencil
components and sharing state across components and through slots.

## Example Usage

### 1. First we will create a Tunnel.

`./data/message.ts`

```tsx
import { createProviderConsumer } from '@stencil/state-tunnel';

export interface State {
  message: string,
  increment?: () => void
}

export default createProviderConsumer<State>({
  message: 'Hello!'
});
```

### 2. Create a tunnel entry point.  Usually this will be at the top of your component tree.

`./components/my-app.tsx`
```tsx
import Tunnel from './data/message.ts';

@Component({
  tag: 'my-app',
})
export class MyApp {

  @Prop() intro: string = 'Hello!';
  @State() message: string = '';

  count: number = 0;

  componentWillLoad() {
    this.increment();
  }

  increment = () => {
    this.count = this.count + 1;
    this.message = `${this.intro} ${this.count}`;
  }

  render() {
    const state = {
      message: this.message,
      increment: this.increment
    };
    return (
      <div>
        <header>
          <h1>Stencil App Starter</h1>
        </header>
        <Tunnel.Provider state={state}>
          <some-child-component/>
        </Tunnel.Provider>
      </div>
    );
  }
}
```

### 3. You can then create an exit point any where within your component tree that lives below the Tunnel.Provider.

`./components/way-down-child.tsx`
```tsx
import { Component } from '@stencil/core';
import Tunnel from './data/message.ts';

@Component({
  tag: 'way-down-child',
})
export class WayDownChild {
  render() {
    return (
      <Tunnel.Consumer>
        {({ message, increment }) => (
          <div class='app-profile'>
            <button onClick={increment}>Increment Num</button>
            <p>{message}</p>
          </div>
        )}
      </Tunnel.Consumer>
    );
  }
}

```