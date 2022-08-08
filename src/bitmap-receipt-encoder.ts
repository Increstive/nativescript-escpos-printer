
import { Canvas, CanvasRenderingContext2D, createCanvas } from 'canvas';

export interface CanvasDrawQueue {
    line: string,
    x: number,
    y: number,
    fontSize: number;
    align: CanvasTextAlign,
}

export class BitmapReceiptEncoder {

    public canvas: Canvas;
    public context: CanvasRenderingContext2D;
    public charWidth = 46;

    private drawQueue: CanvasDrawQueue[] = [];
    private lineCursorY = 0;

    public get width() {
        return this.charWidth * 8
    }

    constructor() {
        this.canvas = createCanvas(this.width, 100)
        this.context = this.canvas.getContext('2d')
        return this;
    }

    public static create() {
        return new BitmapReceiptEncoder();
    }

    public wrapText(
        text: string,
        y: number,
        maxWidth: number,
        fontSize: number,
        align: CanvasTextAlign,
        isIncrementHeight = true
    ) {
        let currentY = y;
        var lines = [];
        var width = 0, i, j;
        var result = '';

        this.context.font = `${fontSize}px sans-serif`;

        while (text.length) {
            for (i = text.length; this.context.measureText(text.substring(0, i)).width > maxWidth; i--);

            result = text.substring(0, i);

            if (i !== text.length)
                for (j = 0; result.indexOf(" ", j) !== -1; j = result.indexOf(" ", j) + 1);

            lines.push(result.substr(0, j || result.length));
            const line = result.substr(0, j || result.length);
            currentY += fontSize;

            if (isIncrementHeight) {
                this.lineCursorY += fontSize;
            }

            let x = 0;

            if (align === 'center') {
                x = this.width / 2;
            } else if (align === 'right') {
                x = this.width;
            }

            this.drawQueue.push({ line, x, y: currentY, align, fontSize })

            width = Math.max(width, this.context.measureText(lines[lines.length - 1]).width);
            text = text.substring(lines[lines.length - 1].length, text.length);
        }

        return this;
    }

    public pair(leftText: string, rightText: string) {
        const tempCursorY = this.lineCursorY;
        this.wrapText(leftText, tempCursorY, this.width * 0.66, 24, 'left')
        this.wrapText(rightText, tempCursorY, this.width, 24, 'right', false)
        return this;
    }

    public seperator(seperator = '-', fontSize = 24) {
        this.wrapText(seperator.repeat(this.charWidth), this.lineCursorY, this.width, fontSize, 'left')
        return this;
    }

    public draw() {
        this.canvas.height = this.lineCursorY;
        this.drawQueue.forEach(i => {
            this.context.font = `${i.fontSize}px sans-serif`;
            this.context.textAlign = i.align;
            this.context.fillText(i.line, i.x, i.y);
        });
        return { canvas: this.canvas, width: this.width, height: this.lineCursorY };
    }

}