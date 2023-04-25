import { HttpStatus, Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, GoogleLoginRequest, LoginRequest, LoginResponse, ProfileResponse, UpdatePasswordRequest } from 'src/lib/dto';
import { User } from 'src/lib/entities';
import { Repository } from 'typeorm'; 
import { isDefined } from "class-validator";
import { BaseException } from 'src/lib/exception';
import { getRounds, hash, compare } from 'bcrypt';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService  {

    private readonly logger: Logger = new Logger(this.constructor.name);

    constructor(@InjectRepository(User)
    private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService) { }

    async create(createUserDto: CreateUserDto) {
        const user = new User();
        user.email = createUserDto.email;
        user.fullName = createUserDto.fullName;
        user.password = await hash(createUserDto.password, 10);
        user.image = createUserDto.image;
        const result = await this.userRepository.save(user);
        return result;
    }
    changePassword(user: User, updatePasswordRequest: UpdatePasswordRequest) {
        updatePasswordRequest.user = user;
    }


    async login(loginRequest: LoginRequest) {
       
        const user = await this.userRepository.findOne({
            where: {
                email: loginRequest.email,
            }
        })
        if (!isDefined(user)) {
            throw new BaseException(
                'Uh oh. Are you sure? Check your email or password.',
                HttpStatus.BAD_REQUEST,
            );
        }
        const isPasswordMatching = await compare(
            loginRequest.password,
            user.password,
        );
        if (!isPasswordMatching) {
            throw new BaseException(
                'Uh oh. Are you sure? Check your email or password.',
                HttpStatus.BAD_REQUEST,
            );
        }
        user.password = undefined;
        const loginResponse = new LoginResponse();
        loginResponse.accessToken = this.generateUserJwtToken(user);
        loginResponse.user = user;
        return loginResponse;
    }

    async loginGoogle(
        loginRequest: GoogleLoginRequest,
    ): Promise<ProfileResponse> {
        const user = await this.userRepository.findOne({
            where: {
                email: loginRequest.email,
            }
        })
        if (!isDefined(user)) {
            const newGoogleUser = new User();
            newGoogleUser.email = loginRequest.email;
            newGoogleUser.fullName = loginRequest.name;
            newGoogleUser.provider = loginRequest.provider;
            newGoogleUser.image = loginRequest.image;

            try {
                const user = await this.userRepository.save(newGoogleUser);
                user.password = undefined;
                const loginResponse = new LoginResponse();
                loginResponse.accessToken = this.generateUserJwtToken(user);
                loginResponse.user = user;
                return loginResponse;
            } catch (e) {
                console.log(e)
            }

        } else {
            const loginResponse = new LoginResponse();
            loginResponse.accessToken = this.generateUserJwtToken(user);
            loginResponse.user = user;
            return loginResponse;
        }

    }
    async googleLogin(loginRequest: GoogleLoginRequest) {
        
        const user = await this.userRepository.findOne({
            where: {
                email: loginRequest.email,
            }
        })
        if (!isDefined(user)) {
            const newGoogleUser = new User();
            newGoogleUser.email = loginRequest.email;
            newGoogleUser.fullName = loginRequest.name;
            newGoogleUser.provider = loginRequest.provider;
            newGoogleUser.image = loginRequest.image;

            try {
                const user = await this.userRepository.save(newGoogleUser);
                user.password = undefined;
                const loginResponse = new LoginResponse();
                loginResponse.accessToken = this.generateUserJwtToken(user);
                loginResponse.user = user;
                return loginResponse;
            } catch (e) {
                console.log(e)
            }

        } else {
            const loginResponse = new LoginResponse();
            loginResponse.accessToken = this.generateUserJwtToken(user);
            loginResponse.user = user;
            return loginResponse;
        }


    }

    async getUserById(id: string) {
        return await this.userRepository.findOne({
            where: {
                id,
            }
        });

    }


    async getByIdWithCaching(id: string) {
        const user = await this.getUserById(id);
        if (!user) {
            throw new ExceptionsHandler();
        }
        return user;
    }
    public generateUserJwtToken(user: User): string {
        return this.jwtService.sign({ sub: user.id, cometToken: user.cometToken });
    }
}
