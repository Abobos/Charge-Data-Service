import { ChargeDataRepository, DalService } from '@charge-data/dal';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

import { join } from 'path';
import { ChargeDataResolver } from './charge-data.resolver';

const providers = [
  ChargeDataRepository,
  {
    provide: DalService,
    useFactory: async () => {
      const dalService = new DalService();

      await dalService.connect();

      return dalService;
    },
  },
  ChargeDataResolver,
];

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      autoSchemaFile: join(
        process.cwd(),
        'apps/graphql-service/schema/charge-data-schema.gql',
      ),
      formatError: (error) => {
        const graphQLFormattedError = {
          message: error.message,
        };
        return graphQLFormattedError;
      },
    }),
  ],
  providers,
})
export class AppModule {}
