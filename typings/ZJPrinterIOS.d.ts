
declare const enum CodeBarType {

    UPC_A = 0,

    UPC_E = 1,

    JAN13 = 2,

    JAN8 = 3,

    CODE39 = 4,

    ITF = 5,

    CODABAR = 6,

    CODE93 = 7,

    CODE128 = 8
}

declare class Printer extends NSObject {

    static alloc(): Printer; // inherited from NSObject

    static new(): Printer; // inherited from NSObject

    readonly UUIDString: string;

    readonly name: string;
}

declare var PrinterConnectedNotification: string;

declare var PrinterDisconnectedNotification: string;

declare class PrinterSDK extends NSObject {

    static alloc(): PrinterSDK; // inherited from NSObject

    static defaultPrinterSDK(): PrinterSDK;

    static new(): PrinterSDK; // inherited from NSObject

    beep(): void;

    connectBT(printer: Printer): void;

    connectIP(ipAddress: string): boolean;

    cutPaper(): void;

    disconnect(): void;

    openCasher(): void;

    printCodeBarType(text: string, type: CodeBarType): void;

    printImage(image: UIImage): void;

    printQrCode(text: string): void;

    printTestPaper(): void;

    printText(text: string): void;

    printTextImage(text: string): void;

    scanPrintersWithCompletion(callback: (p1: Printer) => void): void;

    selfTest(): void;

    sendHex(hex: string): void;

    setFontSizeMultiple(multiple: number): void;

    setPrintWidth(width: number): void;

    stopScanPrinters(): void;
}

declare class ZJPrinterIOS extends NSObject {

    static alloc(): ZJPrinterIOS; // inherited from NSObject

    static new(): ZJPrinterIOS; // inherited from NSObject

    connect(printer: Printer): void;

    disconnect(): void;

    getDeviceList(callback: (p1: Printer) => void): void;

    helloWorld(): string;

    printHex(hexString: string): void;

    printText(string: string): void;

    setupSDK(callback: (p1: NSNotification) => void): void;
}

declare var ZJPrinterIOSVersionNumber: number;

declare var ZJPrinterIOSVersionString: interop.Reference<number>;
