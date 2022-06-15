import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GqlRemoveAllDto {
  @Field(() => Number)
  count: number;
}
