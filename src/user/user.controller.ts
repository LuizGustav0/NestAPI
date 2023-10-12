import { Body, Controller, Get, Param, Post, Put, Patch, Delete } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";

@Controller("users")
export class UserController {

    @Post()
    async create(@Body() {email, name, password}: CreateUserDTO){
        return {email, name, password};
    }

    @Get()
    async list(){
        return {users: []};
    }

    @Get(":id")
    async show(@Param() parms){
        return {user: {}, parms};
    }

    @Put(":id")
    async update(@Body()  {email, name, password}: UpdatePutUserDTO, @Param() parms){
        return {
            method: "PUT",
            email, 
            name,
            password,
            parms
        };
    }

    @Patch(":id")
    async updateParcial(@Body() {email, name, password}: UpdatePatchUserDTO, @Param() parms){
        return {
            method: "PATCH",
            email, 
            name,
            password,
            parms
        };
    }

    @Delete(":id")
    async delete(@Param() parms){
        return {                   
            parms
        };
    }

}