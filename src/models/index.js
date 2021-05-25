// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const OrderStatus = {
  "PROCURED": "PROCURED",
  "SHIPPING": "SHIPPING",
  "COMPLETE": "COMPLETE",
  "OPEN": "OPEN"
};

const { Part, Order, Supplier, Location } = initSchema(schema);

export {
  Part,
  Order,
  Supplier,
  OrderStatus,
  Location
};