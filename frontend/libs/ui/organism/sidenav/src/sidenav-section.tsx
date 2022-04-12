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
import { layoutInfoToStyle, useVirtualizerItem } from '@react-aria/virtualizer';
import React, { Fragment, useRef } from 'react';
import { SideNavSectionProps } from './sidenav.d';
import styles from './sidenav.module.css';
import { useListBoxSection } from '@react-aria/listbox';
import { useLocale } from '@react-aria/i18n';

export function SideNavSection<T>(props: SideNavSectionProps<T>) {
  const { children, reusableView, header } = props;
  const item = reusableView.content;
  const { headingProps, groupProps } = useListBoxSection({
    heading: item.rendered,
    'aria-label': item['aria-label']
  });

  const headerRef = useRef<HTMLDivElement | null>(null);
  useVirtualizerItem({
    reusableView: header,
    ref: headerRef
  });

  const { direction } = useLocale();

  return (
    <Fragment>
      <div
        role="presentation"
        ref={headerRef}
        style={layoutInfoToStyle(header.layoutInfo!, direction)}
      >
        {item.rendered && (
          <div {...headingProps} className={classNames(styles, 'SideNav-heading')}>
            {item.rendered}
          </div>
        )}
      </div>
      <div {...groupProps} style={layoutInfoToStyle(reusableView.layoutInfo!, direction)}>
        {children}
      </div>
    </Fragment>
  );
}