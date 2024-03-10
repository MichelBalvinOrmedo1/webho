import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebhooksModule } from './webhooks/webhooks.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [WebhooksModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
