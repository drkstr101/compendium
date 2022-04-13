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
import dataClient from '../sourcebit-data-client';

describe('watheia/molecular.api.sourcebit-data-client', function () {
  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    sourcebit.fetch(require('../../../../../sourcebit.js'));
  });

  it('SHOULD return data from the global cache.', async () => {
    const data = await dataClient.getData();
    expect(data.objects).to.have.length(4);
    expect(data.props).to.haveOwnProperty('site');
    // expect(data).to.have.property('objects').with.length(4);
    // TODO we need to figure out why our page objects
    //      are not getting picked up in sourcebit config
    expect(data.pages).to.have.length(0);
  });
});
