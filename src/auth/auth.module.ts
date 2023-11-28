import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { UserModule } from "src/user/user.module";
import { UserService } from "src/user/user.service";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
    imports: [JwtModule.register({
        secret: "R]k&2yZ£M@g!X6{^SC7uAUH,|:H=i|0&"
    }), 
    UserModule,
    PrismaModule
],
    controllers: [AuthController],
    exports: [UserService]

})
export class AuthModule {

}