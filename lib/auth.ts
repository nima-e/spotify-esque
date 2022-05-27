import jwt, { Jwt, JwtPayload } from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from './prisma'

export const validateRoute = (handler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const  token  = req.cookies.MY_ACCESS_TOKEN

    if (token) {
      let user

      try {
        const {id } = jwt.verify(token, 'my-secret') as Partial<JwtPayload>
       
        user = await prisma.user.findUnique({
          where: { id },
        })
        if (!user) {
          throw new Error('Not real user')
        }
      } catch (e) {
        res.status(401)
        res.json({ error: 'Not Authorized' })
        return
      }
      return handler(req, res, user)
    }
    res.status(401)
    res.json({ error: 'Not Authorized' })
  }
}


export const validateToken = token => {
  const user = jwt.verify(token, 'my-secret')
  return user
}