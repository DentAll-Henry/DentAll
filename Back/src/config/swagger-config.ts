import { ApiQuery } from '@nestjs/swagger';

export const PageApiQueries =
{
    name: 'page',
    required: false,
    description: 'Page number of the results',
    example: 1,
}
    ;

export const LimitApiQueries =
{
    name: 'limit',
    required: false,
    description: 'Number of results per page',
    example: 10,
}

export const OnlyFutureApiQueries =
{
    name: 'only_future',
    required: false,
    description: 'Only future appointments',
    example: true,
    type: Boolean
}

export const OnlyPastApiQueries =
{
    name: 'only_past',
    required: false,
    description: 'Only past appointments',
    example: true,
    type: Boolean
}