import { EventHandler, PrinterDevice, ZJPrinterCommon } from "./index.common";

declare var th;

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

export class ZJPrinter extends ZJPrinterCommon {

    private zjPrinter = new th.co.increstive.ns.zj_printer.ZJPrinter();

    constructor(handler: EventHandler, context: android.content.Context) {
        super(handler);

        const eventHandler = new th.co.increstive.ns.zj_printer.EventHandler({
            handleEvent: (type: number, value1: number, value2: number) => {
                console.log(type, value1, value2);
                handler({ type, value1, value2 });
            }
        });
        this.zjPrinter.init(context, eventHandler);
    }

    // Connection
    public connect(printer: PrinterDevice) {
        this.zjPrinter.connect(printer.address);
    }

    public disconnect() {
        this.zjPrinter.disconnect()
    }

    public requestPermission() {
        this.zjPrinter.requestPermission()
    }

    public async getDeviceList() {
        const list = this.zjPrinter.getDeviceList();
        return Promise.resolve(list);
    }

    // Print
    public printText(textToPrint: string): void {
        this.zjPrinter.printText(textToPrint);
    }

    public printHex(hexToPrint: string): void {
        this.zjPrinter.printHex(hexToPrint);
    }
}