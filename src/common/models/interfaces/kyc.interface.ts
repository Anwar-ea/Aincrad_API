import { Status } from "src/common/constants/enums/Status";
import { User } from "../entities/user-entity";

export interface IKYC {
    _id: string;
    firstName: string;
    lastName: string;
    createdDate: string;
    dateOfBirth: string;
    NICNumber: string;
    passportNumber: string;
    documentExpiryDate: string;
    status: Status;
    user: User
}
