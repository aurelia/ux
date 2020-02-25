export interface UxIconRegObject {
    name: string;
    svg: string;
}
export declare type UxIconRegArray = [string, string, number?, number?];
export declare class UxIconMap {
    defaultIconWidth: number;
    defaultIconHeight: number;
    private map;
    registerIcon(nameOrIcon: string | UxIconRegArray | UxIconRegObject, svg?: string): void;
    registerIcons(icons: Array<UxIconRegArray | UxIconRegObject>): void;
    private buildSvg;
    has(name: string | string[]): boolean;
    get(name: string): string | undefined;
    getAllKeys(): Array<string>;
}
