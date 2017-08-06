import React, { Component } from 'react';
import ViewPropTypes from 'prop-types';
import { View, Animated } from 'react-native';
import CircularProgress from './CircularProgress';
const AnimatedProgress = Animated.createAnimatedComponent(CircularProgress);

export default class AnimatedCircularProgress extends Component {

  constructor(props) {
    super(props);
    this.state = {
      chartFillAnimation: new Animated.Value(props.prefill || 0)
    }
  }

  componentDidMount() {
    this.animateFill();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.fill !== this.props.fill) {
      this.animateFill();
    }
  }

  animateFill() {
    const { tension, friction, animationComplete } = this.props;

    Animated.spring(
      this.state.chartFillAnimation,
      {
        toValue: this.props.fill,
        tension,
        friction
      }
    ).start(animationComplete);
  }

  performLinearAnimation(toValue, duration) {
    Animated.timing(this.state.chartFillAnimation, {
      toValue: toValue,
      duration: duration
    }).start();
  }

  render() {
    const { fill, prefill, ...other } = this.props;

    return (
      <AnimatedProgress
        {...other}
        fill={this.state.chartFillAnimation}
        />
    )
  }
}

AnimatedCircularProgress.propTypes = {
  style: ViewPropTypes.style,
  size: ViewPropTypes.number.isRequired,
  fill: ViewPropTypes.number,
  prefill: ViewPropTypes.number,
  width: ViewPropTypes.number.isRequired,
  tintColor: ViewPropTypes.oneOf([ViewPropTypes.string, ViewPropTypes.object]),
  backgroundColor: ViewPropTypes.oneOf([ViewPropTypes.string, ViewPropTypes.object]),
  tension: ViewPropTypes.number,
  friction: ViewPropTypes.number,
  animationComplete: ViewPropTypes.func
}

AnimatedCircularProgress.defaultProps = {
  tension: 7,
  friction: 10
};
