import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
import { updateTodo } from '../../businessLogic/todo'
import { getToken } from '../../auth/utils'
import { createLogger } from '../../utils/logger'
import { cors } from 'middy/middlewares'

const logger = createLogger('update-todo')

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    // TODO: Update a TODO item with the provided id using values in the "updatedTodo" object --DONE
    const todoId: string = event.pathParameters.todoId
    const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)
    const jwtToken: string = getToken(event.headers.Authorization)
    logger.info('Update Todo Item');
    await updateTodo(todoId, updatedTodo, jwtToken)
    return {
      statusCode: 200,
      body: 'Succesfully updated'
    }
  }
)
handler.use(
  cors({ credentials: true })
)