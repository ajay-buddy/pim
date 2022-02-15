import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AssignManagerDto } from './dto/assign-manager.dto';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthUploadImageDto } from './dto/auth-upload-image.dto';
import { ChangeManagerDto } from './dto/change-manager.dto';
import { GetUser } from './get-user.decorator';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';
// import AWS from 'aws-sdk';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ username: string }> {
    console.log('===>', authCredentialsDto);
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signup/bulk')
  signUpBulk(
    @Body(ValidationPipe) authCredentialsDtoBulk: AuthCredentialsDto[],
  ) {
    console.log('===>', authCredentialsDtoBulk);
    return this.authService.signUpBulk(authCredentialsDtoBulk);
  }

  @Post('/signin')
  signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string; username: string; id: string }> {
    console.log('===>', authCredentialsDto);
    return this.authService.signIn(authCredentialsDto);
  }

  @Get('/me')
  @UseGuards(AuthGuard('jwt'))
  async test(@GetUser() user: User) {
    const data = await this.authService.dashboard(user);
    return { id: user.id, username: user.username, data };
  }

  @Post('/upload')
  @UseGuards(AuthGuard('jwt'))
  async uploadImage(
    @Body() authUploadImageDto: AuthUploadImageDto,
  ): Promise<string> {
    const { image_name, image_type } = authUploadImageDto;
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const AWS = require('aws-sdk');
    const s3 = new AWS.S3({
      accessKeyId: 'AKIAV55WFMOZ2CBLZXHK',
      secretAccessKey: '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',
      region: 'ap-south-1',
      signatureVersion: 'v4',
    });

    const myBucket = process.env.profile_bucket;
    const signedUrlExpireSeconds = 60 * 5;
    console.log('===>', image_name);
    return s3.getSignedUrl('putObject', {
      Bucket: myBucket,
      Key: image_name,
      Expires: signedUrlExpireSeconds,
    });
  }

  @Get('/candidates')
  @UseGuards(AuthGuard('jwt'))
  getCandidates(@GetUser() user: User): Promise<User[]> {
    return this.authService.getCandidates(user);
  }

  @Get('/admins')
  @UseGuards(AuthGuard('jwt'))
  getAdmins(@GetUser() user: User): Promise<User[]> {
    return this.authService.getAdmins(user);
  }

  @Post('/assign/manager')
  @UseGuards(AuthGuard('jwt'))
  assignManager(
    @GetUser() user: User,
    @Body() assignManagerDto: AssignManagerDto,
  ): Promise<User> {
    return this.authService.assignManager(user, assignManagerDto);
  }

  @Post('/change/manger')
  @UseGuards(AuthGuard('jwt'))
  changeManger(
    @GetUser() user: User,
    @Body() changeManagerDto: ChangeManagerDto,
  ): Promise<User> {
    return this.authService.changeManger(user, changeManagerDto);
  }
}
