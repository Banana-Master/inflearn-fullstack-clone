import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from './strategies/access-token.strategy';

@Module({
  imports: [PassportModule, JwtModule.register({})],
  providers: [AccessTokenStrategy],
})
export class AuthModule {}
