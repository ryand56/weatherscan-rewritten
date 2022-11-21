import * as React from "react";

interface Props {
  key: string;
  children: React.ReactNode;
}

interface State {
  error: string;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: "" };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ error: `${error.name}: ${error.message}` });
  }

  render() {
    const { error } = this.state;
    if (error) {
      return <div style={{ color: "red" }}>{error}</div>;
    } else {
      return <>{this.props.children}</>;
    }
  }
}

export default ErrorBoundary;
