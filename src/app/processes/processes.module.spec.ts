import { ProcessesModule } from './processes.module';

describe('ProcessesModule', () => {
  let processesModule: ProcessesModule;

  beforeEach(() => {
    processesModule = new ProcessesModule();
  });

  it('should create an instance', () => {
    expect(processesModule).toBeTruthy();
  });
});
