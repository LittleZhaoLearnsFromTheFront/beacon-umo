import { MiddlewareConsumer, Module, NestModule, ValidationError, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from './common_modules/config/config.module';
import { DBModule } from './common_modules/db/db.module';
import { WXModule } from './modules/wx/wx.module';
import { CacheModule } from './common_modules/cache/cache.module';
import { XMLMiddleware } from './common/middlewares/xml.middleware';
import { WXController } from './modules/wx/wx.controller';
import { AuthModule } from './modules/auth/auth.module';
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core';
import { ValidationException } from './common/exceptions';
import { stringifyError } from './utils';
import { BadRequestExceptionFilter, GlobalExceptionFilter, UnauthorizedExceptionFilter, ValidationExceptionFilter } from './common/filters/global.filter';
import { UserModule } from './modules/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { secretOrKey } from './common/constant';
import { JwtGuard } from './common/guard/jwt.guard';
import { HomeModule } from './modules/home/home.module';
import { DefaultModule } from './modules/default/default.module';
import { InfoModule } from './modules/info/info.module';
@Module({
  imports: [
    AuthModule,
    UserModule,
    HomeModule,
    DefaultModule,
    InfoModule,

    ConfigModule,
    DBModule,
    WXModule,
    CacheModule,
    JwtModule.register({
      global: true,
      secret: secretOrKey,
      signOptions: {
        expiresIn: '7d'
      }
    })
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter
    },
    {
      provide: APP_FILTER,
      useClass: BadRequestExceptionFilter
    },
    {
      provide: APP_FILTER,
      useClass: UnauthorizedExceptionFilter
    },
    {
      provide: APP_FILTER,
      useClass: ValidationExceptionFilter
    },
    {
      provide: APP_PIPE,
      useFactory: () => new ValidationPipe({
        whitelist: true,
        transform: true,
        exceptionFactory: (errors: ValidationError[]) => {
          const messages = errors
            .map((error) => Object.values(error.constraints))
            .flat();
          return new ValidationException(stringifyError(messages));
        },
      })
    },
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    }
  ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(XMLMiddleware).forRoutes(WXController)
  }

}
