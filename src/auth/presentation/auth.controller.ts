import { Controller, Post, Body, Req, Res, Get } from '@nestjs/common';
import { AuthService } from '../application/auth.service';
import { Request, Response } from 'express';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(
    @Body() body: { username: string; password: string },
    @Res() res: Response,
  ) {
    try {
      const user = await this.authService.signUp(body.username, body.password);
      res.status(201).json(user);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  @Get('session')
  getSession(@Req() req: Request) {
    return {
      sessionID: req.sessionID,
      sessionData: req.session,
    };
  }

  @Post('signin')
  async signIn(
    @Body() body: { username: string; password: string },
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const user = await this.authService.signIn(body.username, body.password);
      req.session.save(() => {
        user
      })
      res.status(200).json(user);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}
