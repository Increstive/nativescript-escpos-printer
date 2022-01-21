import { Observable } from 'rxjs'
import { EscPosEncoder } from './encoder'
import { PrinterDevice, ZJPrinterCommon, ConnectionState } from './index.common'

export { ConnectionState, PrinterDevice } from './index.common'
export { EscPosEncoder } from './encoder'

export declare class ZJPrinter extends ZJPrinterCommon {
    public get connectionState$(): Observable<ConnectionState>;
    public get connectionState(): ConnectionState;
    public get isConnected(): boolean;

    public connect(printer: PrinterDevice): void;
    public disconnect(): void;
    public requestPermission(): void;
    public getDeviceList(): Promise<PrinterDevice[]>;
    public printText(textToPrint: string): void;
    public printHex(hexToPrint: Uint8Array): void;
    public printHex(hexToPrint: string): void;
    public getEscEncoder(): EscPosEncoder;
}