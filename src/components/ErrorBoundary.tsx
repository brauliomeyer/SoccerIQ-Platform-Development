import React from 'react';
import { EmptyState } from './ui';

interface State { hasError: boolean }

export class ErrorBoundary extends React.Component<React.PropsWithChildren, State> {
  constructor(props: React.PropsWithChildren) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div className="p-6"><EmptyState title="Something went wrong" description="Please refresh SoccerIQ." /></div>;
    }

    return this.props.children;
  }
}
