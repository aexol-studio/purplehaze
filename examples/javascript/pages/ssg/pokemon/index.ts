/* eslint-disable */

export const AllTypesProps: Record<string,any> = {
	Query:{
		pokemons:{
			first:{
				type:"Int",
				array:false,
				arrayRequired:false,
				required:true
			}
		},
		pokemon:{
			id:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			name:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		}
	}
}

export const ReturnTypes: Record<string,any> = {
	Query:{
		query:"Query",
		pokemons:"Pokemon",
		pokemon:"Pokemon"
	},
	Pokemon:{
		id:"ID",
		number:"String",
		name:"String",
		weight:"PokemonDimension",
		height:"PokemonDimension",
		classification:"String",
		types:"String",
		resistant:"String",
		attacks:"PokemonAttack",
		weaknesses:"String",
		fleeRate:"Float",
		maxCP:"Int",
		evolutions:"Pokemon",
		evolutionRequirements:"PokemonEvolutionRequirement",
		maxHP:"Int",
		image:"String"
	},
	PokemonDimension:{
		minimum:"String",
		maximum:"String"
	},
	PokemonAttack:{
		fast:"Attack",
		special:"Attack"
	},
	Attack:{
		name:"String",
		type:"String",
		damage:"Int"
	},
	PokemonEvolutionRequirement:{
		amount:"Int",
		name:"String"
	}
}
type ZEUS_INTERFACES = never
type ZEUS_UNIONS = never

export type ValueTypes = {
    /** Query any Pokémon by number or name */
["Query"]: AliasType<{
	query?:ValueTypes["Query"],
pokemons?: [{	first:number},ValueTypes["Pokemon"]],
pokemon?: [{	id?:string | null,	name?:string | null},ValueTypes["Pokemon"]],
		__typename?: boolean
}>;
	/** Represents a Pokémon */
["Pokemon"]: AliasType<{
	/** The ID of an object */
	id?:boolean,
	/** The identifier of this Pokémon */
	number?:boolean,
	/** The name of this Pokémon */
	name?:boolean,
	/** The minimum and maximum weight of this Pokémon */
	weight?:ValueTypes["PokemonDimension"],
	/** The minimum and maximum weight of this Pokémon */
	height?:ValueTypes["PokemonDimension"],
	/** The classification of this Pokémon */
	classification?:boolean,
	/** The type(s) of this Pokémon */
	types?:boolean,
	/** The type(s) of Pokémons that this Pokémon is resistant to */
	resistant?:boolean,
	/** The attacks of this Pokémon */
	attacks?:ValueTypes["PokemonAttack"],
	/** The type(s) of Pokémons that this Pokémon weak to */
	weaknesses?:boolean,
	fleeRate?:boolean,
	/** The maximum CP of this Pokémon */
	maxCP?:boolean,
	/** The evolutions of this Pokémon */
	evolutions?:ValueTypes["Pokemon"],
	/** The evolution requirements of this Pokémon */
	evolutionRequirements?:ValueTypes["PokemonEvolutionRequirement"],
	/** The maximum HP of this Pokémon */
	maxHP?:boolean,
	image?:boolean,
		__typename?: boolean
}>;
	/** Represents a Pokémon's dimensions */
["PokemonDimension"]: AliasType<{
	/** The minimum value of this dimension */
	minimum?:boolean,
	/** The maximum value of this dimension */
	maximum?:boolean,
		__typename?: boolean
}>;
	/** Represents a Pokémon's attack types */
["PokemonAttack"]: AliasType<{
	/** The fast attacks of this Pokémon */
	fast?:ValueTypes["Attack"],
	/** The special attacks of this Pokémon */
	special?:ValueTypes["Attack"],
		__typename?: boolean
}>;
	/** Represents a Pokémon's attack types */
["Attack"]: AliasType<{
	/** The name of this Pokémon attack */
	name?:boolean,
	/** The type of this Pokémon attack */
	type?:boolean,
	/** The damage of this Pokémon attack */
	damage?:boolean,
		__typename?: boolean
}>;
	/** Represents a Pokémon's requirement to evolve */
["PokemonEvolutionRequirement"]: AliasType<{
	/** The amount of candy to evolve */
	amount?:boolean,
	/** The name of the candy to evolve */
	name?:boolean,
		__typename?: boolean
}>
  }

export type ModelTypes = {
    /** Query any Pokémon by number or name */
["Query"]: {
		query?:ModelTypes["Query"],
	pokemons?:(ModelTypes["Pokemon"] | undefined)[],
	pokemon?:ModelTypes["Pokemon"]
};
	/** Represents a Pokémon */
["Pokemon"]: {
		/** The ID of an object */
	id:string,
	/** The identifier of this Pokémon */
	number?:string,
	/** The name of this Pokémon */
	name?:string,
	/** The minimum and maximum weight of this Pokémon */
	weight?:ModelTypes["PokemonDimension"],
	/** The minimum and maximum weight of this Pokémon */
	height?:ModelTypes["PokemonDimension"],
	/** The classification of this Pokémon */
	classification?:string,
	/** The type(s) of this Pokémon */
	types?:(string | undefined)[],
	/** The type(s) of Pokémons that this Pokémon is resistant to */
	resistant?:(string | undefined)[],
	/** The attacks of this Pokémon */
	attacks?:ModelTypes["PokemonAttack"],
	/** The type(s) of Pokémons that this Pokémon weak to */
	weaknesses?:(string | undefined)[],
	fleeRate?:number,
	/** The maximum CP of this Pokémon */
	maxCP?:number,
	/** The evolutions of this Pokémon */
	evolutions?:(ModelTypes["Pokemon"] | undefined)[],
	/** The evolution requirements of this Pokémon */
	evolutionRequirements?:ModelTypes["PokemonEvolutionRequirement"],
	/** The maximum HP of this Pokémon */
	maxHP?:number,
	image?:string
};
	/** Represents a Pokémon's dimensions */
["PokemonDimension"]: {
		/** The minimum value of this dimension */
	minimum?:string,
	/** The maximum value of this dimension */
	maximum?:string
};
	/** Represents a Pokémon's attack types */
["PokemonAttack"]: {
		/** The fast attacks of this Pokémon */
	fast?:(ModelTypes["Attack"] | undefined)[],
	/** The special attacks of this Pokémon */
	special?:(ModelTypes["Attack"] | undefined)[]
};
	/** Represents a Pokémon's attack types */
["Attack"]: {
		/** The name of this Pokémon attack */
	name?:string,
	/** The type of this Pokémon attack */
	type?:string,
	/** The damage of this Pokémon attack */
	damage?:number
};
	/** Represents a Pokémon's requirement to evolve */
["PokemonEvolutionRequirement"]: {
		/** The amount of candy to evolve */
	amount?:number,
	/** The name of the candy to evolve */
	name?:string
}
    }

export type GraphQLTypes = {
    /** Query any Pokémon by number or name */
["Query"]: {
	__typename: "Query",
	query?: GraphQLTypes["Query"],
	pokemons?: Array<GraphQLTypes["Pokemon"] | undefined>,
	pokemon?: GraphQLTypes["Pokemon"]
};
	/** Represents a Pokémon */
["Pokemon"]: {
	__typename: "Pokemon",
	/** The ID of an object */
	id: string,
	/** The identifier of this Pokémon */
	number?: string,
	/** The name of this Pokémon */
	name?: string,
	/** The minimum and maximum weight of this Pokémon */
	weight?: GraphQLTypes["PokemonDimension"],
	/** The minimum and maximum weight of this Pokémon */
	height?: GraphQLTypes["PokemonDimension"],
	/** The classification of this Pokémon */
	classification?: string,
	/** The type(s) of this Pokémon */
	types?: Array<string | undefined>,
	/** The type(s) of Pokémons that this Pokémon is resistant to */
	resistant?: Array<string | undefined>,
	/** The attacks of this Pokémon */
	attacks?: GraphQLTypes["PokemonAttack"],
	/** The type(s) of Pokémons that this Pokémon weak to */
	weaknesses?: Array<string | undefined>,
	fleeRate?: number,
	/** The maximum CP of this Pokémon */
	maxCP?: number,
	/** The evolutions of this Pokémon */
	evolutions?: Array<GraphQLTypes["Pokemon"] | undefined>,
	/** The evolution requirements of this Pokémon */
	evolutionRequirements?: GraphQLTypes["PokemonEvolutionRequirement"],
	/** The maximum HP of this Pokémon */
	maxHP?: number,
	image?: string
};
	/** Represents a Pokémon's dimensions */
["PokemonDimension"]: {
	__typename: "PokemonDimension",
	/** The minimum value of this dimension */
	minimum?: string,
	/** The maximum value of this dimension */
	maximum?: string
};
	/** Represents a Pokémon's attack types */
["PokemonAttack"]: {
	__typename: "PokemonAttack",
	/** The fast attacks of this Pokémon */
	fast?: Array<GraphQLTypes["Attack"] | undefined>,
	/** The special attacks of this Pokémon */
	special?: Array<GraphQLTypes["Attack"] | undefined>
};
	/** Represents a Pokémon's attack types */
["Attack"]: {
	__typename: "Attack",
	/** The name of this Pokémon attack */
	name?: string,
	/** The type of this Pokémon attack */
	type?: string,
	/** The damage of this Pokémon attack */
	damage?: number
};
	/** Represents a Pokémon's requirement to evolve */
["PokemonEvolutionRequirement"]: {
	__typename: "PokemonEvolutionRequirement",
	/** The amount of candy to evolve */
	amount?: number,
	/** The name of the candy to evolve */
	name?: string
}
    }

export class GraphQLError extends Error {
    constructor(public response: GraphQLResponse) {
      super("");
      console.error(response);
    }
    toString() {
      return "GraphQL Response Error";
    }
  }


export type UnwrapPromise<T> = T extends Promise<infer R> ? R : T;
export type ZeusState<T extends (...args: any[]) => Promise<any>> = NonNullable<
  UnwrapPromise<ReturnType<T>>
>;
export type ZeusHook<
  T extends (
    ...args: any[]
  ) => Record<string, (...args: any[]) => Promise<any>>,
  N extends keyof ReturnType<T>
> = ZeusState<ReturnType<T>[N]>;

type WithTypeNameValue<T> = T & {
  __typename?: boolean;
};
type AliasType<T> = WithTypeNameValue<T> & {
  __alias?: Record<string, WithTypeNameValue<T>>;
};
export interface GraphQLResponse {
  data?: Record<string, any>;
  errors?: Array<{
    message: string;
  }>;
}
type DeepAnify<T> = {
  [P in keyof T]?: any;
};
type IsPayLoad<T> = T extends [any, infer PayLoad] ? PayLoad : T;
type IsArray<T, U> = T extends Array<infer R> ? InputType<R, U>[] : InputType<T, U>;
type FlattenArray<T> = T extends Array<infer R> ? R : T;

type IsInterfaced<SRC extends DeepAnify<DST>, DST> = FlattenArray<SRC> extends ZEUS_INTERFACES | ZEUS_UNIONS
  ? {
      [P in keyof SRC]: SRC[P] extends '__union' & infer R
        ? P extends keyof DST
          ? IsArray<R, '__typename' extends keyof DST ? DST[P] & { __typename: true } : DST[P]>
          : {}
        : never;
    }[keyof DST] &
      {
        [P in keyof Omit<
          Pick<
            SRC,
            {
              [P in keyof DST]: SRC[P] extends '__union' & infer R ? never : P;
            }[keyof DST]
          >,
          '__typename'
        >]: IsPayLoad<DST[P]> extends boolean ? SRC[P] : IsArray<SRC[P], DST[P]>;
      }
  : {
      [P in keyof Pick<SRC, keyof DST>]: IsPayLoad<DST[P]> extends boolean ? SRC[P] : IsArray<SRC[P], DST[P]>;
    };

export type MapType<SRC, DST> = SRC extends DeepAnify<DST> ? IsInterfaced<SRC, DST> : never;
export type InputType<SRC, DST> = IsPayLoad<DST> extends { __alias: infer R }
  ? {
      [P in keyof R]: MapType<SRC, R[P]>;
    } &
      MapType<SRC, Omit<IsPayLoad<DST>, '__alias'>>
  : MapType<SRC, IsPayLoad<DST>>;
type Func<P extends any[], R> = (...args: P) => R;
type AnyFunc = Func<any, any>;
export type ArgsType<F extends AnyFunc> = F extends Func<infer P, any> ? P : never;
export type OperationOptions = {
  variables?: Record<string, any>;
  operationName?: string;
};
export type SubscriptionToGraphQL<Z, T> = {
  ws: WebSocket;
  on: (fn: (args: InputType<T, Z>) => void) => void;
  off: (fn: (e: { data?: InputType<T, Z>; code?: number; reason?: string; message?: string }) => void) => void;
  error: (fn: (e: { data?: InputType<T, Z>; errors?: string[] }) => void) => void;
  open: () => void;
};
export type SelectionFunction<V> = <T>(t: T | V) => T;
export type fetchOptions = ArgsType<typeof fetch>;
type websocketOptions = typeof WebSocket extends new (
  ...args: infer R
) => WebSocket
  ? R
  : never;
export type chainOptions =
  | [fetchOptions[0], fetchOptions[1] & {websocket?: websocketOptions}]
  | [fetchOptions[0]];
export type FetchFunction = (
  query: string,
  variables?: Record<string, any>,
) => Promise<any>;
export type SubscriptionFunction = (query: string) => any;
type NotUndefined<T> = T extends undefined ? never : T;
export type ResolverType<F> = NotUndefined<F extends [infer ARGS, any] ? ARGS : undefined>;



export const ZeusSelect = <T>() => ((t: any) => t) as SelectionFunction<T>;

export const ScalarResolver = (scalar: string, value: any) => {
  switch (scalar) {
    case 'String':
      return  `${JSON.stringify(value)}`;
    case 'Int':
      return `${value}`;
    case 'Float':
      return `${value}`;
    case 'Boolean':
      return `${value}`;
    case 'ID':
      return `"${value}"`;
    case 'enum':
      return `${value}`;
    case 'scalar':
      return `${value}`;
    default:
      return false;
  }
};


export const TypesPropsResolver = ({
    value,
    type,
    name,
    key,
    blockArrays
}: {
    value: any;
    type: string;
    name: string;
    key?: string;
    blockArrays?: boolean;
}): string => {
    if (value === null) {
        return `null`;
    }
    let resolvedValue = AllTypesProps[type][name];
    if (key) {
        resolvedValue = resolvedValue[key];
    }
    if (!resolvedValue) {
        throw new Error(`Cannot resolve ${type} ${name}${key ? ` ${key}` : ''}`)
    }
    const typeResolved = resolvedValue.type;
    const isArray = resolvedValue.array;
    const isArrayRequired = resolvedValue.arrayRequired;
    if (typeof value === 'string' && value.startsWith(`ZEUS_VAR$`)) {
        const isRequired = resolvedValue.required ? '!' : '';
        let t = `${typeResolved}`;
        if (isArray) {
          if (isRequired) {
              t = `${t}!`;
          }
          t = `[${t}]`;
          if(isArrayRequired){
            t = `${t}!`;
          }
        }else{
          if (isRequired) {
                t = `${t}!`;
          }
        }
        return `\$${value.split(`ZEUS_VAR$`)[1]}__ZEUS_VAR__${t}`;
    }
    if (isArray && !blockArrays) {
        return `[${value
        .map((v: any) => TypesPropsResolver({ value: v, type, name, key, blockArrays: true }))
        .join(',')}]`;
    }
    const reslovedScalar = ScalarResolver(typeResolved, value);
    if (!reslovedScalar) {
        const resolvedType = AllTypesProps[typeResolved];
        if (typeof resolvedType === 'object') {
        const argsKeys = Object.keys(resolvedType);
        return `{${argsKeys
            .filter((ak) => value[ak] !== undefined)
            .map(
            (ak) => `${ak}:${TypesPropsResolver({ value: value[ak], type: typeResolved, name: ak })}`
            )}}`;
        }
        return ScalarResolver(AllTypesProps[typeResolved], value) as string;
    }
    return reslovedScalar;
};


const isArrayFunction = (
  parent: string[],
  a: any[]
) => {
  const [values, r] = a;
  const [mainKey, key, ...keys] = parent;
  const keyValues = Object.keys(values).filter((k) => typeof values[k] !== 'undefined');

  if (!keys.length) {
      return keyValues.length > 0
        ? `(${keyValues
            .map(
              (v) =>
                `${v}:${TypesPropsResolver({
                  value: values[v],
                  type: mainKey,
                  name: key,
                  key: v
                })}`
            )
            .join(',')})${r ? traverseToSeekArrays(parent, r) : ''}`
        : traverseToSeekArrays(parent, r);
    }

  const [typeResolverKey] = keys.splice(keys.length - 1, 1);
  let valueToResolve = ReturnTypes[mainKey][key];
  for (const k of keys) {
    valueToResolve = ReturnTypes[valueToResolve][k];
  }

  const argumentString =
    keyValues.length > 0
      ? `(${keyValues
          .map(
            (v) =>
              `${v}:${TypesPropsResolver({
                value: values[v],
                type: valueToResolve,
                name: typeResolverKey,
                key: v
              })}`
          )
          .join(',')})${r ? traverseToSeekArrays(parent, r) : ''}`
      : traverseToSeekArrays(parent, r);
  return argumentString;
};


const resolveKV = (k: string, v: boolean | string | { [x: string]: boolean | string }) =>
  typeof v === 'boolean' ? k : typeof v === 'object' ? `${k}{${objectToTree(v)}}` : `${k}${v}`;


const objectToTree = (o: { [x: string]: boolean | string }): string =>
  `{${Object.keys(o).map((k) => `${resolveKV(k, o[k])}`).join(' ')}}`;


const traverseToSeekArrays = (parent: string[], a?: any): string => {
  if (!a) return '';
  if (Object.keys(a).length === 0) {
    return '';
  }
  let b: Record<string, any> = {};
  if (Array.isArray(a)) {
    return isArrayFunction([...parent], a);
  } else {
    if (typeof a === 'object') {
      Object.keys(a)
        .filter((k) => typeof a[k] !== 'undefined')
        .forEach((k) => {
        if (k === '__alias') {
          Object.keys(a[k]).forEach((aliasKey) => {
            const aliasOperations = a[k][aliasKey];
            const aliasOperationName = Object.keys(aliasOperations)[0];
            const aliasOperation = aliasOperations[aliasOperationName];
            b[
              `${aliasOperationName}__alias__${aliasKey}: ${aliasOperationName}`
            ] = traverseToSeekArrays([...parent, aliasOperationName], aliasOperation);
          });
        } else {
          b[k] = traverseToSeekArrays([...parent, k], a[k]);
        }
      });
    } else {
      return '';
    }
  }
  return objectToTree(b);
};  


const buildQuery = (type: string, a?: Record<any, any>) => 
  traverseToSeekArrays([type], a);


const inspectVariables = (query: string) => {
  const regex = /\$\b\w*__ZEUS_VAR__\[?[^!^\]^\s^,^\)^\}]*[!]?[\]]?[!]?/g;
  let result;
  const AllVariables: string[] = [];
  while ((result = regex.exec(query))) {
    if (AllVariables.includes(result[0])) {
      continue;
    }
    AllVariables.push(result[0]);
  }
  if (!AllVariables.length) {
    return query;
  }
  let filteredQuery = query;
  AllVariables.forEach((variable) => {
    while (filteredQuery.includes(variable)) {
      filteredQuery = filteredQuery.replace(variable, variable.split('__ZEUS_VAR__')[0]);
    }
  });
  return `(${AllVariables.map((a) => a.split('__ZEUS_VAR__'))
    .map(([variableName, variableType]) => `${variableName}:${variableType}`)
    .join(', ')})${filteredQuery}`;
};


export const queryConstruct = (t: 'query' | 'mutation' | 'subscription', tName: string, operationName?: string) => (o: Record<any, any>) =>
  `${t.toLowerCase()}${operationName ? ' ' + operationName : ''}${inspectVariables(buildQuery(tName, o))}`;
  

export const fullChainConstruct = (fn: FetchFunction) => (t: 'query' | 'mutation' | 'subscription', tName: string) => (
  o: Record<any, any>,
  options?: OperationOptions,
) => fn(queryConstruct(t, tName, options?.operationName)(o), options?.variables).then((r:any) => { 
  seekForAliases(r)
  return r
});


export const fullSubscriptionConstruct = (fn: SubscriptionFunction) => (
  t: 'query' | 'mutation' | 'subscription',
  tName: string,
) => (o: Record<any, any>, options?: OperationOptions) =>
  fn(queryConstruct(t, tName, options?.operationName)(o));


const seekForAliases = (response: any) => {
  const traverseAlias = (value: any) => {
    if (Array.isArray(value)) {
      value.forEach(seekForAliases);
    } else {
      if (typeof value === 'object') {
        seekForAliases(value);
      }
    }
  };
  if (typeof response === 'object' && response) {
    const keys = Object.keys(response);
    if (keys.length < 1) {
      return;
    }
    keys.forEach((k) => {
      const value = response[k];
      if (k.indexOf('__alias__') !== -1) {
        const [operation, alias] = k.split('__alias__');
        response[alias] = {
          [operation]: value,
        };
        delete response[k];
      }
      traverseAlias(value);
    });
  }
};


export const $ = (t: TemplateStringsArray): any => `ZEUS_VAR$${t.join('')}`;


export const resolverFor = <
  X,
  T extends keyof ValueTypes,
  Z extends keyof ValueTypes[T],
>(
  type: T,
  field: Z,
  fn: (
    args: Required<ValueTypes[T]>[Z] extends [infer Input, any] ? Input : any,
    source: any,
  ) => Z extends keyof ModelTypes[T] ? ModelTypes[T][Z] | Promise<ModelTypes[T][Z]> | X : any,
) => fn as (args?: any,source?: any) => any;


const handleFetchResponse = (
  response: Parameters<Extract<Parameters<ReturnType<typeof fetch>['then']>[0], Function>>[0]
): Promise<GraphQLResponse> => {
  if (!response.ok) {
    return new Promise((_, reject) => {
      response.text().then(text => {
        try { reject(JSON.parse(text)); }
        catch (err) { reject(text); }
      }).catch(reject);
    });
  }
  return response.json();
};

export const apiFetch = (options: fetchOptions) => (query: string, variables: Record<string, any> = {}) => {
    let fetchFunction = fetch;
    let queryString = query;
    let fetchOptions = options[1] || {};
    if (fetchOptions.method && fetchOptions.method === 'GET') {
      queryString = encodeURIComponent(query);
      return fetchFunction(`${options[0]}?query=${queryString}`, fetchOptions)
        .then(handleFetchResponse)
        .then((response: GraphQLResponse) => {
          if (response.errors) {
            throw new GraphQLError(response);
          }
          return response.data;
        });
    }
    return fetchFunction(`${options[0]}`, {
      body: JSON.stringify({ query: queryString, variables }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      ...fetchOptions
    })
      .then(handleFetchResponse)
      .then((response: GraphQLResponse) => {
        if (response.errors) {
          throw new GraphQLError(response);
        }
        return response.data;
      });
  };
  

export const apiSubscription = (options: chainOptions) => (
    query: string,
  ) => {
    try {
      const queryString = options[0] + '?query=' + encodeURIComponent(query);
      const wsString = queryString.replace('http', 'ws');
      const host = (options.length > 1 && options[1]?.websocket?.[0]) || wsString;
      const webSocketOptions = options[1]?.websocket || [host];
      const ws = new WebSocket(...webSocketOptions);
      return {
        ws,
        on: (e: (args: any) => void) => {
          ws.onmessage = (event:any) => {
            if(event.data){
              const parsed = JSON.parse(event.data)
              const data = parsed.data
              if (data) {
                seekForAliases(data);
              }
              return e(data);
            }
          };
        },
        off: (e: (args: any) => void) => {
          ws.onclose = e;
        },
        error: (e: (args: any) => void) => {
          ws.onerror = e;
        },
        open: (e: () => void) => {
          ws.onopen = e;
        },
      };
    } catch {
      throw new Error('No websockets implemented');
    }
  };



const allOperations = {
    "query": "Query"
}

export type GenericOperation<O> = O extends 'query'
  ? "Query"
  : O extends 'mutation'
  ? never
  : never

export const Thunder = (fn: FetchFunction) => <
  O extends 'query',
  R extends keyof ValueTypes = GenericOperation<O>
>(
  operation: O,
) => <Z extends ValueTypes[R]>(o: Z | ValueTypes[R], ops?: OperationOptions) =>
  fullChainConstruct(fn)(operation, allOperations[operation])(o as any, ops) as Promise<InputType<GraphQLTypes[R], Z>>;

export const Chain = (...options: chainOptions) => Thunder(apiFetch(options));  
  
export const SubscriptionThunder = (fn: SubscriptionFunction) => <
  O extends 'query',
  R extends keyof ValueTypes = GenericOperation<O>
>(
  operation: O,
) => <Z extends ValueTypes[R]>(
  o: Z | ValueTypes[R],
  ops?: OperationOptions
)=>
  fullSubscriptionConstruct(fn)(operation, allOperations[operation])(
    o as any,
    ops,
  ) as SubscriptionToGraphQL<Z, GraphQLTypes[R]>;

export const Subscription = (...options: chainOptions) => SubscriptionThunder(apiSubscription(options));
export const Zeus = <
  Z extends ValueTypes[R],
  O extends 'query',
  R extends keyof ValueTypes = GenericOperation<O>
>(
  operation: O,
  o: Z | ValueTypes[R],
  operationName?: string,
) => queryConstruct(operation, allOperations[operation], operationName)(o as any);
export const Selector = <T extends keyof ValueTypes>(key: T) => ZeusSelect<ValueTypes[T]>();
  