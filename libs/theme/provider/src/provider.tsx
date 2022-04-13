/*
 * Copyright 2022 Watheia Labs, LLC. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import { Breakpoints, ColorScheme, Scale, Theme } from '@compendium/theme.composition-theme';
import { I18nProvider, useLocale } from '@react-aria/i18n';
import {
  BreakpointProvider,
  useMatchedBreakpoints,
  useStyleProps
} from '@react-spectrum/utils';
import { DOMProps, DOMRef, StyleProps } from '@react-types/shared';
import React, { forwardRef, ReactNode } from 'react';
import { DEFAULT_BREAKPOINTS, themeVersion } from './constants';
import { ThemeContextProps } from './provider.context';
import { useColorScheme } from './use-color-scheme';
import { useProvider } from './use-provider';
import { useScale } from './use-scale';
import { filterDOMProps } from '@react-aria/utils';

const Provider = (props: ThemeProviderProps, ref: DOMRef<HTMLDivElement>) => {
  const prevContext = useProvider();
  const prevColorScheme = prevContext && prevContext.colorScheme;
  const prevBreakpoints = prevContext && prevContext.breakpoints;
  const { theme = prevContext && prevContext.theme, defaultColorScheme } = props;
  // Hooks must always be called.
  const autoColorScheme = useColorScheme(theme, defaultColorScheme);
  const autoScale = useScale(theme);
  const { locale: prevLocale } = useLocale();
  // if the new theme doesn't support the prevColorScheme, we must resort to the auto
  const usePrevColorScheme = !!theme[prevColorScheme];

  // importance of color scheme props > parent > auto:(OS > default > omitted)
  const {
    colorScheme = usePrevColorScheme ? prevColorScheme : autoColorScheme,
    scale = prevContext ? prevContext.scale : autoScale,
    locale = prevContext ? prevLocale : null,
    breakpoints = prevContext ? prevBreakpoints : DEFAULT_BREAKPOINTS,
    children,
    isQuiet,
    isEmphasized,
    isDisabled,
    isRequired,
    isReadOnly,
    validationState,
    ...otherProps
  } = props;

  // select only the props with values so undefined props don't overwrite prevContext values
  const currentProps = {
    version: themeVersion,
    theme,
    breakpoints,
    colorScheme,
    scale,
    isQuiet,
    isEmphasized,
    isDisabled,
    isRequired,
    isReadOnly,
    validationState
  };

  const matchedBreakpoints = useMatchedBreakpoints(breakpoints);
  const filteredProps: Record<string, any> = {};
  Object.entries(currentProps).forEach(
    ([key, value]) => value !== undefined && (filteredProps[key] = value)
  );

  // Merge options with parent provider
  const context = Object.assign({}, prevContext, filteredProps);

  // Only wrap in a DOM node if the theme, colorScheme, or scale changed
  let contents = children;
  const domProps = filterDOMProps(otherProps);
  const { styleProps } = useStyleProps(otherProps, undefined, { matchedBreakpoints });
  if (
    !prevContext ||
    props.locale ||
    theme !== prevContext.theme ||
    colorScheme !== prevContext.colorScheme ||
    scale !== prevContext.scale ||
    Object.keys(domProps).length > 0 ||
    otherProps.UNSAFE_className ||
    Object.keys(styleProps.style).length > 0
  ) {
    contents = (
      <ProviderWrapper
        {...props}
        UNSAFE_style={{ isolation: !prevContext ? 'isolate' : undefined, ...styleProps.style }}
        ref={ref}
      >
        {contents}
      </ProviderWrapper>
    );
  }

  return (
    <ThemeContext.Provider value={context}>
      <I18nProvider locale={locale}>
        <BreakpointProvider matchedBreakpoints={matchedBreakpoints}>
          <ModalProvider>{contents}</ModalProvider>
        </BreakpointProvider>
      </I18nProvider>
    </ThemeContext.Provider>
  );
};

/**
 * Provider is the container for all React Spectrum applications.
 * It defines the theme, locale, and other application level settings,
 * and can also be used to provide common properties to a group of components.
 */
const ThemeProvider = forwardRef(Provider);
export default ThemeProvider;
