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
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthUploadImageDto } from './dto/auth-upload-image.dto';
import { GetUser } from './get-user.decorator';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';
// import AWS from 'aws-sdk';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string; username: string; id: string }> {
    return this.authService.signIn(authCredentialsDto);
  }

  @Get('/me')
  @UseGuards(AuthGuard('jwt'))
  test(@GetUser() user: User) {
    return { id: user.id, username: user.username };
  }

  @Post('/upload')
  // @UseGuards(AuthGuard('jwt'))
  async uploadImage(
    @Body() authUploadImageDto: AuthUploadImageDto,
  ): Promise<string> {
    const { image_name, image_type } = authUploadImageDto;
    const AWS = require('aws-sdk');
    const s3 = new AWS.S3({
      accessKeyId: process.env.accessKeyId,
      secretAccessKey: process.env.secretAccessKey,
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
}
