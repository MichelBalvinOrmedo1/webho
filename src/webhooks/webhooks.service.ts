import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { genericTemplate } from './function/plantillaGenery';
import { getButtonTem } from './function/plantillaBotones';
import { getCoupon } from './function/plantillaCoupon';
import { mediaTemplate } from './function/plantillaMedia';
import { responseHistory } from './function/responseHistories';

@Injectable()
export class WebhooksService {
  private readonly logger = new Logger(WebhooksService.name);

  async handleWebhook(body: any) {
    console.log(JSON.stringify(body));
    
    
    if (body.object === 'page') {
      // Iterar sobre los eventos en la entrada del webhook
      // Manejar los eventos de cambios en publicaciones
      for (const entry of body.entry) {
        const webhookEntry = body.entry[0];
        const accountId = webhookEntry.id;
        
      }
      return;
    } else {
      this.logger.log('Tipo de objeto no admitido: ' + body.object);
      return 'OBJETO_NO_ADMITIDO';
    }
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



  private async callSendAPIComentari(idComentario: string, typeObject: string) {
    const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

    if (!PAGE_ACCESS_TOKEN) {
      this.logger.error('Error: PAGE_ACCESS_TOKEN no está configurado.');
      return;
    }

    const requestBody = {
      message: 'Hola Como estas',
    };

    try {
      let url;
      //instagram
      if (typeObject === 'instagram') {
        url = `https://graph.facebook.com/v19.0/${idComentario}/replies?access_token=${PAGE_ACCESS_TOKEN}`;
      } else if (typeObject === 'page') {
        url = `https://graph.facebook.com/v19.0/${idComentario}/comments?access_token=${PAGE_ACCESS_TOKEN}`;
      }
      //Facebook
      //
      const apiResponse = await axios.post(url, requestBody);

      if (apiResponse.data.error) {
        // Si se encuentra un error en la respuesta de la API, manejarlo adecuadamente
        this.logger.error('Error al enviar el mensaje:', apiResponse.data);
        return new BadRequestException();
      } else {
        // Si no hay error, se considera que el mensaje fue enviado exitosamente
        this.logger.log('Mensaje enviado correctamente.');
      }
      return apiResponse;
    } catch (error) {
      // Capturar errores de red u otros errores durante la solicitud
      this.logger.error('Error al enviar el mensaje:', error);
    }
  }
}
