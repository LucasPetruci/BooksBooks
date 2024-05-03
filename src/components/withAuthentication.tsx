import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { auth } from "../firebase/Firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { Login } from "../pages/LoginScreen";

export function withAuthentication(WrappedComponent) {
  return class extends React.Component {
    state = {
      loading: true,
      authenticated: false,
    };

    componentDidMount() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.setState({
            loading: false,
            authenticated: true,
          });
        } else {
          this.setState({
            loading: false,
            authenticated: false,
          });
        }
      });
    }

    render() {
      const { loading, authenticated } = this.state;

      if (loading) {
        return <ActivityIndicator size="large" />;
      }
      if (!authenticated) {
        return <Login />;
      }

      return <WrappedComponent {...this.props} />;
    }
  };
}
