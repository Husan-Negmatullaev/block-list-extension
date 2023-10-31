import {Body, Controller, Get, Patch, UseGuards} from '@nestjs/common';
import {AuthGuard} from "../auth/auth.guard";
import {ApiOkResponse} from "@nestjs/swagger";
import {AccountDto, PatchAccountDto} from "./dto";
import {AccountService} from "./account.service";
import {SessionInfo} from "../auth/session-info.decorator";
import {SessionInfoDto} from "../auth/dto";

@UseGuards(AuthGuard)
@Controller('account')
export class AccountController {
    constructor(private accountService: AccountService) {}

    @Get()
    @ApiOkResponse({
        type: AccountDto,
    })
    getAccount(@SessionInfo() session: SessionInfoDto): Promise<AccountDto> {
        return this.accountService.getAccount(session.id);
    }

    @Patch()
    @ApiOkResponse({
        type: AccountDto,
    })
    patchAccount(@Body() body: PatchAccountDto, @SessionInfo() session: SessionInfoDto): Promise<AccountDto> {
        return this.accountService.patchAccount(session.id, body);
    }
}
