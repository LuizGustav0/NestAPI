import { Body, Controller, Get, Param, Post, Put, Patch, Delete } from "@nestjs/common";

@Controller("users")
export class UserController {

    @Post()
    async create(@Body() body){
        return {body};
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
    async update(@Body() body, @Param() parms){
        return {
            method: "PUT",
            body,
            parms
        };
    }

    @Patch(":id")
    async updateParcial(@Body() body, @Param() parms){
        return {
            method: "PATCH",
            body,
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