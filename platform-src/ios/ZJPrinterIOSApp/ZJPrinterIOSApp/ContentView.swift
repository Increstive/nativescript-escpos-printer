//
//  ContentView.swift
//  ZJPrinterIOSApp
//
//  Created by Nutchapon Sukprasitpredee on 19/1/2565 BE.
//

import SwiftUI
import ZJPrinterIOS

struct ContentView: View {
    
    var zjPrinter = ZJPrinterIOS()
    @State var printer: Printer? = nil
    
    var body: some View {
        Button("Get Device Lists") {
            print("Get Device List")
            zjPrinter.getDeviceList { printer in
                print(printer ?? "PRINTER")
                self.printer = printer
            }
        }
        .padding()
        
        Button("Connect"){
            print("Connect")
            zjPrinter.connect(self.printer)
        }
        .padding()
        
        Button("Disconnect") {
            print("Disconnect")
            zjPrinter.disconnect()
        }.padding()
        
        Button("Print Text") {
            print("Print Text")
            zjPrinter.printText("Test ภาษาไทย")
        }.padding()
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}

extension ContentView {
    
    init(string: String) {
        print("Init ContentView")
        zjPrinter.setupSDK { noti in
            print("ConnectionStateChagne")
            print(noti ?? "NOTI")
        }
    }
}
