import { createParamDecorator, ExecutionContext, NotFoundException } from "@nestjs/common";

export const  User = createParamDecorator((filter: string, context: ExecutionContext) => {

    const request = context.switchToHttp().getRequest();

    if(request.user){

        if(filter){
            return request.user[filter]
        }
        else {
            return  request.user;
        }
    }else {
        return new  NotFoundException("Usuário não encontrado no Request. Verificar AuthGuard na rota.")
    }
})