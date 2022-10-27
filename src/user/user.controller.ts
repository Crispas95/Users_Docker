import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDTO } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';
import { UserDocument } from './user.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor( private userService: UserService){}

    @Get()
    async getAllUsers():Promise<UserDocument[]>{
      return  await this.userService.getAllUsers()
    }
    
    @Get(':id')
    async findById(@Param('id') id : string): Promise<UserDocument>{
      const users = await this.userService.getUserById(id);
  
      if(!users){
        throw new NotFoundException('user with that id is not found');
      } else{
          return users;
      }
    }

    @Post()
    async create(@Body() createUserDto:CreateUserDTO):Promise<UserDocument>{
      return this.userService.createUser(createUserDto);
    }

    @Patch(':id')
    async updateUser(@Param('id')id,@Body() updateUserDto: UpdateUserDto):Promise<UserDocument>{
      const user = await this.userService.getUserById(id);
 
      if(!user){
       throw new NotFoundException;
      }else{
       return this.userService.updateUser(id,updateUserDto);
      }
      
    } 

    @Delete(':id')
    async deleteUser(@Param('id') id: string):Promise<UserDocument>{
     const patient = await this.userService.getUserById(id);
 
     if(!patient){
      throw new NotFoundException;
     }else{
       return this.userService.deleteUser(id);
     }
     
    }

}
