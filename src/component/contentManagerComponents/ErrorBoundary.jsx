import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="text-red-400 text-xs p-2 bg-red-500/10 rounded">
          Error: {this.state.error?.message || 'Something went wrong'}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

