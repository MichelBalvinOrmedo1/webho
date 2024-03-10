import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('facebook')
  @Redirect() // Indica que este método devuelve una redirección HTTP
  async loginWithFacebook(@Req() req): Promise<any> {
    // Obtener la URL de autenticación de Facebook
    const redirectUrl = await this.authService.getFacebookAuthUrl();

    return { url: redirectUrl };
  }
  @Get('facebook/redirect')
  @Redirect() // Indica que este método devuelve una redirección HTTP
  async handleInstagramRedirect(@Req() req): Promise<any> {
    // Verifica que req.query exista antes de intentar acceder a sus propiedades
    if (!req.query || !req.query.code) {
      throw new Error('El parámetro "code" no está presente en la solicitud.');
    }

    // Extrae el código de la solicitud
    const { code } = req.query;

    // Obtiene el token de acceso de Facebook utilizando el código de autorización
    const accessToken = await this.authService.getFacebookAccessToken(code);

    // Obtiene la información del usuario utilizando el token de acceso
    const data = await this.authService.getUserInfo(accessToken);

    // Imprime la información del usuario
    console.log('Data', data);
    console.log(accessToken);

    // Generar token JWT y redirigir a la página de éxito de inicio de sesión
    // Generar un token JWT utilizando el token de acceso de Facebook
    const jwtToken =
      await this.authService.getUserInfoAndGenerateToken(accessToken);

    // Verificar si el usuario ya existe en la base de datos utilizando el ID de Facebook
    let user = await this.userService.findByFacebookId(data.id);
    if (!user) {
      // Si el usuario no existe, crearlo utilizando los datos de Facebook y el token JWT generado
      user = await this.userService.createUser({
        nombre: data.first_name,
        apellido: data.last_name,
        correo: data.email,
        id_facebook: data.id,
        tokenjwk: jwtToken, // El token JWT se actualizará posteriormente
        timeCreate: new Date(),
      });
      console.log('Nuevo usuario creado', user);
    } else {
      console.log('Usuario existente', user);
    }

    // Redirigir a la página de éxito de inicio de sesión con el token JWT como parámetro de consulta
    return { url: `/login-success?token=${jwtToken}` };
  }
}
