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
