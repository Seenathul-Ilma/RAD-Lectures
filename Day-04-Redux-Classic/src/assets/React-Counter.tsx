// To resolve module import errors for external libraries like Redux Toolkit and React Redux
// in this single-file environment, we will use React's built-in 'useReducer' and 'useContext'
// to perfectly emulate the Redux pattern (Reducer, Dispatch, Global State).
import React, { useReducer, useContext, createContext, type Dispatch } from 'react';

// --- 1. STATE & ACTION DEFINITIONS (Emulating Redux types) ---

interface CounterState {
  count: number;
}

// Defining the types for our dispatchable actions
type CounterAction =
  | { type: "counter/increment" }
  | { type: "counter/decrement" }
  | { type: "counter/setValue"; payload: number };

// Action Creators (functions to generate actions)
const increment = (): CounterAction => ({ type: "counter/increment" });
const decrement = (): CounterAction => ({ type: "counter/decrement" });
const setValue = (payload: number): CounterAction => ({ type: "counter/setValue", payload });

const initialState: CounterState = {
  count: 0
};

// --- 2. REDUCER (Emulating the Redux reducer) ---

// This function determines how the state changes based on the dispatched action.
const counterReducer = (state: CounterState, action: CounterAction): CounterState => {
  switch (action.type) {
    case "counter/increment":
      return { ...state, count: state.count + 1 };
    case "counter/decrement":
      return { ...state, count: state.count - 1 };
    case "counter/setValue":
      return { ...state, count: action.payload };
    default:
      return state;
  }
};

// --- 3. CONTEXT & PROVIDER (Emulating the Store and Provider) ---

// Create Context for State and Dispatch function
const CounterContext = createContext<{
  state: CounterState;
  dispatch: Dispatch<CounterAction>;
} | undefined>(undefined);

// Custom Hook to simplify state access (replaces useSelector)
const useCounterState = () => {
  const context = useContext(CounterContext);
  if (context === undefined) {
    throw new Error('useCounterState must be used within a CounterProvider');
  }
  return context.state;
};

// Custom Hook to simplify dispatch access (replaces useDispatch)
const useCounterDispatch = () => {
  const context = useContext(CounterContext);
  if (context === undefined) {
    throw new Error('useCounterDispatch must be used within a CounterProvider');
  }
  return context.dispatch;
};

// Provider component that wraps the application and manages the global state
const CounterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(counterReducer, initialState);

  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      {children}
    </CounterContext.Provider>
  );
};

// --- 4. COMPONENT: COUNT VIEW (Displays state from a nested component) ---

// This component now uses the custom useCounterState hook instead of useSelector.
const CountView: React.FC = () => {
  const { count } = useCounterState();

  return (
    <div className="mt-8 p-6 bg-yellow-50 border-t-4 border-yellow-400 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl w-full">
      <h3 className="text-xl font-extrabold text-yellow-800 tracking-wider mb-2">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5 inline mr-2 text-yellow-600" 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path 
            fillRule="evenodd" 
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" 
            clipRule="evenodd" 
          />
        </svg>
        State Reflected in Nested Component:
      </h3>
      <p className="text-3xl sm:text-4xl font-mono text-center font-bold text-yellow-900">
        <span className="text-yellow-600 font-semibold">Current Count:</span> {count}
      </p>
    </div>
  );
};

// --- 5. COMPONENT: APP (Main component for controls and display) ---

// The main application component that interacts with the store via hooks.
const App: React.FC = () => {
  // Access state and dispatch function via custom hooks
  const { count } = useCounterState();
  const dispatch = useCounterDispatch();

  // Handlers for dispatching actions (using the action creator functions)
  const handleIncrement = () => {
    dispatch(increment());
  };

  const handleDecrement = () => {
    dispatch(decrement());
  };

  const handleReset = () => {
    // Dispatches the setValue action with a payload of 0
    dispatch(setValue(0));
  };

  const buttonClass = "flex-1 px-4 py-3 m-1 font-bold text-base sm:text-lg rounded-xl shadow-md transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-4";

  return (
    <div className="flex flex-col items-center justify-center p-6 sm:p-10 bg-white rounded-3xl shadow-2xl max-w-xl w-full mx-auto">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-indigo-800 mb-8 tracking-tight">
        React Counter (useReducer)
      </h1>

      {/* Main Count Display */}
      <div className="w-full text-center mb-10 p-6 bg-indigo-50 rounded-2xl border-4 border-indigo-200">
        <p className="text-xl font-medium text-gray-600">Global Counter State</p>
        <div className="text-9xl font-black text-indigo-600 leading-none mt-2">
          {count}
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex flex-col sm:flex-row w-full gap-3">
        <button
          onClick={handleIncrement}
          className={`${buttonClass} bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-300`}
        >
          <span className="text-2xl mr-1">+</span> Increment
        </button>

        <button
          onClick={handleDecrement}
          className={`${buttonClass} bg-red-500 text-white hover:bg-red-600 focus:ring-red-300`}
        >
          <span className="text-2xl mr-1">−</span> Decrement
        </button>
      </div>
      
      <button
        onClick={handleReset}
        className={`w-full ${buttonClass} mt-3 bg-gray-300 text-gray-700 hover:bg-gray-400 focus:ring-gray-300`}
      >
        <span className="text-xl mr-2">↻</span> Reset (Set to 0)
      </button>

      {/* Renders the nested component that also reads the state */}
      <CountView />
    </div>
  );
};

// --- 6. WRAPPER: Default Export (Includes Provider to make state work) ---

// The application is now wrapped in the custom CounterProvider using useReducer.
export default function ReduxCounterWrapper() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
      <CounterProvider>
        <App />
      </CounterProvider>
    </div>
  );
}