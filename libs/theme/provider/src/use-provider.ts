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

import { useContext } from 'react';
import ThemeContext, { ThemeProviderContextType } from './provider.context';

/**
 * Returns the various settings and styles applied by the nearest parent Provider.
 * Properties explicitly set by the nearest parent Provider override those provided by preceeding Providers.
 */
export function useProvider(): ThemeProviderContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('A ThemeProvider was not found in the component root.');
  }

  return context;
}

/**
 * A generic form of useProvider accepting dynamic attributes
 *
 * @param props
 * @returns
 */
export function useProviderProps<T>(props: T): T {
  const context = useProvider();
  if (!context) {
    return props;
  }
  return Object.assign(
    {},
    {
      isQuiet: context.isQuiet,
      isEmphasized: context.isEmphasized,
      isDisabled: context.isDisabled,
      isRequired: context.isRequired,
      isReadOnly: context.isReadOnly,
      validationState: context.validationState
    },
    props
  );
}
