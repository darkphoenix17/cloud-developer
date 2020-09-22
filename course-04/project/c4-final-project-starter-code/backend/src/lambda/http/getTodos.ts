import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { getAllTodos } from '../../businessLogic/todo'
import { getToken } from '../../auth/utils'
import { createLogger } from '../../utils/logger'
import { cors } from 'middy/middlewares'

const logger = createLogger('get-todos')

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log('Processing event:', event)
    const jwtToken: string = getToken(event.headers.Authorization)
    const todos = await getAllTodos(jwtToken)
    logger.info('Get all todo from list');
    // TODO: Get all TODO items for a current user --DONE
    return {
      statusCode: 200,
      body: JSON.stringify({
        items: todos
      })
    }
  });
  handler.use(
    cors({ credentials: true})
)