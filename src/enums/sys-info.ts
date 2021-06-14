export const sysInfo = {
    baseUrl: '',
    siteName: '',
    mittBeian: '',
    publicBeian: '',
    copyright: '',
};

export type SysInfoKey = keyof (typeof sysInfo);

export const sysInfoKeys: SysInfoKey[] = [
    'baseUrl',
    'siteName',
    'mittBeian',
    'publicBeian',
    'copyright',
];
