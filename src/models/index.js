// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const OrderStatus = {
  "PROCURED": "PROCURED",
  "SHIPPING": "SHIPPING",
  "COMPLETE": "COMPLETE",
  "OPEN": "OPEN"
};

const { Order, Supplier, Part, Location } = initSchema(schema);

export {
  Order,
  Supplier,
  Part,
  OrderStatus,
  Location
};