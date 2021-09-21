'use strict';

var _tape = require('tape');

var _tape2 = _interopRequireDefault(_tape);

var _immutable = require('immutable');

var _aggregations = require('../aggregations');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _tape2.default)('min', function (test) {
  test.plan(3);

  test.equals((0, _immutable.fromJS)([]).update((0, _aggregations.min)()), undefined, 'min works on no items');

  test.equals((0, _immutable.fromJS)([2]).update((0, _aggregations.min)()), 2, 'min works on single item');

  test.equals((0, _immutable.fromJS)([2, 2, 8]).update((0, _aggregations.min)()), 2, 'min works on lots of items');
});

(0, _tape2.default)('minBy', function (test) {
  test.plan(3);

  test.equals((0, _immutable.fromJS)([]).update((0, _aggregations.minBy)(function (ii) {
    return ii.get('n');
  })), undefined, 'minBy works on no items');

  test.equals((0, _immutable.fromJS)([{ n: 2 }]).update((0, _aggregations.minBy)(function (ii) {
    return ii.get('n');
  })), 2, 'minBy works on single item');

  test.equals((0, _immutable.fromJS)([{ n: 2 }, { n: 2 }, { n: 8 }]).update((0, _aggregations.minBy)(function (ii) {
    return ii.get('n');
  })), 2, 'minBy works on lots of items');
});

(0, _tape2.default)('max', function (test) {
  test.plan(3);

  test.equals((0, _immutable.fromJS)([]).update((0, _aggregations.max)()), undefined, 'max works on no items');

  test.equals((0, _immutable.fromJS)([2]).update((0, _aggregations.max)()), 2, 'max works on single item');

  test.equals((0, _immutable.fromJS)([2, 2, 8]).update((0, _aggregations.max)()), 8, 'max works on lots of items');
});

(0, _tape2.default)('maxBy', function (test) {
  test.plan(3);

  test.equals((0, _immutable.fromJS)([]).update((0, _aggregations.maxBy)(function (ii) {
    return ii.get('n');
  })), undefined, 'maxBy works on no items');

  test.equals((0, _immutable.fromJS)([{ n: 2 }]).update((0, _aggregations.maxBy)(function (ii) {
    return ii.get('n');
  })), 2, 'maxBy works on single item');

  test.equals((0, _immutable.fromJS)([{ n: 2 }, { n: 2 }, { n: 8 }]).update((0, _aggregations.maxBy)(function (ii) {
    return ii.get('n');
  })), 8, 'maxBy works on lots of items');
});

(0, _tape2.default)('average', function (test) {
  test.plan(3);

  test.equals((0, _immutable.fromJS)([]).update((0, _aggregations.average)()), undefined, 'average works on no items');

  test.equals((0, _immutable.fromJS)([2]).update((0, _aggregations.average)()), 2, 'average works on single item');

  test.equals((0, _immutable.fromJS)([2, 2, 8]).update((0, _aggregations.average)()), 4, 'average works on lots of items');
});

(0, _tape2.default)('averageBy', function (test) {
  test.plan(3);

  test.equals((0, _immutable.fromJS)([]).update((0, _aggregations.averageBy)(function (ii) {
    return ii.get('n');
  })), undefined, 'averageBy works on no items');

  test.equals((0, _immutable.fromJS)([{ n: 2 }]).update((0, _aggregations.averageBy)(function (ii) {
    return ii.get('n');
  })), 2, 'averageBy works on single item');

  test.equals((0, _immutable.fromJS)([{ n: 2 }, { n: 2 }, { n: 8 }]).update((0, _aggregations.averageBy)(function (ii) {
    return ii.get('n');
  })), 4, 'averageBy works on lots of items');
});

(0, _tape2.default)('median', function (test) {
  test.plan(4);

  test.equals((0, _immutable.fromJS)([]).update((0, _aggregations.median)()), undefined, 'median works on no items');

  test.equals((0, _immutable.fromJS)([2]).update((0, _aggregations.median)()), 2, 'median works on single item');

  test.equals((0, _immutable.fromJS)([5, 2, 1, 4, 3]).update((0, _aggregations.median)()), 3, 'median works on an odd number of items');

  test.equals((0, _immutable.fromJS)([1, 1, 10, 10, 2, 3]).update((0, _aggregations.median)()), 2.5, 'median works on an even number of items');
});

(0, _tape2.default)('medianBy', function (test) {
  test.plan(4);

  test.equals((0, _immutable.fromJS)([]).update((0, _aggregations.medianBy)(function (ii) {
    return ii.get('n');
  })), undefined, 'medianBy works on no items');

  test.equals((0, _immutable.fromJS)([{ n: 2 }]).update((0, _aggregations.medianBy)(function (ii) {
    return ii.get('n');
  })), 2, 'medianBy works on single item');

  test.equals((0, _immutable.fromJS)([{ n: 5 }, { n: 2 }, { n: 1 }, { n: 4 }, { n: 3 }]).update((0, _aggregations.medianBy)(function (ii) {
    return ii.get('n');
  })), 3, 'medianBy works on an odd number of items');

  test.equals((0, _immutable.fromJS)([{ n: 1 }, { n: 1 }, { n: 10 }, { n: 10 }, { n: 2 }, { n: 3 }]).update((0, _aggregations.medianBy)(function (ii) {
    return ii.get('n');
  })), 2.5, 'medianBy works on an even number of items');
});

(0, _tape2.default)('sum', function (test) {
  test.plan(3);

  test.equals((0, _immutable.fromJS)([]).update((0, _aggregations.sum)()), 0, 'sum works on no items');

  test.equals((0, _immutable.fromJS)([2]).update((0, _aggregations.sum)()), 2, 'sum works on single item');

  test.equals((0, _immutable.fromJS)([2, 2, 8]).update((0, _aggregations.sum)()), 12, 'sum works on lots of items');
});

(0, _tape2.default)('sumBy', function (test) {
  test.plan(3);

  test.equals((0, _immutable.fromJS)([]).update((0, _aggregations.sumBy)(function (ii) {
    return ii.get('n');
  })), 0, 'sumBy works on no items');

  test.equals((0, _immutable.fromJS)([{ n: 2 }]).update((0, _aggregations.sumBy)(function (ii) {
    return ii.get('n');
  })), 2, 'sumBy works on single item');

  test.equals((0, _immutable.fromJS)([{ n: 2 }, { n: 2 }, { n: 8 }]).update((0, _aggregations.sumBy)(function (ii) {
    return ii.get('n');
  })), 12, 'sumBy works on lots of items');
});