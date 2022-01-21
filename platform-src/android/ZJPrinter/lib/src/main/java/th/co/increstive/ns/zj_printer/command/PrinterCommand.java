package th.co.increstive.ns.zj_printer.command;

import java.io.UnsupportedEncodingException;

public class PrinterCommand {

	/**
	 * Printer initialization
	 * @return
	 */
	public static byte[] POS_Set_PrtInit(){

		byte[] data = Other.byteArraysToBytes(new byte[][] {
				Command.ESC_Init});

		return data;
	}

	/**
	 * print and wrap
	 * @return
	 */
	public static byte[] POS_Set_LF(){
		byte[] data = Other.byteArraysToBytes(new byte[][] {
				Command.LF});

		return data;
	}

	/**
	 * Print and feed (0~255)
	 * @param feed
	 * @return
	 */
	public static byte[] POS_Set_PrtAndFeedPaper(int feed){
		if(feed > 255 | feed < 0)
			return null;

		Command.ESC_J[2] = (byte)feed;

		byte[] data = Other.byteArraysToBytes(new byte[][] {
				Command.ESC_J});

		return data;
	}

	/**
	 * Print a self-test page
	 * @return
	 */
	public static byte[] POS_Set_PrtSelfTest(){

		byte[] data = Other.byteArraysToBytes(new byte[][]{
				Command.US_vt_eot
		});
		return data;
	}

	/**
	 * beep command
	 * @param m  Number of beeps
	 * @param t  time for each beep
	 * @return
	 */
	public static byte[] POS_Set_Beep(int m, int t){

		if((m<1 || m>9) | (t<1 || t>9))
			return null;

		Command.ESC_B_m_n[2] = (byte)m;
		Command.ESC_B_m_n[3] = (byte)t;

		byte[] data = Other.byteArraysToBytes(new byte[][]{
				Command.ESC_B_m_n
		});
		return data;
	}

	/**
	 * Cutter command (feed the paper to the cutter position and cut the paper)
	 * @param cut  0~255
	 * @return
	 */
	public static byte[] POS_Set_Cut(int cut){
		if(cut>255 | cut < 0)
			return null;

		Command.GS_V_m_n[3] = (byte)cut;
		byte[] data = Other.byteArraysToBytes(new byte[][]{
				Command.GS_V_m_n
		});
		return data;
	}

	/**
	 * Cash Box Instructions
	 * @param nMode
	 * @param nTime1
	 * @param nTime2
	 * @return
	 */
	public static byte[] POS_Set_Cashbox(int nMode, int nTime1, int nTime2){

		if((nMode<0 || nMode>1) | nTime1<0 | nTime1 >255 | nTime2 < 0 | nTime2 > 255)
			return null;
		Command.ESC_p[2] = (byte)nMode;
		Command.ESC_p[3] = (byte)nTime1;
		Command.ESC_p[4] = (byte)nTime2;

		byte[] data = Other.byteArraysToBytes(new byte[][]{
				Command.ESC_p
		});
		return data;
	}

	/**
	 * Set absolute print position
	 * @param absolute
	 * @return
	 */
	public static byte[] POS_Set_Absolute(int absolute){
		if(absolute >65535 | absolute <0)
			return null;

		Command.ESC_Relative[2] = (byte)(absolute%0x100);
		Command.ESC_Relative[3] = (byte)(absolute/0x100);

		byte[] data = Other.byteArraysToBytes(new byte[][]{
				Command.ESC_Relative
		});
		return data;
	}

	/**
	 * Set relative print position
	 * @param relative
	 * @return
	 */
	public static byte[] POS_Set_Relative(int relative){
		if(relative<0 | relative>65535)
			return null;

		Command.ESC_Absolute[2] = (byte)(relative%0x100);
		Command.ESC_Absolute[3] = (byte)(relative/0x100);

		byte[] data = Other.byteArraysToBytes(new byte[][]{
				Command.ESC_Absolute
		});
		return data;
	}

	/**
	 * set left margin
	 * @param left
	 * @return
	 */
	public static byte[] POS_Set_LeftSP(int left){
		if(left > 255 | left < 0)
			return null;

		Command.GS_LeftSp[2] = (byte)(left%100);
		Command.GS_LeftSp[3] = (byte)(left/100);

		byte[] data = Other.byteArraysToBytes(new byte[][]{
				Command.GS_LeftSp
		});
		return data;
	}

	/**
	 * Set the alignment mode
	 * @param align
	 * @return
	 */
	public static byte[] POS_S_Align(int align) {
		if ((align < 0 || align > 2) | (align <48 || align >50))
			return null;

		byte[] data = Command.ESC_Align;
		data[2] = (byte) align;
		return data;
	}

	/**
	 * Set the print area width
	 * @param width
	 * @return
	 */
	public static byte[] POS_Set_PrintWidth(int width){
		if(width<0 | width>255)
			return null;

		Command.GS_W[2] = (byte)(width%100);
		Command.GS_W[3] = (byte)(width/100);

		byte[] data = Other.byteArraysToBytes(new byte[][]{
				Command.GS_W
		});
		return data;
	}

	/**
	 * Set default line spacing
	 * @return
	 */
	public static byte[] POS_Set_DefLineSpace(){

		byte[] data =  Command.ESC_Two;
		return data;
	}

	/**
	 * Set line spacing
	 * @param space
	 * @return
	 */
	public static byte[] POS_Set_LineSpace(int space){
		if(space<0 | space > 255)
			return null;

		Command.ESC_Three[2] = (byte)space;

		byte[] data = Other.byteArraysToBytes(new byte[][]{
				Command.ESC_Three
		});
		return data;
	}

	/**
	 * Select character code page
	 * @param page
	 * @return
	 */
	public static byte[] POS_Set_CodePage(int page){
		if(page > 255)
			return null;

		Command.ESC_t[2] = (byte)page;

		byte[] data = Other.byteArraysToBytes(new byte[][]{
				Command.ESC_t
		});

		return data;
	}

	/**
	 * print text document
	 * @param pszString  	要打印的字符串
	 * @param encoding   	打印字符对应编码
	 * @param codepage      设置代码页(0--255)
	 * @param nWidthTimes   倍宽(0--4)
	 * @param nHeightTimes  倍高(0--4)
	 * @param nFontType     字体类型(只对Ascii码有效)(0,1 48,49)
	 */
	public static byte[] POS_Print_Text(String pszString, String encoding, int codepage,
										int nWidthTimes, int nHeightTimes, int nFontType) {

		if (codepage <0 || codepage >255 || pszString == null || "".equals(pszString) || pszString.length() < 1) {
			return null;
		}

		byte[] pbString = null;
		try {
			pbString = pszString.getBytes(encoding);
		} catch (UnsupportedEncodingException e) {
			return null;
		}

		byte[] intToWidth = { 0x00, 0x10, 0x20, 0x30 };
		byte[] intToHeight = { 0x00, 0x01, 0x02, 0x03 };
		Command.GS_ExclamationMark[2] = (byte) (intToWidth[nWidthTimes] + intToHeight[nHeightTimes]);

		Command.ESC_t[2] = (byte)codepage;

		Command.ESC_M[2] = (byte)nFontType;

		if(codepage == 0){
			byte[] data = Other.byteArraysToBytes(new byte[][] {
					Command.GS_ExclamationMark, Command.ESC_t, Command.FS_and, Command.ESC_M, pbString });

			return data;
		}else{
			byte[] data = Other.byteArraysToBytes(new byte[][] {
					Command.GS_ExclamationMark, Command.ESC_t, Command.FS_dot, Command.ESC_M, pbString });

			return data;
		}
	}

	/**
	 * Bold command (valid if the lowest bit is 1)
	 * @param bold
	 * @return
	 */
	public static byte[] POS_Set_Bold(int bold){

		Command.ESC_E[2] = (byte)bold;
		Command.ESC_G[2] = (byte)bold;

		byte[] data = Other.byteArraysToBytes(new byte[][]{
				Command.ESC_E, Command.ESC_G
		});
		return data;
	}

	/**
	 * Set upside-down printing mode (effective when the lowest bit is 1)
	 * @param brace
	 * @return
	 */
	public static byte[] POS_Set_LeftBrace(int brace){

		Command.ESC_LeftBrace[2] = (byte)brace;
		byte[] data = Other.byteArraysToBytes(new byte[][]{
				Command.ESC_LeftBrace
		});
		return data;
	}

	/**
	 * set underline
	 * @param line
	 * @return
	 */
	public static byte[] POS_Set_UnderLine(int line){

		if((line<0 || line>2))
			return null;

		Command.ESC_Minus[2] = (byte)line;
		Command.FS_Minus[2] = (byte)line;

		byte[] data = Other.byteArraysToBytes(new byte[][]{
				Command.ESC_Minus, Command.FS_Minus
		});
		return data;
	}

	/**
	 * Choose font size (double height and double width)
	 * @param size1
	 * @param size2
	 * @return
	 */
	public static byte[] POS_Set_FontSize(int size1, int size2){
		if(size1<0 | size1>7 | size2<0 | size2>7)
			return null;

		byte[] intToWidth = { 0x00, 0x10, 0x20, 0x30, 0x40, 0x50, 0x60, 0x70 };
		byte[] intToHeight = { 0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07 };
		Command.GS_ExclamationMark[2] = (byte) (intToWidth[size1] + intToHeight[size2]);
		byte[] data = Other.byteArraysToBytes(new byte[][]{
				Command.GS_ExclamationMark
		});
		return data;
	}

	/**
	 * Set up reverse printing
	 * @param inverse
	 * @return
	 */
	public static byte[] POS_Set_Inverse(int inverse){

		Command.GS_B[2] = (byte)inverse;

		byte[] data = Other.byteArraysToBytes(new byte[][]{
				Command.GS_B
		});

		return data;
	}

	/**
	 * Set to rotate 90 degrees to print
	 * @param rotate
	 * @return
	 */
	public static byte[] POS_Set_Rotate(int rotate){
		if(rotate<0 || rotate>1)
			return null;
		Command.ESC_V[2] = (byte)rotate;
		byte[] data = Other.byteArraysToBytes(new byte[][]{
				Command.ESC_V
		});
		return data;
	}

	/**
	 * Choose font type
	 * @param font
	 * @return
	 */
	public static byte[] POS_Set_ChoseFont(int font){
		if(font > 1 | font < 0)
			return null;

		Command.ESC_M[2] = (byte)font;
		byte[] data = Other.byteArraysToBytes(new byte[][]{
				Command.ESC_M
		});
		return data;

	}

//***********************************The following functions are public functions***********************************************************//
	/**
	 * QR code printing function
	 * @param str                     Print QR code data
	 * @param nVersion				      QR code type
	 * @param nErrorCorrectionLevel   Error correction level
	 * @param nMagnification          gain
	 * @return
	 */
	public static byte[] getBarCommand(String str, int nVersion, int nErrorCorrectionLevel,
									   int nMagnification){

		if(nVersion<0 | nVersion >19 | nErrorCorrectionLevel<0 | nErrorCorrectionLevel > 3
				| nMagnification < 1 | nMagnification > 8){
			return null;
		}

		byte[] bCodeData = null;
		try
		{
			bCodeData = str.getBytes("GBK");

		}
		catch (UnsupportedEncodingException e)
		{
			e.printStackTrace();
			return null;
		}

		byte[] command = new byte[bCodeData.length + 7];

		command[0] = 27;
		command[1] = 90;
		command[2] = ((byte)nVersion);
		command[3] = ((byte)nErrorCorrectionLevel);
		command[4] = ((byte)nMagnification);
		command[5] = (byte)(bCodeData.length & 0xff);
		command[6] = (byte)((bCodeData.length & 0xff00) >> 8);
		System.arraycopy(bCodeData, 0, command, 7, bCodeData.length);

		return command;
	}

	/**
	 * Printing 1D barcodes
	 * @param str                   print barcode characters
	 * @param nType					Barcode Type (65~73)
	 * @param nWidthX				barcode width
	 * @param nHeight				Bar code height
	 * @param nHriFontType			HRI font
	 * @param nHriFontPosition		HRI location
	 * @return
	 */
	public static byte[] getCodeBarCommand(String str, int nType, int nWidthX, int nHeight,
										   int nHriFontType, int nHriFontPosition){

		if (nType < 0x41 | nType > 0x49 | nWidthX < 2 | nWidthX > 6
				| nHeight < 1 | nHeight > 255 | str.length() == 0)
			return null;

		byte[] bCodeData = null;
		try
		{
			bCodeData = str.getBytes("GBK");

		}
		catch (UnsupportedEncodingException e)
		{
			e.printStackTrace();
			return null;
		}

		byte[] command = new byte[bCodeData.length + 16];

		command[0] = 29;
		command[1] = 119;
		command[2] = ((byte)nWidthX);
		command[3] = 29;
		command[4] = 104;
		command[5] = ((byte)nHeight);
		command[6] = 29;
		command[7] = 102;
		command[8] = ((byte)(nHriFontType & 0x01));
		command[9] = 29;
		command[10] = 72;
		command[11] = ((byte)(nHriFontPosition & 0x03));
		command[12] = 29;
		command[13] = 107;
		command[14] = ((byte)nType);
		command[15] = (byte)(byte) bCodeData.length;
		System.arraycopy(bCodeData, 0, command, 16, bCodeData.length);


		return command;
	}

	/**
	 * Set print mode (select font (font:A font:B), bold, font double height and double width (maximum 4 times height and width))
	 * @param str          the printed string
	 * @param bold		          bold
	 * @param font		          Choose font
	 * @param widthsize    double width
	 * @param heigthsize   double high
	 * @return
	 */
	public static byte[] POS_Set_Font(String str, int bold, int font, int widthsize, int heigthsize){

		if(str.length() == 0 | widthsize<0 | widthsize >4 | heigthsize<0 | heigthsize>4
				| font<0 | font>1)
			return null;

		byte[] strData = null;
		try
		{
			strData = str.getBytes("GBK");
		}
		catch (UnsupportedEncodingException e)
		{
			e.printStackTrace();
			return null;
		}

		byte[] command = new byte[strData.length + 9];

		byte[] intToWidth = { 0x00, 0x10, 0x20, 0x30 };//up to four times the width
		byte[] intToHeight = { 0x00, 0x01, 0x02, 0x03 };//up to four times the height

		command[0] = 27;
		command[1] = 69;
		command[2] = ((byte)bold);
		command[3] = 27;
		command[4] = 77;
		command[5] = ((byte)font);
		command[6] = 29;
		command[7] = 33;
		command[8] = (byte) (intToWidth[widthsize] + intToHeight[heigthsize]);

		System.arraycopy(strData, 0, command, 9, strData.length);
		return command;
	}
//**********************************************************************************************************//

}
