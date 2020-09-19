import React, { Component } from 'react'

import { webErrorsToIgnore } from '@/utils/errors'

class ErrorBoundaryComp extends Component<any, any> {
  componentDidMount(): void {
    window.onunhandledrejection = (error: PromiseRejectionEvent) => {
      this.handleError(error)
      return true
    }
    window.onerror = (msg, url, lineNo, columnNo, error) => {
      if (error) {
        if (webErrorsToIgnore.some(regex => regex.test(error.message))) {
          return true
        }
        this.handleError(error)
      }
      return true
    }
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.handleError(error, errorInfo)
  }

  handleError = (error: any, extraInfo?: { [key: string]: any }) => {
    console.log(error, extraInfo)
  }

  render() {
    return this.props.children
  }
}

export const ErrorBoundary: React.FC = ({ children }) => {
  return <ErrorBoundaryComp>{children}</ErrorBoundaryComp>
}
