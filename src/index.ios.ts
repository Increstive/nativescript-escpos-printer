import { EventHandler, PrinterDevice, ZJPrinterCommon } from "./index.common";

declare var ZJPrinterIOS;

export class ZJPrinter extends ZJPrinterCommon {

    private zjPrinter = new ZJPrinterIOS();

    constructor(handler: EventHandler) {
        super(handler);
        this.zjPrinter.setupSDK((event) => {
            console.log('zjPrinter event handler: ', event)
            handler(event);
        });
    }

    // Connection
    public connect(printer) {
        this.zjPrinter.connect(printer);
    }

    public disconnect() {
        this.zjPrinter.disconnect()
    }

    public requestPermission(): void {

    }

    public async getDeviceList() {
        return new Promise<PrinterDevice>((res, _) => {
            this.zjPrinter.getDeviceList(devices => res(devices));
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