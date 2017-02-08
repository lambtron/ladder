(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

/** @jsx dom */

/**
 * Module dependencies.
 */

var _libDekuIndexJs = require("../lib/deku/index.js");

var component = _libDekuIndexJs.component;
var dom = _libDekuIndexJs.dom;

var Player = _interopRequire(require("../player/index.js"));

var Button = _interopRequire(require("../button/index.js"));

var Game = _interopRequire(require("../game/index.js"));

var List = _interopRequire(require("../list/index.js"));

/**
 * Constants.
 */

var request = require("superagent");

/**
 * Define `App`.
 */

var App = component();

/**
 * Export `App`.
 */

module.exports = App;

/**
 * After mount.
 */

App.prototype.afterMount = function (el, props, state) {
  var setState = this.setState.bind(this);
  var url = "/api/user";

  // Sort by rating
  function sortByRating(a, b) {
    return a.rating > b.rating ? -1 : 1;
  }

  request.get(url).end(function (err, res) {
    var list = res.body || [];
    setState({ list: list.sort(sortByRating) });
  });
};

/**
 * Render `App`.
 */

App.prototype.render = function (props, state) {
  var list = state.list || [];

  return dom(
    "div",
    { style: "font-size: 1.2em" },
    dom(
      "div",
      { "class": "container", style: "padding-bottom: 150px;" },
      dom(
        "div",
        { "class": "row", style: "margin-top: 10px" },
        dom(
          "div",
          { "class": "col-xs-12" },
          dom(List, { list: list })
        )
      )
    ),
    dom(
      "footer",
      { style: "position: fixed; bottom: 0px; width: 100%; padding: 10px; background-color: white; border-top: 1px solid #efefef;" },
      dom(
        "div",
        { "class": "container" },
        dom(
          "div",
          { "class": "row", style: "margin-bottom: 15px;" },
          dom(Player, { visible: true })
        ),
        dom(
          "div",
          { "class": "row" },
          dom(Game, { list: list, visible: true })
        )
      )
    )
  );
};

},{"../button/index.js":2,"../game/index.js":3,"../lib/deku/index.js":6,"../list/index.js":8,"../player/index.js":9,"superagent":11}],2:[function(require,module,exports){
/** @jsx dom */

/**
 * Module dependencies.
 */

"use strict";

var _libDekuIndexJs = require("../lib/deku/index.js");

var component = _libDekuIndexJs.component;
var dom = _libDekuIndexJs.dom;

/**
 * Define `Button`.
 */

var Button = component().prop("label", { type: "string" }).prop("onClick", { type: "function" });

/**
 * Expose `Button`.
 */

module.exports = Button;

/**
 * Render `Button`.
 */

Button.prototype.render = function (props, state) {
  var label = props.label;
  var onClick = props.onClick;

  return dom(
    "div",
    { "class": "btn btn-primary", onClick: onClick, style: "width: 100%" },
    label
  );
};

},{"../lib/deku/index.js":6}],3:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

/** @jsx dom */

/**
 * Module dependencies.
 */

var _libDekuIndexJs = require("../lib/deku/index.js");

var component = _libDekuIndexJs.component;
var dom = _libDekuIndexJs.dom;

var SelectList = _interopRequire(require("../select-list/index.js"));

var Button = _interopRequire(require("../button/index.js"));

/**
 * Constants.
 */

var request = require("superagent");

/**
 * Define `Game`.
 */

var Game = component().prop("list", { type: "array" });

/**
 * Expose `Game`.
 */

module.exports = Game;

/**
 * Submit results.
 */

Game.prototype.results = function (outcome) {
  var url = "/api/game";
  request.post(url).send(outcome).end(function (err, res) {
    window.location.reload();
  });
};

/**
 * Render `Game`.
 */

Game.prototype.render = function (props, state) {
  var list = props.list;
  var outcome = { winner: "WINNER", loser: "LOSER" };
  var self = this;

  // Update selection.
  function update(username, label) {
    outcome[label.toLowerCase()] = username;
  }

  // Submit results.
  function submit() {
    if (outcome.winner === "WINNER" || outcome.loser === "LOSER") {
      return console.log("Must select actual player");
    }self.results(outcome);
  }

  return dom(
    "div",
    null,
    dom(
      "div",
      { "class": "col-xs-5" },
      dom(SelectList, { label: "WINNER", list: list, onChange: update })
    ),
    dom(
      "div",
      { "class": "col-xs-5" },
      dom(SelectList, { label: "LOSER", list: list, onChange: update })
    ),
    dom(
      "div",
      { "class": "col-xs-2" },
      dom(
        "span",
        { "class": "btn btn-success", onClick: submit, style: "width: 100%" },
        "ADD"
      )
    )
  );
};

},{"../button/index.js":2,"../lib/deku/index.js":6,"../select-list/index.js":10,"superagent":11}],4:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

/**
 * Module dependencies.
 */

var App = _interopRequire(require("./app/index.js"));

/**
 * Render.
 */

App.render(document.body);

},{"./app/index.js":1}],5:[function(require,module,exports){
/** @jsx dom */

/**
 * Module dependencies.
 */

"use strict";

var _libDekuIndexJs = require("../lib/deku/index.js");

var component = _libDekuIndexJs.component;
var dom = _libDekuIndexJs.dom;

/**
 * Define `Input`.
 */

var Input = component().prop("name", { type: "string" }).prop("placeholder", { type: "string" }).prop("defaultValue", { type: "string" }).prop("onInput", { type: "function" }).prop("onChange", { type: "function" }).prop("onValid", { type: "function" });

/**
 * Expose `Input`.
 */

module.exports = Input;

/**
 * Render `Input`.
 */

Input.prototype.render = function (props, state) {
  var name = props.name;
  var placeholder = props.placeholder || "";
  var defaultValue = props.defaultValue || "";
  var onChange = props.onChange || noop;

  // onInput.
  function onInput(e) {
    var value = e.target.value;
    if (props.onValid) props.onValid(value, name);
    if (props.onInput) props.onInput(e);
  }

  return dom("input", {
    type: "text",
    name: name,
    defaultValue: defaultValue,
    placeholder: placeholder,
    onChange: onChange,
    onInput: onInput,
    "class": "borderless",
    style: "width: 100%" });
};

/**
 * Strictly for nooping purposes.
 */

function noop() {};

},{"../lib/deku/index.js":6}],6:[function(require,module,exports){
(function (global){
"use strict";

!(function (e) {
  if ("object" == typeof exports && "undefined" != typeof module) module.exports = e();else if ("function" == typeof define && define.amd) define([], e);else {
    var f;"undefined" != typeof window ? f = window : "undefined" != typeof global ? f = global : "undefined" != typeof self && (f = self), f.deku = e();
  }
})(function () {
  var define, module, exports;return (function e(t, n, r) {
    function s(o, u) {
      if (!n[o]) {
        if (!t[o]) {
          var a = typeof _require == "function" && _require;if (!u && a) {
            return a(o, !0);
          }if (i) {
            return i(o, !0);
          }var f = new Error("Cannot find module '" + o + "'");throw (f.code = "MODULE_NOT_FOUND", f);
        }var l = n[o] = { exports: {} };t[o][0].call(l.exports, function (e) {
          var n = t[o][1][e];return s(n ? n : e);
        }, l, l.exports, e, t, n, r);
      }return n[o].exports;
    }var i = typeof _require == "function" && _require;for (var o = 0; o < r.length; o++) s(r[o]);return s;
  })({ 1: [function (_require, module, exports) {

      /**
       * Module dependencies.
       */

      var assign = _require("extend");
      var Emitter = _require("component-emitter");
      var statics = _require("./statics");
      var protos = _require("./protos");
      var dom = _require("virtualize").node;

      /**
       * Expose `component`.
       */

      module.exports = component;

      /**
       * Generate a new `Component` constructor.
       *
       * @param {Object} spec
       * @return {Function} Component
       * @api public
       */

      function component(spec) {
        spec = spec || {};

        // Alow just a render function.

        if (typeof spec === "function") {
          spec = { render: spec };
        }

        /**
         * A component is a stateful virtual dom element.
         *
         * @api public
         */

        function Component() {
          if (!(this instanceof Component)) {
            return dom(Component, arguments[0], arguments[1]);
          }
          bindAll(this);
        }

        // statics.

        Component.props = {};
        assign(Component, statics, Emitter.prototype);

        // protos.

        assign(Component.prototype, protos, spec, Emitter.prototype);

        // for debugging.

        if (spec.displayName) {
          Component.displayName = spec.displayName;
          delete spec.displayName;
        }

        // extract props

        if (spec.props) {
          for (var key in spec.props) {
            Component.prop(key, spec.props[key]);
          }
          delete spec.props;
        }

        return Component;
      }

      /**
       * Bind all functions on an object to the object
       */

      function bindAll(obj) {
        for (var key in obj) {
          var val = obj[key];
          if (typeof val === "function") obj[key] = val.bind(obj);
        }
        return obj;
      }
    }, { "./protos": 2, "./statics": 3, "component-emitter": 18, extend: 19, virtualize: 30 }], 2: [function (_require, module, exports) {
      /**
       * Set properties on `this.state`.
       *
       * @param {Object} state State to merge with existing state.
       * @param {Function} done
       */

      exports.setState = function (state, done) {
        this.emit("change", state, done);
      };

      /**
       * Invalidate the component so that it is updated on the next
       * frame regardless of whether or not the state has changed.
       *
       * This sets a temporary state value that is checked and trigger
       * an update. This special property is removed after the component is
       * updated.
       *
       * @return {void}
       */

      exports.invalidate = function () {
        this.emit("invalidate");
      };

      /**
       * Default render. Renders a noscript tag by
       * default so nothing shows up in the DOM.
       *
       * @param {node} dom
       * @return {Node}
       */

      exports.render = function () {};

      /**
       * Return the initial state of the component.
       * This should be overriden.
       *
       * @return {Object}
       */

      exports.initialState = function () {
        return {};
      };

      /**
       * Check if this component should be re-rendered given new props
       *
       * @param {Object} props
       * @param {Object} state
       * @param {Object} nextProps
       * @param {Object} nextState
       *
       * @return {Boolean}
       */

      exports.shouldUpdate = function (props, state, nextProps, nextState) {
        return true;
      };
    }, {}], 3: [function (_require, module, exports) {

      /**
       * Module dependencies.
       */

      var renderString = _require("../renderer/string");
      var Entity = _require("../entity");
      var Scene = _require("../scene");
      var isDom = _require("is-dom");

      /**
       * Browser dependencies.
       */

      if (typeof window !== "undefined") {
        var HTMLRenderer = _require("../renderer/html");
      }

      /**
       * Use plugin.
       *
       * @param {Function|Object} plugin Passing an object will extend the prototype.
       * @return {Component}
       * @api public
       */

      exports.use = function (plugin) {
        if ("function" === typeof plugin) {
          plugin(this);
        } else {
          for (var k in plugin) this.prototype[k] = plugin[k];
        }
        return this;
      };

      /**
       * Define a property
       *
       * @param {String} name
       * @param {Object} options
       */

      exports.prop = function (name, options) {
        this.props[name] = options;
        return this;
      };

      /**
       * Connect to channels
       *
       * @param {String} name
       */

      exports.channel = function (name) {
        this.channels.push(name);
        return this;
      };

      /**
       * Mount this component to a node. Only available
       * in the browser as it requires the DOM.
       *
       * @param {HTMLElement} container
       * @param {Object} props
       */

      exports.render = function (container, props) {
        if (!HTMLRenderer) throw new Error("You can only render a DOM tree in the browser. Use renderString instead.");
        if (!isDom(container)) throw new Error(container + " is not a valid render target.");
        var renderer = new HTMLRenderer(container);
        var entity = new Entity(this, props);
        var scene = new Scene(renderer, entity);
        return scene;
      };

      /**
       * Render this component to a string.
       *
       * @param {Object} props
       */

      exports.renderString = function (props) {
        var entity = new Entity(this, props);
        return renderString(entity);
      };
    }, { "../entity": 4, "../renderer/html": 7, "../renderer/string": 9, "../scene": 10, "is-dom": 21 }], 4: [function (_require, module, exports) {

      /**
       * Module dependencies.
       */

      var Emitter = _require("component-emitter");
      var virtual = _require("virtualize");
      var assign = _require("extend");
      var uid = _require("get-uid");

      /**
       * Prevent calling setState in these lifecycle states
       *
       * @type {Object}
       */

      var preventSetState = {
        beforeUpdate: "You can't call setState in the beforeUpdate hook. Use the propsChanged hook instead.",
        render: "You can't call setState in the render hook. This method must remain pure."
      };

      /**
       * Expose `Entity`.
       */

      module.exports = Entity;

      /**
       * A rendered component instance.
       *
       * This manages the lifecycle, props and state of the component.
       *
       * @param {Function} Component
       * @param {Object} props
       */

      function Entity(Component, props) {
        this.id = uid();
        this.type = Component;
        this.props = props || {};
        this.component = this.instance(Component);
        this.state = this.component.initialState(this.props);
        this.lifecycle = null;
        this._pendingProps = assign({}, this.props);
        this._pendingState = assign({}, this.state);
      }

      /**
       * Mixins.
       */

      Emitter(Entity.prototype);

      /**
       * Create the component instance
       *
       * @param {Component} Component
       *
       * @return {Object}
       */

      Entity.prototype.instance = function (Component) {
        var component = new Component();
        component.on("change", this.setState.bind(this));
        component.on("invalidate", this.invalidate.bind(this));
        return component;
      };

      /**
       * Get an updated version of the virtual tree.
       *
       * @return {VirtualTree}
       */

      Entity.prototype.render = function () {
        this.lifecycle = "render";
        var node = this.component.render(this.props, this.state);
        this.lifecycle = null;
        // if (!node) throw new Error('The `render` method must return a virtual node.');
        if (!node) node = virtual.node("noscript");
        return virtual.tree(node);
      };

      /**
       * Merge in new props.
       *
       * @param {Object} nextProps
       * @param {Function} done
       */

      Entity.prototype.setProps = function (nextProps, done) {
        if (done) this.once("afterUpdate", done);
        this._pendingProps = assign(this._pendingProps, nextProps);
        this.propsChanged(this._pendingProps);
        this.invalidate();
      };

      /**
       * Replace all the properties
       *
       * @param {Object} nextProps
       * @param {Function} done
       */

      Entity.prototype.replaceProps = function (nextProps, done) {
        if (done) this.once("afterUpdate", done);
        this._pendingProps = nextProps;
        this.propsChanged(this._pendingProps);
        this.invalidate();
      };

      /**
       * Set the state. This can be called multiple times
       * and the state will be MERGED.
       *
       * @param {Object} nextState
       * @param {Function} done
       */

      Entity.prototype.setState = function (nextState, done) {
        checkSetState(this.lifecycle);
        if (done) this.once("afterUpdate", done);
        this._pendingState = assign(this._pendingState, nextState);
        this.invalidate();
      };

      /**
       * Schedule this component to be updated on the next frame.
       */

      Entity.prototype.invalidate = function () {
        this.emit("change");
      };

      /**
       * Commit the changes.
       *
       * @return {Node}
       */

      Entity.prototype.commit = function () {
        this.state = this._pendingState;
        this.props = this._pendingProps;
        this._pendingState = assign({}, this.state);
        this._pendingProps = assign({}, this.props);
      };

      /**
       * Release this entity for GC
       */

      Entity.prototype.release = function () {
        this.off();
      };

      /**
       * Should this entity be updated and rendered?
       *
       * @param {Object} nextState
       * @param {Object} nextProps
       *
       * @return {Boolean}
       */

      Entity.prototype.shouldUpdate = function (nextProps, nextState) {
        return this.component.shouldUpdate(this.props, this.state, nextProps, nextState);
      };

      /**
       * Trigger `beforeUpdate` lifecycle hook.
       *
       * @param {Object} nextState
       * @param {Object} nextProps
       */

      Entity.prototype.beforeUpdate = function (nextProps, nextState) {
        this.trigger("beforeUpdate", [this.props, this.state, nextProps, nextState]);
      };

      /**
       * Trigger `afterUpdate` lifecycle hook.
       *
       * @param {Object} previousState
       * @param {Object} previousProps
       */

      Entity.prototype.afterUpdate = function (previousState, previousProps) {
        this.trigger("afterUpdate", [this.props, this.state, previousProps, previousState]);
      };

      /**
       * Trigger `beforeUnmount` lifecycle hook.
       *
       * @param {HTMLElement} el
       */

      Entity.prototype.beforeUnmount = function (el) {
        this.trigger("beforeUnmount", [el, this.props, this.state]);
      };

      /**
       * Trigger `afterUnmount` lifecycle hook.
       */

      Entity.prototype.afterUnmount = function () {
        this.trigger("afterUnmount", [this.props, this.state]);
      };

      /**
       * Trigger `beforeMount` lifecycle hook.
       */

      Entity.prototype.beforeMount = function () {
        this.trigger("beforeMount", [this.props, this.state]);
      };

      /**
       * Trigger `afterMount` lifecycle hook.
       *
       * @param {HTMLElement} el
       */

      Entity.prototype.afterMount = function (el) {
        this.trigger("afterMount", [el, this.props, this.state]);
      };

      /**
       * Trigger `propsChanged` lifecycle hook.
       */

      Entity.prototype.propsChanged = function (nextProps) {
        this.trigger("propsChanged", [nextProps, this.props, this.state]);
      };

      /**
       * Trigger a method on the component instance and call a matching
       * event on the Component constructor. This event can be used by
       * plugins to hook into lifecycle methods.
       *
       * @param {String} name
       * @param {Array} args
       * @private
       */

      Entity.prototype.trigger = function (name, args) {
        this.lifecycle = name;
        if (typeof this.component[name] === "function") {
          this.component[name].apply(this.component, args);
        }
        this.type.emit.apply(this.type, [name, this.component].concat(args));
        this.lifecycle = null;
        this.emit(name);
      };

      /**
       * Determine whether it is possible to set state during a
       * lifecycle method.
       *
       * @param {String} lifecycle
       */

      function checkSetState(lifecycle) {
        var message = preventSetState[lifecycle];
        if (message) throw new Error(message);
      }
    }, { "component-emitter": 18, extend: 19, "get-uid": 20, virtualize: 30 }], 5: [function (_require, module, exports) {
      exports.component = _require("./component");
      exports.dom = _require("virtualize").node;
    }, { "./component": 1, virtualize: 30 }], 6: [function (_require, module, exports) {
      var zip = _require("array-zip");

      module.exports = patch;

      /**
       * Patch an element with the diff from two trees
       *
       * @param {object} options
       */

      function patch(options) {
        var context = {
          entity: options.entity,
          currentTree: options.currentTree,
          nextTree: options.nextTree,
          renderer: options.renderer,
          rootEl: options.el,
          el: options.el,
          path: "0",
          id: options.entity.id,
          isRoot: true
        };
        diffNode(options.currentTree.root, options.nextTree.root, context);
        return context.rootEl;
      }

      /**
       * Create a diff between two tress of nodes.
       */

      function diffNode(current, next, context) {
        // Type changed. This could be from element->text, text->ComponentA,
        // ComponentA->ComponentB etc. But NOT div->span. These are the same type
        // (ElementNode) but different tag name.
        if (current.type !== next.type) {
          return replaceNode(current, next, context);
        }

        // update the text content.
        if (next.type === "text") {
          return diffText(current, next, context);
        }

        // update nested components.
        if (next.type === "component") {
          return diffComponent(current, next, context);
        }

        // if they are both elements.
        if (next.type === "element") {
          return diffElement(current, next, context);
        }
      }

      /**
       * Diff two text nodes and update the element.
       *
       * @param {Node} previous
       * @param {Node} current
       * @param {TextElement} el
       */

      function diffText(previous, current, context) {
        if (current.data !== previous.data) {
          context.el.data = current.data;
        }
      }

      /**
       * Diff the children of an ElementNode.
       *
       * @param {ComponentRenderer} this
       * @param {Node} previous
       * @param {Node} current
       * @param {Element} el
       */

      function diffChildren(previous, current, context) {
        var children = zip(previous.children, current.children);
        var el = context.el;

        var j = -1;
        for (var i = 0; i < children.length; i++) {
          j += 1;
          var item = children[i];
          var left = item[0];
          var right = item[1];
          var childPath = context.path + "." + j;

          // this is a new node.
          if (left == null) {
            var childEl = context.renderer.createElement(right, childPath, context.entity.id);
            el.appendChild(childEl);
            continue;
          }

          // the node has been removed.
          if (right == null) {
            removeComponents(left, context);
            if ("component" != left.type) {
              el.removeChild(el.childNodes[j]);
            }
            j = j - 1;
            continue;
          }

          diffNode(left, right, {
            id: context.entity.id,
            el: el.childNodes[j],
            entity: context.entity,
            currentTree: context.currentTree,
            nextTree: context.nextTree,
            renderer: context.renderer,
            isRoot: false,
            path: childPath,
            rootEl: context.rootEl
          });
        }
      }

      /**
       * Diff the attributes and add/remove them.
       *
       * @param {ComponentRenderer} this
       * @param {Node} previous
       * @param {Node} current
       * @param {Element} el
       */

      function diffAttributes(previous, current, context) {
        var currentAttrs = current.attributes;
        var previousAttrs = previous.attributes;

        // add new attrs
        for (var name in currentAttrs) {
          var value = currentAttrs[name];
          if (!previousAttrs[name] || previousAttrs[name] !== value) {
            if (name === "value") {
              context.el.value = value;
            } else if (name === "innerHTML") {
              context.el.innerHTML = value;
            } else {
              context.el.setAttribute(name, value);
            }
          }
        }

        // remove old attrs
        for (var oldName in previousAttrs) {
          if (!currentAttrs[oldName]) {
            context.el.removeAttribute(oldName);
          }
        }
      }

      /**
       * Update a component with the props from the current node.
       *
       * @param {Node} previous
       * @param {Node} current
       * @param {Object} context
       */

      function diffComponent(previous, current, context) {
        // if the component type has changed, remove the
        // component and create the new one.
        if (current.component !== previous.component) {
          return replaceNode(previous, current, context);
        }

        var parentEntityId = context.entity.id;
        var entityId = context.renderer.children[parentEntityId][context.path];
        var entity = context.renderer.entities[entityId];

        // We always replace the props on the component when composing
        // them. This will trigger a re-render on all children below this
        // point becasue they're always going to have their props replaced.
        entity.replaceProps(current.props);
      }

      /**
       * Diff two element nodes.
       *
       * @param {ComponentRenderer} this
       * @param {Node} previous
       * @param {Node} current
       * @param {Element} el
       */

      function diffElement(previous, current, context) {
        // different node, so swap them. If the root node of the component has changed it's
        // type we need to update this to point to this new element
        if (current.tagName !== previous.tagName) {
          return replaceNode(previous, current, context);
        }

        // TODO:
        // Order the children using the key attribute in
        // both arrays of children and compare them first, then
        // the other nodes that have been added or removed, then
        // render them in the correct order

        // Add/remove attributes
        diffAttributes(previous, current, context);

        // Recursive
        diffChildren(previous, current, context);
      }

      /**
       * Replace a node in the previous tree with the node
       * in another tree. It will remove all the components
       * beneath that node and create all new components within
       * the current node and assign them to this this.
       *
       * @param {Node} previous
       * @param {Node} current
       */

      function replaceNode(current, next, context) {
        var el = context.el;
        var container = el.parentNode;
        removeComponents(current, context);
        // Check for parent node in case child root node is a component
        if (el.parentNode) el.parentNode.removeChild(el);
        var newEl = context.renderer.createElement(next, context.path, context.entity.id);
        var targetEl = container.childNodes[current.index];
        if (targetEl) {
          container.insertBefore(newEl, targetEl);
        } else {
          container.appendChild(newEl);
        }
        if (context.isRoot) context.rootEl = newEl;
      }

      /**
       * Remove all components within a node.
       *
       * @param {ComponentRenderer} this
       * @param {Node} node
       */

      function removeComponents(node, context) {
        // remove a child component
        if (node.type === "component") {
          var parentEntityId = context.entity.id;
          var nodePath = context.currentTree.getPath(node);
          var entityId = context.renderer.children[parentEntityId][nodePath];
          var entity = context.renderer.entities[entityId];
          context.renderer.unmountEntity(entity);
          delete context.renderer.children[parentEntityId][nodePath];
          return;
        }
        // recursively remove components
        if (node.children) {
          node.children.forEach(function (childNode) {
            removeComponents(childNode, context);
          }, this);
        }
      }
    }, { "array-zip": 11 }], 7: [function (_require, module, exports) {

      /**
       * Dependencies.
       */

      var Interactions = _require("./interactions");
      var Entity = _require("../../entity");
      var each = _require("component-each");
      var patch = _require("./diff");

      /**
       * Export.
       */

      module.exports = HTMLRenderer;

      /**
       * Handles the rendering of a scene graph by running
       * diffs on the current virtual tree of the entities with
       * the previous version. It then applies this diff to the
       * acutal DOM tree.
       *
       * Instead of using SceneNodes or some other object type, we're
       * just using the entities themselves, since each SceneNode can only
       * have a single entity anyway. In the future we could split these up, but
       * it seems simpler to do it this way for now.
       */

      function HTMLRenderer(container) {
        this.container = container;
        this.events = new Interactions(document.body);
        this.entities = {};
        this.elements = {};
        this.renders = {};
        this.children = {};
        this.rendered = null;
        this.dirty = [];
      }

      /**
       * Render an entity tree. This should be called on the top
       * level entity that is mounted to the container.
       *
       * @param {Entity} entity
       *
       * @api public
       */

      HTMLRenderer.prototype.render = function (entity) {

        // The entity we're trying to render is already rendered
        // into the container, so let's just update it.
        if (this.rendered === entity) {
          if (this.dirty.length > 0) {
            this.update(entity);
          }
          return;
        }

        // Otherwise we're rendering a new entity onto the scene
        this.clear();
        this.mountEntity(entity, this.container);
        this.rendered = entity;
      };

      /**
       * Update an entity already on the scene.
       *
       * @param {Entity} entity
       *
       * @api private
       * @return {void}
       */

      HTMLRenderer.prototype.update = function (entity) {
        var self = this;
        var nextProps = entity._pendingProps;
        var nextState = entity._pendingState;
        var previousState = entity.state;
        var previousProps = entity.props;
        var currentTree = this.renders[entity.id];
        var currentEl = this.elements[entity.id];

        // Recursive update
        function next() {
          self.updateChildren(entity);
        }

        // If the component never called setState or setProps
        // it won't need updating at all. This allows us to
        // skip further complex checks.
        if (!this.hasChanged(entity)) {
          return next();
        }

        // If setState or setProps have been called we can
        // allow a user-defined check to see if we should update the
        // component. This returns true by default. This allows the user
        // improve the overall performance of their app and avoids hard
        // to track down bugs. We essentially are trading a bit of
        // performance here for user-experience.
        if (!entity.shouldUpdate(nextProps, nextState)) {
          return next();
        }

        // pre-update. This callback could mutate the
        // state or props just before the render occurs
        entity.beforeUpdate(nextProps, nextState);

        // Now we can commit the state of the entity. All of the
        // pending props and state will now be committed and reflect
        // the actual state of the component.
        entity.commit();

        // Re-render the tree to get an up-to-date representation
        // of the component with the new props/state
        var nextTree = entity.render();

        // Run the diff and patch the element.
        var updatedEl = patch({
          entity: entity,
          currentTree: currentTree,
          nextTree: nextTree,
          el: currentEl,
          renderer: this
        });

        // Update the element for this component in case
        // the root node has changed.
        this.elements[entity.id] = updatedEl;
        this.renders[entity.id] = nextTree;
        this.updateEvents(entity);
        this.resolveEntity(entity);
        next();
        entity.afterUpdate(previousState, previousProps);
      };

      /**
       * Check to see if an entity has changed since the last rendering.
       *
       * @param {Entity} entity
       *
       * @return {Boolean}
       */

      HTMLRenderer.prototype.hasChanged = function (entity) {
        return this.dirty.indexOf(entity.id) > -1;
      };

      /**
       * Resolve an entity's dirty state.
       *
       * @param {Entity} entity
       *
       * @return {Boolean}
       */

      HTMLRenderer.prototype.resolveEntity = function (entity) {
        this.dirty = this.dirty.filter(function (id) {
          return id !== entity.id;
        });
      };

      /**
       * Update all the children of an entity
       *
       * @param {Entity} entity
       */

      HTMLRenderer.prototype.updateChildren = function (entity) {
        var entities = this.entities;
        var children = this.children[entity.id];
        for (var path in children) {
          var childId = children[path];
          this.update(entities[childId]);
        }
      };

      /**
       * Clear the scene
       */

      HTMLRenderer.prototype.clear = HTMLRenderer.prototype.remove = function () {
        if (!this.rendered) return;
        this.unmountEntity(this.rendered);
        this.rendered = null;
        this.events.remove();
      };

      /**
       * Append an entity to an element
       *
       * @param {Entity} entity
       * @param {HTMLElement} container
       *
       * @return {HTMLElement}
       */

      HTMLRenderer.prototype.mountEntity = function (entity, container) {
        var self = this;

        entity.beforeMount();

        // This will store all the entities that are children
        // of this entity after it is rendered and mounted.
        this.children[entity.id] = {};

        // Render the entity and create the initial element for it
        var current = entity.render();
        var el = this.createElement(current.root, "0", entity.id);

        // We store the DOM state of the entity within the renderer
        this.elements[entity.id] = el;
        this.renders[entity.id] = current;
        this.entities[entity.id] = entity;

        // Whenever setState or setProps is called, we mark the entity
        // as dirty in the renderer. This lets us optimize the re-rendering
        // and skip components that definitely haven't changed.
        entity.on("change", function () {
          self.dirty.push(entity.id);
        });

        container.appendChild(el);
        this.updateEvents(entity);
        entity.afterMount(el);
        return el;
      };

      /**
       * Remove the entity from the DOM.
       *
       * @param {Entity} entity
       */

      HTMLRenderer.prototype.unmountEntity = function (entity) {
        var el = this.elements[entity.id];

        // This entity is already unmounted
        if (!el) return;

        entity.beforeUnmount(el);

        // In case the entity is currently marked as dirty. We remove
        // it so it doesn't sit around in the array
        this.resolveEntity(entity);

        // If sub-components are on the root node, the entities will share
        // the same element. In this case, the element will only need to be
        // removed from the DOM once
        if (el.parentNode) el.parentNode.removeChild(el);
        this.unmountChildren(entity);
        this.removeEvents(entity);
        entity.afterUnmount();
        entity.release();
        delete this.elements[entity.id];
        delete this.renders[entity.id];
        delete this.entities[entity.id];
        delete this.children[entity.id];
      };

      /**
       * Remove all of the child entities of an entity
       *
       * @param {Entity} entity
       */

      HTMLRenderer.prototype.unmountChildren = function (entity) {
        var self = this;
        var entities = this.entities;
        var children = this.children[entity.id];
        each(children, function (path, childId) {
          self.unmountEntity(entities[childId]);
        });
      };

      /**
       * Updates all the DOM event bindings for an entity.
       * It removes all event bindings on the scene for this entity
       * first and just reapplies them using the current tree.
       *
       * @return {void}
       */

      HTMLRenderer.prototype.updateEvents = function (entity) {
        var self = this;
        this.events.unbind(entity.id);
        var currentTree = this.renders[entity.id];

        // TODO: Optimize this by storing the events in the Tree
        // object on the initial pass instead of looping again.
        // eg. entity.current.events -> '0.0.1:click': fn
        each(currentTree.nodes, function (path, node) {
          if (node.type !== "element") return;
          each(node.events, function (eventType, fn) {
            self.events.bind(entity.id, path, eventType, function (e) {
              fn.call(entity.component, e, entity.props, entity.state);
            });
          });
        });
      };

      /**
       * Unbind all events from an entity
       *
       * @param {Entity} entity
       */

      HTMLRenderer.prototype.removeEvents = function (entity) {
        this.events.unbind(entity.id);
      };

      /**
       * Convert this node and all it's children into
       * real DOM elements and return it.
       *
       * Passing in a node allows us to render just a small
       * part of the tree instead of the whole thing, like when
       * a new branch is added during a diff.
       *
       * @param {Node} node
       * @param {String} path
       * @param {String} entityId
       *
       * @return {HTMLDocumentFragment}
       */

      HTMLRenderer.prototype.createElement = function (node, path, entityId) {

        if (node.type === "text") {
          return document.createTextNode(node.data);
        }

        if (node.type === "element") {
          var el = document.createElement(node.tagName);
          var children = node.children;

          // TODO: These is some duplication here between the diffing.
          // This should be generalized and put into a module somewhere
          // so that it's easier to define special attributes in one spot.
          for (var name in node.attributes) {
            if (name === "innerHTML") {
              el.innerHTML = node.attributes.innerHTML;
            } else {
              el.setAttribute(name, node.attributes[name]);
            }
          }

          // TODO: Store nodes in a hash so we can easily find
          // elements later. This would allow us to separate out the
          // patching from the diffing will still being efficient. We could
          // also use the same object in the Interactions object to make
          // lookups cleaner instead of checking __ values.
          // this.nodesByPath[entity.id][path] = el;
          el.__path__ = path;
          el.__entity__ = entityId;

          // add children.
          for (var i = 0, n = children.length; i < n; i++) {
            var childEl = this.createElement(children[i], path + "." + i, entityId);
            el.appendChild(childEl);
          }

          return el;
        }

        if (node.type === "component") {
          var fragment = document.createDocumentFragment();
          var child = new Entity(node.component, node.props);
          var el = this.mountEntity(child, fragment);
          this.children[entityId][path] = child.id;
          return el;
        }
      };
    }, { "../../entity": 4, "./diff": 6, "./interactions": 8, "component-each": 14 }], 8: [function (_require, module, exports) {

      var throttle = _require("per-frame");
      var keypath = _require("object-path");

      /**
       * All of the events we will bind to
       */

      var events = ["blur", "change", "click", "contextmenu", "copy", "cut", "dblclick", "drag", "dragend", "dragenter", "dragexit", "dragleave", "dragover", "dragstart", "drop", "focus", "input", "keydown", "keyup", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "paste", "scroll", "submit", "touchcancel", "touchend", "touchmove", "touchstart", "wheel"];

      /**
       * Expose `Interactions`.
       */

      module.exports = Interactions;

      /**
       * Handle events for a component.
       *
       * @param {HTMLElement} el
       */

      function Interactions(el) {
        this.el = el;
        this.handlers = {};
        this.handle = this.handle.bind(this);
        this.resume();
      }

      /**
       * Bind events for an element, and all it's rendered child elements.
       *
       * @param {String} path
       * @param {String} event
       * @param {Function} fn
       */

      Interactions.prototype.bind = function (namespace, path, event, fn) {
        keypath.set(this.handlers, [namespace, path, event], throttle(fn));
      };

      /**
       * Unbind events for a namespace
       *
       * @param {String} namespace
       */

      Interactions.prototype.unbind = function (namespace) {
        delete this.handlers[namespace];
      };

      /**
       * Start listening for events
       */

      Interactions.prototype.resume = function () {
        events.forEach(function (name) {
          this.el.addEventListener(name, this.handle, true);
        }, this);
      };

      /**
       * Stop listening for events
       */

      Interactions.prototype.pause = function () {
        events.forEach(function (name) {
          this.el.removeEventListener(name, this.handle, true);
        }, this);
      };

      /**
       * After render, finally bind event listeners.
       */

      Interactions.prototype.remove = function () {
        this.handlers = {};
        this.pause();
      };

      /**
       * Handle an event that has occured within the container
       *
       * @param {Event} event
       */

      Interactions.prototype.handle = function (event) {
        var target = event.target;
        var handlers = this.handlers;
        var entityId = target.__entity__;
        var eventType = event.type;

        // Walk up the DOM tree and see if there is a handler
        // for this event type higher up.
        while (target && target.__entity__ === entityId) {
          var fn = keypath.get(handlers, [entityId, target.__path__, eventType]);
          if (fn) {
            event.delegateTarget = target;
            fn(event);
            break;
          }
          target = target.parentNode;
        }
      };
    }, { "object-path": 22, "per-frame": 23 }], 9: [function (_require, module, exports) {
      var virtual = _require("virtualize");
      var Entity = _require("../../entity");

      /**
       * Export
       */

      module.exports = render;

      /**
       * Render a component to a string
       *
       * @param {Entity}
       *
       * @return {String}
       */

      function render(entity) {
        var tree = entity.render();
        return nodeToString(tree.root, tree);
      }

      /**
       * Render a node to a string
       *
       * @param {Node} node
       * @param {Tree} tree
       *
       * @return {String}
       */

      function nodeToString(node, tree) {
        var path = tree.getPath(node);

        // text
        if (node.type === "text") {
          return node.data;
        }

        // element
        if (node.type === "element") {
          var children = node.children;
          var attributes = node.attributes;
          var tagName = node.tagName;
          var str = "<" + tagName + attrs(attributes) + ">";

          for (var i = 0, n = children.length; i < n; i++) {
            str += nodeToString(children[i], tree);
          }
          str += "</" + tagName + ">";
          return str;
        }

        // component
        if (node.type === "component") {
          return render(new Entity(node.component, node.props));
        }

        throw new Error("Invalid type");
      }

      /**
       * HTML attributes to string.
       *
       * @param {Object} attributes
       * @return {String}
       * @api private
       */

      function attrs(attributes) {
        var str = "";
        for (var key in attributes) {
          str += attr(key, attributes[key]);
        }
        return str;
      }

      /**
       * HTML attribute to string.
       *
       * @param {String} key
       * @param {String} val
       * @return {String}
       * @api private
       */

      function attr(key, val) {
        return " " + key + "=\"" + val + "\"";
      }
    }, { "../../entity": 4, virtualize: 30 }], 10: [function (_require, module, exports) {

      /**
       * Module dependencies
       */

      var Emitter = _require("component-emitter");
      var loop = _require("raf-loop");

      /**
       * Expose `Scene`
       *
       * @type {Function}
       */

      module.exports = Scene;

      /**
       * A scene renders a component tree to an element
       * and manages the lifecycle and events each frame.
       *
       * @param {HTMLElement} container
       * @param {Entity} entity
       */

      function Scene(renderer, entity) {
        this.loop = loop(this.update.bind(this));
        this.renderer = renderer;
        this.entity = entity;
        this.resume();
      }

      Emitter(Scene.prototype);

      /**
       * Add a plugin
       *
       * @api public
       */

      Scene.prototype.use = function (plugin) {
        plugin(this);
        return this;
      };

      /**
       * Schedule this component to be updated on the next frame.
       *
       * @param {Function} done
       * @return {void}
       */

      Scene.prototype.update = function () {
        try {
          this.renderer.render(this.entity);
        } catch (e) {
          this.pause();
          throw e;
        }
        return this;
      };

      /**
       * Set new props on the component and trigger a re-render.
       *
       * @param {Object} newProps
       * @param {Function} [done]
       */

      Scene.prototype.setProps = function (newProps, done) {
        this.entity.setProps(newProps, done);
      };

      /**
       * Replace all the props on the current entity
       *
       * @param {Objct} newProps
       * @param {Function} done
       *
       * @return {Promise}
       */

      Scene.prototype.replaceProps = function (newProps, done) {
        this.entity.replaceProps(newProps, done);
      };

      /**
       * Remove the scene from the DOM.
       */

      Scene.prototype.remove = function () {
        this.pause();
        this.renderer.remove();
        this.off();
      };

      /**
       * Resume updating the scene
       */

      Scene.prototype.resume = function () {
        this.loop.start();
        this.emit("resume");
        return this;
      };

      /**
       * Stop updating the scene
       */

      Scene.prototype.pause = function () {
        this.loop.stop();
        this.emit("pause");
        return this;
      };
    }, { "component-emitter": 18, "raf-loop": 25 }], 11: [function (_require, module, exports) {
      /*
       * array-zip
       * https://github.com/frozzare/array-zip
       *
       * Copyright (c) 2014 Fredrik Forsmo
       * Licensed under the MIT license.
       */

      "use strict";

      module.exports = function () {
        var args = Array.prototype.slice.call(arguments, 0);
        return args.reduce(function (a, b) {
          return a.length > b.length ? a : b;
        }, []).map(function (_, i) {
          return args.map(function (arr) {
            return arr[i];
          });
        });
      };
    }, {}], 12: [function (_require, module, exports) {
      // Copyright Joyent, Inc. and other Node contributors.
      //
      // Permission is hereby granted, free of charge, to any person obtaining a
      // copy of this software and associated documentation files (the
      // "Software"), to deal in the Software without restriction, including
      // without limitation the rights to use, copy, modify, merge, publish,
      // distribute, sublicense, and/or sell copies of the Software, and to permit
      // persons to whom the Software is furnished to do so, subject to the
      // following conditions:
      //
      // The above copyright notice and this permission notice shall be included
      // in all copies or substantial portions of the Software.
      //
      // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
      // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      // USE OR OTHER DEALINGS IN THE SOFTWARE.

      function EventEmitter() {
        this._events = this._events || {};
        this._maxListeners = this._maxListeners || undefined;
      }
      module.exports = EventEmitter;

      // Backwards-compat with node 0.10.x
      EventEmitter.EventEmitter = EventEmitter;

      EventEmitter.prototype._events = undefined;
      EventEmitter.prototype._maxListeners = undefined;

      // By default EventEmitters will print a warning if more than 10 listeners are
      // added to it. This is a useful default which helps finding memory leaks.
      EventEmitter.defaultMaxListeners = 10;

      // Obviously not all Emitters should be limited to 10. This function allows
      // that to be increased. Set to zero for unlimited.
      EventEmitter.prototype.setMaxListeners = function (n) {
        if (!isNumber(n) || n < 0 || isNaN(n)) throw TypeError("n must be a positive number");
        this._maxListeners = n;
        return this;
      };

      EventEmitter.prototype.emit = function (type) {
        var er, handler, len, args, i, listeners;

        if (!this._events) this._events = {};

        // If there is no 'error' event listener then throw.
        if (type === "error") {
          if (!this._events.error || isObject(this._events.error) && !this._events.error.length) {
            er = arguments[1];
            if (er instanceof Error) {
              throw er; // Unhandled 'error' event
            }
            throw TypeError("Uncaught, unspecified \"error\" event.");
          }
        }

        handler = this._events[type];

        if (isUndefined(handler)) return false;

        if (isFunction(handler)) {
          switch (arguments.length) {
            // fast cases
            case 1:
              handler.call(this);
              break;
            case 2:
              handler.call(this, arguments[1]);
              break;
            case 3:
              handler.call(this, arguments[1], arguments[2]);
              break;
            // slower
            default:
              len = arguments.length;
              args = new Array(len - 1);
              for (i = 1; i < len; i++) args[i - 1] = arguments[i];
              handler.apply(this, args);
          }
        } else if (isObject(handler)) {
          len = arguments.length;
          args = new Array(len - 1);
          for (i = 1; i < len; i++) args[i - 1] = arguments[i];

          listeners = handler.slice();
          len = listeners.length;
          for (i = 0; i < len; i++) listeners[i].apply(this, args);
        }

        return true;
      };

      EventEmitter.prototype.addListener = function (type, listener) {
        var m;

        if (!isFunction(listener)) throw TypeError("listener must be a function");

        if (!this._events) this._events = {};

        // To avoid recursion in the case that type === "newListener"! Before
        // adding it to the listeners, first emit "newListener".
        if (this._events.newListener) this.emit("newListener", type, isFunction(listener.listener) ? listener.listener : listener);

        if (!this._events[type])
          // Optimize the case of one listener. Don't need the extra array object.
          this._events[type] = listener;else if (isObject(this._events[type]))
          // If we've already got an array, just append.
          this._events[type].push(listener);else
          // Adding the second element, need to change to array.
          this._events[type] = [this._events[type], listener];

        // Check for listener leak
        if (isObject(this._events[type]) && !this._events[type].warned) {
          var m;
          if (!isUndefined(this._maxListeners)) {
            m = this._maxListeners;
          } else {
            m = EventEmitter.defaultMaxListeners;
          }

          if (m && m > 0 && this._events[type].length > m) {
            this._events[type].warned = true;
            console.error("(node) warning: possible EventEmitter memory " + "leak detected. %d listeners added. " + "Use emitter.setMaxListeners() to increase limit.", this._events[type].length);
            if (typeof console.trace === "function") {
              // not supported in IE 10
              console.trace();
            }
          }
        }

        return this;
      };

      EventEmitter.prototype.on = EventEmitter.prototype.addListener;

      EventEmitter.prototype.once = function (type, listener) {
        if (!isFunction(listener)) throw TypeError("listener must be a function");

        var fired = false;

        function g() {
          this.removeListener(type, g);

          if (!fired) {
            fired = true;
            listener.apply(this, arguments);
          }
        }

        g.listener = listener;
        this.on(type, g);

        return this;
      };

      // emits a 'removeListener' event iff the listener was removed
      EventEmitter.prototype.removeListener = function (type, listener) {
        var list, position, length, i;

        if (!isFunction(listener)) throw TypeError("listener must be a function");

        if (!this._events || !this._events[type]) return this;

        list = this._events[type];
        length = list.length;
        position = -1;

        if (list === listener || isFunction(list.listener) && list.listener === listener) {
          delete this._events[type];
          if (this._events.removeListener) this.emit("removeListener", type, listener);
        } else if (isObject(list)) {
          for (i = length; i-- > 0;) {
            if (list[i] === listener || list[i].listener && list[i].listener === listener) {
              position = i;
              break;
            }
          }

          if (position < 0) return this;

          if (list.length === 1) {
            list.length = 0;
            delete this._events[type];
          } else {
            list.splice(position, 1);
          }

          if (this._events.removeListener) this.emit("removeListener", type, listener);
        }

        return this;
      };

      EventEmitter.prototype.removeAllListeners = function (type) {
        var key, listeners;

        if (!this._events) return this;

        // not listening for removeListener, no need to emit
        if (!this._events.removeListener) {
          if (arguments.length === 0) this._events = {};else if (this._events[type]) delete this._events[type];
          return this;
        }

        // emit removeListener for all listeners on all events
        if (arguments.length === 0) {
          for (key in this._events) {
            if (key === "removeListener") continue;
            this.removeAllListeners(key);
          }
          this.removeAllListeners("removeListener");
          this._events = {};
          return this;
        }

        listeners = this._events[type];

        if (isFunction(listeners)) {
          this.removeListener(type, listeners);
        } else {
          // LIFO order
          while (listeners.length) this.removeListener(type, listeners[listeners.length - 1]);
        }
        delete this._events[type];

        return this;
      };

      EventEmitter.prototype.listeners = function (type) {
        var ret;
        if (!this._events || !this._events[type]) ret = [];else if (isFunction(this._events[type])) ret = [this._events[type]];else ret = this._events[type].slice();
        return ret;
      };

      EventEmitter.listenerCount = function (emitter, type) {
        var ret;
        if (!emitter._events || !emitter._events[type]) ret = 0;else if (isFunction(emitter._events[type])) ret = 1;else ret = emitter._events[type].length;
        return ret;
      };

      function isFunction(arg) {
        return typeof arg === "function";
      }

      function isNumber(arg) {
        return typeof arg === "number";
      }

      function isObject(arg) {
        return typeof arg === "object" && arg !== null;
      }

      function isUndefined(arg) {
        return arg === void 0;
      }
    }, {}], 13: [function (_require, module, exports) {
      // shim for using process in browser

      var process = module.exports = {};
      var queue = [];
      var draining = false;

      function drainQueue() {
        if (draining) {
          return;
        }
        draining = true;
        var currentQueue;
        var len = queue.length;
        while (len) {
          currentQueue = queue;
          queue = [];
          var i = -1;
          while (++i < len) {
            currentQueue[i]();
          }
          len = queue.length;
        }
        draining = false;
      }
      process.nextTick = function (fun) {
        queue.push(fun);
        if (!draining) {
          setTimeout(drainQueue, 0);
        }
      };

      process.title = "browser";
      process.browser = true;
      process.env = {};
      process.argv = [];
      process.version = ""; // empty string to avoid regexp issues

      function noop() {}

      process.on = noop;
      process.addListener = noop;
      process.once = noop;
      process.off = noop;
      process.removeListener = noop;
      process.removeAllListeners = noop;
      process.emit = noop;

      process.binding = function (name) {
        throw new Error("process.binding is not supported");
      };

      // TODO(shtylman)
      process.cwd = function () {
        return "/";
      };
      process.chdir = function (dir) {
        throw new Error("process.chdir is not supported");
      };
      process.umask = function () {
        return 0;
      };
    }, {}], 14: [function (_require, module, exports) {

      /**
       * Module dependencies.
       */

      try {
        var type = _require("type");
      } catch (err) {
        var type = _require("component-type");
      }

      var toFunction = _require("to-function");

      /**
       * HOP reference.
       */

      var has = Object.prototype.hasOwnProperty;

      /**
       * Iterate the given `obj` and invoke `fn(val, i)`
       * in optional context `ctx`.
       *
       * @param {String|Array|Object} obj
       * @param {Function} fn
       * @param {Object} [ctx]
       * @api public
       */

      module.exports = function (obj, fn, ctx) {
        fn = toFunction(fn);
        ctx = ctx || this;
        switch (type(obj)) {
          case "array":
            return array(obj, fn, ctx);
          case "object":
            if ("number" == typeof obj.length) return array(obj, fn, ctx);
            return object(obj, fn, ctx);
          case "string":
            return string(obj, fn, ctx);
        }
      };

      /**
       * Iterate string chars.
       *
       * @param {String} obj
       * @param {Function} fn
       * @param {Object} ctx
       * @api private
       */

      function string(obj, fn, ctx) {
        for (var i = 0; i < obj.length; ++i) {
          fn.call(ctx, obj.charAt(i), i);
        }
      }

      /**
       * Iterate object keys.
       *
       * @param {Object} obj
       * @param {Function} fn
       * @param {Object} ctx
       * @api private
       */

      function object(obj, fn, ctx) {
        for (var key in obj) {
          if (has.call(obj, key)) {
            fn.call(ctx, key, obj[key]);
          }
        }
      }

      /**
       * Iterate array-ish.
       *
       * @param {Array|Object} obj
       * @param {Function} fn
       * @param {Object} ctx
       * @api private
       */

      function array(obj, fn, ctx) {
        for (var i = 0; i < obj.length; ++i) {
          fn.call(ctx, obj[i], i);
        }
      }
    }, { "component-type": 15, "to-function": 16, type: 15 }], 15: [function (_require, module, exports) {

      /**
       * toString ref.
       */

      var toString = Object.prototype.toString;

      /**
       * Return the type of `val`.
       *
       * @param {Mixed} val
       * @return {String}
       * @api public
       */

      module.exports = function (val) {
        switch (toString.call(val)) {
          case "[object Function]":
            return "function";
          case "[object Date]":
            return "date";
          case "[object RegExp]":
            return "regexp";
          case "[object Arguments]":
            return "arguments";
          case "[object Array]":
            return "array";
          case "[object String]":
            return "string";
        }

        if (val === null) return "null";
        if (val === undefined) return "undefined";
        if (val && val.nodeType === 1) return "element";
        if (val === Object(val)) return "object";

        return typeof val;
      };
    }, {}], 16: [function (_require, module, exports) {
      var expr;
      try {
        expr = void 0;
      } catch (e) {
        expr = _require("component-props");
      }
      module.exports = toFunction;
      function toFunction(obj) {
        switch (({}).toString.call(obj)) {
          case "[object Object]":
            return objectToFunction(obj);
          case "[object Function]":
            return obj;
          case "[object String]":
            return stringToFunction(obj);
          case "[object RegExp]":
            return regexpToFunction(obj);
          default:
            return defaultToFunction(obj);
        }
      }
      function defaultToFunction(val) {
        return function (obj) {
          return val === obj;
        };
      }
      function regexpToFunction(re) {
        return function (obj) {
          return re.test(obj);
        };
      }
      function stringToFunction(str) {
        if (/^ *\W+/.test(str)) {
          return new Function("_", "return _ " + str);
        }return new Function("_", "return " + get(str));
      }
      function objectToFunction(obj) {
        var match = {};
        for (var key in obj) {
          match[key] = typeof obj[key] === "string" ? defaultToFunction(obj[key]) : toFunction(obj[key]);
        }
        return function (val) {
          if (typeof val !== "object") return false;
          for (var key in match) {
            if (!(key in val)) return false;
            if (!match[key](val[key])) return false;
          }
          return true;
        };
      }
      function get(str) {
        var props = expr(str);
        if (!props.length) {
          return "_." + str;
        }var val, i, prop;
        for (i = 0; i < props.length; i++) {
          prop = props[i];
          val = "_." + prop;
          val = "('function' == typeof " + val + " ? " + val + "() : " + val + ")";
          str = stripNested(prop, str, val);
        }
        return str;
      }
      function stripNested(prop, str, val) {
        return str.replace(new RegExp("(\\.)?" + prop, "g"), function ($0, $1) {
          return $1 ? $0 : val;
        });
      }
    }, { "component-props": 17 }], 17: [function (_require, module, exports) {
      /**
       * Global Names
       */

      var globals = /\b(this|Array|Date|Object|Math|JSON)\b/g;

      /**
       * Return immediate identifiers parsed from `str`.
       *
       * @param {String} str
       * @param {String|Function} map function or prefix
       * @return {Array}
       * @api public
       */

      module.exports = function (str, fn) {
        var p = unique(props(str));
        if (fn && "string" == typeof fn) fn = prefixed(fn);
        if (fn) return map(str, p, fn);
        return p;
      };

      /**
       * Return immediate identifiers in `str`.
       *
       * @param {String} str
       * @return {Array}
       * @api private
       */

      function props(str) {
        return str.replace(/\.\w+|\w+ *\(|"[^"]*"|'[^']*'|\/([^/]+)\//g, "").replace(globals, "").match(/[$a-zA-Z_]\w*/g) || [];
      }

      /**
       * Return `str` with `props` mapped with `fn`.
       *
       * @param {String} str
       * @param {Array} props
       * @param {Function} fn
       * @return {String}
       * @api private
       */

      function map(str, props, fn) {
        var re = /\.\w+|\w+ *\(|"[^"]*"|'[^']*'|\/([^/]+)\/|[a-zA-Z_]\w*/g;
        return str.replace(re, function (_) {
          if ("(" == _[_.length - 1]) return fn(_);
          if (! ~props.indexOf(_)) return _;
          return fn(_);
        });
      }

      /**
       * Return unique array.
       *
       * @param {Array} arr
       * @return {Array}
       * @api private
       */

      function unique(arr) {
        var ret = [];

        for (var i = 0; i < arr.length; i++) {
          if (~ret.indexOf(arr[i])) continue;
          ret.push(arr[i]);
        }

        return ret;
      }

      /**
       * Map with prefix `str`.
       */

      function prefixed(str) {
        return function (_) {
          return str + _;
        };
      }
    }, {}], 18: [function (_require, module, exports) {

      /**
       * Expose `Emitter`.
       */

      module.exports = Emitter;

      /**
       * Initialize a new `Emitter`.
       *
       * @api public
       */

      function Emitter(obj) {
        if (obj) {
          return mixin(obj);
        }
      };

      /**
       * Mixin the emitter properties.
       *
       * @param {Object} obj
       * @return {Object}
       * @api private
       */

      function mixin(obj) {
        for (var key in Emitter.prototype) {
          obj[key] = Emitter.prototype[key];
        }
        return obj;
      }

      /**
       * Listen on the given `event` with `fn`.
       *
       * @param {String} event
       * @param {Function} fn
       * @return {Emitter}
       * @api public
       */

      Emitter.prototype.on = Emitter.prototype.addEventListener = function (event, fn) {
        this._callbacks = this._callbacks || {};
        (this._callbacks["$" + event] = this._callbacks["$" + event] || []).push(fn);
        return this;
      };

      /**
       * Adds an `event` listener that will be invoked a single
       * time then automatically removed.
       *
       * @param {String} event
       * @param {Function} fn
       * @return {Emitter}
       * @api public
       */

      Emitter.prototype.once = function (event, fn) {
        function on() {
          this.off(event, on);
          fn.apply(this, arguments);
        }

        on.fn = fn;
        this.on(event, on);
        return this;
      };

      /**
       * Remove the given callback for `event` or all
       * registered callbacks.
       *
       * @param {String} event
       * @param {Function} fn
       * @return {Emitter}
       * @api public
       */

      Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function (event, fn) {
        this._callbacks = this._callbacks || {};

        // all
        if (0 == arguments.length) {
          this._callbacks = {};
          return this;
        }

        // specific event
        var callbacks = this._callbacks["$" + event];
        if (!callbacks) return this;

        // remove all handlers
        if (1 == arguments.length) {
          delete this._callbacks["$" + event];
          return this;
        }

        // remove specific handler
        var cb;
        for (var i = 0; i < callbacks.length; i++) {
          cb = callbacks[i];
          if (cb === fn || cb.fn === fn) {
            callbacks.splice(i, 1);
            break;
          }
        }
        return this;
      };

      /**
       * Emit `event` with the given args.
       *
       * @param {String} event
       * @param {Mixed} ...
       * @return {Emitter}
       */

      Emitter.prototype.emit = function (event) {
        this._callbacks = this._callbacks || {};
        var args = [].slice.call(arguments, 1),
            callbacks = this._callbacks["$" + event];

        if (callbacks) {
          callbacks = callbacks.slice(0);
          for (var i = 0, len = callbacks.length; i < len; ++i) {
            callbacks[i].apply(this, args);
          }
        }

        return this;
      };

      /**
       * Return array of callbacks for `event`.
       *
       * @param {String} event
       * @return {Array}
       * @api public
       */

      Emitter.prototype.listeners = function (event) {
        this._callbacks = this._callbacks || {};
        return this._callbacks["$" + event] || [];
      };

      /**
       * Check if this emitter has `event` handlers.
       *
       * @param {String} event
       * @return {Boolean}
       * @api public
       */

      Emitter.prototype.hasListeners = function (event) {
        return !!this.listeners(event).length;
      };
    }, {}], 19: [function (_require, module, exports) {
      var hasOwn = Object.prototype.hasOwnProperty;
      var toString = Object.prototype.toString;
      var undefined;

      var isPlainObject = function isPlainObject(obj) {
        "use strict";
        if (!obj || toString.call(obj) !== "[object Object]") {
          return false;
        }

        var has_own_constructor = hasOwn.call(obj, "constructor");
        var has_is_property_of_method = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, "isPrototypeOf");
        // Not own constructor property must be Object
        if (obj.constructor && !has_own_constructor && !has_is_property_of_method) {
          return false;
        }

        // Own properties are enumerated firstly, so to speed up,
        // if last one is own, then all properties are own.
        var key;
        for (key in obj) {}

        return key === undefined || hasOwn.call(obj, key);
      };

      module.exports = function extend() {
        "use strict";
        var options,
            name,
            src,
            copy,
            copyIsArray,
            clone,
            target = arguments[0],
            i = 1,
            length = arguments.length,
            deep = false;

        // Handle a deep copy situation
        if (typeof target === "boolean") {
          deep = target;
          target = arguments[1] || {};
          // skip the boolean and the target
          i = 2;
        } else if (typeof target !== "object" && typeof target !== "function" || target == null) {
          target = {};
        }

        for (; i < length; ++i) {
          options = arguments[i];
          // Only deal with non-null/undefined values
          if (options != null) {
            // Extend the base object
            for (name in options) {
              src = target[name];
              copy = options[name];

              // Prevent never-ending loop
              if (target === copy) {
                continue;
              }

              // Recurse if we're merging plain objects or arrays
              if (deep && copy && (isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
                if (copyIsArray) {
                  copyIsArray = false;
                  clone = src && Array.isArray(src) ? src : [];
                } else {
                  clone = src && isPlainObject(src) ? src : {};
                }

                // Never move original objects, clone them
                target[name] = extend(deep, clone, copy);

                // Don't bring in undefined values
              } else if (copy !== undefined) {
                target[name] = copy;
              }
            }
          }
        }

        // Return the modified object
        return target;
      };
    }, {}], 20: [function (_require, module, exports) {
      /** generate unique id for selector */
      var counter = Date.now() % 1000000000;

      module.exports = function getUid() {
        return (Math.random() * 1000000000 >>> 0) + counter++;
      };
    }, {}], 21: [function (_require, module, exports) {
      /*global window*/

      /**
       * Check if object is dom node.
       *
       * @param {Object} val
       * @return {Boolean}
       * @api public
       */

      module.exports = function isNode(val) {
        if (!val || typeof val !== "object") {
          return false;
        }if (window && "object" == typeof window.Node) {
          return val instanceof window.Node;
        }return "number" == typeof val.nodeType && "string" == typeof val.nodeName;
      };
    }, {}], 22: [function (_require, module, exports) {
      (function (root, factory) {
        "use strict";

        /*istanbul ignore next:cant test*/
        if (typeof module === "object" && typeof module.exports === "object") {
          module.exports = factory();
        } else if (typeof define === "function" && define.amd) {
          // AMD. Register as an anonymous module.
          define([], factory);
        } else {
          // Browser globals
          root.objectPath = factory();
        }
      })(this, function () {
        "use strict";

        var toStr = Object.prototype.toString,
            _hasOwnProperty = Object.prototype.hasOwnProperty;

        function isEmpty(value) {
          if (!value) {
            return true;
          }
          if (isArray(value) && value.length === 0) {
            return true;
          } else {
            for (var i in value) {
              if (_hasOwnProperty.call(value, i)) {
                return false;
              }
            }
            return true;
          }
        }

        function toString(type) {
          return toStr.call(type);
        }

        function isNumber(value) {
          return typeof value === "number" || toString(value) === "[object Number]";
        }

        function isString(obj) {
          return typeof obj === "string" || toString(obj) === "[object String]";
        }

        function isObject(obj) {
          return typeof obj === "object" && toString(obj) === "[object Object]";
        }

        function isArray(obj) {
          return typeof obj === "object" && typeof obj.length === "number" && toString(obj) === "[object Array]";
        }

        function isBoolean(obj) {
          return typeof obj === "boolean" || toString(obj) === "[object Boolean]";
        }

        function getKey(key) {
          var intKey = parseInt(key);
          if (intKey.toString() === key) {
            return intKey;
          }
          return key;
        }

        function set(_x, _x2, _x3, _x4) {
          var _again = true;

          _function: while (_again) {
            _again = false;
            var obj = _x,
                path = _x2,
                value = _x3,
                doNotReplace = _x4;
            currentPath = oldVal = undefined;

            if (isNumber(path)) {
              path = [path];
            }
            if (isEmpty(path)) {
              return obj;
            }
            if (isString(path)) {
              _x = obj;
              _x2 = path.split(".").map(getKey);
              _x3 = value;
              _x4 = doNotReplace;
              _again = true;
              continue _function;
            }
            var currentPath = path[0];

            if (path.length === 1) {
              var oldVal = obj[currentPath];
              if (oldVal === void 0 || !doNotReplace) {
                obj[currentPath] = value;
              }
              return oldVal;
            }

            if (obj[currentPath] === void 0) {
              //check if we assume an array
              if (isNumber(path[1])) {
                obj[currentPath] = [];
              } else {
                obj[currentPath] = {};
              }
            }

            _x = obj[currentPath];
            _x2 = path.slice(1);
            _x3 = value;
            _x4 = doNotReplace;
            _again = true;
            continue _function;
          }
        }

        function del(_x, _x2) {
          var _again = true;

          _function: while (_again) {
            _again = false;
            var obj = _x,
                path = _x2;
            currentPath = oldVal = undefined;

            if (isNumber(path)) {
              path = [path];
            }

            if (isEmpty(obj)) {
              return void 0;
            }

            if (isEmpty(path)) {
              return obj;
            }
            if (isString(path)) {
              _x = obj;
              _x2 = path.split(".");
              _again = true;
              continue _function;
            }

            var currentPath = getKey(path[0]);
            var oldVal = obj[currentPath];

            if (path.length === 1) {
              if (oldVal !== void 0) {
                if (isArray(obj)) {
                  obj.splice(currentPath, 1);
                } else {
                  delete obj[currentPath];
                }
              }
            } else {
              if (obj[currentPath] !== void 0) {
                _x = obj[currentPath];
                _x2 = path.slice(1);
                _again = true;
                continue _function;
              }
            }

            return obj;
          }
        }

        var objectPath = {};

        objectPath.has = function (obj, path) {
          if (isEmpty(obj)) {
            return false;
          }

          if (isNumber(path)) {
            path = [path];
          } else if (isString(path)) {
            path = path.split(".");
          }

          if (isEmpty(path) || path.length === 0) {
            return false;
          }

          for (var i = 0; i < path.length; i++) {
            var j = path[i];
            if ((isObject(obj) || isArray(obj)) && _hasOwnProperty.call(obj, j)) {
              obj = obj[j];
            } else {
              return false;
            }
          }

          return true;
        };

        objectPath.ensureExists = function (obj, path, value) {
          return set(obj, path, value, true);
        };

        objectPath.set = function (obj, path, value, doNotReplace) {
          return set(obj, path, value, doNotReplace);
        };

        objectPath.insert = function (obj, path, value, at) {
          var arr = objectPath.get(obj, path);
          at = ~ ~at;
          if (!isArray(arr)) {
            arr = [];
            objectPath.set(obj, path, arr);
          }
          arr.splice(at, 0, value);
        };

        objectPath.empty = function (obj, path) {
          if (isEmpty(path)) {
            return obj;
          }
          if (isEmpty(obj)) {
            return void 0;
          }

          var value, i;
          if (!(value = objectPath.get(obj, path))) {
            return obj;
          }

          if (isString(value)) {
            return objectPath.set(obj, path, "");
          } else if (isBoolean(value)) {
            return objectPath.set(obj, path, false);
          } else if (isNumber(value)) {
            return objectPath.set(obj, path, 0);
          } else if (isArray(value)) {
            value.length = 0;
          } else if (isObject(value)) {
            for (i in value) {
              if (_hasOwnProperty.call(value, i)) {
                delete value[i];
              }
            }
          } else {
            return objectPath.set(obj, path, null);
          }
        };

        objectPath.push = function (obj, path /*, values */) {
          var arr = objectPath.get(obj, path);
          if (!isArray(arr)) {
            arr = [];
            objectPath.set(obj, path, arr);
          }

          arr.push.apply(arr, Array.prototype.slice.call(arguments, 2));
        };

        objectPath.coalesce = function (obj, paths, defaultValue) {
          var value;

          for (var i = 0, len = paths.length; i < len; i++) {
            if ((value = objectPath.get(obj, paths[i])) !== void 0) {
              return value;
            }
          }

          return defaultValue;
        };

        objectPath.get = function (obj, path, defaultValue) {
          if (isNumber(path)) {
            path = [path];
          }
          if (isEmpty(path)) {
            return obj;
          }
          if (isEmpty(obj)) {
            return defaultValue;
          }
          if (isString(path)) {
            return objectPath.get(obj, path.split("."), defaultValue);
          }

          var currentPath = getKey(path[0]);

          if (path.length === 1) {
            if (obj[currentPath] === void 0) {
              return defaultValue;
            }
            return obj[currentPath];
          }

          return objectPath.get(obj[currentPath], path.slice(1), defaultValue);
        };

        objectPath.del = function (obj, path) {
          return del(obj, path);
        };

        return objectPath;
      });
    }, {}], 23: [function (_require, module, exports) {
      /**
       * Module Dependencies.
       */

      var raf = _require("raf");

      /**
       * Export `throttle`.
       */

      module.exports = throttle;

      /**
       * Executes a function at most once per animation frame. Kind of like
       * throttle, but it throttles at ~60Hz.
       *
       * @param {Function} fn - the Function to throttle once per animation frame
       * @return {Function}
       * @public
       */

      function throttle(fn) {
        var rtn;
        var ignoring = false;

        return function queue() {
          if (ignoring) {
            return rtn;
          }ignoring = true;

          raf(function () {
            ignoring = false;
          });

          rtn = fn.apply(this, arguments);
          return rtn;
        };
      }
    }, { raf: 24 }], 24: [function (_require, module, exports) {
      /**
       * Expose `requestAnimationFrame()`.
       */

      exports = module.exports = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || fallback;

      /**
       * Fallback implementation.
       */

      var prev = new Date().getTime();
      function fallback(fn) {
        var curr = new Date().getTime();
        var ms = Math.max(0, 16 - (curr - prev));
        var req = setTimeout(fn, ms);
        prev = curr;
        return req;
      }

      /**
       * Cancel.
       */

      var cancel = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame || window.clearTimeout;

      exports.cancel = function (id) {
        cancel.call(window, id);
      };
    }, {}], 25: [function (_require, module, exports) {
      var inherits = _require("inherits");
      var EventEmitter = _require("events").EventEmitter;
      var raf = _require("raf");
      var now = _require("right-now");

      module.exports = Engine;
      function Engine(fn) {
        if (!(this instanceof Engine)) {
          return new Engine(fn);
        }this.running = false;
        this.last = now();
        this._frame = 0;
        this._tick = this.tick.bind(this);

        if (fn) this.on("tick", fn);
      }

      inherits(Engine, EventEmitter);

      Engine.prototype.start = function () {
        if (this.running) return;
        this.running = true;
        this.last = now();
        this._frame = raf(this._tick);
        return this;
      };

      Engine.prototype.stop = function () {
        this.running = false;
        if (this._frame !== 0) raf.cancel(this._frame);
        this._frame = 0;
        return this;
      };

      Engine.prototype.tick = function () {
        this._frame = raf(this._tick);
        var time = now();
        var dt = time - this.last;
        this.emit("tick", dt);
        this.last = time;
      };
    }, { events: 12, inherits: 26, raf: 27, "right-now": 29 }], 26: [function (_require, module, exports) {
      if (typeof Object.create === "function") {
        // implementation from standard node.js 'util' module
        module.exports = function inherits(ctor, superCtor) {
          ctor.super_ = superCtor;
          ctor.prototype = Object.create(superCtor.prototype, {
            constructor: {
              value: ctor,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
        };
      } else {
        // old school shim for old browsers
        module.exports = function inherits(ctor, superCtor) {
          ctor.super_ = superCtor;
          var TempCtor = function TempCtor() {};
          TempCtor.prototype = superCtor.prototype;
          ctor.prototype = new TempCtor();
          ctor.prototype.constructor = ctor;
        };
      }
    }, {}], 27: [function (_require, module, exports) {
      var now = _require("performance-now"),
          global = typeof window === "undefined" ? {} : window,
          vendors = ["moz", "webkit"],
          suffix = "AnimationFrame",
          raf = global["request" + suffix],
          caf = global["cancel" + suffix] || global["cancelRequest" + suffix],
          isNative = true;

      for (var i = 0; i < vendors.length && !raf; i++) {
        raf = global[vendors[i] + "Request" + suffix];
        caf = global[vendors[i] + "Cancel" + suffix] || global[vendors[i] + "CancelRequest" + suffix];
      }

      // Some versions of FF have rAF but not cAF
      if (!raf || !caf) {
        isNative = false;

        var last = 0,
            id = 0,
            queue = [],
            frameDuration = 1000 / 60;

        raf = function (callback) {
          if (queue.length === 0) {
            var _now = now(),
                next = Math.max(0, frameDuration - (_now - last));
            last = next + _now;
            setTimeout(function () {
              var cp = queue.slice(0);
              // Clear queue here to prevent
              // callbacks from appending listeners
              // to the current frame's queue
              queue.length = 0;
              for (var i = 0; i < cp.length; i++) {
                if (!cp[i].cancelled) {
                  try {
                    cp[i].callback(last);
                  } catch (e) {
                    setTimeout(function () {
                      throw e;
                    }, 0);
                  }
                }
              }
            }, Math.round(next));
          }
          queue.push({
            handle: ++id,
            callback: callback,
            cancelled: false
          });
          return id;
        };

        caf = function (handle) {
          for (var i = 0; i < queue.length; i++) {
            if (queue[i].handle === handle) {
              queue[i].cancelled = true;
            }
          }
        };
      }

      module.exports = function (fn) {
        // Wrap in a new function to prevent
        // `cancel` potentially being assigned
        // to the native rAF function
        if (!isNative) {
          return raf.call(global, fn);
        }
        return raf.call(global, function () {
          try {
            fn.apply(this, arguments);
          } catch (e) {
            setTimeout(function () {
              throw e;
            }, 0);
          }
        });
      };
      module.exports.cancel = function () {
        caf.apply(global, arguments);
      };
    }, { "performance-now": 28 }], 28: [function (_require, module, exports) {
      (function (process) {
        // Generated by CoffeeScript 1.6.3
        (function () {
          var getNanoSeconds, hrtime, loadTime;

          if (typeof performance !== "undefined" && performance !== null && performance.now) {
            module.exports = function () {
              return performance.now();
            };
          } else if (typeof process !== "undefined" && process !== null && process.hrtime) {
            module.exports = function () {
              return (getNanoSeconds() - loadTime) / 1000000;
            };
            hrtime = process.hrtime;
            getNanoSeconds = function () {
              var hr;
              hr = hrtime();
              return hr[0] * 1000000000 + hr[1];
            };
            loadTime = getNanoSeconds();
          } else if (Date.now) {
            module.exports = function () {
              return Date.now() - loadTime;
            };
            loadTime = Date.now();
          } else {
            module.exports = function () {
              return new Date().getTime() - loadTime;
            };
            loadTime = new Date().getTime();
          }
        }).call(this);

        /*
        
        */
      }).call(this, _require("_process"));
    }, { _process: 13 }], 29: [function (_require, module, exports) {
      (function (global) {
        module.exports = global.performance && global.performance.now ? function now() {
          return performance.now();
        } : Date.now || function now() {
          return +new Date();
        };
      }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {}], 30: [function (_require, module, exports) {

      /**
       * Module dependencies.
       */

      var ComponentNode = _require("./lib/component");
      var ElementNode = _require("./lib/element");
      var TextNode = _require("./lib/text");
      var tree = _require("./lib/tree");
      var slice = _require("sliced");
      var uid = _require("get-uid");

      /**
       * Exports.
       */

      exports.node = dom;
      exports.tree = tree;

      /**
       * Create virtual DOM trees.
       *
       * This creates the nicer API for the user.
       * It translates that friendly API into an actual tree of nodes.
       *
       * @param {String|Function} type
       * @param {Object} props
       * @param {Array} children
       * @return {Node}
       * @api public
       */

      function dom(type, props, children) {

        // Skipped adding attributes and we're passing
        // in children instead.
        if (arguments.length === 2 && (typeof props === "string" || Array.isArray(props))) {
          children = props;
          props = {};
        }

        // Account for JSX putting the children as multiple arguments.
        // This is essentially just the ES6 rest param
        if (arguments.length > 2 && Array.isArray(arguments[2]) === false) {
          children = slice(arguments, 2);
        }

        children = children || [];
        props = props || {};

        // passing in a single child, you can skip
        // using the array
        if (!Array.isArray(children)) {
          children = [children];
        }

        children = children.filter(notEmpty).reduce(flatten, []).map(textNodes).map(addIndex);

        // pull the key out from the data.
        var key = props.key;
        delete props.key;

        // if you pass in a function, it's a `Component` constructor.
        // otherwise it's an element.
        var node;
        if ("function" == typeof type) {
          node = new ComponentNode(type, props, key, children);
        } else {
          node = new ElementNode(type, props, key, children);
        }

        // set the unique ID
        node.id = uid();
        node.index = 0;

        return node;
      }

      /**
       * Remove null/undefined values from the array
       *
       * @param {*} value
       *
       * @return {Boolean}
       */

      function notEmpty(value) {
        return value !== null && value !== undefined;
      }

      /**
       * Flatten nested array
       *
       * @param {Array} arr
       * @param {*} value
       *
       * @return {Array}
       */

      function flatten(result, node) {
        if (Array.isArray(node)) {
          result = result.concat(node);
        } else {
          result.push(node);
        }
        return result;
      }

      /**
       * Parse nodes into real `Node` objects.
       *
       * @param {Mixed} node
       * @param {Integer} index
       * @return {Node}
       * @api private
       */

      function textNodes(node, index) {
        if (typeof node === "string" || typeof node === "number") {
          return new TextNode(String(node));
        } else {
          return node;
        }
      }

      /**
       * Add an index
       *
       * @param {Node} node
       * @param {Number} index
       *
       * @return {Node}
       */

      function addIndex(node, index) {
        node.index = index;
        return node;
      }
    }, { "./lib/component": 31, "./lib/element": 32, "./lib/text": 33, "./lib/tree": 34, "get-uid": 20, sliced: 36 }], 31: [function (_require, module, exports) {

      module.exports = ComponentNode;

      /**
       * Initialize a new `ComponentNode`.
       *
       * @param {Component} component
       * @param {Object} props
       * @param {String} key Used for sorting/replacing during diffing.
       * @param {Array} children Child virtual nodes
       * @api public
       */

      function ComponentNode(component, props, key, children) {
        this.key = key;
        this.props = props;
        this.type = "component";
        this.component = component;
        this.props.children = children || [];
      }
    }, {}], 32: [function (_require, module, exports) {
      var type = _require("component-type");

      /**
       * Exports
       */

      module.exports = ElementNode;

      /**
       * All of the events can bind to
       */

      var events = {
        onBlur: "blur",
        onChange: "change",
        onClick: "click",
        onContextMenu: "contextmenu",
        onCopy: "copy",
        onCut: "cut",
        onDoubleClick: "dblclick",
        onDrag: "drag",
        onDragEnd: "dragend",
        onDragEnter: "dragenter",
        onDragExit: "dragexit",
        onDragLeave: "dragleave",
        onDragOver: "dragover",
        onDragStart: "dragstart",
        onDrop: "drop",
        onFocus: "focus",
        onInput: "input",
        onKeyDown: "keydown",
        onKeyUp: "keyup",
        onMouseDown: "mousedown",
        onMouseMove: "mousemove",
        onMouseOut: "mouseout",
        onMouseOver: "mouseover",
        onMouseUp: "mouseup",
        onPaste: "paste",
        onScroll: "scroll",
        onSubmit: "submit",
        onTouchCancel: "touchcancel",
        onTouchEnd: "touchend",
        onTouchMove: "touchmove",
        onTouchStart: "touchstart"
      };

      /**
       * Initialize a new `ElementNode`.
       *
       * @param {String} tagName
       * @param {Object} attributes
       * @param {String} key Used for sorting/replacing during diffing.
       * @param {Array} children Child virtual dom nodes.
       * @api public
       */

      function ElementNode(tagName, attributes, key, children) {
        this.type = "element";
        this.attributes = parseAttributes(attributes);
        this.events = parseEvents(attributes);
        this.tagName = parseTag(tagName, attributes);
        this.children = children || [];
        this.key = key;
      }

      /**
       * Parse attributes for some special cases.
       *
       * TODO: This could be more functional and allow hooks
       * into the processing of the attributes at a component-level
       *
       * @param {Object} attributes
       *
       * @return {Object}
       */

      function parseAttributes(attributes) {

        // style: { 'text-align': 'left' }
        if (attributes.style) {
          attributes.style = parseStyle(attributes.style);
        }

        // data: { foo: 'bar' }
        if (attributes.data) {
          attributes = parseData(attributes);
        }

        // class: { foo: true, bar: false, baz: true }
        // class: ['foo', 'bar', 'baz']
        if (attributes["class"]) {
          attributes["class"] = parseClass(attributes["class"]);
        }

        // Remove attributes with false values
        for (var name in attributes) {
          if (attributes[name] === false) {
            delete attributes[name];
          }
        }

        return attributes;
      }

      /**
       * Parse a block of styles into a string.
       *
       * TODO: this could do a lot more with vendor prefixing,
       * number values etc. Maybe there's a way to allow users
       * to hook into this?
       *
       * @param {Object} styles
       *
       * @return {String}
       */

      function parseStyle(styles) {
        if (type(styles) !== "object") {
          return styles;
        }
        var str = "";
        for (var name in styles) {
          var value = styles[name];
          str += name + ":" + value + ";";
        }
        return str;
      }

      /**
       * Parse the dataset
       *
       * @param {Object} attributes
       *
       * @return {Object}
       */

      function parseData(attributes) {
        if (type(attributes.data) !== "object") {
          return attributes;
        }

        for (var name in attributes.data) {
          attributes["data-" + name] = attributes.data[name];
        }

        delete attributes.data;
        return attributes;
      }

      /**
       * Parse the class attribute so it's able to be
       * set in a more user-friendly way
       *
       * @param {String|Object|Array} value
       *
       * @return {String}
       */

      function parseClass(value) {

        // { foo: true, bar: false, baz: true }
        if (type(value) === "object") {
          var matched = [];
          for (var key in value) {
            if (value[key]) matched.push(key);
          }
          value = matched;
        }

        // ['foo', 'bar', 'baz']
        if (type(value) === "array") {
          if (value.length === 0) {
            return;
          }
          value = value.join(" ");
        }

        return value;
      }

      /**
       * Events are stored on the node and are creating using
       * special attributes
       *
       * @param {Object} attributes
       *
       * @return {Object}
       */

      function parseEvents(attributes) {
        var ret = {};
        for (var name in events) {
          var type = events[name];
          var callback = attributes[name];
          if (callback) {
            ret[type] = callback;
            delete attributes[name];
          }
        }
        return ret;
      }

      /**
       * Parse the tag to allow using classes and ids
       * within the tagname like in CSS.
       *
       * @param {String} name
       * @param {Object} attributes
       *
       * @return {String}
       */

      function parseTag(name, attributes) {
        if (!name) {
          return "div";
        }var parts = name.split(/([\.#]?[a-zA-Z0-9_:-]+)/);
        var tagName = "div";

        parts.filter(Boolean).forEach(function (part, i) {
          var type = part.charAt(0);
          if (type === ".") {
            attributes["class"] = ((attributes["class"] || "") + " " + part.substring(1, part.length)).trim();
          } else if (type === "#") {
            attributes.id = part.substring(1, part.length);
          } else {
            tagName = part;
          }
        });

        return tagName;
      }
    }, { "component-type": 35 }], 33: [function (_require, module, exports) {
      module.exports = TextNode;

      /**
       * Initialize a new `TextNode`.
       *
       * This is just a virtual HTML text object.
       *
       * @param {String} text
       * @api public
       */

      function TextNode(text) {
        this.type = "text";
        this.data = String(text);
      }
    }, {}], 34: [function (_require, module, exports) {

      /**
       * Export `Tree`.
       */

      module.exports = function (node) {
        return new Tree(node);
      };

      /**
       * A tree is representation of Node that is easier
       * to parse and diff. The tree should be considered
       * immutable and won't change.
       *
       * @param {Node} node
       */

      function Tree(node) {
        this.root = node;
        this.paths = {};
        this.nodes = {};
        this.components = {};
        this.parse(node);
      }

      /**
       * Get the path for a node.
       *
       * @param {Node} node
       * @return {String}
       */

      Tree.prototype.getPath = function (node) {
        return this.paths[node.id];
      };

      /**
       * Get the node at a path
       *
       * @param {String} path
       *
       * @return {Node}
       */

      Tree.prototype.getNode = function (path) {
        return this.nodes[path];
      };

      /**
       * Parse a Node into a hash table. This allows
       * us to quickly find the path for a node and to
       * find a node at any path.
       *
       * @param {Node} node
       * @param {String} path
       * @return {Object}
       */

      Tree.prototype.parse = function (node, path) {
        path = path || "0";
        this.paths[node.id] = path;
        this.nodes[path] = node;
        if (node.type === "component") {
          this.components[path] = node;
        }
        if (node.children) {
          node.children.forEach(function (node, index) {
            this.parse(node, path + "." + (node.key || index));
          }, this);
        }
      };
    }, {}], 35: [function (_require, module, exports) {
      /**
       * toString ref.
       */

      var toString = Object.prototype.toString;

      /**
       * Return the type of `val`.
       *
       * @param {Mixed} val
       * @return {String}
       * @api public
       */

      module.exports = function (val) {
        switch (toString.call(val)) {
          case "[object Date]":
            return "date";
          case "[object RegExp]":
            return "regexp";
          case "[object Arguments]":
            return "arguments";
          case "[object Array]":
            return "array";
          case "[object Error]":
            return "error";
        }

        if (val === null) return "null";
        if (val === undefined) return "undefined";
        if (val !== val) return "nan";
        if (val && val.nodeType === 1) return "element";

        val = val.valueOf ? val.valueOf() : Object.prototype.valueOf.apply(val);

        return typeof val;
      };
    }, {}], 36: [function (_require, module, exports) {
      module.exports = exports = _require("./lib/sliced");
    }, { "./lib/sliced": 37 }], 37: [function (_require, module, exports) {

      /**
       * An Array.prototype.slice.call(arguments) alternative
       *
       * @param {Object} args something with a length
       * @param {Number} slice
       * @param {Number} sliceEnd
       * @api public
       */

      module.exports = function (args, slice, sliceEnd) {
        var ret = [];
        var len = args.length;

        if (0 === len) return ret;

        var start = slice < 0 ? Math.max(0, slice + len) : slice || 0;

        if (sliceEnd !== undefined) {
          len = sliceEnd < 0 ? sliceEnd + len : sliceEnd;
        }

        while (len-- > start) {
          ret[len - start] = args[len];
        }

        return ret;
      };
    }, {}] }, {}, [5])(5);
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],7:[function(require,module,exports){
/** @jsx dom */

/**
 * Module dependencies.
 */

"use strict";

var _libDekuIndexJs = require("../lib/deku/index.js");

var component = _libDekuIndexJs.component;
var dom = _libDekuIndexJs.dom;

/**
 * Define `Item`.
 */

var Item = component().prop("player", { type: "object" });

/**
 * Export `Item`.
 */

module.exports = Item;

/**
 * Get gif.
 */

Item.prototype.gif = function () {
  return "http://media.giphy.com/media/wvU4jl82C9cis/giphy.gif";
};

/**
 * Render `Item`.
 */

Item.prototype.render = function (props, state) {
  var player = props.player;
  player.gif = player.gif || this.gif();

  return dom(
    "div",
    { style: "margin: 10px 0px 10px 0px" },
    dom(
      "span",
      null,
      dom("img", { src: player.gif, style: "margin-right: 10px; width: 26px; height: 26px; -moz-border-radius: 13px; border-radius: 13px;" })
    ),
    dom(
      "span",
      { style: "vertical-align: middle" },
      player.name
    ),
    dom(
      "span",
      { "class": "pull-right" },
      player.rating
    )
  );
};

},{"../lib/deku/index.js":6}],8:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

/** @jsx dom */

/**
 * Module dependencies.
 */

var _libDekuIndexJs = require("../lib/deku/index.js");

var component = _libDekuIndexJs.component;
var dom = _libDekuIndexJs.dom;

var ListItem = _interopRequire(require("../list-item/index.js"));

/**
 * Define `List`.
 */

var List = component().prop("list", { type: "array" });

/**
 * Expose `List`.
 */

module.exports = List;

/**
 * Render `List`.
 */

List.prototype.render = function (props, state) {
  var list = props.list || [];

  // Create rows.
  var rows = list.map(function (player) {
    return dom(ListItem, { player: player });
  });

  // Return rows.
  return dom(
    "div",
    null,
    rows
  );
};

},{"../lib/deku/index.js":6,"../list-item/index.js":7}],9:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

/** @jsx dom */

/**
 * Module dependencies.
 */

var _libDekuIndexJs = require("../lib/deku/index.js");

var component = _libDekuIndexJs.component;
var dom = _libDekuIndexJs.dom;

var Button = _interopRequire(require("../button/index.js"));

var Input = _interopRequire(require("../input/index.js"));

/**
 * Constants.
 */

var request = require("superagent");

/**
 * Define `Player`.
 */

var Player = component();

/**
 * Expose `Player`.
 */

module.exports = Player;

/**
 * Create player.
 */

Player.prototype.create = function (player) {
  var url = "/api/user";
  request.post(url).send({ player: player }).end(function (err, res) {
    window.location.reload();
  });
};

/**
 * Render `Player`.
 */

Player.prototype.render = function (props, state) {
  var self = this;
  var player = { name: "", gif: "" };

  // Get input value.
  function value(value, name) {
    if (name === "player") player.name = value;
    if (name === "gif") player.gif = value;
  }

  // Create player.
  function create() {
    if (player.name.length === 0) {
      return console.log("Username must not be blank");
    }self.create(player);
  }

  return dom(
    "div",
    null,
    dom(
      "div",
      { "class": "col-xs-5" },
      dom(Input, { name: "player", placeholder: "new username", onValid: value })
    ),
    dom(
      "div",
      { "class": "col-xs-5" },
      dom(Input, { name: "gif", placeholder: "your gif", onValid: value })
    ),
    dom(
      "div",
      { "class": "col-xs-2" },
      dom(
        "span",
        { "class": "btn btn-success", onClick: create, style: "width: 100%" },
        "ADD"
      )
    )
  );
};

},{"../button/index.js":2,"../input/index.js":5,"../lib/deku/index.js":6,"superagent":11}],10:[function(require,module,exports){
/** @jsx dom */

/**
 * Module dependencies.
 */

"use strict";

var _libDekuIndexJs = require("../lib/deku/index.js");

var component = _libDekuIndexJs.component;
var dom = _libDekuIndexJs.dom;

/**
 * Define `SelectList`.
 */

var SelectList = component().prop("label", { type: "string" }).prop("list", { type: "array" }).prop("onChange", { type: "function" });

/**
 * Expose `SelectList`.
 */

module.exports = SelectList;

/**
 * Render `SelectList`.
 */

SelectList.prototype.render = function (props, state) {
  var label = props.label;
  var list = props.list;

  // On change.
  function onChange(e) {
    var value = e.target.value;
    if (props.onChange) props.onChange(value, label);
  }

  // Get players.
  var rows = list.map(function (player) {
    return dom(
      "option",
      { value: player.name },
      player.name
    );
  });

  return dom(
    "select",
    { value: "", onChange: onChange, "class": "borderless", style: "border: none; width: 100%; -webkit-appearance: none; -moz-appearance: none; appearance: none" },
    dom(
      "option",
      { selected: true },
      label
    ),
    rows
  );
};

},{"../lib/deku/index.js":6}],11:[function(require,module,exports){
/**
 * Module dependencies.
 */

var Emitter = require('emitter');
var reduce = require('reduce');
var requestBase = require('./request-base');
var isObject = require('./is-object');

/**
 * Root reference for iframes.
 */

var root;
if (typeof window !== 'undefined') { // Browser window
  root = window;
} else if (typeof self !== 'undefined') { // Web Worker
  root = self;
} else { // Other environments
  root = this;
}

/**
 * Noop.
 */

function noop(){};

/**
 * Check if `obj` is a host object,
 * we don't want to serialize these :)
 *
 * TODO: future proof, move to compoent land
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */

function isHost(obj) {
  var str = {}.toString.call(obj);

  switch (str) {
    case '[object File]':
    case '[object Blob]':
    case '[object FormData]':
      return true;
    default:
      return false;
  }
}

/**
 * Expose `request`.
 */

var request = module.exports = require('./request').bind(null, Request);

/**
 * Determine XHR.
 */

request.getXHR = function () {
  if (root.XMLHttpRequest
      && (!root.location || 'file:' != root.location.protocol
          || !root.ActiveXObject)) {
    return new XMLHttpRequest;
  } else {
    try { return new ActiveXObject('Microsoft.XMLHTTP'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP.6.0'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP.3.0'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP'); } catch(e) {}
  }
  return false;
};

/**
 * Removes leading and trailing whitespace, added to support IE.
 *
 * @param {String} s
 * @return {String}
 * @api private
 */

var trim = ''.trim
  ? function(s) { return s.trim(); }
  : function(s) { return s.replace(/(^\s*|\s*$)/g, ''); };

/**
 * Serialize the given `obj`.
 *
 * @param {Object} obj
 * @return {String}
 * @api private
 */

function serialize(obj) {
  if (!isObject(obj)) return obj;
  var pairs = [];
  for (var key in obj) {
    if (null != obj[key]) {
      pushEncodedKeyValuePair(pairs, key, obj[key]);
        }
      }
  return pairs.join('&');
}

/**
 * Helps 'serialize' with serializing arrays.
 * Mutates the pairs array.
 *
 * @param {Array} pairs
 * @param {String} key
 * @param {Mixed} val
 */

function pushEncodedKeyValuePair(pairs, key, val) {
  if (Array.isArray(val)) {
    return val.forEach(function(v) {
      pushEncodedKeyValuePair(pairs, key, v);
    });
  }
  pairs.push(encodeURIComponent(key)
    + '=' + encodeURIComponent(val));
}

/**
 * Expose serialization method.
 */

 request.serializeObject = serialize;

 /**
  * Parse the given x-www-form-urlencoded `str`.
  *
  * @param {String} str
  * @return {Object}
  * @api private
  */

function parseString(str) {
  var obj = {};
  var pairs = str.split('&');
  var parts;
  var pair;

  for (var i = 0, len = pairs.length; i < len; ++i) {
    pair = pairs[i];
    parts = pair.split('=');
    obj[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
  }

  return obj;
}

/**
 * Expose parser.
 */

request.parseString = parseString;

/**
 * Default MIME type map.
 *
 *     superagent.types.xml = 'application/xml';
 *
 */

request.types = {
  html: 'text/html',
  json: 'application/json',
  xml: 'application/xml',
  urlencoded: 'application/x-www-form-urlencoded',
  'form': 'application/x-www-form-urlencoded',
  'form-data': 'application/x-www-form-urlencoded'
};

/**
 * Default serialization map.
 *
 *     superagent.serialize['application/xml'] = function(obj){
 *       return 'generated xml here';
 *     };
 *
 */

 request.serialize = {
   'application/x-www-form-urlencoded': serialize,
   'application/json': JSON.stringify
 };

 /**
  * Default parsers.
  *
  *     superagent.parse['application/xml'] = function(str){
  *       return { object parsed from str };
  *     };
  *
  */

request.parse = {
  'application/x-www-form-urlencoded': parseString,
  'application/json': JSON.parse
};

/**
 * Parse the given header `str` into
 * an object containing the mapped fields.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function parseHeader(str) {
  var lines = str.split(/\r?\n/);
  var fields = {};
  var index;
  var line;
  var field;
  var val;

  lines.pop(); // trailing CRLF

  for (var i = 0, len = lines.length; i < len; ++i) {
    line = lines[i];
    index = line.indexOf(':');
    field = line.slice(0, index).toLowerCase();
    val = trim(line.slice(index + 1));
    fields[field] = val;
  }

  return fields;
}

/**
 * Check if `mime` is json or has +json structured syntax suffix.
 *
 * @param {String} mime
 * @return {Boolean}
 * @api private
 */

function isJSON(mime) {
  return /[\/+]json\b/.test(mime);
}

/**
 * Return the mime type for the given `str`.
 *
 * @param {String} str
 * @return {String}
 * @api private
 */

function type(str){
  return str.split(/ *; */).shift();
};

/**
 * Return header field parameters.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function params(str){
  return reduce(str.split(/ *; */), function(obj, str){
    var parts = str.split(/ *= */)
      , key = parts.shift()
      , val = parts.shift();

    if (key && val) obj[key] = val;
    return obj;
  }, {});
};

/**
 * Initialize a new `Response` with the given `xhr`.
 *
 *  - set flags (.ok, .error, etc)
 *  - parse header
 *
 * Examples:
 *
 *  Aliasing `superagent` as `request` is nice:
 *
 *      request = superagent;
 *
 *  We can use the promise-like API, or pass callbacks:
 *
 *      request.get('/').end(function(res){});
 *      request.get('/', function(res){});
 *
 *  Sending data can be chained:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' })
 *        .end(function(res){});
 *
 *  Or passed to `.send()`:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' }, function(res){});
 *
 *  Or passed to `.post()`:
 *
 *      request
 *        .post('/user', { name: 'tj' })
 *        .end(function(res){});
 *
 * Or further reduced to a single call for simple cases:
 *
 *      request
 *        .post('/user', { name: 'tj' }, function(res){});
 *
 * @param {XMLHTTPRequest} xhr
 * @param {Object} options
 * @api private
 */

function Response(req, options) {
  options = options || {};
  this.req = req;
  this.xhr = this.req.xhr;
  // responseText is accessible only if responseType is '' or 'text' and on older browsers
  this.text = ((this.req.method !='HEAD' && (this.xhr.responseType === '' || this.xhr.responseType === 'text')) || typeof this.xhr.responseType === 'undefined')
     ? this.xhr.responseText
     : null;
  this.statusText = this.req.xhr.statusText;
  this.setStatusProperties(this.xhr.status);
  this.header = this.headers = parseHeader(this.xhr.getAllResponseHeaders());
  // getAllResponseHeaders sometimes falsely returns "" for CORS requests, but
  // getResponseHeader still works. so we get content-type even if getting
  // other headers fails.
  this.header['content-type'] = this.xhr.getResponseHeader('content-type');
  this.setHeaderProperties(this.header);
  this.body = this.req.method != 'HEAD'
    ? this.parseBody(this.text ? this.text : this.xhr.response)
    : null;
}

/**
 * Get case-insensitive `field` value.
 *
 * @param {String} field
 * @return {String}
 * @api public
 */

Response.prototype.get = function(field){
  return this.header[field.toLowerCase()];
};

/**
 * Set header related properties:
 *
 *   - `.type` the content type without params
 *
 * A response of "Content-Type: text/plain; charset=utf-8"
 * will provide you with a `.type` of "text/plain".
 *
 * @param {Object} header
 * @api private
 */

Response.prototype.setHeaderProperties = function(header){
  // content-type
  var ct = this.header['content-type'] || '';
  this.type = type(ct);

  // params
  var obj = params(ct);
  for (var key in obj) this[key] = obj[key];
};

/**
 * Parse the given body `str`.
 *
 * Used for auto-parsing of bodies. Parsers
 * are defined on the `superagent.parse` object.
 *
 * @param {String} str
 * @return {Mixed}
 * @api private
 */

Response.prototype.parseBody = function(str){
  var parse = request.parse[this.type];
  if (!parse && isJSON(this.type)) {
    parse = request.parse['application/json'];
  }
  return parse && str && (str.length || str instanceof Object)
    ? parse(str)
    : null;
};

/**
 * Set flags such as `.ok` based on `status`.
 *
 * For example a 2xx response will give you a `.ok` of __true__
 * whereas 5xx will be __false__ and `.error` will be __true__. The
 * `.clientError` and `.serverError` are also available to be more
 * specific, and `.statusType` is the class of error ranging from 1..5
 * sometimes useful for mapping respond colors etc.
 *
 * "sugar" properties are also defined for common cases. Currently providing:
 *
 *   - .noContent
 *   - .badRequest
 *   - .unauthorized
 *   - .notAcceptable
 *   - .notFound
 *
 * @param {Number} status
 * @api private
 */

Response.prototype.setStatusProperties = function(status){
  // handle IE9 bug: http://stackoverflow.com/questions/10046972/msie-returns-status-code-of-1223-for-ajax-request
  if (status === 1223) {
    status = 204;
  }

  var type = status / 100 | 0;

  // status / class
  this.status = this.statusCode = status;
  this.statusType = type;

  // basics
  this.info = 1 == type;
  this.ok = 2 == type;
  this.clientError = 4 == type;
  this.serverError = 5 == type;
  this.error = (4 == type || 5 == type)
    ? this.toError()
    : false;

  // sugar
  this.accepted = 202 == status;
  this.noContent = 204 == status;
  this.badRequest = 400 == status;
  this.unauthorized = 401 == status;
  this.notAcceptable = 406 == status;
  this.notFound = 404 == status;
  this.forbidden = 403 == status;
};

/**
 * Return an `Error` representative of this response.
 *
 * @return {Error}
 * @api public
 */

Response.prototype.toError = function(){
  var req = this.req;
  var method = req.method;
  var url = req.url;

  var msg = 'cannot ' + method + ' ' + url + ' (' + this.status + ')';
  var err = new Error(msg);
  err.status = this.status;
  err.method = method;
  err.url = url;

  return err;
};

/**
 * Expose `Response`.
 */

request.Response = Response;

/**
 * Initialize a new `Request` with the given `method` and `url`.
 *
 * @param {String} method
 * @param {String} url
 * @api public
 */

function Request(method, url) {
  var self = this;
  this._query = this._query || [];
  this.method = method;
  this.url = url;
  this.header = {}; // preserves header name case
  this._header = {}; // coerces header names to lowercase
  this.on('end', function(){
    var err = null;
    var res = null;

    try {
      res = new Response(self);
    } catch(e) {
      err = new Error('Parser is unable to parse the response');
      err.parse = true;
      err.original = e;
      // issue #675: return the raw response if the response parsing fails
      err.rawResponse = self.xhr && self.xhr.responseText ? self.xhr.responseText : null;
      // issue #876: return the http status code if the response parsing fails
      err.statusCode = self.xhr && self.xhr.status ? self.xhr.status : null;
      return self.callback(err);
    }

    self.emit('response', res);

    if (err) {
      return self.callback(err, res);
    }

    if (res.status >= 200 && res.status < 300) {
      return self.callback(err, res);
    }

    var new_err = new Error(res.statusText || 'Unsuccessful HTTP response');
    new_err.original = err;
    new_err.response = res;
    new_err.status = res.status;

    self.callback(new_err, res);
  });
}

/**
 * Mixin `Emitter` and `requestBase`.
 */

Emitter(Request.prototype);
for (var key in requestBase) {
  Request.prototype[key] = requestBase[key];
}

/**
 * Abort the request, and clear potential timeout.
 *
 * @return {Request}
 * @api public
 */

Request.prototype.abort = function(){
  if (this.aborted) return;
  this.aborted = true;
  this.xhr && this.xhr.abort();
  this.clearTimeout();
  this.emit('abort');
  return this;
};

/**
 * Set Content-Type to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.xml = 'application/xml';
 *
 *      request.post('/')
 *        .type('xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 *      request.post('/')
 *        .type('application/xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 * @param {String} type
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.type = function(type){
  this.set('Content-Type', request.types[type] || type);
  return this;
};

/**
 * Set responseType to `val`. Presently valid responseTypes are 'blob' and 
 * 'arraybuffer'.
 *
 * Examples:
 *
 *      req.get('/')
 *        .responseType('blob')
 *        .end(callback);
 *
 * @param {String} val
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.responseType = function(val){
  this._responseType = val;
  return this;
};

/**
 * Set Accept to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.json = 'application/json';
 *
 *      request.get('/agent')
 *        .accept('json')
 *        .end(callback);
 *
 *      request.get('/agent')
 *        .accept('application/json')
 *        .end(callback);
 *
 * @param {String} accept
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.accept = function(type){
  this.set('Accept', request.types[type] || type);
  return this;
};

/**
 * Set Authorization field value with `user` and `pass`.
 *
 * @param {String} user
 * @param {String} pass
 * @param {Object} options with 'type' property 'auto' or 'basic' (default 'basic')
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.auth = function(user, pass, options){
  if (!options) {
    options = {
      type: 'basic'
    }
  }

  switch (options.type) {
    case 'basic':
      var str = btoa(user + ':' + pass);
      this.set('Authorization', 'Basic ' + str);
    break;

    case 'auto':
      this.username = user;
      this.password = pass;
    break;
  }
  return this;
};

/**
* Add query-string `val`.
*
* Examples:
*
*   request.get('/shoes')
*     .query('size=10')
*     .query({ color: 'blue' })
*
* @param {Object|String} val
* @return {Request} for chaining
* @api public
*/

Request.prototype.query = function(val){
  if ('string' != typeof val) val = serialize(val);
  if (val) this._query.push(val);
  return this;
};

/**
 * Queue the given `file` as an attachment to the specified `field`,
 * with optional `filename`.
 *
 * ``` js
 * request.post('/upload')
 *   .attach(new Blob(['<a id="a"><b id="b">hey!</b></a>'], { type: "text/html"}))
 *   .end(callback);
 * ```
 *
 * @param {String} field
 * @param {Blob|File} file
 * @param {String} filename
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.attach = function(field, file, filename){
  this._getFormData().append(field, file, filename || file.name);
  return this;
};

Request.prototype._getFormData = function(){
  if (!this._formData) {
    this._formData = new root.FormData();
  }
  return this._formData;
};

/**
 * Send `data` as the request body, defaulting the `.type()` to "json" when
 * an object is given.
 *
 * Examples:
 *
 *       // manual json
 *       request.post('/user')
 *         .type('json')
 *         .send('{"name":"tj"}')
 *         .end(callback)
 *
 *       // auto json
 *       request.post('/user')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // manual x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send('name=tj')
 *         .end(callback)
 *
 *       // auto x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // defaults to x-www-form-urlencoded
  *      request.post('/user')
  *        .send('name=tobi')
  *        .send('species=ferret')
  *        .end(callback)
 *
 * @param {String|Object} data
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.send = function(data){
  var obj = isObject(data);
  var type = this._header['content-type'];

  // merge
  if (obj && isObject(this._data)) {
    for (var key in data) {
      this._data[key] = data[key];
    }
  } else if ('string' == typeof data) {
    if (!type) this.type('form');
    type = this._header['content-type'];
    if ('application/x-www-form-urlencoded' == type) {
      this._data = this._data
        ? this._data + '&' + data
        : data;
    } else {
      this._data = (this._data || '') + data;
    }
  } else {
    this._data = data;
  }

  if (!obj || isHost(data)) return this;
  if (!type) this.type('json');
  return this;
};

/**
 * @deprecated
 */
Response.prototype.parse = function serialize(fn){
  if (root.console) {
    console.warn("Client-side parse() method has been renamed to serialize(). This method is not compatible with superagent v2.0");
  }
  this.serialize(fn);
  return this;
};

Response.prototype.serialize = function serialize(fn){
  this._parser = fn;
  return this;
};

/**
 * Invoke the callback with `err` and `res`
 * and handle arity check.
 *
 * @param {Error} err
 * @param {Response} res
 * @api private
 */

Request.prototype.callback = function(err, res){
  var fn = this._callback;
  this.clearTimeout();
  fn(err, res);
};

/**
 * Invoke callback with x-domain error.
 *
 * @api private
 */

Request.prototype.crossDomainError = function(){
  var err = new Error('Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.');
  err.crossDomain = true;

  err.status = this.status;
  err.method = this.method;
  err.url = this.url;

  this.callback(err);
};

/**
 * Invoke callback with timeout error.
 *
 * @api private
 */

Request.prototype.timeoutError = function(){
  var timeout = this._timeout;
  var err = new Error('timeout of ' + timeout + 'ms exceeded');
  err.timeout = timeout;
  this.callback(err);
};

/**
 * Enable transmission of cookies with x-domain requests.
 *
 * Note that for this to work the origin must not be
 * using "Access-Control-Allow-Origin" with a wildcard,
 * and also must set "Access-Control-Allow-Credentials"
 * to "true".
 *
 * @api public
 */

Request.prototype.withCredentials = function(){
  this._withCredentials = true;
  return this;
};

/**
 * Initiate request, invoking callback `fn(res)`
 * with an instanceof `Response`.
 *
 * @param {Function} fn
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.end = function(fn){
  var self = this;
  var xhr = this.xhr = request.getXHR();
  var query = this._query.join('&');
  var timeout = this._timeout;
  var data = this._formData || this._data;

  // store callback
  this._callback = fn || noop;

  // state change
  xhr.onreadystatechange = function(){
    if (4 != xhr.readyState) return;

    // In IE9, reads to any property (e.g. status) off of an aborted XHR will
    // result in the error "Could not complete the operation due to error c00c023f"
    var status;
    try { status = xhr.status } catch(e) { status = 0; }

    if (0 == status) {
      if (self.timedout) return self.timeoutError();
      if (self.aborted) return;
      return self.crossDomainError();
    }
    self.emit('end');
  };

  // progress
  var handleProgress = function(e){
    if (e.total > 0) {
      e.percent = e.loaded / e.total * 100;
    }
    e.direction = 'download';
    self.emit('progress', e);
  };
  if (this.hasListeners('progress')) {
    xhr.onprogress = handleProgress;
  }
  try {
    if (xhr.upload && this.hasListeners('progress')) {
      xhr.upload.onprogress = handleProgress;
    }
  } catch(e) {
    // Accessing xhr.upload fails in IE from a web worker, so just pretend it doesn't exist.
    // Reported here:
    // https://connect.microsoft.com/IE/feedback/details/837245/xmlhttprequest-upload-throws-invalid-argument-when-used-from-web-worker-context
  }

  // timeout
  if (timeout && !this._timer) {
    this._timer = setTimeout(function(){
      self.timedout = true;
      self.abort();
    }, timeout);
  }

  // querystring
  if (query) {
    query = request.serializeObject(query);
    this.url += ~this.url.indexOf('?')
      ? '&' + query
      : '?' + query;
  }

  // initiate request
  if (this.username && this.password) {
    xhr.open(this.method, this.url, true, this.username, this.password);
  } else {
    xhr.open(this.method, this.url, true);
  }

  // CORS
  if (this._withCredentials) xhr.withCredentials = true;

  // body
  if ('GET' != this.method && 'HEAD' != this.method && 'string' != typeof data && !isHost(data)) {
    // serialize stuff
    var contentType = this._header['content-type'];
    var serialize = this._parser || request.serialize[contentType ? contentType.split(';')[0] : ''];
    if (!serialize && isJSON(contentType)) serialize = request.serialize['application/json'];
    if (serialize) data = serialize(data);
  }

  // set header fields
  for (var field in this.header) {
    if (null == this.header[field]) continue;
    xhr.setRequestHeader(field, this.header[field]);
  }

  if (this._responseType) {
    xhr.responseType = this._responseType;
  }

  // send stuff
  this.emit('request', this);

  // IE11 xhr.send(undefined) sends 'undefined' string as POST payload (instead of nothing)
  // We need null here if data is undefined
  xhr.send(typeof data !== 'undefined' ? data : null);
  return this;
};


/**
 * Expose `Request`.
 */

request.Request = Request;

/**
 * GET `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} data or fn
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.get = function(url, data, fn){
  var req = request('GET', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.query(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * HEAD `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} data or fn
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.head = function(url, data, fn){
  var req = request('HEAD', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * DELETE `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

function del(url, fn){
  var req = request('DELETE', url);
  if (fn) req.end(fn);
  return req;
};

request['del'] = del;
request['delete'] = del;

/**
 * PATCH `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} data
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.patch = function(url, data, fn){
  var req = request('PATCH', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * POST `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} data
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.post = function(url, data, fn){
  var req = request('POST', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * PUT `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} data or fn
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.put = function(url, data, fn){
  var req = request('PUT', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

},{"./is-object":12,"./request":14,"./request-base":13,"emitter":15,"reduce":16}],12:[function(require,module,exports){
/**
 * Check if `obj` is an object.
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */

function isObject(obj) {
  return null != obj && 'object' == typeof obj;
}

module.exports = isObject;

},{}],13:[function(require,module,exports){
/**
 * Module of mixed-in functions shared between node and client code
 */
var isObject = require('./is-object');

/**
 * Clear previous timeout.
 *
 * @return {Request} for chaining
 * @api public
 */

exports.clearTimeout = function _clearTimeout(){
  this._timeout = 0;
  clearTimeout(this._timer);
  return this;
};

/**
 * Force given parser
 *
 * Sets the body parser no matter type.
 *
 * @param {Function}
 * @api public
 */

exports.parse = function parse(fn){
  this._parser = fn;
  return this;
};

/**
 * Set timeout to `ms`.
 *
 * @param {Number} ms
 * @return {Request} for chaining
 * @api public
 */

exports.timeout = function timeout(ms){
  this._timeout = ms;
  return this;
};

/**
 * Faux promise support
 *
 * @param {Function} fulfill
 * @param {Function} reject
 * @return {Request}
 */

exports.then = function then(fulfill, reject) {
  return this.end(function(err, res) {
    err ? reject(err) : fulfill(res);
  });
}

/**
 * Allow for extension
 */

exports.use = function use(fn) {
  fn(this);
  return this;
}


/**
 * Get request header `field`.
 * Case-insensitive.
 *
 * @param {String} field
 * @return {String}
 * @api public
 */

exports.get = function(field){
  return this._header[field.toLowerCase()];
};

/**
 * Get case-insensitive header `field` value.
 * This is a deprecated internal API. Use `.get(field)` instead.
 *
 * (getHeader is no longer used internally by the superagent code base)
 *
 * @param {String} field
 * @return {String}
 * @api private
 * @deprecated
 */

exports.getHeader = exports.get;

/**
 * Set header `field` to `val`, or multiple fields with one object.
 * Case-insensitive.
 *
 * Examples:
 *
 *      req.get('/')
 *        .set('Accept', 'application/json')
 *        .set('X-API-Key', 'foobar')
 *        .end(callback);
 *
 *      req.get('/')
 *        .set({ Accept: 'application/json', 'X-API-Key': 'foobar' })
 *        .end(callback);
 *
 * @param {String|Object} field
 * @param {String} val
 * @return {Request} for chaining
 * @api public
 */

exports.set = function(field, val){
  if (isObject(field)) {
    for (var key in field) {
      this.set(key, field[key]);
    }
    return this;
  }
  this._header[field.toLowerCase()] = val;
  this.header[field] = val;
  return this;
};

/**
 * Remove header `field`.
 * Case-insensitive.
 *
 * Example:
 *
 *      req.get('/')
 *        .unset('User-Agent')
 *        .end(callback);
 *
 * @param {String} field
 */
exports.unset = function(field){
  delete this._header[field.toLowerCase()];
  delete this.header[field];
  return this;
};

/**
 * Write the field `name` and `val` for "multipart/form-data"
 * request bodies.
 *
 * ``` js
 * request.post('/upload')
 *   .field('foo', 'bar')
 *   .end(callback);
 * ```
 *
 * @param {String} name
 * @param {String|Blob|File|Buffer|fs.ReadStream} val
 * @return {Request} for chaining
 * @api public
 */
exports.field = function(name, val) {
  this._getFormData().append(name, val);
  return this;
};

},{"./is-object":12}],14:[function(require,module,exports){
// The node and browser modules expose versions of this with the
// appropriate constructor function bound as first argument
/**
 * Issue a request:
 *
 * Examples:
 *
 *    request('GET', '/users').end(callback)
 *    request('/users').end(callback)
 *    request('/users', callback)
 *
 * @param {String} method
 * @param {String|Function} url or callback
 * @return {Request}
 * @api public
 */

function request(RequestConstructor, method, url) {
  // callback
  if ('function' == typeof url) {
    return new RequestConstructor('GET', method).end(url);
  }

  // url first
  if (2 == arguments.length) {
    return new RequestConstructor('GET', method);
  }

  return new RequestConstructor(method, url);
}

module.exports = request;

},{}],15:[function(require,module,exports){

/**
 * Expose `Emitter`.
 */

if (typeof module !== 'undefined') {
  module.exports = Emitter;
}

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks['$' + event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};

},{}],16:[function(require,module,exports){

/**
 * Reduce `arr` with `fn`.
 *
 * @param {Array} arr
 * @param {Function} fn
 * @param {Mixed} initial
 *
 * TODO: combatible error handling?
 */

module.exports = function(arr, fn, initial){  
  var idx = 0;
  var len = arr.length;
  var curr = arguments.length == 3
    ? initial
    : arr[idx++];

  while (idx < len) {
    curr = fn.call(null, curr, arr[idx], ++idx, arr);
  }
  
  return curr;
};
},{}]},{},[4]);
