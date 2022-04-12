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

import { classNames } from '@react-spectrum/utils';
import { FocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';
import React, { useContext, useRef } from 'react';
import { SideNavContext } from './sidenav-context';
import { SpectrumSideNavItemProps } from './sidenav.d';
import styles from './sidenav.module.css';
import { useHover } from '@react-aria/interactions';
import { useSideNavItem } from './use-sidenav-item';

export function SideNavItem<T>(props: SpectrumSideNavItemProps<T>) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const { key, rendered } = props.item;
  const state = useContext(SideNavContext);
  const isSelected = state?.selectionManager.isSelected(key);
  const isDisabled = state?.disabledKeys.has(key);

  const className = classNames(styles, 'SideNav-item', {
    'is-selected': isSelected,
    'is-disabled': isDisabled
  });

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { listItemProps, listItemLinkProps } = useSideNavItem(props, state!, ref!);
  const { hoverProps, isHovered } = useHover({ isDisabled });

  return (
    <div {...listItemProps} className={className}>
      <FocusRing focusRingClass={classNames(styles, 'focus-ring')}>
        <a
          {...mergeProps(listItemLinkProps, hoverProps)}
          ref={ref as any}
          className={classNames(styles, 'SideNav-itemLink', {
            'is-hovered': isHovered
          })}
        >
          {rendered}
        </a>
      </FocusRing>
    </div>
  );
}
