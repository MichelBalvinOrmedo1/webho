import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { responseHistory } from './function/responseHistories';

@Injectable()
export class WebhooksService {
  private readonly logger = new Logger(WebhooksService.name);

  async handleWebhook(body: any) {
    if (body.object === 'instagram') {
      for (const entry of body.entry) {
        const webhookEvent = entry.messaging[0];
        this.logger.log(
          'Evento de webhook recibido: ' + JSON.stringify(webhookEvent),
        );
        // Verificar si es un evento de eco
        if (webhookEvent.is_echo) {
          continue; // Saltar al próximo evento si es un evento de eco
        }
        const senderPsid = webhookEvent.sender.id;
        this.logger.log('PSID del remitente: ' + senderPsid);

        if (webhookEvent.message && !webhookEvent.is_echo) {
          const mensaje = await this.handleMessage(webhookEvent.message);
          if (mensaje !== null) {
            await this.callSendAPI(senderPsid, mensaje);
          }
          break;
        } else if (webhookEvent.postback) {
          await this.handlePostback(senderPsid, webhookEvent.postback);
        } else {
          this.logger.log(
            'Evento no manejado: ' + JSON.stringify(webhookEvent),
          );
        }
      }

      return;
    } else {
      this.logger.log('Tipo de objeto no admitido: ' + body.object);
      return 'OBJETO_NO_ADMITIDO';
    }
  }

  private async handleMessage(receivedMessage: any): Promise<any> {
    let response = null;
    const responseHist = receivedMessage.reply_to !== undefined;

    if (receivedMessage.text && !responseHist) {
      response = {
        text: 'Primer mensaje de texto',
      };
      console.log('Hola respuesta');
    } else if (responseHist) {
      response = responseHistory(
        receivedMessage.reply_to.story.id,
        receivedMessage.text,
        ['hola'],
        '18096464938399091',
      );
    }
    return response;
  }

  private async handlePostback(senderPsid: string, receivedPostback: any) {
    let response;
    const payload = receivedPostback.payload;
    console.log('se ejecuto este metodo');

    if (payload === 'inf') {
      response = { text: 'Esto es la informacion' };
    }
    if (payload === 'pedido') {
      response = { text: 'EStos son los pedidos disponible' };
    }
    if (payload === 'prom') {
      response = { text: 'Todas las promociones disponibles' };
    }

    await this.callSendAPI(senderPsid, response);
  }

  private async callSendAPI(senderPsid: string, response: object) {
    const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

    if (!PAGE_ACCESS_TOKEN) {
      this.logger.error('Error: PAGE_ACCESS_TOKEN no está configurado.');
      return;
    }

    if (!senderPsid) {
      this.logger.error('Error: PSID del remitente no válido.');
      return;
    }

    const requestBody = {
      recipient: { id: senderPsid },
      message: response,
    };

    try {
      const url = `https://graph.facebook.com/v19.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`;
      const apiResponse = await axios.post(url, requestBody);

      if (apiResponse.data.error) {
        // Si se encuentra un error en la respuesta de la API, manejarlo adecuadamente
        this.logger.error('Error al enviar el mensaje:', apiResponse.data);
      } else {
        // Si no hay error, se considera que el mensaje fue enviado exitosamente
        this.logger.log('Mensaje enviado correctamente.');
      }
    } catch (error) {
      // Capturar errores de red u otros errores durante la solicitud
      this.logger.error('Error al enviar el mensaje:', error);
    }
  }
}
