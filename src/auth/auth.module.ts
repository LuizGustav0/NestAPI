import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { UserModule } from "src/user/user.module";
import { PrismaModule } from "src/prisma/prisma.module";
import { AuthService } from "./auth.service";
import { UserService } from "src/user/user.service";

@Module({
    imports: [JwtModule.register({
        secret: "R]k&2yZ£M@g!X6{^SC7uAUH,|:H=i|0&"
    }), 
    UserModule,
    PrismaModule
    ],
    controllers: [AuthController],
    providers: [AuthService, UserService]

})
export class AuthModule {

}