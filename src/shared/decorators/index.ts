/* eslint-disable @typescript-eslint/no-explicit-any */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ICurrentUser } from '../../shared/interfaces';
import { DEFAULT_USER } from '../constants';

export const CurrentUser: any = createParamDecorator(
  (data: unknown, context: ExecutionContext): ICurrentUser => {
    const ctx = GqlExecutionContext.create(context);
    const local = ctx.getContext().req.res.locals;
    const userContext = {
      username: local.username || DEFAULT_USER,
      uuid: local.uuid,
    };
    return userContext;
  },
);
