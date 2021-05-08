import {Module} from '@nestjs/common';
import {LinkController} from './link.controller';
import {LinkService} from './link.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Link} from "./link";
import {SharedModule} from "../shared/shared.module";
import {AuthModule} from "../auth/auth.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Link]),
        SharedModule,
        AuthModule
    ],
    controllers: [LinkController],
    providers: [LinkService],
    exports: [LinkService]
})
export class LinkModule {
}
