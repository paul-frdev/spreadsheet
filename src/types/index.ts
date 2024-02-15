export type InfixFunctionsType = {
  [key: string]: (x: number, y: number) => number;
};

export type spreadsheetFunctionType = {
  [key: string]: ((param: string | number[]) => any);
}