function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var path = _interopDefault(require('path'));
var loaderUtils = _interopDefault(require('loader-utils'));
var slash = _interopDefault(require('slash'));

/**
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
var comlinkLoaderSpecificOptions = ['multiple', 'multi', // @todo: remove these
'singleton'];
function loader() {}

loader.pitch = function (request) {
  var options = loaderUtils.getOptions(this) || {};
  var singleton = options.singleton;
  var workerLoaderOptions = {};

  for (var i in options) {
    if (comlinkLoaderSpecificOptions.indexOf(i) === -1) {
      workerLoaderOptions[i] = options[i];
    }
  }

  var workerLoader = "!worker-loader?" + (JSON.stringify(workerLoaderOptions)) + "!" + (slash(path.resolve(__dirname, 'comlink-worker-loader.js')));
  var remainingRequest = JSON.stringify(workerLoader + '!' + request); // ?singleton mode: export an instance of the worker

  if (singleton === true) {
    return ("\n      module.exports = require('comlink').wrap(require(" + remainingRequest + ")());\n      " + (options.module === false ? '' : 'module.exports.__esModule = true;') + "\n    ").replace(/\n\s*/g, '');
  } // ?singleton=false mode: always return a new worker from the factory


  if (singleton === false) {
    return ("\n      module.exports = function () {\n        return require('comlink').wrap(require(" + remainingRequest + ")());\n      };\n    ").replace(/\n\s*/g, '');
  }

  return ("\n    var wrap = require('comlink').wrap,\n        Worker = require(" + remainingRequest + "),\n        inst;\n    module.exports = function f() {\n      if (this instanceof f) return wrap(Worker());\n      return inst || (inst = wrap(Worker()));\n    };\n  ").replace(/\n\s*/g, '');
};

module.exports = loader;
//# sourceMappingURL=comlink-loader.js.map
