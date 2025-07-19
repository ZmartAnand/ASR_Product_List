import { Globals } from "./global";

export class Base {
    current: any;
    enums: any;

    constructor() {
        this.current = Globals.current;
        this.enums = Globals.enums;
    }

    log(message?: any): void {
        console.log(message);
    }
}
