import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { generateUploadUrl } from '../../businessLogic/todo'
import { createLogger } from '../../utils/logger'
import { cors } from 'middy/middlewares'

const logger = createLogger('update-todo')
logger.info('Upload Image')
export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
   
      const todoId = event.pathParameters.todoId
      const uploadUrl = await generateUploadUrl(todoId)

      // TODO: Return a presigned URL to upload a file for a TODO item with the provided id  --DONE
      return {
        statusCode: 200,
        body: JSON.stringify({
          uploadUrl
        })
      }
  }
);
handler.use(
  cors({ credentials: true})
)