import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from './modules/config/config.module';
import { DBModule } from './modules/db/db.module';
import { WXModule } from './modules/wx/wx.module';
import { CacheModule } from './modules/cache/cache.module';
import { XMLMiddleware } from './common/middlewares';
import { WXController } from './modules/wx/wx.controller';

@Module({
  imports: [
    ConfigModule,
    DBModule,
    WXModule,
    CacheModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(XMLMiddleware).forRoutes(WXController)
  }

}
