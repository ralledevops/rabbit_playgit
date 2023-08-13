import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { ProducerService } from './producer/producer.service';
import { ConsumerService } from './consumer/consumer.service';
import { MessageController } from './message/message.controller';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // makes the ConfigModule global, no need to import it in other modules
      envFilePath: '.env',
    }),
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
    DatabaseModule,
  ],
  providers: [ProducerService, ConsumerService],
  controllers: [MessageController],
})
export class AppModule {}
