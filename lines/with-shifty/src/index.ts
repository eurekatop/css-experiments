import shifty, { TweenState } from 'shifty'

const { tween } = shifty;


export async function fetchJson(url:string) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("No se pudo cargar el archivo JSON.");
    }

    const data = await response.text();
    return data;
  } catch (error) {
    throw error;
  }
}

export function parseAsciiArt(asciiArt: string): [number, number, string][] {
  const lines = asciiArt.split('\n'); // Split the ASCII art into lines
  const coordinates: [number, number, string][] = [];

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

export function test(node:HTMLElement, from: TweenState, to:TweenState, duration:number) {
  let loops = 0;
  return tween({
    from: from,
    to: to,
    duration: duration,
    easing: 'easeOutQuad',
    render: (state: shifty.TweenState) => {
      node.style.top = `${(+state.y)}px`      
      node.style.left = `${(+state.x)}px`      
    },
  });
}