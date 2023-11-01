type MatrixCoordValue = {
    i:number;
    j:number;
    value:number
}

function* iterateLeftToRightByRows(matrix: number[][]): Generator<MatrixCoordValue> {
    const numRows = matrix.length;
    const numCols = matrix[0].length;
  
    for (let i = 0; i < numRows; i++) {
      if (i % 2 === 0) {
        for (let j = 0; j < numCols; j++) {
          yield { i:j,j:i,value:matrix[i][j] }
        }
      } else {
        for (let j = numCols - 1; j >= 0; j--) {
          yield { i:j,j:i,value:matrix[i][j] }
        }
      }
    }
  }

function *iterateLeftToRightZigZag(matrix: number[][]): Generator<MatrixCoordValue> {
    const numRows = matrix.length;
    const numCols = matrix[0].length;

    for (let i = 0; i < numRows; i++) {
    if (i % 2 === 0) {
      for (let j = 0; j < numCols; j++) {
        yield { i:j,j:i,value:matrix[i][j] }
    }
    } else {
      for (let j = numCols - 1; j >= 0; j--) {
        yield { i:j,j:i,value:matrix[i][j] }
    }
    }
  }
}
  
export { iterateLeftToRightByRows , iterateLeftToRightZigZag, type MatrixCoordValue}

 // // Ejemplo de uso:
 // const matrix: number[][] = [
 //   [1, 2, 3],
 //   [4, 5, 6],
 //   [7, 8, 9],
 // ];
 // 
 // const iterator = iterateLeftToRightByRows(matrix);
 // for (const value of iterator) {
 //   console.log(value);
 // }
  