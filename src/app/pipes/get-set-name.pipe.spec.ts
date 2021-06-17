import { GetSetNamePipe } from './get-set-name.pipe';

describe('GetSetNamePipe', () => {
  it('create an instance', () => {
    const pipe = new GetSetNamePipe();
    expect(pipe).toBeTruthy();
  });
});
