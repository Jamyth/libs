# react-cloud-state

A minimal state management library for [React](https://reactjs.org/tutorial/tutorial.html).

Features Include:

- Dynamic State Injection
- APIs are similar to React
- Centralize Module State into single file
- Not Context / Redux knowledge required
- Async Action Status (loading)
- Easy to Learn

# Notice

The docs below is how you can manually setup this package, You are welcomed to install one of my cli tool called [`jamyth-script`](https://github.com/Jamyth/jamyth-script-v2/). As this package will be one of the dependencies of the cli tool, and easy generate the following codes in just one command !

p.s. Jamyth is now working on the jamyth-script. Please wait.

# Background

Most of the time when we develop a webapp, we use state management library such as redux, etc...

But there are some cases that we might want to access a state within a module or a small scope.

What redux does is to make the state global, and we have to define the actions, reducer and stuff for just a boolean or array.

Could we have something that can achieve a "semi-global" state, and also get rid of "Props drilling" issue ?

# Installation

```
yarn add react-cloud-state
// or
npm i react-cloud-state
```

# Suggested Project File Structure

Of course you can use the one you are familiar with.
but here is my suggestion

```
+-- src
|   +-- module
|   |   +-- home
|   |   |   +-- type.ts // Step 1
|   |   |   +-- hook.ts // Step 3
|   |   |   +-- index.ts // Step 4
|   |   |   +-- component
|   |   |   |   +-- Main.tsx // Step 5
|   |   +-- other
|   |   |   +-- type.ts
|   |   |   +-- hook.ts
|   |   |   +-- index.ts
|   |   |   +-- component
|   |   |   |   +-- Main.tsx
|   +-- util
|   |   +-- type.ts // Step 2
```

## TypeScript Usage

Step 1

Go to your `module/home/type.ts`

```
export interface State {
    // Your State about the current Module
    helloWorld: string;
}
```

Step 2

First, you have to create a `type.ts` | `util/type.ts` (or you name it) to centralize a RootState interface for your web app.

```
import {CloudState} from 'react-cloud-state';
import {State as HomeState} from 'module/home';

export interface RootState extends CloudState {
  app: {
      // Append your State for Each Module
      home: HomeState
  }
}
```

Step 3

Next, go to `module/home/hook.ts`

Here is a reminder, the `home` should change as how you name it in step 2.

```
import {useSelector} from 'react-cloud-state';
import {RootState} from 'util/type';

export const useHomeState = <T>(
    fn:(state: RootState['app']['home']
) => T): T => {
    return useSelector((state: RootState) => fn(state.app.home));
}
```

Step 4

Then, go to `module/home/index.ts`

Here are the `actions` if you are familiar with redux.

- `home` should always match the key you named in `step 2`
- `setState` acts like the `React.setState`, so it is simple
- `getState` returns the state of current module
- `getRootState` returns the app state, but use it carefully as all state is dynamically injected to app, so it might return undefined if you `getRootState().app.otherModuleState`

```
// This is not related to Step 4
import { Main as MainComponent } from './component/Main';

import {register, Module} from 'react-cloud-state';
import {State} from './type';
import {RootState} from 'util/type'

const initialState: State = {
    helloWorld: 'Hello World',
}

class HomeModule extends Module<RootState, "home">{
    // Lifecycle Methods
    async onEnter() {
      // ComponentDidMount
      await this.sendRequest();
    }

    onRender() {
      // ComponentDidUpdate
    }

    onError() {
      // ComponentDidCatch
    }

    onDestroy() {
      // ComponentWillUnmount
    }

    // You can use this.state | this.rootState to access the state

    setHelloWorld(text: string) => {
        this.setState({ helloWorld: text });
        // or
        this.setState(state => state.helloWorld = text);
    },
    // Async function
    async sendRequest () => {
        await res = axios.get('blah blah');
        this.setState({ helloWorld: 'fetched' });
    },
}

const homeModule = register(new HomeModule("home", initialState));
export const actions = homeModule.getActions();
export const Main = homeModule.attachLifecycle(MainComponent);
```

Step 5

We are almost done !

go to `module/home/component/Main.tsx`

```
// Finally real React stuff XD.
import React from 'react';
import {actions} from 'module/home';
import {useHomeState} from 'module/home/hook';
import {useAction, usePromiseAction, useLoadingState} from 'react-cloud-state';

export const Main = React.memo(() => {

    const helloWorld = useHomeState(state => state.helloWorld);

    const setHelloWorld = useAction(actions.setHelloWorld);

    return (
        <React.Fragment>
            <h1>{helloWorld}</h1>
            <input
              value={helloWorld}
              onChange={e => setHelloWorld(e.target.value)}
            />
        </React.Fragment>
    )
})
```

## JavaScript Usage

p.s. you should start using TypeScript right now !

Basically follow `Step 3, 4, 5`

I am lazy, don't want to write the JS Docs, someone help me ?

# PRs are welcomed

There are still some enhancements that could be done, but my typescript knowledge is limited, so please help.

# Licenses

MIT licensed. Copyright (c) Jamyth Luk 2020.
