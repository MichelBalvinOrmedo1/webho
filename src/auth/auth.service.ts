import { Injectable, Req } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AuthService {
  private readonly clientId = '423249216825011';
  private readonly clientSecret = '9da73d9e6c98bcc058703bffebaf5a4f';
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

      // Ahora puedes utilizar el token de acceso para hacer solicitudes a la API de Facebook en nombre del usuario

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
}
