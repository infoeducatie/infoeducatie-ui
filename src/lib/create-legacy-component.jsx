import React from "react";

const reservedKeys = new Set([
  "displayName",
  "getDefaultProps",
  "getInitialState",
  "mixins",
  "propTypes",
  "statics",
]);

const lifecycleAliases = {
  componentWillMount: "UNSAFE_componentWillMount",
  componentWillReceiveProps: "UNSAFE_componentWillReceiveProps",
  componentWillUpdate: "UNSAFE_componentWillUpdate",
};

const composableLifecycles = new Set([
  "componentDidCatch",
  "componentDidMount",
  "componentDidUpdate",
  "componentWillUnmount",
  "componentWillMount",
  "componentWillReceiveProps",
  "componentWillUpdate",
]);

function mergeFromFactories(sources, methodName, context) {
  return sources.reduce((result, source) => {
    if (typeof source[methodName] !== "function") {
      return result;
    }

    return { ...result, ...source[methodName].call(context) };
  }, {});
}

export default function createLegacyComponent(specification) {
  const sources = [...(specification.mixins || []), specification];
  const methodNames = new Set();

  sources.forEach((source) => {
    Object.keys(source).forEach((key) => {
      if (
        typeof source[key] === "function" &&
        !reservedKeys.has(key) &&
        key !== "render"
      ) {
        methodNames.add(lifecycleAliases[key] || key);
      }
    });
  });

  class LegacyComponent extends React.Component {
    constructor(props, context) {
      super(props, context);

      methodNames.forEach((methodName) => {
        if (typeof this[methodName] === "function") {
          this[methodName] = this[methodName].bind(this);
        }
      });

      this.state = mergeFromFactories(sources, "getInitialState", this);
    }
  }

  const allKeys = new Set(sources.flatMap((source) => Object.keys(source)));

  allKeys.forEach((key) => {
    if (reservedKeys.has(key) || key === "render") {
      return;
    }

    const targetKey = lifecycleAliases[key] || key;
    const implementations = sources
      .map((source) => source[key])
      .filter((implementation) => typeof implementation === "function");

    if (!implementations.length) {
      return;
    }

    if (composableLifecycles.has(key) && implementations.length > 1) {
      LegacyComponent.prototype[targetKey] = function composedLifecycle(...args) {
        implementations.forEach((implementation) => {
          implementation.apply(this, args);
        });
      };
    } else {
      LegacyComponent.prototype[targetKey] = implementations.at(-1);
    }
  });

  LegacyComponent.prototype.render = specification.render;
  LegacyComponent.displayName = specification.displayName || "LegacyComponent";
  LegacyComponent.defaultProps = mergeFromFactories(
    sources,
    "getDefaultProps",
    null,
  );
  LegacyComponent.propTypes = Object.assign(
    {},
    ...sources.map((source) => source.propTypes || {}),
  );

  Object.assign(LegacyComponent, specification.statics || {});

  return LegacyComponent;
}
