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
