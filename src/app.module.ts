import { Module } from '@nestjs/common';

import { WebhooksModule } from './webhooks/webhooks.module';
import { AuthModule } from './auth/auth.module';
import { ConversationModule } from './conversation/conversation.module';

@Module({
  imports: [WebhooksModule, AuthModule, ConversationModule],
  controllers: [],
  providers: [  ],
})
export class AppModule {}
