/* eslint-disable */

export const AllTypesProps: Record<string,any> = {
	Query:{
		featureRequest:{
			featureRequest:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:true
			}
		}
	},
	UserQuery:{
		login:{
			user:{
				type:"UserBasicData",
				array:false,
				arrayRequired:false,
				required:true
			}
		}
	},
	MoleUserMutation:{
		acceptDealRequest:{
			request:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:true
			}
		},
		closeDeal:{
			deal:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:true
			}
		},
		createComment:{
			comment:{
				type:"CreateComment",
				array:false,
				arrayRequired:false,
				required:true
			}
		},
		createFeatureRequest:{
			featureRequest:{
				type:"CreateFeatureRequest",
				array:false,
				arrayRequired:false,
				required:true
			}
		},
		finishWork:{
			deal:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:true
			}
		},
		offerDealRequest:{
			request:{
				type:"CreateDealRequest",
				array:false,
				arrayRequired:false,
				required:true
			}
		}
	},
	UserMutation:{
		forgotPassword:{
			username:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:true
			}
		},
		makeAdmin:{
			username:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:true
			}
		},
		register:{
			user:{
				type:"UserBasicData",
				array:false,
				arrayRequired:false,
				required:true
			}
		},
		resetPassword:{
			reset:{
				type:"ResetPassword",
				array:false,
				arrayRequired:false,
				required:true
			}
		}
	},
	UserBasicData:{
		username:{
			type:"String",
			array:false,
			arrayRequired:false,
			required:true
		},
		password:{
			type:"String",
			array:false,
			arrayRequired:false,
			required:true
		}
	},
	Mutation:{
		signUp:{
			user:{
				type:"SignUp",
				array:false,
				arrayRequired:false,
				required:false
			}
		}
	},
	CreateComment:{
		content:{
			type:"String",
			array:false,
			arrayRequired:false,
			required:true
		},
		replyToIndex:{
			type:"Int",
			array:false,
			arrayRequired:false,
			required:false
		},
		featureRequest:{
			type:"String",
			array:false,
			arrayRequired:false,
			required:true
		}
	},
	CreateFeatureRequest:{
		issueURL:{
			type:"String",
			array:false,
			arrayRequired:false,
			required:false
		},
		languages:{
			type:"String",
			array:true,
			arrayRequired:true,
			required:true
		},
		content:{
			type:"String",
			array:false,
			arrayRequired:false,
			required:true
		},
		repositoryURL:{
			type:"String",
			array:false,
			arrayRequired:false,
			required:true
		}
	},
	CreateDealRequest:{
		deadline:{
			type:"String",
			array:false,
			arrayRequired:false,
			required:true
		},
		message:{
			type:"String",
			array:false,
			arrayRequired:false,
			required:false
		},
		featureRequest:{
			type:"String",
			array:false,
			arrayRequired:false,
			required:true
		}
	},
	DealStatus: "enum",
	SignUp:{
		firstName:{
			type:"String",
			array:false,
			arrayRequired:false,
			required:false
		},
		lastName:{
			type:"String",
			array:false,
			arrayRequired:false,
			required:false
		},
		company:{
			type:"String",
			array:false,
			arrayRequired:false,
			required:false
		}
	},
	ResetPassword:{
		token:{
			type:"String",
			array:false,
			arrayRequired:false,
			required:true
		},
		newPassword:{
			type:"String",
			array:false,
			arrayRequired:false,
			required:true
		}
	}
}

export const ReturnTypes: Record<string,any> = {
	Query:{
		featureRequest:"FeatureRequest",
		home:"FeatureRequest",
		moleUserQuery:"MoleUserQuery",
		user:"UserQuery"
	},
	UserQuery:{
		isAdmin:"Boolean",
		isAdminClaimPossible:"Boolean",
		login:"LoggedInData"
	},
	MoleUserMutation:{
		acceptDealRequest:"Boolean",
		closeDeal:"Boolean",
		createComment:"Boolean",
		createFeatureRequest:"Boolean",
		finishWork:"Boolean",
		offerDealRequest:"Boolean"
	},
	UserMutation:{
		forgotPassword:"Boolean",
		makeAdmin:"Boolean",
		register:"LoggedInData",
		resetPassword:"Boolean"
	},
	Comments:{
		content:"String",
		createdAt:"String",
		featureRequest:"FeatureRequest",
		index:"Int",
		replyTo:"Comments"
	},
	DealRequest:{
		accepted:"Boolean",
		createdAt:"String",
		deadline:"String",
		featureRequest:"FeatureRequest",
		message:"String",
		user:"MoleUser"
	},
	FeatureRequest:{
		comments:"Comments",
		content:"String",
		createdAt:"String",
		createdBy:"MoleUser",
		issueURL:"String",
		languages:"ProgrammingLanguage",
		offeredWorms:"Int",
		repositoryURL:"String",
		title:"String"
	},
	Mutation:{
		moleUser:"MoleUserMutation",
		signUp:"Boolean",
		user:"UserMutation"
	},
	MoleUser:{
		avatar:"String",
		company:"String",
		createdAt:"String",
		featureRequests:"FeatureRequest",
		firstName:"String",
		lastName:"String",
		worms:"Int"
	},
	MoleUserQuery:{
		deals:"Deal",
		featureRequests:"FeatureRequest",
		givenDealRequsts:"DealRequest",
		receivedDealRequests:"DealRequest"
	},
	LoggedInData:{
		token:"String"
	},
	ProgrammingLanguage:{
		colour:"String",
		name:"String"
	},
	Deal:{
		createdAt:"String",
		deadline:"String",
		featureRequest:"FeatureRequest",
		status:"DealStatus",
		user:"MoleUser"
	}
}
type ZEUS_INTERFACES = never
type ZEUS_UNIONS = never

export type ValueTypes = {
    ["Query"]: AliasType<{
featureRequest?: [{	featureRequest:string},ValueTypes["FeatureRequest"]],
	/** Feature requests displayed on the home page */
	home?:ValueTypes["FeatureRequest"],
	moleUserQuery?:ValueTypes["MoleUserQuery"],
	/** Queries for logged in users */
	user?:ValueTypes["UserQuery"],
		__typename?: boolean
}>;
	/** All queries of users system */
["UserQuery"]: AliasType<{
	/** Check if logged in user is admin<br> */
	isAdmin?:boolean,
	/** Check if there is admin already */
	isAdminClaimPossible?:boolean,
login?: [{	user:ValueTypes["UserBasicData"]},ValueTypes["LoggedInData"]],
		__typename?: boolean
}>;
	["MoleUserMutation"]: AliasType<{
acceptDealRequest?: [{	request:string},boolean],
closeDeal?: [{	deal:string},boolean],
createComment?: [{	comment:ValueTypes["CreateComment"]},boolean],
createFeatureRequest?: [{	featureRequest:ValueTypes["CreateFeatureRequest"]},boolean],
finishWork?: [{	deal:string},boolean],
offerDealRequest?: [{	request:ValueTypes["CreateDealRequest"]},boolean],
		__typename?: boolean
}>;
	/** All mutations of users system */
["UserMutation"]: AliasType<{
forgotPassword?: [{	username:string},boolean],
makeAdmin?: [{	/** username of admin user<br> */
	username:string},boolean],
register?: [{	user:ValueTypes["UserBasicData"]},ValueTypes["LoggedInData"]],
resetPassword?: [{	reset:ValueTypes["ResetPassword"]},boolean],
		__typename?: boolean
}>;
	["UserBasicData"]: {
	username:string,
	password:string
};
	/** Comment on featuremole.com portal */
["Comments"]: AliasType<{
	/** content of the comment */
	content?:boolean,
	createdAt?:boolean,
	featureRequest?:ValueTypes["FeatureRequest"],
	/** primary key. Index of the comment */
	index?:boolean,
	replyTo?:ValueTypes["Comments"],
		__typename?: boolean
}>;
	/** Request to help on the issue */
["DealRequest"]: AliasType<{
	/** If offer is accepted */
	accepted?:boolean,
	createdAt?:boolean,
	/** Deadline proposed by the user (must be sooner than deadline of feature request) */
	deadline?:boolean,
	/** Feature request this deal is about */
	featureRequest?:ValueTypes["FeatureRequest"],
	/** Additional message */
	message?:boolean,
	/** OUser who offered deal */
	user?:ValueTypes["MoleUser"],
		__typename?: boolean
}>;
	/** Request Issue help */
["FeatureRequest"]: AliasType<{
	/** comments on this issue */
	comments?:ValueTypes["Comments"],
	/** extra info about the issue and the worms and/or money offered for resolving the issue */
	content?:boolean,
	/** date of creation */
	createdAt?:boolean,
	/** author of the feature request */
	createdBy?:ValueTypes["MoleUser"],
	/** issueURL is the primary key. It points to the issue inside git portal */
	issueURL?:boolean,
	/** programming languages to be used to solve the issue */
	languages?:ValueTypes["ProgrammingLanguage"],
	/** worms offered for resolution of the issue */
	offeredWorms?:boolean,
	/** git repository url */
	repositoryURL?:boolean,
	/** Representative title of the issue in git portal */
	title?:boolean,
		__typename?: boolean
}>;
	["Mutation"]: AliasType<{
	/** pipe to mole user mutations */
	moleUser?:ValueTypes["MoleUserMutation"],
signUp?: [{	user?:ValueTypes["SignUp"] | null},boolean],
	/** pipe to user related mutations in users system */
	user?:ValueTypes["UserMutation"],
		__typename?: boolean
}>;
	["CreateComment"]: {
	/** content of the comment */
	content:string,
	/** If replying to another comment provide its index */
	replyToIndex?:number | null,
	/** feature request issue URL */
	featureRequest:string
};
	["MoleUser"]: AliasType<{
	avatar?:boolean,
	company?:boolean,
	createdAt?:boolean,
	/** feature requests created by this user */
	featureRequests?:ValueTypes["FeatureRequest"],
	firstName?:boolean,
	lastName?:boolean,
	/** worms in the wallet */
	worms?:boolean,
		__typename?: boolean
}>;
	["MoleUserQuery"]: AliasType<{
	/** active deals I am in */
	deals?:ValueTypes["Deal"],
	/** my feature requests */
	featureRequests?:ValueTypes["FeatureRequest"],
	/** given deal requests for the feature */
	givenDealRequsts?:ValueTypes["DealRequest"],
	/** received deal requests for the feature */
	receivedDealRequests?:ValueTypes["DealRequest"],
		__typename?: boolean
}>;
	["CreateFeatureRequest"]: {
	/** url of the issue in the repository */
	issueURL?:string | null,
	/** programming languages to be used to solve the issue */
	languages:string[],
	/** Extra information for featuremole.com users */
	content:string,
	/** git repository url */
	repositoryURL:string
};
	["CreateDealRequest"]: {
	/** Deadline proposed by the user (must be sooner than deadline of feature request)  */
	deadline:string,
	/** Additional message */
	message?:string | null,
	/** Feature request issue URL */
	featureRequest:string
};
	["LoggedInData"]: AliasType<{
	token?:boolean,
		__typename?: boolean
}>;
	["ProgrammingLanguage"]: AliasType<{
	colour?:boolean,
	name?:boolean,
		__typename?: boolean
}>;
	/** # Deal
Deal between 2 **MoleUsers**

## Creation of a deal
It happens when DealRequest is accepted by both parties */
["Deal"]: AliasType<{
	createdAt?:boolean,
	/** Deadline proposed by the supplier */
	deadline?:boolean,
	/** feature request for this deal */
	featureRequest?:ValueTypes["FeatureRequest"],
	/** Status of the deal */
	status?:boolean,
	/** Supplier accepted for the deal */
	user?:ValueTypes["MoleUser"],
		__typename?: boolean
}>;
	["DealStatus"]:DealStatus;
	["SignUp"]: {
	firstName?:string | null,
	lastName?:string | null,
	company?:string | null
};
	/** Reset password details */
["ResetPassword"]: {
	/** token received from email */
	token:string,
	/** New password for the user */
	newPassword:string
}
  }

export type ModelTypes = {
    ["Query"]: {
		/** detail view of the feature request. Should be used to fetch comments */
	featureRequest?:ModelTypes["FeatureRequest"],
	/** Feature requests displayed on the home page */
	home:ModelTypes["FeatureRequest"][],
	moleUserQuery?:ModelTypes["MoleUserQuery"],
	/** Queries for logged in users */
	user?:ModelTypes["UserQuery"]
};
	/** All queries of users system */
["UserQuery"]: {
		/** Check if logged in user is admin<br> */
	isAdmin?:boolean,
	/** Check if there is admin already */
	isAdminClaimPossible?:boolean,
	/** Log user in */
	login?:ModelTypes["LoggedInData"]
};
	["MoleUserMutation"]: {
		/** accept offered deal request */
	acceptDealRequest?:boolean,
	/** close deal after the task is done by the supplier */
	closeDeal?:boolean,
	/** create comment underneath the feature request or another comment */
	createComment?:boolean,
	/** create new feature request */
	createFeatureRequest?:boolean,
	/** finish working on the feture request */
	finishWork?:boolean,
	/** offer a deal request */
	offerDealRequest?:boolean
};
	/** All mutations of users system */
["UserMutation"]: {
		forgotPassword?:boolean,
	/** Make user a superadmin on a first call. Then you need to be an admin to call this */
	makeAdmin?:boolean,
	/** Register a new user<br> */
	register?:ModelTypes["LoggedInData"],
	resetPassword?:boolean
};
	["UserBasicData"]: GraphQLTypes["UserBasicData"];
	/** Comment on featuremole.com portal */
["Comments"]: {
		/** content of the comment */
	content:string,
	createdAt:string,
	featureRequest:ModelTypes["FeatureRequest"],
	/** primary key. Index of the comment */
	index:number,
	replyTo?:ModelTypes["Comments"]
};
	/** Request to help on the issue */
["DealRequest"]: {
		/** If offer is accepted */
	accepted?:boolean,
	createdAt:string,
	/** Deadline proposed by the user (must be sooner than deadline of feature request) */
	deadline:string,
	/** Feature request this deal is about */
	featureRequest:ModelTypes["FeatureRequest"],
	/** Additional message */
	message?:string,
	/** OUser who offered deal */
	user:ModelTypes["MoleUser"]
};
	/** Request Issue help */
["FeatureRequest"]: {
		/** comments on this issue */
	comments:ModelTypes["Comments"][],
	/** extra info about the issue and the worms and/or money offered for resolving the issue */
	content:string,
	/** date of creation */
	createdAt:string,
	/** author of the feature request */
	createdBy:ModelTypes["MoleUser"],
	/** issueURL is the primary key. It points to the issue inside git portal */
	issueURL:string,
	/** programming languages to be used to solve the issue */
	languages:ModelTypes["ProgrammingLanguage"][],
	/** worms offered for resolution of the issue */
	offeredWorms:number,
	/** git repository url */
	repositoryURL:string,
	/** Representative title of the issue in git portal */
	title:string
};
	["Mutation"]: {
		/** pipe to mole user mutations */
	moleUser?:ModelTypes["MoleUserMutation"],
	/** sign up a new MoleUser */
	signUp?:boolean,
	/** pipe to user related mutations in users system */
	user?:ModelTypes["UserMutation"]
};
	["CreateComment"]: GraphQLTypes["CreateComment"];
	["MoleUser"]: {
		avatar?:string,
	company?:string,
	createdAt:string,
	/** feature requests created by this user */
	featureRequests:ModelTypes["FeatureRequest"][],
	firstName?:string,
	lastName?:string,
	/** worms in the wallet */
	worms:number
};
	["MoleUserQuery"]: {
		/** active deals I am in */
	deals:ModelTypes["Deal"][],
	/** my feature requests */
	featureRequests:ModelTypes["FeatureRequest"][],
	/** given deal requests for the feature */
	givenDealRequsts:ModelTypes["DealRequest"][],
	/** received deal requests for the feature */
	receivedDealRequests:ModelTypes["DealRequest"][]
};
	["CreateFeatureRequest"]: GraphQLTypes["CreateFeatureRequest"];
	["CreateDealRequest"]: GraphQLTypes["CreateDealRequest"];
	["LoggedInData"]: {
		token?:string
};
	["ProgrammingLanguage"]: {
		colour:string,
	name:string
};
	/** # Deal
Deal between 2 **MoleUsers**

## Creation of a deal
It happens when DealRequest is accepted by both parties */
["Deal"]: {
		createdAt:string,
	/** Deadline proposed by the supplier */
	deadline:string,
	/** feature request for this deal */
	featureRequest:ModelTypes["FeatureRequest"],
	/** Status of the deal */
	status?:ModelTypes["DealStatus"],
	/** Supplier accepted for the deal */
	user:ModelTypes["MoleUser"]
};
	["DealStatus"]: GraphQLTypes["DealStatus"];
	["SignUp"]: GraphQLTypes["SignUp"];
	/** Reset password details */
["ResetPassword"]: GraphQLTypes["ResetPassword"]
    }

export type GraphQLTypes = {
    ["Query"]: {
	__typename: "Query",
	/** detail view of the feature request. Should be used to fetch comments */
	featureRequest?: GraphQLTypes["FeatureRequest"],
	/** Feature requests displayed on the home page */
	home: Array<GraphQLTypes["FeatureRequest"]>,
	moleUserQuery?: GraphQLTypes["MoleUserQuery"],
	/** Queries for logged in users */
	user?: GraphQLTypes["UserQuery"]
};
	/** All queries of users system */
["UserQuery"]: {
	__typename: "UserQuery",
	/** Check if logged in user is admin<br> */
	isAdmin?: boolean,
	/** Check if there is admin already */
	isAdminClaimPossible?: boolean,
	/** Log user in */
	login?: GraphQLTypes["LoggedInData"]
};
	["MoleUserMutation"]: {
	__typename: "MoleUserMutation",
	/** accept offered deal request */
	acceptDealRequest?: boolean,
	/** close deal after the task is done by the supplier */
	closeDeal?: boolean,
	/** create comment underneath the feature request or another comment */
	createComment?: boolean,
	/** create new feature request */
	createFeatureRequest?: boolean,
	/** finish working on the feture request */
	finishWork?: boolean,
	/** offer a deal request */
	offerDealRequest?: boolean
};
	/** All mutations of users system */
["UserMutation"]: {
	__typename: "UserMutation",
	forgotPassword?: boolean,
	/** Make user a superadmin on a first call. Then you need to be an admin to call this */
	makeAdmin?: boolean,
	/** Register a new user<br> */
	register?: GraphQLTypes["LoggedInData"],
	resetPassword?: boolean
};
	["UserBasicData"]: {
		username: string,
	password: string
};
	/** Comment on featuremole.com portal */
["Comments"]: {
	__typename: "Comments",
	/** content of the comment */
	content: string,
	createdAt: string,
	featureRequest: GraphQLTypes["FeatureRequest"],
	/** primary key. Index of the comment */
	index: number,
	replyTo?: GraphQLTypes["Comments"]
};
	/** Request to help on the issue */
["DealRequest"]: {
	__typename: "DealRequest",
	/** If offer is accepted */
	accepted?: boolean,
	createdAt: string,
	/** Deadline proposed by the user (must be sooner than deadline of feature request) */
	deadline: string,
	/** Feature request this deal is about */
	featureRequest: GraphQLTypes["FeatureRequest"],
	/** Additional message */
	message?: string,
	/** OUser who offered deal */
	user: GraphQLTypes["MoleUser"]
};
	/** Request Issue help */
["FeatureRequest"]: {
	__typename: "FeatureRequest",
	/** comments on this issue */
	comments: Array<GraphQLTypes["Comments"]>,
	/** extra info about the issue and the worms and/or money offered for resolving the issue */
	content: string,
	/** date of creation */
	createdAt: string,
	/** author of the feature request */
	createdBy: GraphQLTypes["MoleUser"],
	/** issueURL is the primary key. It points to the issue inside git portal */
	issueURL: string,
	/** programming languages to be used to solve the issue */
	languages: Array<GraphQLTypes["ProgrammingLanguage"]>,
	/** worms offered for resolution of the issue */
	offeredWorms: number,
	/** git repository url */
	repositoryURL: string,
	/** Representative title of the issue in git portal */
	title: string
};
	["Mutation"]: {
	__typename: "Mutation",
	/** pipe to mole user mutations */
	moleUser?: GraphQLTypes["MoleUserMutation"],
	/** sign up a new MoleUser */
	signUp?: boolean,
	/** pipe to user related mutations in users system */
	user?: GraphQLTypes["UserMutation"]
};
	["CreateComment"]: {
		/** content of the comment */
	content: string,
	/** If replying to another comment provide its index */
	replyToIndex?: number,
	/** feature request issue URL */
	featureRequest: string
};
	["MoleUser"]: {
	__typename: "MoleUser",
	avatar?: string,
	company?: string,
	createdAt: string,
	/** feature requests created by this user */
	featureRequests: Array<GraphQLTypes["FeatureRequest"]>,
	firstName?: string,
	lastName?: string,
	/** worms in the wallet */
	worms: number
};
	["MoleUserQuery"]: {
	__typename: "MoleUserQuery",
	/** active deals I am in */
	deals: Array<GraphQLTypes["Deal"]>,
	/** my feature requests */
	featureRequests: Array<GraphQLTypes["FeatureRequest"]>,
	/** given deal requests for the feature */
	givenDealRequsts: Array<GraphQLTypes["DealRequest"]>,
	/** received deal requests for the feature */
	receivedDealRequests: Array<GraphQLTypes["DealRequest"]>
};
	["CreateFeatureRequest"]: {
		/** url of the issue in the repository */
	issueURL?: string,
	/** programming languages to be used to solve the issue */
	languages: Array<string>,
	/** Extra information for featuremole.com users */
	content: string,
	/** git repository url */
	repositoryURL: string
};
	["CreateDealRequest"]: {
		/** Deadline proposed by the user (must be sooner than deadline of feature request)  */
	deadline: string,
	/** Additional message */
	message?: string,
	/** Feature request issue URL */
	featureRequest: string
};
	["LoggedInData"]: {
	__typename: "LoggedInData",
	token?: string
};
	["ProgrammingLanguage"]: {
	__typename: "ProgrammingLanguage",
	colour: string,
	name: string
};
	/** # Deal
Deal between 2 **MoleUsers**

## Creation of a deal
It happens when DealRequest is accepted by both parties */
["Deal"]: {
	__typename: "Deal",
	createdAt: string,
	/** Deadline proposed by the supplier */
	deadline: string,
	/** feature request for this deal */
	featureRequest: GraphQLTypes["FeatureRequest"],
	/** Status of the deal */
	status?: GraphQLTypes["DealStatus"],
	/** Supplier accepted for the deal */
	user: GraphQLTypes["MoleUser"]
};
	["DealStatus"]: DealStatus;
	["SignUp"]: {
		firstName?: string,
	lastName?: string,
	company?: string
};
	/** Reset password details */
["ResetPassword"]: {
		/** token received from email */
	token: string,
	/** New password for the user */
	newPassword: string
}
    }
export const enum DealStatus {
	WIP = "WIP",
	REJECTED = "REJECTED",
	ACCEPTED = "ACCEPTED",
	WAITING = "WAITING"
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
    "query": "Query",
    "mutation": "Mutation"
}

export type GenericOperation<O> = O extends 'query'
  ? "Query"
  : O extends 'mutation'
  ? "Mutation"
  : never

export const Thunder = (fn: FetchFunction) => <
  O extends 'query' | 'mutation',
  R extends keyof ValueTypes = GenericOperation<O>
>(
  operation: O,
) => <Z extends ValueTypes[R]>(o: Z | ValueTypes[R], ops?: OperationOptions) =>
  fullChainConstruct(fn)(operation, allOperations[operation])(o as any, ops) as Promise<InputType<GraphQLTypes[R], Z>>;

export const Chain = (...options: chainOptions) => Thunder(apiFetch(options));  
  
export const SubscriptionThunder = (fn: SubscriptionFunction) => <
  O extends 'query' | 'mutation',
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
  O extends 'query' | 'mutation',
  R extends keyof ValueTypes = GenericOperation<O>
>(
  operation: O,
  o: Z | ValueTypes[R],
  operationName?: string,
) => queryConstruct(operation, allOperations[operation], operationName)(o as any);
export const Selector = <T extends keyof ValueTypes>(key: T) => ZeusSelect<ValueTypes[T]>();
  