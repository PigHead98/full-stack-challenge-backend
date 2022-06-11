import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply().forRoutes({ path: '/notes/*', method: RequestMethod.ALL });
  }
}
