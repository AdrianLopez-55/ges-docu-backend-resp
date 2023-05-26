import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MilestonesService } from './milestones.service';
import { CreateMilestoneDto } from './dto/create-milestone.dto';
import { UpdateMilestoneDto } from './dto/update-milestone.dto';
import { ApiCreatedResponse, ApiFoundResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('milestones')
@Controller('milestones')
export class MilestonesController {
  constructor(private readonly milestonesService: MilestonesService) {}
  @Post()
  @ApiOperation({
    summary: 'crear nuevo hito de seguimiento de documento',
    requestBody: {
      content: {
        'aplication/json': {
          schema: {
            type: 'object',
            properties: {
              name: {type: 'string'},
              description: {type: 'string'},
              dateInit: {type: 'string'},
              dateEnd: {type: 'string'},
            },
          },
        },
      },
    },
  })
  @ApiCreatedResponse({ description: 'el hito se creo exitosamente'})
  create(@Body() createMilestoneDto: CreateMilestoneDto) {
    return this.milestonesService.create(createMilestoneDto);
  }

  @Get()
  @ApiFoundResponse({description: 'se encontro el hito correctamente'})
  @ApiOperation({
    summary: 'ver todos los hitos creados',
  })

  findAll() {
    return this.milestonesService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'obtener hito especifico mediante id'
  })
  findOne(@Param('id') id: string) {
    return this.milestonesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMilestoneDto: UpdateMilestoneDto) {
    return this.milestonesService.update(id, updateMilestoneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.milestonesService.remove(id);
  }
}
