import { Injectable, Req } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AuthService {
  private readonly clientId = '423249216825011';
  private readonly clientSecret = '9da73d9e6c98bcc058703bffebaf5a4f';
  private readonly redirectUri =
    'https://webho.onrender.com/auth/facebook/redirect';
  private readonly scope =
    'email,business_management,read_insights,pages_read_user_content,instagram_basic,catalog_management,instagram_branded_content_brand,instagram_branded_content_creator,instagram_content_publish,instagram_manage_comments,instagram_manage_messages,ads_management,pages_messaging,pages_manage_metadata,pages_manage_engagement,pages_show_list,pages_manage_webhooks  ';

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
    // Verifica que req.query exista antes de intentar acceder a sus propiedades
    if (!req.query || !req.query.code) {
      throw new Error('El parámetro "code" no está presente en la solicitud.');
    }

    // Extrae el código de la solicitud
    const { code } = req.query;

    // Obtiene el token de acceso de Facebook utilizando el código de autorización
    const accessToken = await this.getAccesToken(code);

    // Obtiene la información del usuario utilizando el token de acceso
    const data = await this.getPageInfo(accessToken);

    // Imprime la información del usuario
    console.log('Data', data);
    console.log(accessToken);

    // Redirigir a la página de éxito de inicio de sesión con el token JWT como parámetro de consulta
    return { url: `/login-success` };
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
