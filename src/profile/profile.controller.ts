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
import { CandidateFilterDto } from './dto/candidate-filter.dto';
import { query } from 'express';

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

  @Get('/all/:type')
  getAllProfile(
    @GetUser() user: User,
    @Param('type') type: string,
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('name') name: string,
    @Query('p_tags') p_tags: string,
    @Query('s_tags') s_tags: string,
    @Query('email') email: string,

    @Query('phone') phone: string,
    @Query('c_location') c_location: string,
    @Query('p_location') p_location: string,
    @Query('min_experience') min_experience: string,
    @Query('max_experience') max_experience: string,
    @Query('min_current_ctc') min_current_ctc: string,

    @Query('headline') headline: string,
    @Query('max_notice') max_notice: string,
    @Query('min_notice') min_notice: string,
    @Query('max_expected_ctc') max_expected_ctc: string,
    @Query('min_expected_ctc') min_expected_ctc: string,
    @Query('max_current_ctc') max_current_ctc: string,
  ) {
    return this.profileService.getAllProfile(
      type,
      page,
      limit,
      name,
      p_tags,
      s_tags,
      email,
      phone,
      c_location,
      p_location,
      min_experience,
      max_experience,
      min_current_ctc,
      headline,
      max_notice,
      min_notice,
      max_expected_ctc,
      min_expected_ctc,
      max_current_ctc,
    );
  }

  @Get('/find/:type')
  findAllProfile(
    @GetUser() user: User,
    @Param('type') type: string,
    @Query('name') name: string,
  ): Promise<Profile[]> {
    return this.profileService.findAllProfile(type, name);
  }

  @Get('/candidate')
  getCandidateProfile(
    @GetUser() user: User,
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    return this.profileService.getCandidateProfile(page, limit);
  }
  @Post('/candidate/filter')
  getFiltedCandidateProfile(
    @GetUser() user: User,
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Body() candidateFilterDto: CandidateFilterDto,
  ) {
    return this.profileService.getFiltedCandidateProfile(
      candidateFilterDto,
      page,
      limit,
    );
  }
  @Get('/admin')
  getAdminProfile(
    @GetUser() user: User,
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('email') email: string,
  ) {
    return this.profileService.getAdminProfile(page, limit, email);
  }

  @Post('/create')
  @UsePipes(ValidationPipe)
  createProduct(
    @GetUser() user: User,
    @Body() createProfileDto: CreateProfileDto,
  ): Promise<Profile> {
    return this.profileService.createProfile(createProfileDto, user);
  }

  @Post('/create/bulk')
  @UsePipes(ValidationPipe)
  createBulkProfile(
    @GetUser() user: User,
    @Body() createProfileDto: CreateProfileDto[],
  ) {
    return this.profileService.createBulkProfile(createProfileDto, user);
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
