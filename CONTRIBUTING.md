# Advice for future contributors

## Communication

- English in the codebase and Git messages
- Romanian on issues and comments

## Coding style

- we use the [Google Javascript Style Guide](http://google.github.io/styleguide/javascriptguide.xml)
- run the linter with `gulp lint`
- indentation of 2 spaces in all the files.
- strive to keep the line width under 80 characters
- order of methods in a file:
  - React lifecycle with `render` at the end
  - `renderSomething` _sub-methods_
  - `onActionCallback` methods
  - other

## Github

- use milestones for structuring your work
- labels:
  - `minor` - can be tackled by a newbie
  - `bug`
  - `important` - somebody thinks this has a higher priority
  - `urgent` - somebody important thinks this has a higher priority
  - `project` - a collection of tasks that should be done in separate issues

## Other

- keep in README.md a living documentation of the directory and files structure
- currently we don't have tests... but that will change in the future

## Default Javascript File

- `use strict`
- use ES6 classes

```js
"use strict";

import React from "react";


export default class MyClass extends React.Component {
  static displayName = "MyClass";

  constructor(props) {
    super(props);
    this.state = {count: props.initialCount};
  }

  render() {
    return <div className="my-class">
    </div>;
  }
}
```
