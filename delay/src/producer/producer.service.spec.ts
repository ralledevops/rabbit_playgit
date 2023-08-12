import { Test, TestingModule } from '@nestjs/testing';
import { ProducerService } from './producer.service';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';



describe('ProducerService', () => {
  let service: ProducerService;
  let amqpConnection: AmqpConnection;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ProducerService,
        {
          provide: AmqpConnection,
          useValue: {
            publish: jest.fn(),
          }
        },
      ],
    }).compile();

    service = module.get<ProducerService>(ProducerService);
    amqpConnection = module.get<AmqpConnection>(AmqpConnection);
  });

  it('should send message without delay', async () => {
    await service.publishMsg('test message');
    expect(amqpConnection.publish).toHaveBeenCalledWith('exchange_name', 'test.routing.key', 'test message', { headers: { 'x-delay': 0 } });
  });

  it('should send message with delay', async () => {
    await service.publishMsg('test message', 5000);
    expect(amqpConnection.publish).toHaveBeenCalledWith('exchange_name', 'test.routing.key', 'test message', { headers: { 'x-delay': 5000 } });
  });
});
