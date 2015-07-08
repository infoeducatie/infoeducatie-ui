# Advice for future contributors

## Communication

- English in the codebase and Git messages
- Romanian on issues and comments

## Coding style

- We use the [Google Javascript Style Guide](http://google.github.io/styleguide/javascriptguide.xml)
- run the linter with `gulp lint`
- Indentation of 2 spaces in all the files.
- Order of methods in a file:
  - React lifecycle with `render` at the end
  - `renderSomething` _sub-methods_
  - `onActionCallback` methods
  - other

## Github

- Use milestones for structuring your work
- Labels:
  - `minor` - can be tackled by a newbie
  - `bug`
  - `important` - somebody thinks this has a higher priority
  - `urgent` - somebody important thought this has a higher priority
  - `project` - a collection of tasks that should be done in separate issues

## Other

- keep in README.md a living documentation of the directory and files structure
- currently we don't have tests... but that will change in the future
