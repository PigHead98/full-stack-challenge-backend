import { ApolloDriver } from '@nestjs/apollo';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { configService } from './configs/service';
import { GqlModule } from './graphql/module';
import { AuthenticationMiddleware } from './middlewares/authentication.middleware';

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      imports: [GqlModule],
      useFactory: () => ({
        autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
        path: '/note/graphql',
        sortSchema: true,
        debug: configService.IS_DEVELOPMENT_MODE,
        playground: configService.IS_DEVELOPMENT_MODE,
      }),
    }),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: configService.DB_URI,
        useNewUrlParser: true,
        autoIndex: false,
      }),
      connectionName: configService.DB_CHALLENGE_NAME,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(AuthenticationMiddleware)
      .forRoutes({ path: '/Note/*', method: RequestMethod.ALL });
  }
}
