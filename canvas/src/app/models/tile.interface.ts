export interface Tile {
    id: number;
    file: string;
    type: string;
    subType: string;
    related: {
        north: number[];
        northEast: number[];
        east: number[];
        southEast: number[];
        south: number[];
        southWest: number[];
        west: number[];
        northWest:number[];
    };
    image?: HTMLImageElement;
}

