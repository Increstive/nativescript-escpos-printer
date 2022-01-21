package th.co.increstive.ns.zj_printer_test_app;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.os.Message;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import th.co.increstive.ns.zj_printer.EventHandler;
import th.co.increstive.ns.zj_printer.ZJPrinter;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        TextView statusTextView = findViewById(R.id.tv_status);

        ZJPrinter zjPrinter = new ZJPrinter();

        zjPrinter.init(this, (type, arg1, arg2) -> {
            System.out.println("Status Update " + type + arg1 + arg2);
            statusTextView.setText(String.valueOf(arg1));
        });

        findViewById(R.id.btn_get_device_list).setOnClickListener(
                view -> zjPrinter.getDeviceList());

        findViewById(R.id.btn_connect).setOnClickListener(
                view -> zjPrinter.connect("66:12:DD:69:4F:AB"));

        findViewById(R.id.btn_send).setOnClickListener(
                view -> zjPrinter.printText("Test ไทย"));

        findViewById(R.id.btn_send_hex).setOnClickListener(
                view -> zjPrinter.printHex("1b401c2e1b74ff1b401c2e1b74ff1b61011d21101d2111" +
                        "c3e9d2b9e2bab9d1ca0a0d1d21011d21001b2d003232342f323420cbc1d9e8bae9d2b9cac3" +
                        "d2adcad4c3d4c3d2c1cdd4b9b7c3d220b6b9b9bbd1adadd2cdd4b9b7c3d220e1a2c7a7bad2" +
                        "a7aad1b920e0a2b5a4c5cda7cad2c1c7d220a1c3d8a7e0b7bec1cbd2b9a4c3203130353130" +
                        "0a0d"));

    }
}