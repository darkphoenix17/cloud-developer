import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { createTodo } from '../../businessLogic/todo'
import { createLogger } from '../../utils/logger'

const logger = createLogger('update-todo')

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const newTodo: CreateTodoRequest = JSON.parse(event.body)
    const authorization = event.headers.Authorization
    const split = authorization.split(' ')
    const jwtToken = split[1]
    const newItem = await createTodo(newTodo, jwtToken)
    // TODO: Implement creating a new TODO item  --DONE

    logger.info(`New Item ${newItem}`)

    return {
      statusCode: 201,
      body: JSON.stringify({
        item: newItem,
      })
    }
  });

handler.use(
  cors({ credentials: true })
)
