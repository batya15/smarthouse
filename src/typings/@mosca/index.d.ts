declare namespace mosca {
    type Callback = (message?: any, ...optionalParams: any[]) => void;

    class Server {
        public authenticate: any;

        constructor(options: any);

        public on(evn: string, callback?: Callback, context?: any): any;
    }
}

declare module 'mosca' {
    export = mosca;
}
