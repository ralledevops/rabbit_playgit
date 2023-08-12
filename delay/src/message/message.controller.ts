import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { ProducerService } from 'src/producer/producer.service'; 

@Controller('message')
export class MessageController {
  constructor(private readonly producerService: ProducerService) {}

  @Post('/send')
  @HttpCode(HttpStatus.ACCEPTED)
  async sendMessage(
    @Body('message') message: string,
    @Body('delay') delay?: number,
  ): Promise<void> {
    await this.producerService.publishMsg(message, delay);
  }
}

