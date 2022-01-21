
export type EventHandler = (params: any) => void;

export interface PrinterDevice {
    name: string;
    address: string
}

export abstract class ZJPrinterCommon {

    constructor(handler: EventHandler, context?: any) { };

    // Connection
    public abstract connect(printer: PrinterDevice): void;
    public abstract disconnect(): void;
    public abstract requestPermission(): void;
    public abstract getDeviceList(): Promise<PrinterDevice>;

    // Print
    public abstract printText(textToPrint: string): void;
    public abstract printHex(hexToPrint: string): void;

}