import mongoose, { Schema } from 'mongoose';
import ICustomer from '../interfaces/customer';
import isEmail from 'validator/lib/isEmail';
import mongooseDelete, { SoftDeleteModel } from 'mongoose-delete';

const CustomerSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        address: {
            street: { type: String, required: true },
            houseNumber: { type: Number, required: true },
            city: { type: String, required: true },
            stateProvince: { type: String, required: true },
        },
        phoneNumber: { type: String, required: true },
        email: { type: String, required: true,  validate: [ isEmail, 'invalid email format' ] }
    },
    {
        timestamps: true
    }
);

CustomerSchema.plugin(mongooseDelete, { deletedAt : true, overrideMethods: true  });

export default mongoose.model<ICustomer, SoftDeleteModel<ICustomer>>('Customer', CustomerSchema);
