import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { CLIENT_URL } from './consts/client';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule.register({
      baseURL: CLIENT_URL,
      withCredentials: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
