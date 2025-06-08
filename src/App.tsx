import React, { useState, useEffect } from 'react';
import { Delete, RotateCcw, Calculator } from 'lucide-react';

type Operation = '+' | '-' | '*' | '/' | null;

interface CalculatorState {
  display: string;
  previousValue: number | null;
  operation: Operation;
  waitingForOperand: boolean;
  history: string[];
}

function App() {
  const [state, setState] = useState<CalculatorState>({
    display: '0',
    previousValue: null,
    operation: null,
    waitingForOperand: false,
    history: []
  });

  const [showHistory, setShowHistory] = useState(false);

  const inputNumber = (num: string) => {
    if (state.waitingForOperand) {
      setState(prev => ({
        ...prev,
        display: num,
        waitingForOperand: false
      }));
    } else {
      setState(prev => ({
        ...prev,
        display: prev.display === '0' ? num : prev.display + num
      }));
    }
  };

  const inputDecimal = () => {
    if (state.waitingForOperand) {
      setState(prev => ({
        ...prev,
        display: '0.',
        waitingForOperand: false
      }));
    } else if (state.display.indexOf('.') === -1) {
      setState(prev => ({
        ...prev,
        display: prev.display + '.'
      }));
    }
  };

  const clear = () => {
    setState({
      display: '0',
      previousValue: null,
      operation: null,
      waitingForOperand: false,
      history: state.history
    });
  };

  const clearAll = () => {
    setState({
      display: '0',
      previousValue: null,
      operation: null,
      waitingForOperand: false,
      history: []
    });
  };

  const performOperation = (nextOperation: Operation) => {
    const inputValue = parseFloat(state.display);

    if (state.previousValue === null) {
      setState(prev => ({
        ...prev,
        previousValue: inputValue,
        operation: nextOperation,
        waitingForOperand: true
      }));
    } else if (state.operation) {
      const currentValue = state.previousValue || 0;
      let result: number;

      switch (state.operation) {
        case '+':
          result = currentValue + inputValue;
          break;
        case '-':
          result = currentValue - inputValue;
          break;
        case '*':
          result = currentValue * inputValue;
          break;
        case '/':
          result = inputValue !== 0 ? currentValue / inputValue : 0;
          break;
        default:
          return;
      }

      const calculation = `${currentValue} ${state.operation} ${inputValue} = ${result}`;
      
      setState(prev => ({
        ...prev,
        display: String(result),
        previousValue: result,
        operation: nextOperation,
        waitingForOperand: true,
        history: [calculation, ...prev.history.slice(0, 9)]
      }));
    }
  };

  const calculate = () => {
    performOperation(null);
  };

  const percentage = () => {
    const value = parseFloat(state.display);
    setState(prev => ({
      ...prev,
      display: String(value / 100)
    }));
  };

  const toggleSign = () => {
    const value = parseFloat(state.display);
    setState(prev => ({
      ...prev,
      display: String(-value)
    }));
  };

  const backspace = () => {
    if (state.display.length > 1) {
      setState(prev => ({
        ...prev,
        display: prev.display.slice(0, -1)
      }));
    } else {
      setState(prev => ({
        ...prev,
        display: '0'
      }));
    }
  };

  // Keyboard support
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const { key } = event;
      
      if (key >= '0' && key <= '9') {
        inputNumber(key);
      } else if (key === '.') {
        inputDecimal();
      } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        performOperation(key as Operation);
      } else if (key === 'Enter' || key === '=') {
        calculate();
      } else if (key === 'Escape') {
        clear();
      } else if (key === 'Backspace') {
        backspace();
      } else if (key === '%') {
        percentage();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [state]);

  const formatDisplay = (value: string) => {
    const num = parseFloat(value);
    if (isNaN(num)) return value;
    
    // Format large numbers with commas
    if (Math.abs(num) >= 1000) {
      return num.toLocaleString();
    }
    
    return value;
  };

  const Button = ({ 
    onClick, 
    className = '', 
    children, 
    variant = 'default' 
  }: { 
    onClick: () => void; 
    className?: string; 
    children: React.ReactNode;
    variant?: 'default' | 'operator' | 'equals' | 'clear';
  }) => {
    const baseClasses = "h-16 rounded-xl font-semibold text-lg transition-all duration-200 hover:scale-105 active:scale-95 shadow-md";
    
    const variants = {
      default: "bg-white text-gray-800 hover:bg-gray-50 border border-gray-200",
      operator: "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700",
      equals: "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700",
      clear: "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700"
    };

    return (
      <button
        onClick={onClick}
        className={`${baseClasses} ${variants[variant]} ${className}`}
      >
        {children}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
              <Calculator className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Calculator
            </h1>
          </div>
          <p className="text-gray-600">Professional calculator with history</p>
        </div>

        {/* Calculator Body */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 backdrop-blur-sm border border-white/20">
          {/* Display */}
          <div className="mb-6">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
              <div className="text-right">
                <div className="text-sm text-gray-500 mb-1 h-5">
                  {state.previousValue !== null && state.operation && (
                    <span>{state.previousValue} {state.operation}</span>
                  )}
                </div>
                <div className="text-4xl font-bold text-gray-800 break-all">
                  {formatDisplay(state.display)}
                </div>
              </div>
            </div>
          </div>

          {/* Button Grid */}
          <div className="grid grid-cols-4 gap-3 mb-4">
            {/* Row 1 */}
            <Button onClick={clearAll} variant="clear" className="col-span-2">
              AC
            </Button>
            <Button onClick={backspace} variant="clear">
              <Delete className="w-5 h-5" />
            </Button>
            <Button onClick={() => performOperation('/')} variant="operator">
              ÷
            </Button>

            {/* Row 2 */}
            <Button onClick={() => inputNumber('7')}>7</Button>
            <Button onClick={() => inputNumber('8')}>8</Button>
            <Button onClick={() => inputNumber('9')}>9</Button>
            <Button onClick={() => performOperation('*')} variant="operator">
              ×
            </Button>

            {/* Row 3 */}
            <Button onClick={() => inputNumber('4')}>4</Button>
            <Button onClick={() => inputNumber('5')}>5</Button>
            <Button onClick={() => inputNumber('6')}>6</Button>
            <Button onClick={() => performOperation('-')} variant="operator">
              −
            </Button>

            {/* Row 4 */}
            <Button onClick={() => inputNumber('1')}>1</Button>
            <Button onClick={() => inputNumber('2')}>2</Button>
            <Button onClick={() => inputNumber('3')}>3</Button>
            <Button onClick={() => performOperation('+')} variant="operator">
              +
            </Button>

            {/* Row 5 */}
            <Button onClick={toggleSign}>±</Button>
            <Button onClick={() => inputNumber('0')}>0</Button>
            <Button onClick={inputDecimal}>.</Button>
            <Button onClick={calculate} variant="equals">
              =
            </Button>
          </div>

          {/* Additional Functions */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <Button onClick={percentage} variant="operator">
              %
            </Button>
            <Button 
              onClick={() => setShowHistory(!showHistory)} 
              variant="default"
              className="flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              History
            </Button>
          </div>

          {/* History Panel */}
          {showHistory && (
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-800">Calculation History</h3>
                <button
                  onClick={() => setState(prev => ({ ...prev, history: [] }))}
                  className="text-sm text-red-500 hover:text-red-600 transition-colors"
                >
                  Clear
                </button>
              </div>
              <div className="max-h-40 overflow-y-auto">
                {state.history.length === 0 ? (
                  <p className="text-gray-500 text-sm text-center py-4">No calculations yet</p>
                ) : (
                  <div className="space-y-2">
                    {state.history.map((calculation, index) => (
                      <div
                        key={index}
                        className="text-sm text-gray-700 p-2 bg-white rounded-lg border border-gray-100"
                      >
                        {calculation}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Keyboard Shortcuts Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Supports keyboard input • Press ESC to clear • Enter for equals
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;