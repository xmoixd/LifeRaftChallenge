import express from 'express';
import controller from '../controllers/customer';

const router = express.Router();

router.post('/create/customer', controller.createCustomer);
router.get('/get/customers', controller.getAllCustomers);
router.get('/get/customer/:id', controller.getCustomerById);
router.put('/put/customer/:id', controller.updateCustomer);
router.delete('/delete/customer/:id', controller.deleteCustomer);

export = router;
