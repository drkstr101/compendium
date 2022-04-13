/*
 * Copyright 2022 Watheia Labs, LLC. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import styles from '@compendium/theme.styles.page';
import typographyStyles from '@compendium/theme.styles.typography';
import { useLocale } from '@react-aria/i18n';
import { useModalProvider } from '@react-aria/overlays';
import { filterDOMProps } from '@react-aria/utils';
import { shouldKeepSpectrumClassNames, useDOMRef, useStyleProps } from '@react-spectrum/utils';
import { DOMRef } from '@react-types/shared';
import clsx from 'clsx';
import { forwardRef, useEffect, useRef } from 'react';
import { ThemeProviderProps } from './types';
import { useProvider } from './use-provider';

const ProviderWrapper = forwardRef(function ProviderWrapper(
  props: ThemeProviderProps,
  ref: DOMRef<HTMLDivElement>
) {
  const { children, ...otherProps } = props;
  const { locale, direction } = useLocale();
  const { theme, colorScheme, scale } = useProvider();
  const { modalProviderProps } = useModalProvider();
  const { styleProps } = useStyleProps(otherProps);
  const domRef = useDOMRef(ref);

  const themeKey = Object.keys(theme[colorScheme])[0];
  const scaleKey = Object.keys(theme[scale])[0];

  const className = clsx(
    styleProps.className,
    styles['spectrum'],
    typographyStyles['spectrum'],
    theme[colorScheme][themeKey],
    theme[scale][scaleKey],
    theme.global ? Object.values(theme.global) : null,
    {
      'react-spectrum-provider': shouldKeepSpectrumClassNames,
      spectrum: shouldKeepSpectrumClassNames,
      [themeKey]: shouldKeepSpectrumClassNames,
      [scaleKey]: shouldKeepSpectrumClassNames
    }
  );

  const style = {
    ...styleProps.style,
    // This ensures that browser native UI like scrollbars are rendered in the right color scheme.
    // See https://web.dev/color-scheme/.
    colorScheme:
      props.colorScheme ??
      colorScheme ??
      Object.keys(theme)
        .filter((k) => k === 'light' || k === 'dark')
        .join(' ')
  };

  const hasWarned = useRef(false);
  useEffect(() => {
    if (direction && domRef.current) {
      const closestDir = domRef.current.parentElement?.closest('[dir]');
      const dir = closestDir && closestDir.getAttribute('dir');
      if (dir && dir !== direction && !hasWarned.current) {
        console.warn(`Language directions cannot be nested. ${direction} inside ${dir}.`);
        hasWarned.current = true;
      }
    }
  }, [direction, domRef, hasWarned]);

  return (
    <div
      {...filterDOMProps(otherProps)}
      {...styleProps}
      {...modalProviderProps}
      className={className}
      style={style}
      lang={locale}
      dir={direction}
      ref={domRef}
    >
      {children}
    </div>
  );
});

export default ProviderWrapper;
