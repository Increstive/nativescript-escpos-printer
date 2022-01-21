package th.co.increstive.ns.zj_printer;

import static androidx.core.app.ActivityCompat.startActivityForResult;

import android.app.Activity;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.content.Context;
import android.content.Intent;
import android.os.Handler;
import android.util.Printer;
import android.widget.Toast;

import java.util.ArrayList;
import java.util.Set;

import th.co.increstive.ns.zj_printer.command.Command;
import th.co.increstive.ns.zj_printer.command.PrinterCommand;
import th.co.increstive.ns.zj_printer.service.BluetoothService;

public class ZJPrinter {

    private static final String THAI = "CP874";
    private static final int REQUEST_ENABLE_BT = 2;

    private BluetoothService mService = null;
    private BluetoothAdapter mBluetoothAdapter = null;
    private Context context = null;

    // Getters

    public BluetoothService getSevice() {
        return mService;
    }

    public int getState() {
        return mService.getState();
    }

    // Methods

    public void init(Context context, EventHandler handler) {
        mBluetoothAdapter = BluetoothAdapter.getDefaultAdapter();
        mService = new BluetoothService(context, handler);
    }

    public void requestPermission() {
        if (!mBluetoothAdapter.isEnabled()) {
            Intent enableIntent = new Intent(
                    BluetoothAdapter.ACTION_REQUEST_ENABLE);
            ((Activity) context).startActivityForResult(enableIntent, REQUEST_ENABLE_BT);
            // Otherwise, setup the session
        }
    }

    // Devices

    public PrinterDevice[] getDeviceList() {
        Set<BluetoothDevice> pairedDevices = mBluetoothAdapter.getBondedDevices();
        ArrayList<PrinterDevice> printers = new ArrayList<>();

        for (BluetoothDevice device : pairedDevices) {
            System.out.println(device.getName() + '\n' + device.getAddress());
            printers.add(new PrinterDevice(device.getName(), device.getAddress()));
        }

        return printers.toArray(new PrinterDevice[0]);
    }

    public void connect(String address) {
        if (BluetoothAdapter.checkBluetoothAddress(address)) {
            BluetoothDevice device = mBluetoothAdapter
                    .getRemoteDevice(address);
            // Attempt to connect to the device
            mService.connect(device);
        }
    }

    public void disconnect() {
        if (mService != null)
            mService.stop();
    }

    public void printText(String msg) {
        SendDataByte(PrinterCommand.POS_Print_Text(msg, THAI, 255, 0, 0, 0));
        SendDataByte(Command.LF);
    }

    public void printHex(String hexString) {
        byte[] bytes = hexStringToByteArray(hexString);
        SendDataByte(bytes);
    }

    // Private

    private byte[] hexStringToByteArray(String s) {
        int len = s.length();
        byte[] data = new byte[len / 2];
        for (int i = 0; i < len; i += 2) {
            data[i / 2] = (byte) ((Character.digit(s.charAt(i), 16) << 4)
                    + Character.digit(s.charAt(i+1), 16));
        }
        return data;
    }

    private void SendDataByte(byte[] data) {

        final StringBuilder builder = new StringBuilder();
        for(byte b : data) {
            builder.append(String.format("%02x ", b));
        }
        System.out.println(builder.toString());

//        return;

        if (mService.getState() != BluetoothService.STATE_CONNECTED) {
            Toast.makeText(context, "Printer not connected", Toast.LENGTH_SHORT)
                    .show();
            System.out.println("SendDataByte: Not Connected");
            return;
        }
        mService.write(data);
    }
}
