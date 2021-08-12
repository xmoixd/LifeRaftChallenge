import { Document } from 'mongoose';

export default interface ICustomer extends Document {
    name: string;
    address: {
        street: string,
        houseNumber: number,
        city: string,
        stateProvince: string,
    };
    phoneNumber: string;
    email: string;
}
