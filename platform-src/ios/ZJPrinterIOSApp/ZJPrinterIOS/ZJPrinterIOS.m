//
//  ZJPrinter.m
//  ZJPrinterIOS
//
//  Created by Nutchapon Sukprasitpredee on 19/1/2565 BE.
//

#import "ZJPrinterIOS.h"
#import "PrinterSDK.h"


@interface ZJPrinterIOS (){
    PrinterSDK* printerSDK;
    ConnectionStateCallback callback;
}

@end

@implementation ZJPrinterIOS


- (NSString*) helloWorld {
    return @"Hello World";
}

- (void) setupSDK:(ConnectionStateCallback)callback {
    NSLog(@"InitSDK");
    self->printerSDK = [PrinterSDK defaultPrinterSDK];
    self->callback = callback;
    
    [[NSNotificationCenter defaultCenter]
        addObserver:self
        selector:@selector(handlePrinterConnectedNotification:)
        name:PrinterConnectedNotification object:nil];
    [[NSNotificationCenter defaultCenter]
        addObserver:self
        selector:@selector(handlePrinterDisconnectedNotification:)
        name:PrinterDisconnectedNotification object:nil];
}

- (void)handlePrinterConnectedNotification:(NSNotification*)notification {
    NSLog(@"PrinterConnected: %@", notification);
    self->callback(notification);
}

- (void)handlePrinterDisconnectedNotification:(NSNotification*)notification {
    NSLog(@"PrinterDisconnected: %@", notification);
    self->callback(notification);
}

- (void) getDeviceList:(PrinterScanPrintersCallback)callback {
    [printerSDK scanPrintersWithCompletion:callback];
}

- (void) connect:(Printer*)printer {
    [printerSDK connectBT:printer];
}

- (void) disconnect {
    [printerSDK disconnect];
}

- (void) printText:(NSString*)string {
    [printerSDK printTextImage:string];
}

- (void) printHex:(NSString*)hexString {
    [printerSDK sendHex:hexString];
}

//- (NSInteger*) getState {
//
//}

@end
