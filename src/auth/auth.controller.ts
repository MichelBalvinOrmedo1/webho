import { Controller, Get, Redirect, Req } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/facebook')
  @Redirect() // Indica que este método devuelve una redirección HTTP
  async loginWithFacebook(@Req() req): Promise<any> {
    // Obtener la URL de autenticación de Facebook
    const redirectUrl = await this.authService.getFacebookAuthUrl();

    return { url: redirectUrl };
  }
  @Get('/facebook/redirect')
  @Redirect() // Indica que este método devuelve una redirección HTTP
  async handleInstagramRedirect(@Req() req): Promise<any> {
    return this.authService.getRedirectUrl(req);
  }
}
