import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { WebhooksService } from './webhooks.service';

@Controller('webhooks')
export class WebhooksController {
  constructor(private readonly webhooksService: WebhooksService) {}
  private receivedUpdates: any[] = [];
  private readonly token = process.env.TOKEN || '123456789';

  @Get()
  handleSubscription(
    @Query('hub.mode') mode: string,
    @Query('hub.verify_token') verifyToken: string,
    @Query('hub.challenge') challenge: string,
  ) {
    if (mode === 'subscribe' && verifyToken === this.token) {
      console.log(challenge);

      return challenge;
    } else {
      throw new Error('Invalid subscription parameters');
    }
  } /*
  @Post()
  @HttpCode(200) // Facebook espera una respuesta con código 200
  handleWebhook(@Body() body: any) {
    return this.webhooksService.handleWebhook(body);
  }*/
  @Post('/webhooks') // Define que esta función manejará las solicitudes POST
  async handleWebhook2(@Body() body: any) {
    // Llama al servicio para manejar la lógica de la solicitud de webhook
    return await this.webhooksService.handleWebhook2(body);
  }
  @Post()
  handleWebhook(@Body() body: any) {
    console.log('Received webhook:');
    console.dir(body, { depth: null });
    // Aquí puedes agregar la lógica para manejar la solicitud del webhook
    return { message: 'Webhook received successfully' };
  }
}
