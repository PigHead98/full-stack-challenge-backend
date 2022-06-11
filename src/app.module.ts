import { ApolloDriver } from '@nestjs/apollo';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { configService } from './configs/service';
import { GqlModule } from './graphql/module';
import { NoteModule } from './modules/notes/module';

@Module({
  imports: [
    MongooseModule.forRoot(configService.DB_URI),
    NoteModule,
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply().forRoutes({ path: '/Note/*', method: RequestMethod.ALL });
  }
}
