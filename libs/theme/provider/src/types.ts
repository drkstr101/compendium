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

import { Breakpoints, ColorScheme, Scale, Theme } from '@compendium/theme.composition-theme';
import { DOMProps, StyleProps, ValidationState } from '@react-types/shared';
import { ReactNode } from 'react';

export interface ThemeContextProps {
  /** Whether descendants should be displayed with the quiet style. */
  isQuiet?: boolean;
  /** Whether descendants should be displayed with the emphasized style. */
  isEmphasized?: boolean;
  /** Whether descendants should be disabled. */
  isDisabled?: boolean;
  /** Whether descendants should be displayed with the required style. */
  isRequired?: boolean;
  /** Whether descendants should be read only. */
  isReadOnly?: boolean;
  /** Whether descendants should be displayed with the validation state style. */
  validationState?: ValidationState;
}

export interface ThemeProviderContextType extends ThemeContextProps {
  /**
   * The package version number of the nearest parent Provider.
   */
  version: string;
  /**
   * The theme of the nearest parent Provider.
   */
  theme: Theme;
  /**
   * The color scheme of the nearest parent Provider.
   */
  colorScheme: ColorScheme;
  /**
   * The scale of the nearest parent Provider.
   */
  scale: Scale;
  /**
   * The breakpoints of the nearest parent Provider used for styleProps.
   */
  breakpoints: Breakpoints;
}

export interface ThemeProviderProps extends ThemeContextProps, DOMProps, StyleProps {
  /** The content of the Provider. */
  children: ReactNode | ReactNode[];
  /**
   * The theme for your application.
   */
  theme?: Theme;
  /**
   * The color scheme for your application.
   * Defaults to operating system preferences.
   */
  colorScheme?: ColorScheme;
  /**
   * The default color scheme if no operating system setting is available.
   * @default 'light'
   */
  defaultColorScheme?: ColorScheme;
  /**
   * Sets the scale for your applications. Defaults based on device pointer type.
   */
  scale?: Scale;
  /**
   * The locale for your application as a [BCP 47](https://www.ietf.org/rfc/bcp/bcp47.txt) language code.
   * Defaults to the browser/OS language setting.
   * @default 'en-US'
   */
  locale?: string;
  /**
   * The breakpoints for styleProps.
   * Do not use `base` property.
   * @default {S:380,M:768,L:1024}
   */
  breakpoints?: Breakpoints;
}
