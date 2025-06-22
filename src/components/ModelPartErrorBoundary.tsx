
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { FallbackImagePlane } from './FallbackImagePlane';

interface Props {
  children: ReactNode;
  partUrl?: string;
  position: [number, number, number]; // Position is now required
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ModelPartErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn(`ModelPartErrorBoundary caught an error for part ${this.props.partUrl || 'unknown'}:`, error, errorInfo);
    // You could log this to an external service here
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.partUrl) {
        console.log(`Rendering fallback for ${this.props.partUrl} due to loading error.`);
      } else {
        console.log(`Rendering fallback for a model part due to loading error.`);
      }
      // Render a placeholder image in the 3D scene.
      return <FallbackImagePlane position={this.props.position} />;
    }

    return this.props.children;
  }
}

export default ModelPartErrorBoundary;
