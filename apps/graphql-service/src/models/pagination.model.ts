import { Type } from '@nestjs/common';
import { Field, ObjectType, Int } from '@nestjs/graphql';

interface IEdgeType<T> {
  cursor: string;
  node: T;
}

interface IPageInfo {
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface IPaginatedType<T> {
  edges: IEdgeType<T>[];
  totalCount: number;
  pageInfo: IPageInfo;
}

export function Paginated<T>(classRef: Type<T>): Type<IPaginatedType<T>> {
  @ObjectType(`${classRef.name}Edge`)
  abstract class EdgeType {
    @Field(() => String)
    cursor: string;

    @Field(() => classRef)
    node: T;
  }

  @ObjectType(`${classRef.name}PageInfo`)
  abstract class PageInfo {
    @Field()
    hasNextPage: boolean;

    @Field()
    hasPreviousPage: boolean;
  }

  @ObjectType({ isAbstract: true })
  abstract class PaginatedType implements IPaginatedType<T> {
    @Field(() => [EdgeType], { nullable: true })
    edges: EdgeType[];

    @Field(() => Int)
    totalCount: number;

    @Field(() => PageInfo)
    pageInfo: PageInfo;
  }

  return PaginatedType as Type<IPaginatedType<T>>;
}
