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

import { IModel, IPage } from '@compendium/dev.types';
import { SourcebitDataCache } from 'sourcebit-target-next';
export type { SourcebitDataCache };

/**
 * Filter predicate to match page objects
 *
 * @param model
 * @returns
 */
export const matchPages = (model: IModel) => model.__metadata.modelName === 'Page';

/**
 * Wrapper API to sourcebit data cache
 */
export class MolecularApi {
  constructor(private data: SourcebitDataCache) {}

  getProps(): Record<string, unknown> {
    return this.data.props;
  }

  getObjects(): IModel[] {
    return this.data.objects;
  }

  /**
   * TODO We need to figure out why `pages` field in stackbit
   *      cache always resolves to `[]`. Until then, we must
   *      manually perform the same logic here.
   * @returns {IPage[]}
   */
  getPages(): IPage[] {
    return this.getObjects().filter(matchPages) as IPage[];
  }

  /**
   * Extract objects from the data cache by matching the "layout" property.
   *
   * @param {string} type Name of the model
   * @returns {array} Sourcebit data objects
   */
  pagesByLayout<T extends IPage>(layout: string): T[] {
    return this.getPages().filter((it) => (it as T)?.layout === layout) as T[];
  }

  /**
   * Find a single model from the data cache by matching the "type"
   * property. Returns only the first match, or throws
   * if missing.
   *
   * @param {string} type Name of the model
   * @returns {IModel} First matching object
   */
  modelByType<T extends IModel>(type: string): T {
    const model = this.getObjects().find((it) => it.type === type) as T;
    if (!model) {
      throw new Error(`A model with type (${type}) could not be located in the cache.`);
    }

    return model;
  }
}
