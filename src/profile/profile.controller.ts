import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { Profile } from './profile.entity';
import { CreateProfileDto } from './dto/create-profile-dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { identity } from 'rxjs';

@Controller('profile')
@UseGuards(AuthGuard('jwt'))
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  // @Get()
  // getAllProfile(): Promise<Profile[]> {
  //   return this.profileService.getAllProfile();
  // }

  @Get()
  myProfile(@GetUser() user: User): Promise<Profile> {
    return this.profileService.myProfile(user);
  }

  @Get('id/:id')
  profileById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<Profile> {
    return this.profileService.profileById(user, id);
  }

  @Get('/all')
  getAllProfile(
    @GetUser() user: User,
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    return this.profileService.getAllProfile(page, limit);
  }

  @Post('/create')
  @UsePipes(ValidationPipe)
  createProduct(
    @GetUser() user: User,
    @Body() createProfileDto: CreateProfileDto,
  ): Promise<Profile> {
    if (createProfileDto.id) {
      console.log('===>', createProfileDto.id, user);
      return this.profileService.editProfile(
        createProfileDto,
        user,
        createProfileDto.id,
      );
    }
    return this.profileService.createProfile(createProfileDto, user);
  }

  @Post('/edit/:id')
  @UsePipes(ValidationPipe)
  editProduct(
    @Param('id') id: string,
    @GetUser() user: User,
    @Body() createProfileDto: CreateProfileDto,
  ): Promise<Profile> {
    return this.profileService.editProfile(createProfileDto, user, id);
  }

  @Post('/delete/:id')
  @UsePipes(ValidationPipe)
  deleteProduct(@Param('id') id): Promise<Profile> {
    return this.profileService.deleteProfile(id);
  }
}
