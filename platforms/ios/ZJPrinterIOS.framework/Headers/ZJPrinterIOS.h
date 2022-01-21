//
//  ZJPrinterIOS.h
//  ZJPrinterIOS
//
//  Created by Nutchapon Sukprasitpredee on 19/1/2565 BE.
//

#import <Foundation/Foundation.h>

//! Project version number for ZJPrinterIOS.
FOUNDATION_EXPORT double ZJPrinterIOSVersionNumber;

//! Project version string for ZJPrinterIOS.
FOUNDATION_EXPORT const unsigned char ZJPrinterIOSVersionString[];

// In this header, you should import all the public headers of your framework using statements like #import <ZJPrinterIOS/PublicHeader.h>

#import "PrinterSDK.h"

typedef void (^ConnectionStateCallback) (NSNotification* notification);

@interface ZJPrinterIOS: NSObject

- (NSString*) helloWorld;

- (void) setupSDK:(ConnectionStateCallback)callback;

- (void) getDeviceList:(PrinterScanPrintersCallback)callback;

- (void) connect:(Printer*)printer;

- (void) disconnect;

- (void) printText:(NSString*)string;

- (void) printHex:(NSString*)hexString;

@end
