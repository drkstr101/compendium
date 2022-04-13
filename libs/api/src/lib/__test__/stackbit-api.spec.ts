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

import { expect } from 'chai';
import sourcebit from 'sourcebit';
import { MolecularApi } from '../molecular-api';
import dataClient from '../sourcebit-data-client';

describe('watheia/molecular.api.stackbit-api', function () {
  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    sourcebit.fetch(require('../../../../../sourcebit.js'));
  });

  it('MUST be instantiated with the global data cache', async () => {
    expect(new MolecularApi(await dataClient.getData())).to.be.ok;
  });

  it('SHOULD return all data in the cache', async () => {
    const api = new MolecularApi(await dataClient.getData());
    expect(api).to.be.ok;
    expect(api.getObjects()).to.have.lengthOf(4);
    expect(api.getPages()).to.have.lengthOf(2);
    expect(api.getProps()).to.have.property('site');
  });
});
