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
import { UpdateInvitationDto } from './dto/update-invitation.dto';

@Controller('invitation')
export class InvitationController {
  constructor(private readonly invitationService: InvitationService) {}

  @Post()
  async create(@Body() createInvitationDto: CreateInvitationDto) {
    return await this.invitationService.create(createInvitationDto);
  }

  @Get()
  async findAll() {
    return this.invitationService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.invitationService.findOne(id);
  }

  @Patch(':email')
  async update(@Param('email') email: string) {
    return this.invitationService.update(email);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.invitationService.remove(id);
  }
}
