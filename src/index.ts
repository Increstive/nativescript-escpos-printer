import { PrinterDevice, ZJPrinterCommon } from './index.common'

export { PrinterDevice } from './index.common'
export { EscPosEncoder } from './encoder'

export declare class ZJPrinter extends ZJPrinterCommon {
    public connect(printer: PrinterDevice): void;
    public disconnect(): void;
    public requestPermission(): void;
    public getDeviceList(): Promise<PrinterDevice[]>;
    public printText(textToPrint: string): void;
    public printHex(hexToPrint: string): void;
}