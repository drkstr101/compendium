import { IModel, IPage } from '@watheia/molecular.types';
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
