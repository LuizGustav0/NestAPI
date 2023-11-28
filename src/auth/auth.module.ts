import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [JwtModule.register({
        secret: "R]k&2yZ£M@g!X6{^SC7uAUH,|:H=i|0&"
    })]

})
export class AuthModule {

}