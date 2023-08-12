import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { ProducerService } from './producer/producer.service';
import { ConsumerService } from './consumer/consumer.service';
import { MessageController } from './message/message.controller';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'exchange_name',
          type: 'x-delayed-message',
          options: {
            durable: true,
            arguments: { 'x-delayed-type': 'direct' }  // The real exchange type (e.g., direct, topic) goes here.
          }
        }
      ],
      uri: 'amqp://user:password@rabbitmq:5672',  // Use your RabbitMQ credentials
    }),
  ],
  providers: [ProducerService, ConsumerService],
  controllers: [MessageController],
})
export class AppModule {}
