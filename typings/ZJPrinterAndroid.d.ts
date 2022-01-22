/// <reference path="android-declarations.d.ts"/>

declare module th {
	export module co {
		export module increstive {
			export module ns {
				export module zj_printer {
					export class BuildConfig {
						public static class: java.lang.Class<th.co.increstive.ns.zj_printer.BuildConfig>;
						public static DEBUG: boolean;
						public static LIBRARY_PACKAGE_NAME: string;
						public static BUILD_TYPE: string;
						public constructor();
					}
				}
			}
		}
	}
}

declare module th {
	export module co {
		export module increstive {
			export module ns {
				export module zj_printer {
					export class EventHandler {
						public static class: java.lang.Class<th.co.increstive.ns.zj_printer.EventHandler>;
						/**
						 * Constructs a new instance of the th.co.increstive.ns.zj_printer.EventHandler interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							handleEvent(param0: number, param1: number, param2: string): void;
						});
						public constructor();
						public handleEvent(param0: number, param1: number, param2: string): void;
					}
				}
			}
		}
	}
}

declare module th {
	export module co {
		export module increstive {
			export module ns {
				export module zj_printer {
					export class PrinterDevice {
						public static class: java.lang.Class<th.co.increstive.ns.zj_printer.PrinterDevice>;
						public name: string;
						public address: string;
						public constructor(param0: string, param1: string);
					}
				}
			}
		}
	}
}

declare module th {
	export module co {
		export module increstive {
			export module ns {
				export module zj_printer {
					export class ZJPrinter {
						public static class: java.lang.Class<th.co.increstive.ns.zj_printer.ZJPrinter>;
						public disconnect(): void;
						public constructor();
						public getDeviceList(): androidNative.Array<th.co.increstive.ns.zj_printer.PrinterDevice>;
						public printText(param0: string): void;
						public getState(): number;
						public printHex(param0: string): void;
						public init(param0: globalAndroid.content.Context, param1: th.co.increstive.ns.zj_printer.EventHandler): void;
						public requestPermission(): void;
						public getSevice(): th.co.increstive.ns.zj_printer.service.BluetoothService;
						public connect(param0: string): void;
					}
				}
			}
		}
	}
}

declare module th {
	export module co {
		export module increstive {
			export module ns {
				export module zj_printer {
					export module command {
						export class Command {
							public static class: java.lang.Class<th.co.increstive.ns.zj_printer.command.Command>;
							public static PIECE: number;
							public static NUL: number;
							public static ESC_Init: androidNative.Array<number>;
							public static LF: androidNative.Array<number>;
							public static ESC_J: androidNative.Array<number>;
							public static ESC_d: androidNative.Array<number>;
							public static US_vt_eot: androidNative.Array<number>;
							public static ESC_B_m_n: androidNative.Array<number>;
							public static GS_V_n: androidNative.Array<number>;
							public static GS_V_m_n: androidNative.Array<number>;
							public static GS_i: androidNative.Array<number>;
							public static GS_m: androidNative.Array<number>;
							public static ESC_SP: androidNative.Array<number>;
							public static ESC_ExclamationMark: androidNative.Array<number>;
							public static GS_ExclamationMark: androidNative.Array<number>;
							public static GS_B: androidNative.Array<number>;
							public static ESC_V: androidNative.Array<number>;
							public static ESC_M: androidNative.Array<number>;
							public static ESC_G: androidNative.Array<number>;
							public static ESC_E: androidNative.Array<number>;
							public static ESC_LeftBrace: androidNative.Array<number>;
							public static ESC_Minus: androidNative.Array<number>;
							public static FS_dot: androidNative.Array<number>;
							public static FS_and: androidNative.Array<number>;
							public static FS_ExclamationMark: androidNative.Array<number>;
							public static FS_Minus: androidNative.Array<number>;
							public static FS_S: androidNative.Array<number>;
							public static ESC_t: androidNative.Array<number>;
							public static ESC_Two: androidNative.Array<number>;
							public static ESC_Three: androidNative.Array<number>;
							public static ESC_Align: androidNative.Array<number>;
							public static GS_LeftSp: androidNative.Array<number>;
							public static ESC_Relative: androidNative.Array<number>;
							public static ESC_Absolute: androidNative.Array<number>;
							public static GS_W: androidNative.Array<number>;
							public static DLE_eot: androidNative.Array<number>;
							public static DLE_DC4: androidNative.Array<number>;
							public static ESC_p: androidNative.Array<number>;
							public static GS_H: androidNative.Array<number>;
							public static GS_h: androidNative.Array<number>;
							public static GS_w: androidNative.Array<number>;
							public static GS_f: androidNative.Array<number>;
							public static GS_x: androidNative.Array<number>;
							public static GS_k: androidNative.Array<number>;
							public static GS_k_m_v_r_nL_nH: androidNative.Array<number>;
							public constructor();
						}
					}
				}
			}
		}
	}
}

declare module th {
	export module co {
		export module increstive {
			export module ns {
				export module zj_printer {
					export module command {
						export class Other {
							public static class: java.lang.Class<th.co.increstive.ns.zj_printer.command.Other>;
							public buf: androidNative.Array<number>;
							public index: number;
							public static HexStringToBytes(param0: string): androidNative.Array<number>;
							public static RemoveChar(param0: string, param1: string): java.lang.StringBuilder;
							public UTF8ToGBK(param0: string): void;
							public static IsHexChar(param0: string): boolean;
							public static StringTOGBK(param0: string): androidNative.Array<number>;
							public static overWriteBitmap(param0: globalAndroid.graphics.Bitmap, param1: androidNative.Array<number>): void;
							public static HexCharsToByte(param0: string, param1: string): number;
							public static thresholdToBWPic(param0: globalAndroid.graphics.Bitmap): androidNative.Array<number>;
							public constructor(param0: number);
							public static resizeImage(param0: globalAndroid.graphics.Bitmap, param1: number, param2: number): globalAndroid.graphics.Bitmap;
							public static createAppIconText(param0: globalAndroid.graphics.Bitmap, param1: string, param2: number, param3: boolean, param4: number): globalAndroid.graphics.Bitmap;
							public static toGrayscale(param0: globalAndroid.graphics.Bitmap): globalAndroid.graphics.Bitmap;
							public static eachLinePixToCmd(param0: androidNative.Array<number>, param1: number, param2: number): androidNative.Array<number>;
							public static saveMyBitmap(param0: globalAndroid.graphics.Bitmap, param1: string): void;
							public static byteArraysToBytes(param0: androidNative.Array<androidNative.Array<number>>): androidNative.Array<number>;
						}
					}
				}
			}
		}
	}
}

declare module th {
	export module co {
		export module increstive {
			export module ns {
				export module zj_printer {
					export module command {
						export class PrinterCommand {
							public static class: java.lang.Class<th.co.increstive.ns.zj_printer.command.PrinterCommand>;
							public static POS_Set_UnderLine(param0: number): androidNative.Array<number>;
							public static POS_Set_PrtInit(): androidNative.Array<number>;
							public static POS_Set_LF(): androidNative.Array<number>;
							public static POS_Set_Cut(param0: number): androidNative.Array<number>;
							public static getCodeBarCommand(param0: string, param1: number, param2: number, param3: number, param4: number, param5: number): androidNative.Array<number>;
							public static POS_Set_PrintWidth(param0: number): androidNative.Array<number>;
							public static POS_Set_Cashbox(param0: number, param1: number, param2: number): androidNative.Array<number>;
							public static POS_Set_Font(param0: string, param1: number, param2: number, param3: number, param4: number): androidNative.Array<number>;
							public static POS_Set_Bold(param0: number): androidNative.Array<number>;
							public static POS_Set_LeftBrace(param0: number): androidNative.Array<number>;
							public static POS_S_Align(param0: number): androidNative.Array<number>;
							public static POS_Set_PrtAndFeedPaper(param0: number): androidNative.Array<number>;
							public static POS_Set_PrtSelfTest(): androidNative.Array<number>;
							public static POS_Set_DefLineSpace(): androidNative.Array<number>;
							public static POS_Set_LineSpace(param0: number): androidNative.Array<number>;
							public static POS_Set_CodePage(param0: number): androidNative.Array<number>;
							public constructor();
							public static getBarCommand(param0: string, param1: number, param2: number, param3: number): androidNative.Array<number>;
							public static POS_Set_ChoseFont(param0: number): androidNative.Array<number>;
							public static POS_Set_Rotate(param0: number): androidNative.Array<number>;
							public static POS_Set_FontSize(param0: number, param1: number): androidNative.Array<number>;
							public static POS_Print_Text(param0: string, param1: string, param2: number, param3: number, param4: number, param5: number): androidNative.Array<number>;
							public static POS_Set_Relative(param0: number): androidNative.Array<number>;
							public static POS_Set_Beep(param0: number, param1: number): androidNative.Array<number>;
							public static POS_Set_Absolute(param0: number): androidNative.Array<number>;
							public static POS_Set_Inverse(param0: number): androidNative.Array<number>;
							public static POS_Set_LeftSP(param0: number): androidNative.Array<number>;
						}
					}
				}
			}
		}
	}
}

declare module th {
	export module co {
		export module increstive {
			export module ns {
				export module zj_printer {
					export module service {
						export class BluetoothService {
							public static class: java.lang.Class<th.co.increstive.ns.zj_printer.service.BluetoothService>;
							public static STATE_NONE: number;
							public static STATE_LISTEN: number;
							public static STATE_CONNECTING: number;
							public static STATE_CONNECTED: number;
							public static MESSAGE_STATE_CHANGE: number;
							public static MESSAGE_READ: number;
							public static MESSAGE_WRITE: number;
							public static MESSAGE_DEVICE_NAME: number;
							public static MESSAGE_TOAST: number;
							public static MESSAGE_CONNECTION_LOST: number;
							public static MESSAGE_UNABLE_CONNECT: number;
							public static DEVICE_NAME: string;
							public static TOAST: string;
							public static ErrorMessage: string;
							public constructor(param0: globalAndroid.content.Context, param1: th.co.increstive.ns.zj_printer.EventHandler);
							public write(param0: androidNative.Array<number>): void;
							public connected(param0: globalAndroid.bluetooth.BluetoothSocket, param1: globalAndroid.bluetooth.BluetoothDevice): void;
							public connect(param0: globalAndroid.bluetooth.BluetoothDevice): void;
							public stop(): void;
							public start(): void;
							public getState(): number;
						}
						export module BluetoothService {
							export class AcceptThread {
								public static class: java.lang.Class<th.co.increstive.ns.zj_printer.service.BluetoothService.AcceptThread>;
								public cancel(): void;
								public run(): void;
								public constructor(param0: th.co.increstive.ns.zj_printer.service.BluetoothService);
							}
							export class ConnectThread {
								public static class: java.lang.Class<th.co.increstive.ns.zj_printer.service.BluetoothService.ConnectThread>;
								public cancel(): void;
								public constructor(param0: th.co.increstive.ns.zj_printer.service.BluetoothService, param1: globalAndroid.bluetooth.BluetoothDevice);
								public run(): void;
							}
							export class ConnectedThread {
								public static class: java.lang.Class<th.co.increstive.ns.zj_printer.service.BluetoothService.ConnectedThread>;
								public write(param0: androidNative.Array<number>): void;
								public cancel(): void;
								public constructor(param0: th.co.increstive.ns.zj_printer.service.BluetoothService, param1: globalAndroid.bluetooth.BluetoothSocket);
								public run(): void;
							}
						}
					}
				}
			}
		}
	}
}

//Generics information:

