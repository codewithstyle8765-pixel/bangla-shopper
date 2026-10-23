import type { Operation } from "../define";
import { affiliateOperations } from "./affiliate";
import { cartOperations } from "./cart";
import { catalogOperations } from "./catalog";
import { checkoutOperations } from "./checkout";
import { customerOperations } from "./customer";

/** Everything `/api/graphql` will run. Server only; the browser imports types from here, never values. */
export const OPERATIONS = { ...affiliateOperations, ...cartOperations, ...catalogOperations, ...checkoutOperations, ...customerOperations };

type Operations = typeof OPERATIONS;

export type OperationName = keyof Operations;
export type OperationInput<N extends OperationName> = Operations[N] extends Operation<infer I, infer _O> ? I : never;
export type OperationOutput<N extends OperationName> = Operations[N] extends Operation<infer _I, infer O> ? O : never;

/** Operations submitted from a <form> (input is FormData). */
export type FormOperationName = { [N in OperationName]: OperationInput<N> extends FormData ? N : never }[OperationName];

export function isOperation(name: unknown): name is OperationName {
  return typeof name === "string" && Object.hasOwn(OPERATIONS, name);
}
