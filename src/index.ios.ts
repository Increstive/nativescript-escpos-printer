import { ConnectionState, EventHandler, PrinterDevice, ZJPrinterCommon } from "./index.common";
export * from './encoder'

declare var ZJPrinterIOS;

export class ZJPrinter extends ZJPrinterCommon {

    private zjPrinter = new ZJPrinterIOS();

    constructor(handler: EventHandler) {
        super(handler);
        this.zjPrinter.setupSDK((event) => {
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
    public connect(printer) {
        this.$connectionState.next(ConnectionState.Connecting);
        this.zjPrinter.connect(printer);
    }

    public disconnect() {
        this.$connectionState.next(ConnectionState.Disconnecting);
        this.zjPrinter.disconnect()
    }

    public requestPermission(): void {

    }

    public async getDeviceList() {
        console.log('LIB getDeviceList')
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
        this.zjPrinter.printText(message);
    }

    public printHex(hexToPrint: string) {
        this.zjPrinter.printHex(hexToPrint);
    }

}