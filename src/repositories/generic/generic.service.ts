import { Model, HydratedDocument } from 'mongoose';

export abstract class GenericService<T> {

    constructor(protected readonly model: Model<T>) {}

    async find(query?: object, callback?: Function): Promise<HydratedDocument<T>[]>{
       if (callback) return await this.model.find(callback);
       if (query) return await this.model.find(query);
       return await this.model.find();
    }

    async findOne(query?: object, callback?: Function): Promise<HydratedDocument<T>>{
        if (callback) return await this.model.findOne(callback);
       if (query) return await this.model.findOne(query);
       return await this.model.findOne();
    }

    async findOneById(id: string): Promise<HydratedDocument<T>>{
        return await this.model.findById(id);
    }

    async delete(id: string): Promise<HydratedDocument<T>>{

        return await this.model.findByIdAndDelete(id);
    }

    async update(id:string, model: T): Promise<HydratedDocument<T>>{
      return await this.model.findByIdAndUpdate(id, model);
    }

    async add(model: T): Promise<HydratedDocument<T>>{
        let newDocument = new this.model(model);
        return newDocument;
    }

    async save(model: HydratedDocument<T>): Promise<void>{
        try{
            await model.save();
        }
        catch(err){
            console.log(err);
            
            throw new Error(err);
        }
    }

    async exists(condition: object): Promise<boolean>{
        let document = await this.model.exists(condition);        
        if(document) return true;
        return false;
    }

}
