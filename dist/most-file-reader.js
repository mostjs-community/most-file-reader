(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('@most/most-file-reader', ['exports', 'most', '@most/prelude'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('most'), require('@most/prelude'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.most, global.prelude);
    global.mostMostFileReader = mod.exports;
  }
})(this, function (exports, _most, _prelude) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.readAsText = exports.readAsArrayBuffer = exports.readAsDataURL = exports.fileReader = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var FileReaderSink = function () {
    function FileReaderSink(method, sink) {
      _classCallCheck(this, FileReaderSink);

      this.method = method;
      this.sink = sink;
    }

    _createClass(FileReaderSink, [{
      key: 'eventi',
      value: function eventi(time, value) {
        var sink = this.sink;
        var method = this.method;
        var reader = new FileReader();

        reader.addEventListener('load', sink.event.bind(sink, time), false);
        reader[method](value);
      }
    }, {
      key: 'error',
      value: function error(time, err) {
        return this.sink.error(time, err);
      }
    }, {
      key: 'end',
      value: function end(time, value) {
        return this.sink.end(time, value);
      }
    }]);

    return FileReaderSink;
  }();

  var FileReaderSource = function () {
    function FileReaderSource(method, stream) {
      _classCallCheck(this, FileReaderSource);

      this.method = method;
      this.source = stream.source;
    }

    _createClass(FileReaderSource, [{
      key: 'run',
      value: function run(sink, scheduler) {
        return this.source.run(new FileReaderSink(this.method, sink), scheduler);
      }
    }]);

    return FileReaderSource;
  }();

  var fileReader = (0, _prelude.curry2)(function (method, stream) {
    return new _most.Stream(new FileReaderSource(method, stream));
  });
  var readAsDataURL = fileReader('readAsDataURL');
  var readAsArrayBuffer = fileReader('readAsArrayBuffer');
  var readAsText = fileReader('readAsText');

  exports.fileReader = fileReader;
  exports.readAsDataURL = readAsDataURL;
  exports.readAsArrayBuffer = readAsArrayBuffer;
  exports.readAsText = readAsText;
});
