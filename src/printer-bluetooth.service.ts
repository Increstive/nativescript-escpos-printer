import { EventEmitter, Injectable, NgZone } from '@angular/core';
import { Bluetooth, Peripheral } from '@nativescript-community/ble';
import { EscPosEncoder } from "./encoder";

export interface PeripheralFilter {
    serviceUUID?: string;
    deviceName?: string;
    deviceAddress?: string;
    manufacturerData?: ArrayBuffer;
}

@Injectable({ providedIn: 'root' })
export class PrinterBluetoothService {

    private ble = new Bluetooth();

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
        return this.connectedPeripheral !== undefined;
    }

    constructor(private zone: NgZone) { }

    // Permission

    public async checkPermission() {
        const isGranted = await this.ble.hasLocationPermission();
        if (!isGranted) {
            this.ble.requestLocationPermission();
            return false;
        }
        return true;
    }

    // Scan

    public async startScanPrinter(filters?: PeripheralFilter[]) {
        if (!this.checkPermission()) {
            return;
        }

        this.clearPheripherals();

        const seconds = 4;
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
        console.log(peripheral)
        this.peripheralsChanged.emit(this.peripherals);
    }

    // Connection

    public async connect(peripheralUUID: string, isPrintOnSuccess = false) {
        if (this.isConnected) {
            return console.warn('Already has connection')
        }
        try {
            await this.ble.connect({
                UUID: peripheralUUID,
                onConnected: data => this.peripheralConnected(data, isPrintOnSuccess),
                onDisconnected: data => this.peripheralDisconnected(data),
            })
        } catch (error) {
            throw error;
        }
    }

    public async disconnect() {
        if (!this.isConnected) {
            return console.warn('Not connected')
        }
        const UUID = this.connectedPeripheral.UUID;
        await this.ble.disconnect({ UUID });
    }

    private async peripheralConnected(data: Peripheral, isPrintOnSuccess: boolean) {
        console.log('peripheralConnected');
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

        console.log(this.activeUUIDs);

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
        console.log('Write data', this.activeUUIDs, hexData.length, 'bytes');
        return this.ble.write({
            ...this.activeUUIDs,
            value: hexData,
        })
    }

    // Utils

    public getEncoder() {
        const option = { codepageMapping: { 'cp874': 0xff } };
        const encoder = new EscPosEncoder(option)
        return encoder.initialize()
            .codepage('cp874');
    }

}