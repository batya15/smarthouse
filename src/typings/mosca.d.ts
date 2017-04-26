declare module mosca {
	class Server {
		constructor(options : any);
		on(evn:string,  callback?: Function, context?: any): any;
		authenticate : any;
	}
}

declare module "mosca" {
	export = mosca;
}