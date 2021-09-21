

import tape from 'tape';
import {
  fromJS
} from 'immutable';

import {
  min,
  minBy,
  max,
  maxBy,
  average,
  averageBy,
  median,
  medianBy,
  sum,
  sumBy
} from '../aggregations';

tape('min', test => {
    test.plan(3);

    test.equals(
      isNaN(fromJS([]).update(min())),
      true,
      'min works on no items'
    );

    test.equals(
      fromJS([2]).update(min()),
      2,
      'min works on single item'
    );

    test.equals(
      fromJS([2,2,8]).update(min()),
      2,
      'min works on lots of items'
    );
});

tape('minBy', test => {
    test.plan(3);

    test.equals(
      isNaN(fromJS([]).update(minBy(ii => ii.get('n')))),
      true,
      'minBy works on no items'
    );

    test.equals(
      fromJS([
        {n: 2}
      ]).update(minBy(ii => ii.get('n'))),
      2,
      'minBy works on single item'
    );

    test.equals(
      fromJS([
        {n: 2},
        {n: 2},
        {n: 8}
      ]).update(minBy(ii => ii.get('n'))),
      2,
      'minBy works on lots of items'
    );
});

tape('max', test => {
    test.plan(3);

    test.equals(
      isNaN(fromJS([]).update(max())),
      true,
      'max works on no items'
    );

    test.equals(
      fromJS([2]).update(max()),
      2,
      'max works on single item'
    );

    test.equals(
      fromJS([2,2,8]).update(max()),
      8,
      'max works on lots of items'
    );
});

tape('maxBy', test => {
    test.plan(3);

    test.equals(
      isNaN(fromJS([]).update(maxBy(ii => ii.get('n')))),
      true,
      'maxBy works on no items'
    );

    test.equals(
      fromJS([
        {n: 2}
      ]).update(maxBy(ii => ii.get('n'))),
      2,
      'maxBy works on single item'
    );

    test.equals(
      fromJS([
        {n: 2},
        {n: 2},
        {n: 8}
      ]).update(maxBy(ii => ii.get('n'))),
      8,
      'maxBy works on lots of items'
    );
});

tape('average', test => {
    test.plan(3);

    test.equals(
      isNaN(fromJS([]).update(average())),
      true,
      'average works on no items'
    );

    test.equals(
      fromJS([2]).update(average()),
      2,
      'average works on single item'
    );

    test.equals(
      fromJS([2,2,8]).update(average()),
      4,
      'average works on lots of items'
    );
});

tape('averageBy', test => {
    test.plan(3);

    test.equals(
      isNaN(fromJS([]).update(averageBy(ii => ii.get('n')))),
      true,
      'averageBy works on no items'
    );

    test.equals(
      fromJS([
        {n: 2}
      ]).update(averageBy(ii => ii.get('n'))),
      2,
      'averageBy works on single item'
    );

    test.equals(
      fromJS([
        {n: 2},
        {n: 2},
        {n: 8}
      ]).update(averageBy(ii => ii.get('n'))),
      4,
      'averageBy works on lots of items'
    );
});

tape('median', test => {
    test.plan(4);

    test.equals(
      isNaN(fromJS([]).update(median())),
      true,
      'median works on no items'
    );

    test.equals(
      fromJS([2]).update(median()),
      2,
      'median works on single item'
    );

    test.equals(
      fromJS([5,2,1,4,3]).update(median()),
      3,
      'median works on an odd number of items'
    );

    test.equals(
      fromJS([1,1,10,10,2,3]).update(median()),
      2.5,
      'median works on an even number of items'
    );
});

tape('medianBy', test => {
    test.plan(4);

    test.equals(
      isNaN(fromJS([]).update(medianBy(ii => ii.get('n')))),
      true,
      'medianBy works on no items'
    );

    test.equals(
      fromJS([
        {n: 2}
      ]).update(medianBy(ii => ii.get('n'))),
      2,
      'medianBy works on single item'
    );

    test.equals(
      fromJS([
        {n: 5},
        {n: 2},
        {n: 1},
        {n: 4},
        {n: 3}
      ]).update(medianBy(ii => ii.get('n'))),
      3,
      'medianBy works on an odd number of items'
    );

    test.equals(
      fromJS([
        {n: 1},
        {n: 1},
        {n: 10},
        {n: 10},
        {n: 2},
        {n: 3}
      ]).update(medianBy(ii => ii.get('n'))),
      2.5,
      'medianBy works on an even number of items'
    );
});

tape('sum', test => {
    test.plan(3);

    test.equals(
      fromJS([]).update(sum()),
      0,
      'sum works on no items'
    );

    test.equals(
      fromJS([2]).update(sum()),
      2,
      'sum works on single item'
    );

    test.equals(
      fromJS([2,2,8]).update(sum()),
      12,
      'sum works on lots of items'
    );
});

tape('sumBy', test => {
    test.plan(3);

    test.equals(
      fromJS([]).update(sumBy(ii => ii.get('n'))),
      0,
      'sumBy works on no items'
    );

    test.equals(
      fromJS([
        {n: 2}
      ]).update(sumBy(ii => ii.get('n'))),
      2,
      'sumBy works on single item'
    );

    test.equals(
      fromJS([
        {n: 2},
        {n: 2},
        {n: 8}
      ]).update(sumBy(ii => ii.get('n'))),
      12,
      'sumBy works on lots of items'
    );
});