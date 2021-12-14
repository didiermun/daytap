import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { InvitationService } from './invitation.service';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateInvitationDto } from './dto/update-invitation.dto';

@Controller('invitations')
@ApiTags('invitations')
export class InvitationController {
  constructor(private readonly invitationService: InvitationService) {}

  @Post('invite')
  async create(@Body() createInvitationDto: CreateInvitationDto) {
    return await this.invitationService.create(createInvitationDto);
  }

  @Get()
  async findAll() {
    return this.invitationService.findAll();
  }

  @Get('invitation/:id')
  async findOne(@Param('id') id: string) {
    return this.invitationService.findOne(id);
  }

  @Patch('invitation/update-code/:email')
  async update(@Param('email') email: string) {
    return this.invitationService.update(email);
  }

  @Delete('invitation/:id')
  async remove(@Param('id') id: string) {
    return this.invitationService.remove(id);
  }
}
