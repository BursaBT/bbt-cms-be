import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto, GoogleLoginRequest, LoginRequest } from 'src/lib/dto';


@ApiTags('User Services')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }


    @Post('sign-up')
    createUser(@Body(ValidationPipe) createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Post('/login')
    async loginRoot(
        @Body()
        login: LoginRequest
    ) {
        return this.userService.login(login);
    }
    @Post('/googleLogin')
    async gloginRoot(
        @Body()
        login: GoogleLoginRequest
    ) {
        return this.userService.googleLogin(login);
    }
}
