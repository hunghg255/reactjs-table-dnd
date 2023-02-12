# reactjs-table-dnd

[![npm version](https://badge.fury.io/js/reactjs-table-dnd.svg)](https://badge.fury.io/js/reactjs-table-dnd) [![npm](https://img.shields.io/npm/dw/reactjs-table-dnd.svg?logo=npm)](https://www.npmjs.com/package/reactjs-table-dnd) [![npm](https://img.shields.io/bundlephobia/minzip/reactjs-table-dnd)](https://www.npmjs.com/package/reactjs-table-dnd)
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)

## Demo: https://github.com/hunghg255/reactjs-table-dnd-demo

## Installation

[![NPM](https://nodei.co/npm/reactjs-table-dnd.png?compact=true)](https://nodei.co/npm/reactjs-table-dnd/)

#### To install the latest stable version:

```
npm install --save reactjs-table-dnd
```

#### Basic usage:

```js
import React, { Component } from 'react';
import { render } from 'react-dom';
import { SortableContainer, SortableElement } from 'reactjs-table-dnd';
import arrayMove from 'array-move';

const SortableItem = SortableElement(({ value }) => <li>{value}</li>);

const SortableList = SortableContainer(({ items }) => {
  return (
    <ul>
      {items.map((value, index) => (
        <SortableItem key={`item-${value}`} index={index} value={value} />
      ))}
    </ul>
  );
});

class SortableComponent extends Component {
  state = {
    items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'],
  };
  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ items }) => ({
      items: arrayMove(items, oldIndex, newIndex),
    }));
  };
  render() {
    return <SortableList items={this.state.items} onSortEnd={this.onSortEnd} />;
  }
}

render(<SortableComponent />, document.getElementById('root'));
```
