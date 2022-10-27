import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDTO } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';
import { UserDocument } from './user.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<UserDocument>){}

    async getAllUsers(): Promise<UserDocument[]>{
        const users = await this.userModel.find().exec();
        return users;
    }

    async getUserById(id: string): Promise<UserDocument>{
        const users = await this.userModel.findById(id).exec();
        return users;
    }

    async createUser( createUserDTO:CreateUserDTO): Promise<UserDocument>{
        const newUser = await this.userModel.create(createUserDTO)
        return newUser.save();
    }

    async updateUser(id: string, updateUserDTO:UpdateUserDto):Promise<UserDocument>{
        const updatedUser = await this.userModel
        .findByIdAndUpdate(id, updateUserDTO, {new: true})
        return updatedUser;
    }

    async deleteUser(id: string): Promise<any>{
        const deletedUser = await this.userModel.findByIdAndRemove(id);
        return deletedUser;
    }
}
