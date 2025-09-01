import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

import { UserRole } from '@/app/models/User/types'
import { env } from '@/env'

interface AuthenticatedRequest extends Request {
  user?: {
    id: string
    name: string
    email: string
    role?: string
    createdAt: string
    urlCoverPhoto?: string
  }
}

export function restaurantAuthMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const token = req.cookies?.accessToken

    if (!token) {
      return res.status(401).json({
        message: 'Token de acesso não encontrado',
      })
    }

    const decoded = verify(token, env.JWT_SECRET) as {
      id: string
      name: string
      email: string
      role?: string
      createdAt: string
      urlCoverPhoto?: string
      iat?: number
      exp?: number
    }

    if (!decoded.role || decoded.role !== UserRole.RESTAURANT) {
      return res.status(403).json({
        message: 'Acesso negado. Apenas usuários do tipo RESTAURANT podem acessar este recurso',
      })
    }

    req.user = {
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
      role: decoded.role,
      createdAt: decoded.createdAt,
      urlCoverPhoto: decoded.urlCoverPhoto,
    }

    next()
  } catch (error) {
    if (error instanceof Error && error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        message: 'Token inválido',
      })
    }

    if (error instanceof Error && error.name === 'TokenExpiredError') {
      return res.status(401).json({
        message: 'Token expirado',
      })
    }

    console.error('Erro no restaurantAuthMiddleware:', error)
    return res.status(500).json({
      message: 'Erro interno do servidor',
    })
  }
}
