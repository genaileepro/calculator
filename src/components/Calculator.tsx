'use client';

import { useState } from 'react';
import { CalculatorOperation, CalculatorState } from '@/types/calculator';
import { getEmotionByNumber, getColors } from '@/utils/emotionUtils';

export default function Calculator() {
  const [state, setState] = useState<CalculatorState>({
    currentValue: '0',
    previousValue: '',
    operation: null,
    isResult: false,
    emotion: '😐'
  });
  const [showEmotion, setShowEmotion] = useState(false);

  const calculate = (prev: string, current: string, operation: CalculatorOperation): string => {
    const p = parseFloat(prev);
    const c = parseFloat(current);
    switch (operation) {
      case '+': return String(p + c);
      case '-': return String(p - c);
      case '*': return String(p * c);
      case '/': return c === 0 ? 'Error' : String(p / c);
      default: return current;
    }
  };

  const handleNumberClick = (num: string) => {
    if (state.currentValue.replace(/[.-]/g, '').length >= 12 && !state.isResult) {
      return;
    }

    if (state.isResult) {
      setState({
        ...state,
        currentValue: num,
        isResult: false,
        emotion: showEmotion ? getEmotionByNumber(Number(num)) : '😐'
      });
      return;
    }

    const newValue = state.currentValue === '0' ? num : state.currentValue + num;
    setState({
      ...state,
      currentValue: newValue,
      emotion: showEmotion ? getEmotionByNumber(Number(newValue)) : '😐'
    });
  };

  const handleOperationClick = (operation: CalculatorOperation) => {
    if (operation === 'C') {
      setState({
        currentValue: '0',
        previousValue: '',
        operation: null,
        isResult: false,
        emotion: '😐'
      });
      return;
    }

    if (operation === 'BS') {
      const newValue = state.currentValue.slice(0, -1) || '0';
      setState({
        ...state,
        currentValue: newValue,
        emotion: showEmotion ? getEmotionByNumber(Number(newValue)) : '😐'
      });
      return;
    }

    if (operation === '=') {
      if (!state.operation || !state.previousValue) return;
      
      const result = calculate(state.previousValue, state.currentValue, state.operation);
      setState({
        currentValue: result,
        previousValue: '',
        operation: null,
        isResult: true,
        emotion: showEmotion ? getEmotionByNumber(Number(result)) : '😐'
      });
      return;
    }

    setState({
      previousValue: state.currentValue,
      currentValue: '0',
      operation: operation,
      isResult: false,
      emotion: state.emotion
    });
  };

  const formatNumber = (num: string): string => {
    const maxLength = 12;
    const number = Number(num);
    
    if (isNaN(number)) return num;
    
    if (number >= 1e12) {
      return number.toExponential(2);
    }
    
    const formatted = number.toLocaleString('ko-KR', {
      maximumFractionDigits: 6,
      maximumSignificantDigits: maxLength
    });
    
    return formatted;
  };

  return (
    <div className={`p-6 rounded-xl shadow-2xl max-w-xs w-full ${
      showEmotion ? getColors(Number(state.currentValue)).bg : 'bg-white'
    }`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-slate-800">계산기</h2>
        <button 
          onClick={() => setShowEmotion(!showEmotion)}
          className={`px-3 py-1.5 rounded-full transition-colors duration-200 ${
            showEmotion 
              ? 'bg-indigo-500 text-white hover:bg-indigo-600' 
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          감정모드 {showEmotion ? 'ON' : 'OFF'}
        </button>
      </div>
      
      <div className={`p-4 rounded-lg mb-4 transition-colors duration-200 overflow-hidden ${
        showEmotion 
          ? `${getColors(Number(state.currentValue)).bg} ${getColors(Number(state.currentValue)).text}`
          : 'bg-slate-100 text-slate-900'
      }`}>
        {showEmotion && <div className="text-4xl mb-2">{state.emotion}</div>}
        <div className="text-3xl font-semibold truncate text-right">
          {formatNumber(state.currentValue)}
        </div>
        <div className="text-sm opacity-75 truncate text-right">
          {state.previousValue && formatNumber(state.previousValue)} {state.operation}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        <button 
          onClick={() => handleOperationClick('C')} 
          className="col-span-2 bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition-colors duration-200"
        >
          C
        </button>
        <button 
          onClick={() => handleOperationClick('BS')} 
          className="bg-slate-200 text-slate-700 p-3 rounded-lg hover:bg-slate-300 transition-colors duration-200"
        >
          ⌫
        </button>
        <button 
          onClick={() => handleOperationClick('/')} 
          className="bg-indigo-100 text-indigo-700 p-3 rounded-lg hover:bg-indigo-200 transition-colors duration-200"
        >
          /
        </button>

        {['7', '8', '9'].map((num) => (
          <button 
            key={num} 
            onClick={() => handleNumberClick(num)} 
            className="bg-white border border-slate-200 text-slate-700 p-3 rounded-lg hover:bg-slate-50 transition-colors duration-200"
          >
            {num}
          </button>
        ))}
        <button 
          onClick={() => handleOperationClick('*')} 
          className="bg-indigo-100 text-indigo-700 p-3 rounded-lg hover:bg-indigo-200 transition-colors duration-200"
        >
          ×
        </button>

        {['4', '5', '6'].map((num) => (
          <button 
            key={num} 
            onClick={() => handleNumberClick(num)} 
            className="bg-white border border-slate-200 text-slate-700 p-3 rounded-lg hover:bg-slate-50 transition-colors duration-200"
          >
            {num}
          </button>
        ))}
        <button 
          onClick={() => handleOperationClick('-')} 
          className="bg-indigo-100 text-indigo-700 p-3 rounded-lg hover:bg-indigo-200 transition-colors duration-200"
        >
          -
        </button>

        {['1', '2', '3'].map((num) => (
          <button 
            key={num} 
            onClick={() => handleNumberClick(num)} 
            className="bg-white border border-slate-200 text-slate-700 p-3 rounded-lg hover:bg-slate-50 transition-colors duration-200"
          >
            {num}
          </button>
        ))}
        <button 
          onClick={() => handleOperationClick('+')} 
          className="bg-indigo-100 text-indigo-700 p-3 rounded-lg hover:bg-indigo-200 transition-colors duration-200"
        >
          +
        </button>

        <button 
          onClick={() => handleNumberClick('0')} 
          className="col-span-2 bg-white border border-slate-200 text-slate-700 p-3 rounded-lg hover:bg-slate-50 transition-colors duration-200"
        >
          0
        </button>
        <button 
          onClick={() => handleNumberClick('.')} 
          className="bg-white border border-slate-200 text-slate-700 p-3 rounded-lg hover:bg-slate-50 transition-colors duration-200"
        >
          .
        </button>
        <button 
          onClick={() => handleOperationClick('=')} 
          className="bg-indigo-500 text-white p-3 rounded-lg hover:bg-indigo-600 transition-colors duration-200"
        >
          =
        </button>
      </div>
    </div>
  );
} 