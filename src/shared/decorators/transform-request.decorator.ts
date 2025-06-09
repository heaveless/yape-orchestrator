import { SetMetadata, Type } from '@nestjs/common';

export const TransformRequest = <T>(config: Type<T>) =>
  SetMetadata('transformRequestConfig', config);