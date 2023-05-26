import { Module } from '@nestjs/common';
import { ApiKeyGuard } from './guards/apikey.guard';
import { ApiKeysRepository } from './repositories/apiKey.repository';
import { ApiKeysService } from './services/apikeys.service';
import { ApiKeyStrategy } from './strategies/apikey.strategy';

@Module({
  providers: [ApiKeysService, ApiKeysRepository, ApiKeyGuard, ApiKeyStrategy],
})
export class AuthModule {}