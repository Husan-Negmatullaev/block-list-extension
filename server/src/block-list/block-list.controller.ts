import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query, UseGuards} from '@nestjs/common';
import {ApiOkResponse} from "@nestjs/swagger";
import {AddBlockItemDto, BlockItemDto, BlockListQueryDto} from "./dto";
import {AuthGuard} from "../auth/auth.guard";
import {SessionInfo} from "../auth/session-info.decorator";
import {SessionInfoDto} from "../auth/dto";
import {BlockListService} from "./block-list.service";
import {BlockList} from "@prisma/client";

@Controller('block-list')
@UseGuards(AuthGuard)
export class BlockListController {

  constructor(private blockListService: BlockListService) {
  }

  @Get()
  @ApiOkResponse({
    type: BlockItemDto,
  })
  getList(@Query() query: BlockListQueryDto, @SessionInfo() session: SessionInfoDto): Promise<BlockList> {
    return this.blockListService.getByUserId(session.id, query)
  }

  @Post('item')
  @ApiOkResponse({
    type: AddBlockItemDto,
  })
  addBlockItem(@Body() body: AddBlockItemDto, @SessionInfo() session: SessionInfoDto) {
    return this.blockListService.addItem(session.id, body);
  }

  @Delete('item/:id')
  @ApiOkResponse({
    type: BlockItemDto,
  })
  async removeBlockItem(@Param('id', ParseIntPipe) id: number, @SessionInfo() session: SessionInfoDto) {
    return await this.blockListService.removeItem(session.id, id);
  }
}
