import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum OrderStatus {
  PROCURED = "PROCURED",
  SHIPPING = "SHIPPING",
  COMPLETE = "COMPLETE",
  OPEN = "OPEN"
}

export declare class Location {
  readonly long?: number;
  readonly lat?: number;
  constructor(init: ModelInit<Location>);
}

export declare class Order {
  readonly id: string;
  readonly quantity?: number;
  readonly costCenter?: string;
  readonly partID?: string;
  readonly location?: Location;
  readonly status?: OrderStatus | keyof typeof OrderStatus;
  constructor(init: ModelInit<Order>);
  static copyOf(source: Order, mutator: (draft: MutableModel<Order>) => MutableModel<Order> | void): Order;
}

export declare class Supplier {
  readonly id: string;
  readonly name?: string;
  readonly address?: string;
  readonly Parts?: (Part | null)[];
  constructor(init: ModelInit<Supplier>);
  static copyOf(source: Supplier, mutator: (draft: MutableModel<Supplier>) => MutableModel<Supplier> | void): Supplier;
}

export declare class Part {
  readonly id: string;
  readonly name?: string;
  readonly supplierID?: string;
  readonly Orders?: (Order | null)[];
  constructor(init: ModelInit<Part>);
  static copyOf(source: Part, mutator: (draft: MutableModel<Part>) => MutableModel<Part> | void): Part;
}