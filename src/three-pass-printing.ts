import { CodepageEncoder } from "./encoder/codepage-encoder";

export interface OffsetLinesData {
    baseline: number[];
    upper: number[];
    lower: number[];
}

export const ThaiCharacterOffsets = {
    lowerChar: [
        216, // ุ
        217, // ู
        218, // ฺ
    ],
    upperChar: [
        140, // ํ่
        141, // ํ้
        142, // ํ๊
        143, // ํ๋
        144, // ็
        146, // ั่
        147, // ั้
        148, // ั๊
        149, // ั๋
        150, // ิ่
        151, // ิ้
        152, // ิ๊
        153, // ิ๋
        154, // ิ์
        155, // ี่
        156, // ี้
        157, // ี๊
        158, // ี๋
        209, // ั
        212, // ิ
        213, // ี
        214, // ึ
        215, // ื
        219, // ึ่
        220, // ึ้
        221, // ึ๊
        222, // ึ๋
        231, // ็
        232, // ่
        233, // ้
        234, // ๊
        235, // ๋
        236, // ์
        237, // ํ
        238, // ์
        251, // ื่
        252, // ื้
        253, // ื๊
        254, // ื๋
    ],
    replacement: {
        "237_232": 140,
        "237_233": 141,
        "237_234": 142,
        "237_235": 143,
        "209_232": 146,
        "209_233": 147,
        "209_234": 148,
        "209_235": 149,
        "212_232": 150,
        "212_233": 151,
        "212_234": 152,
        "212_235": 153,
        "212_236": 154,
        "212_238": 154,
        "213_232": 155,
        "213_233": 156,
        "213_234": 157,
        "213_235": 158,
        "214_232": 219,
        "214_233": 220,
        "214_234": 221,
        "214_235": 222,
        "215_232": 251,
        "215_233": 252,
        "215_234": 253,
        "215_235": 254,
    }
}

const newline = [0x0a, 0x0d];

export class ThaiThreePassEncoder {

    // Offset Lines

    public getOffsetLines(content: string, codepage = 'cp874') {
        const encoded = CodepageEncoder.encode(content, codepage)
        const replaced = this.replaceOffsetPairs(encoded);
        return this.offsetCharacters(replaced);
    }

    public countBaselineChars(content: string, codepage = 'cp874') {
        const { baseline } = this.getOffsetLines(content, codepage);
        return baseline.length;
    }

    public encode(content: string, charsPerLine = 32, codepage = 'cp874') {
        const offsetLines = this.getOffsetLines(content, codepage);
        const { lines } = this.applyLineBreak(offsetLines, charsPerLine);
        return lines;
    }

    // Table

    public pairs(rows: string[][], colLeftSize: number, colRightSize: number) {
        rows.forEach(([colLeft, colRight]) => {
            const linesL = this.getOffsetLines(colLeft);
            const linesR = this.getOffsetLines(colRight);

            const encodedL = this.applyLineBreak(linesL, colLeftSize);
            const encodedR = this.applyLineBreak(linesR, colRightSize);
        })
    }

    // Private

    private getEmptyArray(content: number[]) {
        return Array.from<number>({ length: content.length })
            .fill(32); // ASCII space
    }

    private replaceOffsetPairs(encoded: Uint8Array) {
        const replaced: number[] = [];
        for (let i = 0; i < encoded.length; i++) {
            const curr = encoded[i];
            const next = encoded[i + 1];
            const paris = [curr, next].join('_');
            const replace = ThaiCharacterOffsets.replacement[paris];
            if (replace !== undefined) {
                replaced.push(replace)
                i += 1; // skip replaced char
            } else {
                replaced.push(curr);
            }
        }
        return replaced;
    }

    private offsetCharacters(replaced: number[]): OffsetLinesData {
        const baseline: number[] = [];
        const upper = this.getEmptyArray(replaced);
        const lower = this.getEmptyArray(replaced);

        let offsetCount = 0;

        replaced.forEach((char, idx) => {
            if (ThaiCharacterOffsets.upperChar.includes(char)) {
                upper[idx - offsetCount - 1] = char;
                offsetCount++;
            } else if (ThaiCharacterOffsets.lowerChar.includes(char)) {
                lower[idx - offsetCount - 1] = char;
                offsetCount++;
            } else {
                baseline.push(char);
            }
        });

        upper.length = baseline.length;
        lower.length = baseline.length;

        return { baseline, upper, lower };
    }

    private applyLineBreak(offsetLines: OffsetLinesData, charsPerLine: number) {
        let lineCounts = 0;
        const lines: number[] = [];
        const { baseline, upper, lower } = offsetLines;
        for (let i = 0; i < baseline.length; i += charsPerLine) {
            lineCounts++;
            const lineUpper = upper.slice(i, i + charsPerLine)
            const lineBase = baseline.slice(i, i + charsPerLine)
            const lineLower = lower.slice(i, i + charsPerLine)

            const lengthUpper = lineUpper.filter(i => i !== 32).length
            const lengthBase = lineBase.filter(i => i !== 32).length
            const lengthLower = lineLower.filter(i => i !== 32).length

            console.log(lengthUpper, lengthBase, lengthLower)

            if (lengthUpper > 0) {
                lines.push(...lineUpper);
                lines.push(...newline);
            }
            if (lengthBase > 0) {
                lines.push(...lineBase);
                if (lengthLower > 0) {
                    lines.push(...newline);
                }
            }
            if (lengthLower > 0) {
                lines.push(...lineLower);
                lines.push(...newline);
            }
        }
        return { lines, lineCounts };
    }
}
