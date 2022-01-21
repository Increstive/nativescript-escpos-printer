import { ZJPrinterCommon } from "../plugin/index.common";
export { PrinterDevice } from '../plugin/index.common'
export { EscPosEncoder } from "../plugin/encoder/esc-pos-encoder"

export type EventHandler = (params: any) => void;

export interface PrinterDevice {
    name: string;
    address: string
}

export class ZJPrinter extends ZJPrinterCommon {

    constructor(handler: EventHandler, context?: any);

    // Connection
    public connect(printer: PrinterDevice): void;
    public disconnect(): void;
    public requestPermission(): void;
    public getDeviceList(): Promise<PrinterDevice>;

    // Print
    public printText(textToPrint: string): void;
    public printHex(hexToPrint: string): void;

}
