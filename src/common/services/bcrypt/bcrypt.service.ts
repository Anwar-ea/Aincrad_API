import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {

    async hashPassword(password: string): Promise<string> {
        const saltRouds = 10;
        const salt  = await bcrypt.genSalt(8, 'a');
        let hash = await bcrypt.hash(password, salt);
        return hash;
    }

    async comparePassword(password :string, hash: string): Promise<boolean>{
        return await bcrypt.compare(password, hash);
    }
}
