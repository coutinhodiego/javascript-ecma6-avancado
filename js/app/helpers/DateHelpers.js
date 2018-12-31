'use strict';

System.register([], function (_export, _context) {
  "use strict";

  var _createClass, DateHelper;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _createClass = function () {
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

      _export('DateHelper', DateHelper = function () {
        function DateHelper() {
          _classCallCheck(this, DateHelper);

          throw new Error('Esta classe não pode ser instanciada.');
        }

        _createClass(DateHelper, null, [{
          key: 'dateToText',
          value: function dateToText(data) {
            return data.getDate() + '/' + (data.getMonth() + 1) + '/' + data.getFullYear();
          }
        }, {
          key: 'textToDate',
          value: function textToDate(text) {

            if (!/^\d{4}-\d{2}-\d{2}$/.test(text)) {
              throw new Error('Nescessario o formato yyyy-mm-dd');
            }
            return new Date(text.split('-'));
          }
        }]);

        return DateHelper;
      }());

      _export('DateHelper', DateHelper);
    }
  };
});
//# sourceMappingURL=DateHelpers.js.map