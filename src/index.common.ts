import { BehaviorSubject, Observable } from "rxjs";
import { EscPosEncoder } from "./encoder";

export type EventHandler = (params: any) => void;

export interface PrinterDevice {
    name: string;
    address: string
    native: any;
}

export enum ConnectionState {
    Disconnected = 0,
    Listen = 1,
    Connecting = 2,
    Connected = 3,
    Disconnecting = 4,
}

export abstract class ZJPrinterCommon {

    protected $connectionState = new BehaviorSubject(ConnectionState.Disconnected);

    public get connectionState$(): Observable<ConnectionState> {
        return this.$connectionState.asObservable();
    }

    public get connectionState(): ConnectionState {
        return this.$connectionState.getValue();
    }

    public get isConnected(): boolean {
        return this.connectionState === ConnectionState.Connected;
    }

    constructor(handler: EventHandler, context?: any) { };

    // Connection
    public abstract connect(printer: PrinterDevice): void;
    public abstract disconnect(): void;
    public abstract requestPermission(): void;
    public abstract getDeviceList(): Promise<PrinterDevice[]>;

    // Print
    public abstract printText(textToPrint: string): void;

    public abstract printHex(hexToPrint: Uint8Array): void;
    public abstract printHex(hexToPrint: string): void;

    // Utils
    public getEscEncoder(): EscPosEncoder {
        const option = { codepageMapping: { 'cp874': 0xff } };
        const encoder = new EscPosEncoder(option)
        return encoder.initialize()
            .codepage('cp874');
    }

}