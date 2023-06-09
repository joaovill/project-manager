import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ActualUser } from 'src/authentication/decorators/actual-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { Project } from './entities/project.entity';

@Controller()
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post('project')
  create(@Body() createProjectDto: CreateProjectDto, @ActualUser() user: User) {
    return this.projectService.create(createProjectDto, user.username);
  }

  @Get('projects')
  findAll(@ActualUser() user: User): Promise<Project[]> {
    const projects = this.projectService.findAllByUsername(user.username);

    return projects
  }

  @Get('project/:id')
  findOne(@Param('id') id: string,  @ActualUser() user: User) {
    return this.projectService.findById(id, user.username);
  }

  @Patch('project/:id/done')
  update(@Param('id') id: string, @ActualUser() user: User) {
    return this.projectService.updateToDone(id, user.username);
  }

  @Delete('project/:id/delete')
  remove(@Param('id') id: string, @ActualUser() user: User) {
    return this.projectService.deleteProject(id, user.username);
  }
}
