import {Body, Controller, Get, HttpCode, HttpStatus, Post, Res, UseGuards} from '@nestjs/common';
import {SessionInfoDto, SignInBodyDto, SignUpBodyDto} from "./dto";
import {ApiCreatedResponse} from "@nestjs/swagger";
import {AuthService} from "./auth.service";
import {Response} from "express";
import {CookiesService} from "./cookies.service";
import {AuthGuard} from "./auth.guard";
import {SessionInfo} from "./session-info.decorator";

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService, private cookieService: CookiesService) {
    }

    @Post("sign-up")
    @ApiCreatedResponse()
    async signUp(@Body() body: SignUpBodyDto, @Res({ passthrough: true }) res: Response) {
        const accessToken = await this.authService.signUp(body.email, body.password);

        this.cookieService.setToken(res, accessToken);
    }

    @Post("sign-in")
    @ApiCreatedResponse()
    @HttpCode(HttpStatus.OK)
    async signIn(@Body() body: SignInBodyDto, @Res({ passthrough: true }) res: Response) {
        const accessToken = await this.authService.signIn(body.email, body.password);

        this.cookieService.setToken(res, accessToken);
    }

    @Get("sign-out")
    @ApiCreatedResponse()
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    signOut(@Res({ passthrough: true }) res: Response) {
        this.cookieService.removeToken(res);
    }

    @Get("session")
    @ApiCreatedResponse({
        type: SessionInfoDto
    })
    @UseGuards(AuthGuard)
    getSessionInfo(@SessionInfo() sessionInfo: SessionInfoDto) {
        return sessionInfo;
    }
}
