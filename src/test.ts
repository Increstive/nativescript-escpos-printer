import { EscPosEncoder } from "./encoder/esc-pos-encoder";
import * as fs from 'fs';
import { BitmapReceiptEncoder } from "./bitmap-receipt-encoder";

console.clear();

function getEncoder(codepage: 'cp874' | 'unicode' = 'cp874') {
    const option = {
        codepageMapping: {
            'cp874': 0xff,
            'unicode': 0xff,
        },
        imageMode: 'raster',
    };
    const encoder = new EscPosEncoder(option)
    return encoder.initialize()
        .codepage(codepage);
}

const encoder = BitmapReceiptEncoder.create()
    .textSize(32)
    .textAlign('center')
    .textWeight('bold')
    .line('MENUKA MANAGER')
    .textSize(24)
    .seperator()
    .pair('Menu', 'Price')
    .seperator()
    .pair('แทงโก้โปรโมชั่นเอาท์ดอร์ผ้าห่ม', '100.00')
    .pair('แทงโก้โปรโมชั่นเอาท์ดอร์ผ้าห่ม', '100.00')
    .pair('แทงโก้โปรโมชั่นเอาท์ดอร์ผ้าห่ม', '100.00')
    .draw();

// -------------------------------------

const helloData = getEncoder('unicode')
    .image(encoder.canvas, encoder.width, encoder.height)
    .encode();

const hexStr = Array.from(helloData)
    .map(i => i.toString(16).padStart(2, '0'))
    .join(' ');

console.log(hexStr);


function exportCanvas(canvas, fileName: string) {
    const out = fs.createWriteStream(__dirname + '/' + fileName)
    const stream = canvas.createPNGStream()
    stream.pipe(out)
    out.on('finish', () => console.log('The PNG file was created.'))
}

exportCanvas(encoder.canvas, '2.png');