import React from 'react';
import './ErrorBoundary.css';

type ErrorBoundaryState = {
  hasError: boolean;
  errorMessage: string | null;
};

class ErrorBoundary extends React.Component<
  React.PropsWithChildren,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    hasError: false,
    errorMessage: null,
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-container">
          <h2>Something went wrong.</h2>
          <p>{this.state.errorMessage}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
