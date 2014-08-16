#sandal-autowire

[![Build Status](https://travis-ci.org/marcusberner/sandal-autowire.png?branch=master)](https://travis-ci.org/marcusberner/sandal-autowire)


Sandal-autowire extends the [sandal](https://github.com/marcusberner/sandal) (2.3.0+) dependency injection framework. It enables you to register all components in a folder. It is only compatible with node.js (No browser support).

## Installation

    $ npm install sandal-autowire

## Usage

Sandal-autowire will extend the container with an `.autowire(path)` function. The autowire function will require all .js and .json files in the provided directory recursively and register them in the container.

### Examples
```js
var Sandal = require('sandal').extend(require('sandal-autowire'));
var sandal = new Sandal();
sandal.autowire(path);

// or

var Sandal = require('sandal');
var sandal = new Sandal();
sandal.extend(require('sandal-autowire'));
sandal.autowire(path);
```

The behavior of each component can be controlled by adding configurations in a property named `autowire`. All configurations have default behaviors. Thus an autowire property is not required.

### Example
```js
module.exports.autowire = {
    type: 'service',
    name: 'myName',
    dependencies: ['dep1', 'dep2'],
    transient: true,
    groups: ['myGroup']
}
```

### Parameters
 * `type` - Resolve behavior. Valid options are 'object', 'service' and 'factory'. If not provided, functions will be registered as factories and non-functions will be registered as objects.
 * `name` - Name used for registering the component. Filename without extension is used if no name is provided. 
 * `dependencies` - Names of dependencies to inject. Names of arguments will be used if not provided.
 * `transient` - If set to true, component will have transient lifecycle. Default is singleton.
 * `groups` - Groups to add the component to.
 * `ignore` - If set to true, the component will not be registered.

