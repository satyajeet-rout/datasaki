import React from 'react';

const TypingAnimation = () => {
  return (
    <div className="flex justify-start mb-4">
      <div className="flex max-w-[80%] items-start gap-3">
        {/* Bot Avatar */}
        <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-blue-100">
          <span className="text-sm font-medium text-blue-600">D</span>
        </div>

        {/* Typing Animation */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium">Datasaki AI</span>
            <span className="text-xs text-gray-500">- Just now</span>
          </div>
          <div className="p-3 rounded-lg bg-blue-50">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '300ms' }}></div>
              <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '600ms' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingAnimation;