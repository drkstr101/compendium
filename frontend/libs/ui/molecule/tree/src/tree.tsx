/* eslint-disable @typescript-eslint/ban-ts-comment */
/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import ChevronRightMedium from '@spectrum-icons/ui/ChevronRightMedium';
import { classNames } from '@react-spectrum/utils';
import { CollectionBase, Expandable, MultipleSelection, Node } from '@react-types/shared';
import { FocusRing } from '@react-aria/focus';
import { Item, Section } from '@react-stately/collections';
import { ListLayout } from '@react-stately/layout';
import React, { Key, useMemo, useRef } from 'react';
import styles from './tree.module.css';
import { TreeState, useTreeState } from '@react-stately/tree';
import { useSelectableCollection, useSelectableItem } from '@react-aria/selection';
import { Virtualizer } from '@react-aria/virtualizer';

export { Item, Section };

export function Tree<T extends object>(
  props: CollectionBase<T> & Expandable & MultipleSelection
) {
  const state = useTreeState(props);
  const layout = useMemo(
    () =>
      new ListLayout({
        rowHeight: 44,
        indentationForItem(tree, key: Key) {
          const level = tree.getItem(key).level;
          return 28 * level;
        }
      }),
    []
  );

  const ref = useRef();
  const { collectionProps } = useSelectableCollection({
    // @ts-ignore
    ref,
    selectionManager: state.selectionManager,
    keyboardDelegate: layout
  });

  return (
    <Virtualizer
      {...collectionProps}
      // @ts-ignore
      ref={ref}
      focusedKey={state.selectionManager.focusedKey}
      className={classNames(styles, 'TreeView')}
      layout={layout}
      collection={state.collection}
    >
      {(type, item) => {
        if (type === 'section') {
          return <TreeHeading item={item} />;
        }

        return <TreeItem item={item} state={state} />;
      }}
    </Virtualizer>
  );
}

interface TreeItemProps<T> {
  item: Node<T>;
  state: TreeState<T>;
}

function TreeItem<T>(props: TreeItemProps<T>) {
  const { item, state } = props;
  const { key, rendered, hasChildNodes } = item;

  const isExpanded = state.expandedKeys.has(key);
  const isSelected = state.selectionManager.isSelected(key);

  const itemClassName = classNames(styles, 'TreeView-item', {
    'is-open': isExpanded
  });

  const linkClassName = classNames(styles, 'TreeView-itemLink', {
    'is-selected': isSelected
    // 'is-drop-target': isDropTarget
  });

  const ref = useRef<HTMLDivElement>();
  const { itemProps } = useSelectableItem({
    selectionManager: state.selectionManager,
    key: item.key,
    // @ts-ignore
    ref
  });

  return (
    <div className={itemClassName} role="presentation">
      <FocusRing focusRingClass={classNames(styles, 'focus-ring')}>
        {/* @ts-ignore */}
        <div {...itemProps} ref={ref} className={linkClassName}>
          {hasChildNodes && (
            <ChevronRightMedium UNSAFE_className={classNames(styles, 'TreeView-indicator')} />
          )}
          {rendered}
        </div>
      </FocusRing>
    </div>
  );
}

function TreeHeading({ item }: { item: Node<any> }) {
  return <div className={classNames(styles, 'TreeView-heading')}>{item.rendered}</div>;
}
