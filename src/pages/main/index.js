import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { StatusBar } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

import { signOut } from '../../services/auth';
import { whoAmI } from '../../services/api';

import {
  Container,
  Logo,
  Text,
  Button,
  ButtonText,
} from './styles';

export default class Main extends Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      dispatch: PropTypes.func,
    }).isRequired,
  };

  state = {
    name: '',
    email: '',
  };

  async componentDidMount() {
    await this.loadProfile();
  }

  loadProfile = async () => {
    const response = await whoAmI();
    const { name, email } = response;

    this.setState({
      name: name,
      email: email,
    });
  };

  handleSignOutPress = async () => {

    await signOut();

    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'SignIn' }),
      ],
    });
    this.props.navigation.dispatch(resetAction);
  };

  render() {
    return (
      <Container>
        <StatusBar hidden />
        <Logo source={require('../../images/logo.png')} resizeMode="contain" />
        
          
        <Text>Nome: {this.state.name}</Text>
        <Text>Email: {this.state.email}</Text>
        
        <Button onPress={this.handleSignOutPress}>
          <ButtonText>Sair</ButtonText>
        </Button>
      </Container>
    );
  }
}