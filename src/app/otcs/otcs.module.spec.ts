import { OtcsModule } from './otcs.module';

describe('OtcsModule', () => {
  let otcsModule: OtcsModule;

  beforeEach(() => {
    otcsModule = new OtcsModule();
  });

  it('should create an instance', () => {
    expect(otcsModule).toBeTruthy();
  });
});
