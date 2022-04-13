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

import { CSSModule } from '@compendium/dev.types';

export type ColorScheme = 'light' | 'dark';
export type Scale = 'medium' | 'large';
export interface Breakpoints {
  S?: number;
  M?: number;
  L?: number;
  // Currently, it only deals with pixels, but we need to fix it to accept em or rem as well.
  [custom: string]: number | undefined;
}

/** A theme object defines CSS variables for a theme, across multiple color schemes and scales. */
export interface Theme {
  /** CSS module defining the global variables, which do not change between color schemes/scales. */
  global?: CSSModule;
  /** CSS module defining the variables for the light color scheme. */
  light?: CSSModule;
  /** CSS module defining the variables for the dark color scheme. */
  dark?: CSSModule;
  /** CSS module defining the variables for the medium scale. */
  medium?: CSSModule;
  /** CSS module defining the variables for the large scale. */
  large?: CSSModule;
}
