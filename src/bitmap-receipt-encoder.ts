
import { Canvas, CanvasRenderingContext2D, createCanvas } from 'canvas';

export interface CanvasDrawQueue {
    line: string,
    x: number,
    y: number,
    config: TextConfig;
}

export type TextStyle = 'normal' | 'italic' | 'oblique';
export type TextWeight = 'normal' | 'bold';

export interface TextConfig {
    size: number;
    align: CanvasTextAlign;
    style: TextStyle;
    weight: TextWeight
}

export class BitmapReceiptEncoder {

    public canvas: Canvas;
    public context: CanvasRenderingContext2D;
    public charWidth = 46;

    private drawQueue: CanvasDrawQueue[] = [];
    private lineCursorY = 0;

    // Config
    private textConfig: TextConfig = {
        size: 24,
        align: 'left',
        style: 'normal',
        weight: 'normal'
    }

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
        isIncrementHeight = true
    ) {
        let currentY = y;
        var lines = [];
        var width = 0, i, j;
        var result = '';

        this.context.font = `${this.textConfig.style} normal ${this.textConfig.weight} ${this.textConfig.size}px sans-serif`;

        while (text.length) {
            for (i = text.length; this.context.measureText(text.substring(0, i)).width > maxWidth; i--);

            result = text.substring(0, i);

            if (i !== text.length)
                for (j = 0; result.indexOf(" ", j) !== -1; j = result.indexOf(" ", j) + 1);

            lines.push(result.substring(0, j || result.length));
            const line = result.substring(0, j || result.length);
            currentY += this.textConfig.size;

            if (isIncrementHeight) {
                this.lineCursorY += this.textConfig.size;
            }

            let x = 0;

            if (this.textConfig.align === 'center') {
                x = this.width / 2;
            } else if (this.textConfig.align === 'right') {
                x = this.width;
            }

            this.drawQueue.push({
                line,
                x,
                y: currentY,
                config: Object.assign({}, this.textConfig),
            });

            width = Math.max(width, this.context.measureText(lines[lines.length - 1]).width);
            text = text.substring(lines[lines.length - 1].length, text.length);
        }

        return this;
    }

    public pair(leftText: string, rightText: string, leftWidth: number = 0.66) {
        const tempCursorY = this.lineCursorY;
        return this.textAlign('left')
            .wrapText(leftText, tempCursorY, this.width * leftWidth)
            .textAlign('right')
            .wrapText(rightText, tempCursorY, this.width, false);
    }

    public seperator(seperator = '-') {
        const tempConfig = this.textConfig;
        this.textAlign('left')
            .textSize(24)
            .textStyle('normal')
            .textWeight('normal')
            .wrapText(seperator.repeat(this.charWidth), this.lineCursorY, this.width)
        this.textConfig = tempConfig;
        return this;
    }

    public line(text: string) {
        return this.wrapText(text, this.lineCursorY, this.width);
    }

    // Config

    public textSize(size: number) {
        this.textConfig.size = size;
        return this;
    }

    public textAlign(align: CanvasTextAlign) {
        this.textConfig.align = align;
        return this;
    }

    public textStyle(style: TextStyle) {
        this.textConfig.style = style;
        return this;
    }

    public textWeight(weight: TextWeight) {
        this.textConfig.weight = weight;
        return this;
    }

    public draw() {
        const r = this.lineCursorY % 8;
        this.lineCursorY += 8 + r;
        console.log(this.lineCursorY, this.lineCursorY % 8);
        this.canvas.height = this.lineCursorY;
        this.drawQueue.forEach(i => {
            this.context.font = `${i.config.style} normal ${i.config.weight} ${i.config.size}px sans-serif`;
            this.context.textAlign = i.config.align;
            this.context.fillText(i.line, i.x, i.y);
        });
        return { canvas: this.canvas, width: this.width, height: this.lineCursorY };
    }

}