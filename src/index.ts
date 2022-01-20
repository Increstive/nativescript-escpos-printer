
declare var th;
declare var global;
declare var ZJPrinterIOS;

export type EventHandler = (params: any) => void;

export interface PrinterDevice {
    name: string;
    address: string
}

export enum ConnectionState {
    STATE_NONE = 0,
    STATE_LISTEN = 1,
    STATE_CONNECTING = 2,
    STATE_CONNECTED = 3,
}

export enum MessageType {
    MESSAGE_STATE_CHANGE = 1,
    MESSAGE_READ = 2,
    MESSAGE_WRITE = 3,
    MESSAGE_DEVICE_NAME = 4,
    MESSAGE_TOAST = 5,
    MESSAGE_CONNECTION_LOST = 6,
    MESSAGE_UNABLE_CONNECT = 7,
}

export class ZJPrinter {

    private zjPrinter;

    constructor() {
        // console.log(ZJPrinterIOS)
        this.zjPrinter = null;
    }

    // Getters

    public getState(): ConnectionState {
        const stateInt = this.zjPrinter.getState();
        return ConnectionState[stateInt as keyof ConnectionState];
    }

    // Init

    public init(
        context: any | null /*android.content.Context */,
        handler: EventHandler,
    ) {
        const eventHandler = new th.co.increstive.ns.zj_printer.EventHandler({
            handleEvent: (a, b, c) => console.log(a, b, c)
        });
        console.log(eventHandler.handleEvent);
        this.zjPrinter.init(context, eventHandler);
    }

    public connect(uuid: string) {
        this.zjPrinter.connect(uuid);
    }

    public disconnect() {
        this.zjPrinter.disconnect()
    }

    public requestPermission() {
        this.zjPrinter.requestPermission()
    }

    public getDeviceList() {
        const list = this.zjPrinter.getDeviceList();
        const devices = [];
        for (let index = 0; index < list.length; index++) {
            const element = list[index];
            devices.push({
                name: element.name,
                address: element.address,
            });
        }
        return devices;
    }

    public printText(message: string) {
        this.zjPrinter.printText(message);
    }

    // public printLines(lines: string[][]){
    //     const joinLines = lines.map()
    // }
}

// export class ZJPrinterHandler extends th.co.increstive.ns.zj_printer.EventHandler {

//     // constructor(private handler: EventHandler) { super() }
//     static constructorCalled: boolean = false;

//     // constructor
//     constructor() {
//         super();
//         ZJPrinterHandler.constructorCalled = true;
//         console.log('constructor')
//         // necessary when extending TypeScript constructors
//         return global.__native(this);
//     }

//     public handleEvent(type: number, arg1: number, arg2: string): void {
//         this.super.handleEvent(type, arg1, arg2);
        
//         console.log(type, arg1, arg2)

//         // this.handler({
//         //     type: messageType,
//         //     arg1, arg2
//         // });
//     }
// }