import { EventEmitter, Injectable, NgZone } from '@angular/core';
import { Bluetooth, Peripheral } from '@nativescript-community/ble';
import { EscPosEncoder } from "./encoder";

export interface PeripheralFilter {
    serviceUUID?: string;
    deviceName?: string;
    deviceAddress?: string;
    manufacturerData?: ArrayBuffer;
}

declare var android;
declare var java;
declare var globalAndroid;

@Injectable({ providedIn: 'root' })
export class PrinterBluetoothService {

    private ble = new Bluetooth({ restoreIdentifier: null });

    // Builtin Printer
    private builtinPrinterSocket: android.bluetooth.BluetoothSocket;
    private builtinPrinterOutStream: java.io.OutputStream;

    private connectedPeripheral: Peripheral;
    public peripherals: Peripheral[] = [];
    private activeUUIDs = {
        peripheralUUID: undefined,
        serviceUUID: undefined,
        characteristicUUID: undefined,
    };

    public peripheralsChanged = new EventEmitter<Peripheral[]>();

    // Getter

    public get isConnected(): boolean {
        return this.connectedPeripheral !== undefined || this.builtinPrinterOutStream !== undefined;
    }

    public get connected(): Peripheral {
        return this.connectedPeripheral
    }

    public get isBluetoothEnabled() {
        return this.ble.isBluetoothEnabled();
    }

    constructor(private zone: NgZone) { }

    // Permission

    public async getHasLocationPermission() {
        return await this.ble.hasLocationPermission();
    }

    public async checkPermission() {
        const isGranted = await this.getHasLocationPermission();
        if (!isGranted) {
            try {
                const isRequestGrant = await this.ble.requestLocationPermission();
                return isRequestGrant;
            } catch (error) {
                return error;
            }
        }
        return true;
    }

    // Scan

    public async startScanPrinter(filters?: PeripheralFilter[]) {
        if (!this.checkPermission()) {
            return;
        }

        this.clearPheripherals();

        const seconds = 3;
        filters = filters || [{ serviceUUID: '18F0' }];

        const scanOptions = {
            filters,
            seconds,
            onDiscovered: (p: Peripheral) => this.peripheralDiscovered(p),
            skipPermissionCheck: false
        }

        await this.ble.startScanning(scanOptions);
    }

    private clearPheripherals() {
        this.peripherals.splice(0, this.peripherals.length);
        this.peripheralsChanged.emit([]);
    }

    private peripheralDiscovered(peripheral: Peripheral) {
        if (this.peripherals.find(i => i.UUID === peripheral.UUID) !== undefined) {
            return;
        }
        this.peripherals.unshift(peripheral);
        this.peripheralsChanged.emit(this.peripherals);
    }

    // Connection

    public async connect(peripheralUUID: string, isPrintOnSuccess = false) {
        if (this.isConnected) {
            return console.warn('Already has connection')
        }
        try {
            return await this.ble.connect({
                UUID: peripheralUUID,
                onConnected: data => this.peripheralConnected(data, isPrintOnSuccess),
                onDisconnected: data => this.peripheralDisconnected(data),
            })
        } catch (error) {
            throw error;
        }
    }

    public async disconnect() {
        if (this.builtinPrinterSocket) {
            this.builtinPrinterSocket.close();
            this.builtinPrinterSocket = undefined;
        }
        if (this.builtinPrinterOutStream) {
            this.builtinPrinterOutStream.close();
            this.builtinPrinterOutStream = undefined;
        }
        if (!this.isConnected) {
            return console.warn('Not connected')
        }
        const UUID = this.connectedPeripheral.UUID;
        return await this.ble.disconnect({ UUID });
    }

    private async peripheralConnected(data: Peripheral, isPrintOnSuccess: boolean) {
        this.connectedPeripheral = data;
        // Discover Service
        const { services } = await this.ble.discoverAll({ peripheralUUID: data.UUID });

        const { sid, c } = services
            .flatMap(s => s.characteristics.map(c => ({ sid: s.UUID, c })))
            .find(({ sid, c }) => c.properties.writeWithoutResponse);

        // Set Active
        this.activeUUIDs.peripheralUUID = data.UUID;
        this.activeUUIDs.serviceUUID = sid;
        this.activeUUIDs.characteristicUUID = c.UUID;

        if (isPrintOnSuccess) {
            const helloData = this.getEncoder()
                .align('center')
                .line('MENUKA MANAGER')
                .line('Printer Connected')
                .newline()
                .newline()
                .encode();
            this.write(helloData);
        }
    }

    private peripheralDisconnected(data: Peripheral) {
        this.connectedPeripheral = undefined;
        // Set Active
        this.activeUUIDs.peripheralUUID = undefined;
        this.activeUUIDs.serviceUUID = undefined;
        this.activeUUIDs.characteristicUUID = undefined;
    }

    // Read & Write

    public async write(hexData: Uint8Array) {
        if (this.builtinPrinterOutStream) {
            const byteArray = this.arrayToNativeByteArray(hexData);
            this.builtinPrinterOutStream.write(byteArray, 0, byteArray.length)
        } else {
            const chunkSize = 512;
            for (let index = 0; index < hexData.length; index += 512) {
                await this.ble.write({
                    ...this.activeUUIDs,
                    value: hexData.slice(index, index + chunkSize),
                })
            }
        }
    }

    // Utils

    public getEncoder(codepage: string = 'cp874', thaiCodepage: number = 0xff) {
        const option = {
            codepageMapping: {
                [codepage]: thaiCodepage
            }
        };
        const encoder = new EscPosEncoder(option)
        encoder.initialize()

        if (this.builtinPrinterOutStream) {
            return encoder
                .raw([0x1c, 0x2e])
                .codepage(codepage);
        }

        return encoder.codepage(codepage);
    }

    // SUNMI

    public connectToBuiltinPrinter() {
        const adapter = android.bluetooth.BluetoothAdapter.getDefaultAdapter();

        if (adapter === null) {
            return alert('Bluetooth device is unavailable')
        }

        if (!adapter.isEnabled()) {
            return alert('Bluetooth device not detected. Please enable bluetooth.')
        }

        const devices = adapter.getBondedDevices().toArray() as Array<globalAndroid.bluetooth.BluetoothDevice>;
        let device = null;

        for (let index = 0; index < devices.length; index++) {
            const d = devices[index];
            const address = d.getAddress();
            const validAddress = [
                '00:11:22:33:44:55',
                'FF:FF:FF:FF:FF:FF',
            ];
            if (validAddress.includes(address)) {
                device = d;
                break;
            }
        }

        if (device === null) {
            return alert('Builtin Printer not found');
        }

        const uuid = java.util.UUID.fromString("00001101-0000-1000-8000-00805F9B34FB");
        const socket = device.createRfcommSocketToServiceRecord(uuid);

        try {
            socket.connect();
        } catch (error) {
            console.error('Builtin Printer connect failed', error);
            return alert('Builtin Printer connect failed');
        }

        this.builtinPrinterSocket = socket;
        this.builtinPrinterOutStream = socket.getOutputStream();
    }

    private arrayToNativeByteArray(val: Uint8Array) {
        const length = val.length;
        const result = Array.create('byte', length);
        for (let i = 0; i < length; i++) {
            result[i] = val[i];
        }
        return result;
    }

}