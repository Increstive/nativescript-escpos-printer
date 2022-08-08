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
        // imageMode: 'raster',
    };
    const encoder = new EscPosEncoder(option)
    return encoder.initialize()
        .codepage(codepage);
}

let linesHeight = 0;
const drawQueue = [];

function wrapText(ctx, text, y, maxWidth, fontSize, align, isIncrementHeight = true) {
    let currentY = y;
    var lines = new Array();
    var width = 0, i, j;
    var result;

    ctx.fontSize = `${fontSize}px sans-serif`;

    // Start calculation
    while (text.length) {
        for (i = text.length; ctx.measureText(text.substr(0, i)).width > maxWidth; i--);

        result = text.substr(0, i);

        if (i !== text.length)
            for (j = 0; result.indexOf(" ", j) !== -1; j = result.indexOf(" ", j) + 1);

        lines.push(result.substr(0, j || result.length));
        const line = result.substr(0, j || result.length);
        currentY += 24;

        if (isIncrementHeight) {
            linesHeight += 24;
        }

        let x = 0;

        if (align === 'center') {
            x = maxWidth / 2;
        } else if (align === 'right') {
            x = maxWidth;
        }

        console.log(line)
        drawQueue.push({ line, x, y: currentY, align, fontSize })

        width = Math.max(width, ctx.measureText(lines[lines.length - 1]).width);
        text = text.substr(lines[lines.length - 1].length, text.length);
    }

}

function pair(leftText, rightText, currentLinesHeight) {
    const tempHeight = currentLinesHeight;
    wrapText(ctx, leftText, tempHeight, width * 0.66, 24, 'left')
    wrapText(ctx, rightText, tempHeight, width, 24, 'right', false)
}

function seperator(linesHeight, width) {
    wrapText(ctx, '-'.repeat(charWidth), linesHeight, width, 24, 'left')
}

const charWidth = 46;
const width = charWidth * 8;
const height = 20 * 8;

import { createCanvas } from 'canvas';
const canvas = createCanvas(width, height)
const ctx = canvas.getContext('2d')

ctx.textBaseline = "top";
ctx.font = '24px sans-serif'

wrapText(ctx, 'MENUKA MANAGER', 0, width, 32, 'center')
seperator(linesHeight, width)
pair('Menu', 'Price', linesHeight);
seperator(linesHeight, width)
pair('แทงโก้โปรโมชั่นเอาท์ดอร์ผ้าห่ม', '100.00', linesHeight);
pair('แทงโก้โปรโมชั่นเอาท์ดอร์ผ้าห่ม', '100.00', linesHeight);
pair('แทงโก้โปรโมชั่นเอาท์ดอร์ผ้าห่ม', '100.00', linesHeight);

canvas.height = linesHeight;

ctx.font = '24px sans-serif'


console.log(drawQueue);
drawQueue.forEach(i => {
    ctx.font = `${i.fontSize}px sans-serif`;
    ctx.textAlign = i.align;
    ctx.fillText(i.line, i.x, i.y);
});

const helloData = getEncoder('unicode')
    .image(canvas, width, linesHeight)
    .encode();

const hexStr = Array.from(helloData)
    .map(i => i.toString(16).padStart(2, '0'))
    .join(' ');

console.log(hexStr);

// -------------------------------------

const encoder = BitmapReceiptEncoder.create()
    .wrapText('MENUKA MANAGER', 0, width, 32, 'center')
    .seperator()
    .pair('Menu', 'Price')
    .seperator()
    .pair('แทงโก้โปรโมชั่นเอาท์ดอร์ผ้าห่ม', '100.00')
    .pair('แทงโก้โปรโมชั่นเอาท์ดอร์ผ้าห่ม', '100.00')
    .pair('แทงโก้โปรโมชั่นเอาท์ดอร์ผ้าห่ม', '100.00')
    .draw();

// -------------------------------------


function exportCanvas(canvas, fileName: string) {
    const out = fs.createWriteStream(__dirname + '/' + fileName)
    const stream = canvas.createPNGStream()
    stream.pipe(out)
    out.on('finish', () => console.log('The PNG file was created.'))
}

exportCanvas(canvas, '1.png');
exportCanvas(encoder.canvas, '2.png');