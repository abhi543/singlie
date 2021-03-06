'use strict';
const test = require('ava');
const Node = require('../../node');
const {Linear} = require('../../.');

const linear = new Linear();

test('append', t => {
  linear.append('A');
  t.is(linear.head, 'A');
});

test('head & last values equal', t => {
  t.is(linear.head, linear.last);
});

test('empty check', t => {
  t.false(linear.isEmpty());
});

test('get node value', t => {
  t.is(linear.get(0), 'A');
});

test('next node', t => {
  t.is(linear.node(0).next, null);
});

test('select node', t => {
  const node = new Node();
  node.value = 'A';
  t.deepEqual(linear.node(0), node);
});

test('incremented length', t => {
  t.is(linear.length, 1);
});

test('set node value', t => {
  linear.set({index: 0, value: 'B'});
  t.is(linear.head, 'B');
});

test('update node value', t => {
  linear.node(0).value = 'A';
  t.is(linear.head, 'A');
});

test('arrayify', t => {
  t.deepEqual(linear.toArray(), ['A']);
});

test('join', t => {
  t.is(linear.join(), 'A');
});

test('reverse', t => {
  const reversed = linear.reverse();
  t.is(reversed.head, 'A');
});

test('map', t => {
  const mapped = linear.map(x => x);
  t.is(linear.head, mapped.head);
});

test('iterate', t => {
  const array = [];
  linear.forEach(x => array.push(x));
  t.is(linear.head, array[0]);
});

test('remove node', t => {
  linear.remove(0);
  t.is(linear.head, undefined);
});

test('decremented length', t => {
  t.is(linear.length, 0);
});

test('prepend', t => {
  linear.prepend('A');
  t.is(linear.head, 'A');
});

test('clear', t => {
  const cleared = linear.clear();
  t.deepEqual(linear, cleared);
});

test('insert', t => {
  linear.insert({value: 'A'});
  t.is(linear.head, 'A');
});
