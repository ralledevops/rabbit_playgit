import { Test, TestingModule } from '@nestjs/testing';
import { ConsumerService } from './consumer.service';

describe('ConsumerService', () => {
  let service: ConsumerService;
  let logSpy: jest.SpyInstance;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConsumerService],
    }).compile();

    service = module.get<ConsumerService>(ConsumerService);
  });

  beforeEach(() => {
    logSpy = jest.spyOn(console, 'log').mockImplementation(); // mock the console.log function
  });

  afterEach(() => {
    logSpy.mockRestore(); // restore the original console.log function after each test
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should log received message correctly', async () => {
    const testMessage = 'Test Message';
    await service.pubSubHandler(testMessage);
    expect(logSpy).toHaveBeenCalledWith(`Received message: ${testMessage}`);
  });
  it('should have the correct message properties', async () => {
    const testMessage = 'Test Title'
    

    
    const result = await service.pubSubHandler(testMessage);
  console.log('result...................',result)
    // Check the properties of the resulting message object
    expect(result).toBe( testMessage); 
 //   expect(result).toHaveProperty('delay', testMessage.content);
  });
  
});
