import { ConnectionState, EventHandler, PrinterDevice, ZJPrinterCommon } from "./index.common";
import { Buffer } from 'buffer';

export * from './index.common';
export * from './encoder'

declare var th;

export enum AndroidConnectionState {
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
                console.log(MessageType[type], value1, value2);
                if (type === MessageType.MESSAGE_STATE_CHANGE) {
                    switch (value1) {
                        case AndroidConnectionState.STATE_NONE:
                            this.$connectionState.next(ConnectionState.Disconnected);
                            break;
                        case AndroidConnectionState.STATE_CONNECTING:
                            this.$connectionState.next(ConnectionState.Connecting);
                            break;
                        case AndroidConnectionState.STATE_CONNECTED:
                            this.$connectionState.next(ConnectionState.Connected);
                            break;
                        default: break;
                    }
                }
            }
        });
        this.zjPrinter.init(context, eventHandler);
    }

    // Connection
    public connect(printer: PrinterDevice) {
        if (printer === null || printer === undefined || printer.address === undefined) {
            return console.warn('Connect require printerDevice.address');
        }
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
        if (!this.isConnected) {
            return console.warn('Printer is not connected');
        }
        this.zjPrinter.printText(textToPrint);
    }

    public printHex(hexToPrint: Uint8Array | string): void {
        if (!this.isConnected) {
            return console.warn('Printer is not connected');
        }
        if (hexToPrint instanceof Uint8Array) {
            hexToPrint = Buffer.from(hexToPrint).toString('hex');
        }
        this.zjPrinter.printHex(hexToPrint);
    }
}