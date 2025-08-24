// Add this above your component or in a typings file
declare module 'lottie-react-native' {
  import { Component } from 'react';
  import { ViewProps } from 'react-native';

  export interface LottieViewProps extends ViewProps {
    source: any;
    autoPlay?: boolean;
    loop?: boolean;
    style?: any;
    // Add other props if needed
  }

  export default class LottieView extends Component<LottieViewProps> {}
}
