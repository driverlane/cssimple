import { ToasterModule } from './toaster.module';

describe('ToasterModule', () => {
  let toasterModule: ToasterModule;

  beforeEach(() => {
    toasterModule = new ToasterModule();
  });

  it('should create an instance', () => {
    expect(toasterModule).toBeTruthy();
  });
});
