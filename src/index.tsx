import * as React from 'react';

export { default as SortableContainer } from './SortableContainer';
export { default as SortableElement } from './SortableElement';
export { default as SortableHandle } from './SortableHandle';

export { default as sortableContainer } from './SortableContainer';
export { default as sortableElement } from './SortableElement';
export { default as sortableHandle } from './SortableHandle';

export { arrayMove } from './utils.js';

export type Axis = 'x' | 'y' | 'xy';

export type Offset = number | string;

export interface SortStart {
  node: Element;
  index: number;
  collection: Offset;
  isKeySorting: boolean;
  nodes: HTMLElement[];
  helper: HTMLElement;
}

export interface SortOver {
  index: number;
  oldIndex: number;
  newIndex: number;
  collection: Offset;
  isKeySorting: boolean;
  nodes: HTMLElement[];
  helper: HTMLElement;
}

export interface SortEnd {
  oldIndex: number;
  newIndex: number;
  collection: Offset;
  isKeySorting: boolean;
  nodes: HTMLElement[];
}

export type SortEvent = React.MouseEvent<any> | React.TouchEvent<any>;

export type SortEventWithTag = SortEvent & {
  target: {
    tagName: string;
  };
};

export type SortStartHandler = (sort: SortStart, event: SortEvent) => void;

export type SortMoveHandler = (event: SortEvent) => void;

export type SortEndHandler = (sort: SortEnd, event: SortEvent) => void;

export type SortOverHandler = (sort: SortOver, event: SortEvent) => void;

export type ContainerGetter = (element: React.ReactElement<any>) => HTMLElement | Promise<HTMLElement>;

export type HelperContainerGetter = () => HTMLElement;

export interface Dimensions {
  width: number;
  height: number;
}

export interface SortableContainerProps {
  axis?: Axis;
  lockAxis?: Axis;
  helperClass?: string;
  transitionDuration?: number;
  keyboardSortingTransitionDuration?: number;
  keyCodes?: {
    lift?: number[];
    drop?: number[];
    cancel?: number[];
    up?: number[];
    down?: number[];
  };
  pressDelay?: number;
  pressThreshold?: number;
  distance?: number;
  shouldCancelStart?: (event: SortEvent | SortEventWithTag) => boolean;
  updateBeforeSortStart?: SortStartHandler;
  onSortStart?: SortStartHandler;
  onSortMove?: SortMoveHandler;
  onSortEnd?: SortEndHandler;
  onSortOver?: SortOverHandler;
  useDragHandle?: boolean;
  useWindowAsScrollContainer?: boolean;
  hideSortableGhost?: boolean;
  lockToContainerEdges?: boolean;
  lockOffset?: Offset | [Offset, Offset];
  getContainer?: ContainerGetter;
  getHelperDimensions?: (sort: SortStart) => Dimensions;
  helperContainer?: HTMLElement | HelperContainerGetter;
  disableAutoscroll?: boolean;
}

export interface SortableElementProps {
  index: number;
  collection?: Offset;
  disabled?: boolean;
}

export interface Config {
  withRef: boolean;
}

export type WrappedComponentFactory<P> = (props: P) => JSX.Element;

export type WrappedComponent<P> = React.ComponentClass<P> | WrappedComponentFactory<P>;
