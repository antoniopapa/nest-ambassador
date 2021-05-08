import {Module} from '@nestjs/common';
import {UserController} from './user.controller';
import {UserService} from './user.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./user";
import {SharedModule} from "../shared/shared.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        SharedModule
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule {
}
