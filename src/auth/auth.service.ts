import { Injectable, Req } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AuthService {
  private readonly clientId = '350452607906496';
  private readonly clientSecret = '987d40ac35486ec2798bda6877a1824e';
  private readonly redirectUri =
    'https://webho.onrender.com/auth/facebook/redirect';
  private readonly scope =
    'email,business_management,read_insights,pages_read_user_content,instagram_basic,catalog_management,instagram_content_publish,instagram_manage_comments,instagram_manage_messages,pages_messaging,pages_manage_metadata,pages_manage_engagement,pages_show_list  ';

  // Método para obtener la URL de autenticación de Facebook
  async getFacebookAuthUrl(): Promise<string> {
    const authUrl = `https://www.facebook.com/v19.0/dialog/oauth?client_id=${this.clientId}&redirect_uri=${this.redirectUri}&scope=${this.scope}`;

    return authUrl;
  }
  // Método para obtener el token de acceso de Facebook
  private async getAccesToken(code: string): Promise<string> {
    try {
      const response = await axios.get(
        `https://graph.facebook.com/v19.0/oauth/access_token?client_id=${this.clientId}&redirect_uri=${this.redirectUri}&client_secret=${this.clientSecret}&code=${code}`,
      );
      return response.data.access_token;
    } catch (error) {
      throw new Error(
        'Error al obtener el token de acceso de Facebook Business',
      );
    }
  }
  async getRedirectUrl(@Req() req) {
    const { code } = req.query;

    try {
      const { data } = await axios.get(
        'https://graph.facebook.com/v19.0/oauth/access_token',
        {
          params: {
            client_id: this.clientId,
            client_secret: this.clientSecret,
            redirect_uri: this.redirectUri,
            code: code,
          },
        },
      );

      // Aquí obtienes el token de acceso
      const accessToken = data.access_token;
      console.log('Token de acceso:', accessToken);

      // PAge
      const page = await this.getUserPages(accessToken);
      console.log(page);

      const subcripcion = await this.upSubcripcionEvento(
        page[1].access_token,
        page[1].id,
      );
      console.log(subcripcion);

      const getSubcripcion = await this.getSubcripcion(
        page[1].access_token,
        page[1].id,
      );
      console.log(getSubcripcion);

      return { url: '/login-success' };
    } catch (error) {
      console.error('Error al obtener el token de acceso:', error.message);
      throw new Error('Error al obtener el token de acceso');
    }
  }
  // Obtener Informacion de la pagina de facebook del usuario
  private async getPageInfo(accessToken: string): Promise<any> {
    try {
      const response = await axios.get(
        `https://graph.facebook.com/v19.0/me?access_token=${accessToken}&fields=id,name`,
      );
      return response.data;
    } catch (error) {
      throw new Error(
        'Error al obtener información de la página de Facebook Business',
      );
    }
  }
  // Método para obtener las páginas de usuario
  private async getUserPages(accessToken: string): Promise<any> {
    try {
      const response = await axios.get(
        `https://graph.facebook.com/v19.0/me/accounts?fields=id,access_token&access_token=${accessToken}`,
      );
      return response.data.data;
    } catch (error) {
      throw new Error(
        'Error al obtener la lista de páginas de Facebook asociadas al usuario',
      );
    }
  }

  private async upSubcripcionEvento(accessTokenPage: string, idPage: string) {
    const url = `https://graph.facebook.com/${idPage}/subscribed_apps`;
    const params = {
      subscribed_fields:
        'messages,messaging_account_linking,message_deliveries,message_echoes,messaging_game_plays,messaging_optins,messaging_payments,messaging_policy_enforcement,messaging_postbacks,messaging_referrals',
      access_token: accessTokenPage,
    };

    try {
      const response = await axios.post(url, params);
      return response.data;
    } catch (error) {
      console.error('Error al suscribirse al evento:', error);
      throw new Error('Error al suscribirse al evento');
    }
  }
  private async getSubcripcion(accessTokenPage: string, idPage: string) {
    const url = `https://graph.facebook.com/${idPage}/subscribed_apps`;
    const params = {
      access_token: accessTokenPage,
    };

    try {
      const response = await axios.get(url, { params });
      return response.data;
    } catch (error) {
      console.error('Error al suscribirse al evento:', error);
      throw new Error('Error al suscribirse al evento');
    }
  }
}
