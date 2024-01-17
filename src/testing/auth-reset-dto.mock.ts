import { AuthResetDTO } from "../auth/dto/auth-Reset.dto";
import { resetToken } from "./reset-token.mock";


export const authResetDTO:AuthResetDTO =  { 
    password: 'ResetPassword@4344',
    token: resetToken
}