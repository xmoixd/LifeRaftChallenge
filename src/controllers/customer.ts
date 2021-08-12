import {  Request, Response } from 'express';
import mongoose from 'mongoose';
import Customer from '../models/customer';

const createCustomer = async (req: Request, res: Response) => {
    let { name, email, phoneNumber, address } = req.body;

    try {
        const customer = new Customer({
            _id: new mongoose.Types.ObjectId(),
            name,
            email,
            phoneNumber,
            address
        });

        await customer.save();
        res.status(201).json(customer);
    } catch (error) {
        res.status(500).json({
            message: error.message,
            error
        });
    }
};

const getAllCustomers = async (req: Request, res: Response) => {
    try {
        const customers = await Customer.find();
        res.status(200).json({
            customers: customers,
            count: customers.length
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            error
        });
    }
};

const getCustomerById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const customer = await Customer.find({ _id: id });
        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({
            message: error.message,
            error
        });
    }
};

const updateCustomer = async (req: Request, res: Response) => {
    const { name,  email,  phoneNumber, address } = req.body;
    const { id } = req.params;
    const query = { _id: id };

    try {
        const customer = await Customer.findOneAndUpdate(query, { name, email, phoneNumber, address },
            { upsert: true, runValidators: true,  new: true } );
        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({
            message: error.message,
            error
        });
    }
};

const deleteCustomer = async (req: Request, res: Response) => {
    const { id } = req.params;
    const query = { _id: id };

    try {
        const customer = await Customer.delete(query)
        res.status(200).json({
            id,
            message: 'customer has been deleted'
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            error
        });
    }
};

export default { createCustomer, getAllCustomers, getCustomerById, updateCustomer, deleteCustomer };
