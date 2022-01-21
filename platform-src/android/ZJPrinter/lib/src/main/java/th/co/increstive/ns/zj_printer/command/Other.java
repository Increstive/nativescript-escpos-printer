//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package th.co.increstive.ns.zj_printer.command;

import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.ColorMatrix;
import android.graphics.ColorMatrixColorFilter;
import android.graphics.Matrix;
import android.graphics.Paint;
import android.graphics.Bitmap.CompressFormat;
import android.graphics.Bitmap.Config;
import android.graphics.Paint.Style;
import android.os.Environment;
import android.text.StaticLayout;
import android.text.TextPaint;
import android.text.Layout.Alignment;
import android.text.TextUtils.TruncateAt;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;

public class Other {
    public byte[] buf;
    public int index;
    private static final int WIDTH_80 = 576;
    private static final int WIDTH_58 = 384;
    private static int[] p0 = new int[]{0, 128};
    private static int[] p1 = new int[]{0, 64};
    private static int[] p2 = new int[]{0, 32};
    private static int[] p3 = new int[]{0, 16};
    private static int[] p4 = new int[]{0, 8};
    private static int[] p5 = new int[]{0, 4};
    private static int[] p6 = new int[]{0, 2};
    private static final byte[] chartobyte = new byte[]{0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 0, 0, 0, 0, 0, 0, 10, 11, 12, 13, 14, 15};

    public Other(int length) {
        this.buf = new byte[length];
        this.index = 0;
    }

    public static StringBuilder RemoveChar(String str, char c) {
        StringBuilder sb = new StringBuilder();
        int length = str.length();

        for(int i = 0; i < length; ++i) {
            char tmp = str.charAt(i);
            if (tmp != c) {
                sb.append(tmp);
            }
        }

        return sb;
    }

    public static boolean IsHexChar(char c) {
        return c >= '0' && c <= '9' || c >= 'a' && c <= 'f' || c >= 'A' && c <= 'F';
    }

    public static byte HexCharsToByte(char ch, char cl) {
        byte b = (byte)(chartobyte[ch - 48] << 4 & 240 | chartobyte[cl - 48] & 15);
        return b;
    }

    public static byte[] HexStringToBytes(String str) {
        int count = str.length();
        byte[] data = null;
        if (count % 2 == 0) {
            data = new byte[count / 2];

            for(int i = 0; i < count; i += 2) {
                char ch = str.charAt(i);
                char cl = str.charAt(i + 1);
                if (!IsHexChar(ch) || !IsHexChar(cl)) {
                    data = null;
                    break;
                }

                if (ch >= 'a') {
                    ch = (char)(ch - 32);
                }

                if (cl >= 'a') {
                    cl = (char)(cl - 32);
                }

                data[i / 2] = HexCharsToByte(ch, cl);
            }
        }

        return data;
    }

    public void UTF8ToGBK(String Data) {
        try {
            byte[] bs = Data.getBytes("GBK");
            int DataLength = bs.length;

            for(int i = 0; i < DataLength; ++i) {
                this.buf[this.index++] = bs[i];
            }
        } catch (UnsupportedEncodingException var5) {
            var5.printStackTrace();
        }

    }

    public static byte[] StringTOGBK(String data) {
        byte[] buffer = null;

        try {
            buffer = data.getBytes("GBK");
        } catch (UnsupportedEncodingException var3) {
            var3.printStackTrace();
        }

        return buffer;
    }

    public static Bitmap createAppIconText(Bitmap icon, String txt, float size, boolean is58mm, int hight) {
        Bitmap canvasBitmap;
        int width;
        Canvas canvas;
        TextPaint paint;
        StaticLayout layout;
        if (is58mm) {
            canvasBitmap = Bitmap.createBitmap(384, hight, Config.ARGB_8888);
            width = canvasBitmap.getWidth();
            canvas = new Canvas(canvasBitmap);
            canvas.setBitmap(canvasBitmap);
            canvas.drawColor(-1);
            paint = new TextPaint();
            paint.setColor(-16777216);
            paint.setTextSize(size);
            paint.setAntiAlias(true);
            paint.setStyle(Style.FILL);
            paint.setFakeBoldText(false);
            layout = new StaticLayout(txt, 0, txt.length(), paint, width, Alignment.ALIGN_NORMAL, 1.1F, 0.0F, true, TruncateAt.END, width);
            canvas.translate(0.0F, 5.0F);
            layout.draw(canvas);
//            canvas.save(31);
            canvas.restore();
            return canvasBitmap;
        } else {
            canvasBitmap = Bitmap.createBitmap(576, hight, Config.ARGB_8888);
            width = canvasBitmap.getWidth();
            canvas = new Canvas(canvasBitmap);
            canvas.setBitmap(canvasBitmap);
            canvas.drawColor(-1);
            paint = new TextPaint();
            paint.setColor(-16777216);
            paint.setTextSize(size);
            paint.setAntiAlias(true);
            paint.setStyle(Style.FILL);
            paint.setFakeBoldText(false);
            layout = new StaticLayout(txt, 0, txt.length(), paint, width, Alignment.ALIGN_NORMAL, 1.1F, 0.0F, true, TruncateAt.END, width);
            canvas.translate(0.0F, 5.0F);
            layout.draw(canvas);
//            canvas.save(31);
            canvas.restore();
            return canvasBitmap;
        }
    }

    public static byte[] byteArraysToBytes(byte[][] data) {
        int length = 0;

        for(int i = 0; i < data.length; ++i) {
            length += data[i].length;
        }

        byte[] send = new byte[length];
        int k = 0;

        for(int i = 0; i < data.length; ++i) {
            for(int j = 0; j < data[i].length; ++j) {
                send[k++] = data[i][j];
            }
        }

        return send;
    }

    public static Bitmap resizeImage(Bitmap bitmap, int w, int h) {
        int width = bitmap.getWidth();
        int height = bitmap.getHeight();
        float scaleWidth = (float)w / (float)width;
        float scaleHeight = (float)h / (float)height;
        Matrix matrix = new Matrix();
        matrix.postScale(scaleWidth, scaleHeight);
        Bitmap resizedBitmap = Bitmap.createBitmap(bitmap, 0, 0, width, height, matrix, true);
        return resizedBitmap;
    }

    public static Bitmap toGrayscale(Bitmap bmpOriginal) {
        int height = bmpOriginal.getHeight();
        int width = bmpOriginal.getWidth();
        Bitmap bmpGrayscale = Bitmap.createBitmap(width, height, Config.ARGB_8888);
        Canvas c = new Canvas(bmpGrayscale);
        Paint paint = new Paint();
        ColorMatrix cm = new ColorMatrix();
        cm.setSaturation(0.0F);
        ColorMatrixColorFilter f = new ColorMatrixColorFilter(cm);
        paint.setColorFilter(f);
        c.drawBitmap(bmpOriginal, 0.0F, 0.0F, paint);
        return bmpGrayscale;
    }

    public static void saveMyBitmap(Bitmap mBitmap, String name) {
        File f = new File(Environment.getExternalStorageDirectory().getPath(), name);

        try {
            f.createNewFile();
        } catch (IOException var7) {
        }

        FileOutputStream fOut = null;

        try {
            fOut = new FileOutputStream(f);
            mBitmap.compress(CompressFormat.PNG, 100, fOut);
            fOut.flush();
            fOut.close();
        } catch (FileNotFoundException var5) {
        } catch (IOException var6) {
        }

    }

    public static byte[] thresholdToBWPic(Bitmap mBitmap) {
        int[] pixels = new int[mBitmap.getWidth() * mBitmap.getHeight()];
        byte[] data = new byte[mBitmap.getWidth() * mBitmap.getHeight()];
        mBitmap.getPixels(pixels, 0, mBitmap.getWidth(), 0, 0, mBitmap.getWidth(), mBitmap.getHeight());
        format_K_threshold(pixels, mBitmap.getWidth(), mBitmap.getHeight(), data);
        return data;
    }

    private static void format_K_threshold(int[] orgpixels, int xsize, int ysize, byte[] despixels) {
        int graytotal = 0;
//        int grayave = 1;
        int k = 0;

        int i;
        int j;
        int gray;
        for(i = 0; i < ysize; ++i) {
            for(j = 0; j < xsize; ++j) {
                gray = orgpixels[k] & 255;
                graytotal += gray;
                ++k;
            }
        }

        int grayave = graytotal / ysize / xsize;
        k = 0;

        for(i = 0; i < ysize; ++i) {
            for(j = 0; j < xsize; ++j) {
                gray = orgpixels[k] & 255;
                if (gray > grayave) {
                    despixels[k] = 0;
                } else {
                    despixels[k] = 1;
                }

                ++k;
            }
        }

    }

    public static void overWriteBitmap(Bitmap mBitmap, byte[] dithered) {
        int ysize = mBitmap.getHeight();
        int xsize = mBitmap.getWidth();
        int k = 0;

        for(int i = 0; i < ysize; ++i) {
            for(int j = 0; j < xsize; ++j) {
                if (dithered[k] == 0) {
                    mBitmap.setPixel(j, i, -1);
                } else {
                    mBitmap.setPixel(j, i, -16777216);
                }

                ++k;
            }
        }

    }

    public static byte[] eachLinePixToCmd(byte[] src, int nWidth, int nMode) {
        int nHeight = src.length / nWidth;
        int nBytesPerLine = nWidth / 8;
        byte[] data = new byte[nHeight * (8 + nBytesPerLine)];
//        int offset = false;
        int k = 0;

        for(int i = 0; i < nHeight; ++i) {
            int offset = i * (8 + nBytesPerLine);
            data[offset + 0] = 29;
            data[offset + 1] = 118;
            data[offset + 2] = 48;
            data[offset + 3] = (byte)(nMode & 1);
            data[offset + 4] = (byte)(nBytesPerLine % 256);
            data[offset + 5] = (byte)(nBytesPerLine / 256);
            data[offset + 6] = 1;
            data[offset + 7] = 0;

            for(int j = 0; j < nBytesPerLine; ++j) {
                data[offset + 8 + j] = (byte)(p0[src[k]] + p1[src[k + 1]] + p2[src[k + 2]] + p3[src[k + 3]] + p4[src[k + 4]] + p5[src[k + 5]] + p6[src[k + 6]] + src[k + 7]);
                k += 8;
            }
        }

        return data;
    }
}
