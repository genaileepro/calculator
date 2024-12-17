export type CalculatorOperation = '+' | '-' | '*' | '/' | '=' | 'C' | 'BS';

export interface CalculatorState {
  currentValue: string;
  previousValue: string;
  operation: CalculatorOperation | null;
  isResult: boolean;
  emotion: string;
} 