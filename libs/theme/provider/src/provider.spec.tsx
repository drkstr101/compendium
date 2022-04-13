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

import React from 'react';
import { BasicThemeUsage } from './provider.composition';
import { render } from '@testing-library/react';

it('should render the button in the color blue', () => {
  const { getByText } = render(<BasicThemeUsage />);
  const rendered = getByText('this should be blue');
  expect(rendered).toBeTruthy();
});
