import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  AppBar,
  Body,
  Right,
  Button,
  Icon,
  Title,
  Text,
  Box,
  IconButton,
  HStack,
  VStack,
  StatusBar,
} from 'native-base';

import {connect} from 'react-redux';
import propTypes from 'prop-types';
import {signOut} from '../action/auth';

const CustomHeader = ({signOut, authState, navigation}) => {
  return (
    <Box androidStatusBarColor="#0f4c75" style={{backgroundColor: '#0f4c75'}}>
      <StatusBar backgroundColor="#3700B3" barStyle="light-content" />
      <HStack space="4" alignItems="center">
        <Text color="white" fontSize="25" fontWeight="bold">
          Social App LCO
        </Text>
      </HStack>
      <HStack>
        {authState.isAuthenticated && (
          <View>
            <Button
              transparent
              iconLeft
              onPress={() => navigation.navigate('AddPost')}>
              <Text style={{color: '#fdcb9e'}}>Add Post</Text>
            </Button>
            <Button transparent onPress={() => signOut()}>
              <Icon name="log-out-outline" style={{color: 'red'}} />
            </Button>
          </View>
        )}
      </HStack>
    </Box>
  );
};

const mapStateToProps = state => ({
  authState: state.auth,
});

const mapDispatchToProps = {
  signOut,
};

CustomHeader.prototypes = {
  signOut: propTypes.func.isRequired,
  authState: propTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomHeader);
