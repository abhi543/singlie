'use strict';
const test = require('ava');
const Node = require('../../node');
const {Linear} = require('../../.');

const linear = new Linear();

test('multiple append', t => {
  linear.append('A', 'B');
  t.is(linear.head, 'A');
  t.is(linear.last, 'B');
});

test('head & last values not equal', t => {
  t.not(linear.head, linear.last);
});

test('empty check', t => {
  t.false(linear.isEmpty());
});

test('get nodes value', t => {
  t.is(linear.get(0), 'A');
  t.is(linear.get(1), 'B');
});

test('select node', t => {
  const node = new Node();
  node.value = 'B';
  t.deepEqual(linear.node(1), node);
});

test('next node', t => {
  const node = new Node({value: 'B'});
  t.deepEqual(linear.node(0).next, node);
});

test('incremented length', t => {
  t.is(linear.length, 2);
});

test('set node value', t => {
  linear.set({index: 0, value: 'C'});
  t.is(linear.head, 'C');
});

test('update node value', t => {
  linear.node(0).value = 'A';
  t.is(linear.head, 'A');
});

test('arrayify', t => {
  t.deepEqual(linear.toArray(), ['A', 'B']);
});

test('join', t => {
  t.is(linear.join(), 'A,B');
});

test('join with space', t => {
  t.is(linear.join(' '), 'A B');
});

test('reverse', t => {
  const reversed = linear.reverse();
  t.is(reversed.head, 'B');
});

test('map', t => {
  const mapped = linear.map(x => x);
  t.is(linear.head, mapped.head);
});

test('iterate', t => {
  const array = [];
  linear.forEach(x => array.push(x));
  t.is(linear.head, array[0]);
  t.is(linear.last, array[1]);
});

test('remove node', t => {
  linear.remove();
  t.is(linear.head, 'B');
});

test('decremented length', t => {
  t.is(linear.length, 1);
});

test('clear', t => {
  const cleared = linear.clear();
  t.deepEqual(linear, cleared);
});

test('prepend', t => {
  linear.prepend('A', 'B');
  t.is(linear.head, 'B');
  t.is(linear.last, 'A');
});

test('insert head', t => {
  linear.clear().prepend('A', 'B');
  linear.insert({value: ['C', 'D'], index: 0});
  t.is(linear.get(0), 'D');
  t.is(linear.get(1), 'C');
  t.is(linear.get(2), 'B');
  t.is(linear.get(3), 'A');
});

test('insert middle', t => {
  linear.clear().prepend('A', 'B');
  linear.insert({value: ['C', 'D'], index: 1});
  t.is(linear.get(0), 'B');
  t.is(linear.get(1), 'D');
  t.is(linear.get(2), 'C');
  t.is(linear.get(3), 'A');
});

test('insert last', t => {
  linear.clear().prepend('A', 'B');
  linear.insert({value: ['C', 'D'], index: 2});
  t.is(linear.get(0), 'B');
  t.is(linear.get(1), 'A');
  t.is(linear.get(2), 'D');
  t.is(linear.get(3), 'C');
});

test('chain', t => {
  const result = linear.clear().append('C', 'D').prepend('B', 'A').map(x => `[${x}]`).reverse();
  t.deepEqual(result.toArray(), ['[D]', '[C]', '[B]', '[A]']);
  t.is(result.join(' '), '[D] [C] [B] [A]');
});
