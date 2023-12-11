import {Express} from 'express-serve-static-core'
declare global {
  module Express {
    interface Request {
      userId?: number
    }
  
  }
}
