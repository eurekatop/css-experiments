export interface Tile {
    id: number;
    file: string;
    type: string;
    subType: string;
    related: {
        top: number[];
        left: number[];
        down: number[];
        right: number[];
    };
    image?: HTMLImageElement;
}

