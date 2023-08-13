import { Injectable } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class ConsumerService {
  @RabbitSubscribe({
    exchange: 'exchange_name',
    routingKey: 'test.routing.key',
    queue: 'test_queue'
  })
  public async pubSubHandler(msg: string) {
    console.log(`Received message: ${msg}`);
    
  }
}
