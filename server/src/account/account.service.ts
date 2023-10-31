import { Injectable } from '@nestjs/common';
import {DbService} from "../db/db.service";
import {AccountDto, PatchAccountDto} from "./dto";

@Injectable()
export class AccountService {
    constructor(private db: DbService) {}

    async create(userId: number) {
        return this.db.account.create({
            data: {
                ownerId: userId,
                isBlockingEnabled: false,
            }
        })
    }

    async getAccount(userId: number): Promise<AccountDto> {
        return this.db.account.findUniqueOrThrow({ where: { id: userId } })
    }

    async patchAccount(userId: number, patchAccount: PatchAccountDto): Promise<AccountDto> {
        return this.db.account.update({
            where: { ownerId: userId },
            data: { ...patchAccount }
        })
    }

}
