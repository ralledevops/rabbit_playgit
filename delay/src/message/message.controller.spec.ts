import { Test, TestingModule } from '@nestjs/testing';
import { MessageController } from './message.controller';
import { ProducerService } from '../producer/producer.service'; 
const mockProducerService = {
  publishMsg: jest.fn()
};


describe('MessageController', () => {
  let controller: MessageController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [MessageController],
      providers: [
        {
          provide: ProducerService,
          useValue: mockProducerService
        }
      ],
    }).compile();

    controller = module.get<MessageController>(MessageController);
  });

  it('should send message without delay', async () => {
    await controller.sendMessage('test message');
    expect(mockProducerService.publishMsg).toHaveBeenCalledWith('test message', undefined);
  });

  it('should send message with delay', async () => {
    await controller.sendMessage('test message', 5000);
    expect(mockProducerService.publishMsg).toHaveBeenCalledWith('test message', 5000);
  });
});
