var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import shifty from 'shifty';
const { tween } = shifty;
export function fetchJson(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(url);
            if (!response.ok) {
                throw new Error("No se pudo cargar el archivo JSON.");
            }
            const data = yield response.text();
            return data;
        }
        catch (error) {
            throw error;
        }
    });
}
export function parseAsciiArt(asciiArt) {
    const lines = asciiArt.split('\n');
    const coordinates = [];
    for (let y = 0; y < lines.length; y++) {
        const line = lines[y];
        for (let x = 0; x < line.length; x++) {
            const char = line.charAt(x);
            if (char !== ' ' && char !== '\n') {
                coordinates.push([x, y, char]);
            }
        }
    }
    return coordinates;
}
export function test(node, from, to, duration) {
    let loops = 0;
    return tween({
        from: from,
        to: to,
        duration: duration,
        easing: 'easeOutQuad',
        render: (state) => {
            node.style.top = `${(+state.y)}px`;
            node.style.left = `${(+state.x)}px`;
        },
    });
}
//# sourceMappingURL=index.js.map