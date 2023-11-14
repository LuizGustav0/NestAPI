import { Injectable } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";


@Injectable()
export class UserService {

    constructor(private readonly prisma: PrismaService) {

    }

    async create(data: CreateUserDTO){

       return this.prisma.user.create({
            data,            
       })
    }

    async list(){

        return this.prisma.user.findMany();
    }


    async show(id: number){

        return this.prisma.user.findUnique({
            where: {
                id
            }
        });
    }


    async update(id: number, data: UpdatePutUserDTO){
          return this.prisma.user.update({
            data,
            where: {
                id
            }
        });
    }

    async updateParcial(id: number, data: UpdatePatchUserDTO){
        return this.prisma.user.update({
            data,
            where: {
                id
            }
        });
    }
}