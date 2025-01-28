import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './usermodule.ts/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Hacer que el módulo de configuración esté disponible globalmente
      envFilePath: '.env', // Especificar el archivo .env
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres' as const,
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [configService.get<string>('DB_ENTITIES')],
        synchronize: configService.get<boolean>('DB_SYNCHRONIZE'),
        dropSchema: configService.get<boolean>('DB_DROP_SCHEMA'),
      }),
      inject: [ConfigService],
    }),
    UserModule
    // Otros módulos...
  ],
})
export class AppModule {}
