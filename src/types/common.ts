export type ArgumentsType<F extends (...args: any[]) => any> = F extends (...args: infer A) => any ? A : never;

export type Require<T extends { [index: string]: any }, P extends keyof T> = {
  [K in keyof Pick<T, P>]-?: T[K];
} & Pick<T, Exclude<keyof T, P>>;

export type LengthOfTuple<T extends (any[] | readonly any[])> = T extends { length: infer L } ? L : never;

export type DropFirstInTuple<T extends (any[] | readonly any[])> = ((...args: T) => any) extends (arg: any, ...rest: infer U) => any ? U : T;

export type LastInTuple<T extends (any[] | readonly any[])> = T[LengthOfTuple<DropFirstInTuple<T>>];

export type OmitNullish<T extends { [index: string]: any }> = {
  [K in keyof T]?: Exclude<T[K], null | undefined>;
};

export type MapperFn<T, R> = (item: T, index: number) => R;
