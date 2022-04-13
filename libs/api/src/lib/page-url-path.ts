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

import { IPage } from '@compendium/dev.types';

/**
 * Build a url path for a page object coming from the data cache.
 *
 * @param {object} page raw page object from data cache
 * @returns url path string for that page
 */
export function pageUrlPath(page: IPage) {
  const {
    __metadata: { relSourcePath }
  } = page;

  return relSourcePath
    .replace(/^pages\//, '/') // removes pages directory prefix
    .replace(/\.md$/, '') // removes file extension
    .replace(/^\/index$/, '/') // replaces home page with /
    .replace(/\/index$/, ''); // removes trailing slash from other index pages
}
