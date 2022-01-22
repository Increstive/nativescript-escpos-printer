import { ConnectionState, EventHandler, PrinterDevice, ZJPrinterCommon } from "./index.common";
import { Buffer } from 'buffer';

export * from './index.common';
export * from './encoder'

export class ZJPrinter extends ZJPrinterCommon {

    private zjPrinter = new ZJPrinterIOS();

    constructor(handler: EventHandler) {
        super(handler);
        this.zjPrinter.setupSDK((event) => {
            console.log('ConnectionStateChanged', event.name)
            switch (event.name) {
                case 'PrinterConnectedNotification':
                    this.$connectionState.next(ConnectionState.Connected);
                    break;
                case 'PrinterDisconnectedNotification':
                    this.$connectionState.next(ConnectionState.Disconnected);
                    break;
                default: break;
            }
        });
    }

    // Connection
    public connect(printer: PrinterDevice) {
        if (printer === null || printer === undefined || printer.native === undefined) {
            return console.warn('Connect require printerDevice.native');
        }
        this.$connectionState.next(ConnectionState.Connecting);
        this.zjPrinter.connect(printer.native);
    }

    public disconnect() {
        this.$connectionState.next(ConnectionState.Disconnecting);
        this.zjPrinter.disconnect()
    }

    public requestPermission(): void {

    }

    public async getDeviceList() {
        return new Promise<PrinterDevice[]>((res, _) => {
            this.zjPrinter.getDeviceList(iosDevice => {
                const device: PrinterDevice = {
                    name: iosDevice.name,
                    address: iosDevice.UUIDString,
                    native: iosDevice,
                }
                res([device])
            });
        })
    }

    // Print 
    public printText(message: string) {
        if (!this.isConnected) {
            return console.warn('Printer is not connected');
        }
        this.zjPrinter.printText(message);
    }

    public printHex(hexToPrint: Uint8Array | string) {
        if (!this.isConnected) {
            return console.warn('Printer is not connected');
        }
        if (hexToPrint instanceof Uint8Array) {
            hexToPrint = Buffer.from(hexToPrint).toString('hex');
        }
        this.zjPrinter.printHex(hexToPrint);
    }

}