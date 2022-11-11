import { BTCPipe } from './btc.pipe';

describe('BTCPipe', () => {
  it('create an instance', () => {
    const pipe = new BTCPipe();
    expect(pipe).toBeTruthy();
  });
});
