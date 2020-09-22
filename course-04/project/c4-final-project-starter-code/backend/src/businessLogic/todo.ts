import * as uuid from 'uuid'

import { TodoItem } from '../models/TodoItem'
import { TodoAccess } from '../dataLayer/todoAccess'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import { parseUserId } from '../auth/utils'
import { createLogger } from '../utils/logger'

const logger = createLogger('todos')
// initialize new object from TodoAccess class: 
const todoAccess = new TodoAccess()

export const getAllTodos = async (jwtToken: string): Promise<TodoItem[]> => {
  logger.info('get Todo List in Business Logic')
  const userId = parseUserId(jwtToken)

  return await todoAccess.getAllTodos(userId)
}

export const createTodo = async (
  createTodoRequest: CreateTodoRequest,
  jwtToken: string
): Promise<TodoItem> => {
  logger.info('In createTodo() function')

  const itemId = uuid.v4()
  const userId = parseUserId(jwtToken)

  return await todoAccess.createTodo({
    todoId: itemId,
    userId,
    done: false,
    createdAt: new Date().toISOString(),
    ...createTodoRequest,
  }) as TodoItem
}

export const updateTodo = async (
  todoId: string,
  updateTodoRequest: UpdateTodoRequest,
  jwtToken: string
): Promise<TodoItem> => {
  logger.info('In updateTodo() function')

  const userId = parseUserId(jwtToken)
  logger.info('User Id: ' + userId)

  return await todoAccess.updateTodo({
    todoId,
    userId,
    name: updateTodoRequest.name,
    dueDate: updateTodoRequest.dueDate,
    done: updateTodoRequest.done,
    createdAt: new Date().toISOString()
  })
}

export const deleteTodo = async (
  todoId: string,
  jwtToken: string
): Promise<string> => {
  logger.info('In deleteTodo() function')

  const userId = parseUserId(jwtToken)
  logger.info('User Id: ' + userId)

  return await todoAccess.deleteTodo(todoId, userId)
}

export const generateUploadUrl = async (todoId: string): Promise<string> => {
  logger.info('In generateUploadUrl() function')

  return await todoAccess.generateUploadUrl(todoId)
}