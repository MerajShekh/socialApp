import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';

import {
  Text,
  Container,
  Input,
  Button,
  Content,
  Box,
  Image,
  Heading,
  Item,
  FormControl,
  VStack,
  HStack,
  Center,
  WarningOutlineIcon,
} from 'native-base';

import storage from '@react-native-firebase/storage';
import ProgressBar from 'react-native-progress/Bar';

import ImagePicker from 'react-native-image-picker';
import {options} from '../utils/options';

// redux
import propTypes from 'prop-types';
import {signUp} from '../action/auth';
import {connect} from 'react-redux';

const SignUp = ({signUp}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [instaUserName, setInstaUserName] = useState('');
  const [country, setCountry] = useState('');
  const [bio, setBio] = useState('');
  const [image, setImage] = useState(
    'https://firebase.google.com/downloads/brand-guidelines/PNG/logo-logomark.png',
  );

  const [imageLoading, setImageLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);

  const chooseImage = async () => {
    console.log('meraj');
    ImagePicker.launchCamera(options, response => {
      console.log('Response=', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error:', response.errorCode);
      } else {
        console.log(response);
        uploadImage(response);
      }
    });
  };

  const uploadImage = async response => {
    setImageLoading(true);
    const reference = storage().ref(response.assets.fileName);
    const task = reference.putFile(response.assets.path);
    task.on('state_changed', taskSnapshot => {
      const percentage =
        (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 1000;
      setUploadStatus(percentage);
    });

    task.then(async () => {
      const url = await reference.getDownloadURL();
      setImage(url);
      setImageLoading(false);
    });
  };

  const doSignUp = async () => {
    signUp({name, instaUserName, bio, country, email, password, image});
  };

  return (
    <Box safeArea style={styles.container} p="2" w="100%" mx="auto" py="8">
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={chooseImage}>
            <Image alt="Image" size="sm" source={{uri: image}} />
          </TouchableOpacity>
        </View>

        {imageLoading && (
          <ProgressBar progress={uploadStatus} style={styles.progress} />
        )}

        <Heading size="lg" color="coolGray.100" fontWeight="600">
          Sign up to continue!
        </Heading>

        <VStack space={3} mt="5">
          <FormControl style={styles.formItem}>
            <Input
              placeholder="Name"
              value={name}
              style={{color: '#eee'}}
              onChangeText={text => setName(text)}
            />
          </FormControl>
          <FormControl style={styles.formItem}>
            <Input
              placeholder="email"
              value={email}
              style={{color: '#eee'}}
              onChangeText={text => setEmail(text)}
            />
          </FormControl>
          <FormControl style={styles.formItem}>
            <Input
              placeholder="password"
              value={password}
              secureTextEntry={true}
              style={{color: '#eee'}}
              onChangeText={text => setPassword(text)}
            />
          </FormControl>
          <FormControl style={styles.formItem}>
            <Input
              placeholder="Instagram user name"
              value={instaUserName}
              style={{color: '#eee'}}
              onChangeText={text => setInstaUserName(text)}
            />
          </FormControl>
          <FormControl style={styles.formItem}>
            <Input
              placeholder="Your Short Bio"
              value={bio}
              style={{color: '#eee'}}
              onChangeText={text => setBio(text)}
            />
          </FormControl>
          <FormControl style={styles.formItem}>
            <Input
              placeholder="country"
              value={country}
              style={{color: '#eee'}}
              onChangeText={text => setCountry(text)}
            />
          </FormControl>
          <Button
            mt="2"
            colorScheme="indigo"
            _text={{color: 'white'}}
            onPress={doSignUp}>
            Sign up
          </Button>
        </VStack>
      </ScrollView>
    </Box>
  );
};

const mapDispatchToProps = {
  signUp: data => signUp(data),
};

SignUp.propTypes = {
  signUp: propTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(SignUp);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1b262c',
    flex: 1,
    justifyContent: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  progress: {width: null, marginBottom: 20},
  formItem: {
    marginBottom: 20,
  },
});
