export const rangeRegex = /([A-J])([1-9][0-9]?):([A-J])([1-9][0-9]?)/gi;
export const cellRegex = /[A-J]([1-9][0-9]?)/gi;
export const infixRegex = /([\d.]+)([+-])([\d.]+)/;
export const functionCall = /([a-z]*)\(([0-9., ]*)\)(?!.*\()/i;
export const regex = /([\d.]+)([*\/])([\d.]+)/;
