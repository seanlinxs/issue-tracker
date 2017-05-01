'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var contentNode = document.getElementById('contents');

var IssueFilter = function (_React$Component) {
  _inherits(IssueFilter, _React$Component);

  function IssueFilter() {
    _classCallCheck(this, IssueFilter);

    return _possibleConstructorReturn(this, (IssueFilter.__proto__ || Object.getPrototypeOf(IssueFilter)).apply(this, arguments));
  }

  _createClass(IssueFilter, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        'This is a placeholder for the Issue Filter.'
      );
    }
  }]);

  return IssueFilter;
}(React.Component);

var IssueTable = function (_React$Component2) {
  _inherits(IssueTable, _React$Component2);

  function IssueTable() {
    _classCallCheck(this, IssueTable);

    return _possibleConstructorReturn(this, (IssueTable.__proto__ || Object.getPrototypeOf(IssueTable)).apply(this, arguments));
  }

  _createClass(IssueTable, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        'This is a placeholder for a table of issues.'
      );
    }
  }]);

  return IssueTable;
}(React.Component);

var IssueAdd = function (_React$Component3) {
  _inherits(IssueAdd, _React$Component3);

  function IssueAdd() {
    _classCallCheck(this, IssueAdd);

    return _possibleConstructorReturn(this, (IssueAdd.__proto__ || Object.getPrototypeOf(IssueAdd)).apply(this, arguments));
  }

  _createClass(IssueAdd, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        'This is a placeholder for an Issue Add entry form.'
      );
    }
  }]);

  return IssueAdd;
}(React.Component);

var IssueList = function (_React$Component4) {
  _inherits(IssueList, _React$Component4);

  function IssueList() {
    _classCallCheck(this, IssueList);

    return _possibleConstructorReturn(this, (IssueList.__proto__ || Object.getPrototypeOf(IssueList)).apply(this, arguments));
  }

  _createClass(IssueList, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'h1',
          null,
          'Issue Tracker'
        ),
        React.createElement(IssueFilter, null),
        React.createElement('hr', null),
        React.createElement(IssueTable, null),
        React.createElement('hr', null),
        React.createElement(IssueAdd, null)
      );
    }
  }]);

  return IssueList;
}(React.Component);

ReactDOM.render(React.createElement(IssueList, null), contentNode);