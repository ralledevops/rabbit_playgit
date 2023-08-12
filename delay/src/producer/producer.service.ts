import { Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class ProducerService {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  async publishMsg(msg: string, delay?: number): Promise<void> {
   console.log(delay)
    await this.amqpConnection.publish('exchange_name', 'test.routing.key', msg, {
      headers: {
        'x-delay': delay || 0
      }
    });
  }
}
