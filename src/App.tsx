import { useCallback, useEffect, useRef } from 'react'
import { average, charRange, isEven, median, range, sum } from './helpers';
import { InfixFunctionsType, spreadsheetFunctionType } from './types';
import { cellRegex, functionCall, infixRegex, rangeRegex, regex } from './helpers/regex';



function App() {

  const divRef = useRef<HTMLDivElement>(null);

  // update
  const update = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const elem = event.target;
    const value = elem.value.replace(/\s/g, '');

    if (!value.includes(elem.id) && value.startsWith('=')) {
      elem.value = evalFormula(value.slice(1), divRef.current!.children)
    }
  }, [])

  useEffect(() => {
    if (divRef.current) {
      const letters = charRange('A', 'J');
      letters.forEach(createLabel);
      range(1, 99).forEach(number => {
        createLabel(String(number));
        // create table 
        letters.forEach(letter => {
          const input = document.createElement('input');
          input.type = 'text';
          input.id = letter + number;
          input.onchange = (ev: any) => {
            update(ev)
          }
          divRef.current?.appendChild(input)
        })
      })
    }

  }, [divRef, update]);


  // create label
  function createLabel(name: string) {
    const label = document.createElement('div');
    label.className = 'label';
    label.textContent = name;
    divRef.current?.appendChild(label)
  }


  // maps infix operators like +, -, *, /
  const infixFunctions: InfixFunctionsType = {
    '+': (x: number, y: number) => x + y,
    '-': (x: number, y: number) => x - y,
    '/': (x: number, y: number) => x / y,
    '*': (x: number, y: number) => x * y,
  };


  const spreadsheetFunctions: spreadsheetFunctionType = {
    "": (param: string) => param,
    sum,
    average,
    median,
    even: (nums: number[]) => nums.filter(isEven),
    someEven: (nums: number[]) => nums.some(isEven),
    everyEven: (nums: number[]) => nums.every(isEven),
    firsttwo: (nums: number[]) => nums.slice(0, 2),
    lasttwo: (nums: number[]) => nums.slice(-2),
    has2: (nums: number[]) => nums.includes(2),
    increment: (nums: number[]) => nums.map(num => num + 1),
    random: ([x, y]: [x: number, y: number]) => Math.floor(Math.random() * y + x),
    range: ([x, y]: [x: number, y: number]) => range(x, y),
    nodupes: (nums: number[]) => [...new Set(nums).values()]
  } as any

  //Infix Evaluation
  const inFixEval = (str: string, regex: RegExp) =>
    str.replace(regex, (_match, agr1, operator, arg2) => infixFunctions[operator](parseFloat(agr1), parseFloat(arg2)).toString());

  // High Precedence Operation Resolution
  const highPrecedence: any = (str: string) => {

    const str2 = inFixEval(str, regex);

    return str === str2 ? str : highPrecedence(str2)
  };

  // apply parsing logic to a string.
  const applyFunction = (str: string) => {
    const noHigh = highPrecedence(str);

    const str2 = inFixEval(noHigh, infixRegex);

    const toNumberList = (args: string) => args.split('').map(parseFloat);
    const apply = (fn: string, args: string) => spreadsheetFunctions[fn.toLowerCase()](toNumberList(args));

    return str2.replace(functionCall, (match, fn, args) => {
      if (Object.prototype.hasOwnProperty.call(spreadsheetFunctions, fn.toLowerCase())) {
        return apply(fn, args)
      } else {
        return match;
      }
    })
  }

  // Evaluate Formula 
  function evalFormula(x: string, cells: HTMLCollection): any {

    // Convert HTMLCollection to Array
    const cellsArray = Array.from(cells);

    // find a cell by it's id
    const idToText = (id: string) => cellsArray?.find(cell => cell.id === id);

    // convert into numeric numbers
    const rangeFromString = (num1: string, num2: string) => range(parseInt(num1), parseInt(num2));

    // return a value of a cell ?? 
    const elemValue = (num: number) => (character: string) => idToText(character + num);

    // return a range of characters
    const addCharacters = (character1: string) => (character2: string) => (num: number) => charRange(character1, character2).map(elemValue(num))

    //replace cell ranges 
    const rangeExpanded = x.replace(rangeRegex, (_match, char1, num1, char2, num2) => {
      const rangeValues = rangeFromString(num1, num2);
      const values = rangeValues.map(addCharacters(char1)(char2));

      const flattenedValues = values.flat();
      return flattenedValues.join(',');
    });

    //Replaces each found cell with its value
    const cellExpanded = rangeExpanded.replace(cellRegex, (match: string): string => {
      const cellValue = idToText(match.toUpperCase());
      return cellValue !== undefined ? String(cellValue) : '';
    });

    const functionExpanded = applyFunction(cellExpanded);
    return functionExpanded === x ? functionExpanded : evalFormula(functionExpanded, cells)
  }



  return (
    <div ref={divRef} id="container">
      <div></div>
    </div>
  )
}

export default App
