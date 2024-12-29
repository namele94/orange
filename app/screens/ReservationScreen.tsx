import React from 'react';
import {Platform, StyleSheet, Text, TextInput, View} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import CustomButton from '../components/CustomButton';
import COLORS from '../styles/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import MyImageBg from '../components/MyImageBg.tsx';

const ReservationSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  phone: Yup.string().required('Required'),
  table: Yup.string().required('Required'),
  time: Yup.string().required('Required'),
  date: Yup.string().required('Required'),
});

const ReservationScreen = ({navigation}: any) => {
  const handleSubmit = () => {
    navigation.navigate('ReservationSuccessScreen');
  };

  return (
    <MyImageBg>
      <SafeAreaView edges={['bottom']} style={styles.container}>
        <Formik
          initialValues={{
            name: '',
            phone: '',
            table: '',
            time: '',
            date: '',
          }}
          validationSchema={ReservationSchema}
          onSubmit={handleSubmit}>
          {({handleChange, handleSubmit, values, errors, touched, isValid}) => {
            const isFormFilled = Object.values(values).every(
              value => value !== '',
            );

            return (
              <>
                <View style={styles.formContainer}>
                  <View style={styles.inputWrapper}>
                    <Text style={styles.label}>Name</Text>
                    <View style={styles.inputContainer}>
                      <TextInput
                        style={styles.input}
                        placeholder="Enter name"
                        placeholderTextColor={COLORS.grayText}
                        value={values.name}
                        onChangeText={handleChange('name')}
                      />
                    </View>
                  </View>

                  <View style={styles.inputWrapper}>
                    <Text style={styles.label}>Phone number</Text>
                    <View style={styles.inputContainer}>
                      <TextInput
                        style={styles.input}
                        placeholder="Enter phone number"
                        placeholderTextColor={COLORS.grayText}
                        value={values.phone}
                        onChangeText={handleChange('phone')}
                        keyboardType="phone-pad"
                      />
                    </View>
                  </View>

                  <View style={styles.inputWrapper}>
                    <Text style={styles.label}>Table number</Text>
                    <View style={styles.inputContainer}>
                      <TextInput
                        style={styles.input}
                        placeholder="Enter table number"
                        placeholderTextColor={COLORS.grayText}
                        value={values.table}
                        onChangeText={handleChange('table')}
                      />
                    </View>
                  </View>

                  <View style={styles.inputWrapper}>
                    <Text style={styles.label}>Indicate time of the visit</Text>
                    <View style={styles.inputContainer}>
                      <TextInput
                        style={styles.input}
                        placeholder="Enter time"
                        placeholderTextColor={COLORS.grayText}
                        value={values.time}
                        onChangeText={handleChange('time')}
                      />
                    </View>
                  </View>

                  <View style={styles.inputWrapper}>
                    <Text style={styles.label}>Date</Text>
                    <View style={styles.inputContainer}>
                      <TextInput
                        style={styles.input}
                        placeholder="Enter date"
                        placeholderTextColor={COLORS.grayText}
                        value={values.date}
                        onChangeText={handleChange('date')}
                      />
                    </View>
                  </View>
                </View>
                <View style={styles.buttonContainer}>
                  <CustomButton
                    isDisabled={!isFormFilled && !isValid}
                    title="Reservation"
                    onPress={handleSubmit}
                  />
                </View>
              </>
            );
          }}
        </Formik>
      </SafeAreaView>
    </MyImageBg>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  inputWrapper: {
    marginBottom: 30,
  },
  label: {
    alignSelf: 'flex-start',
    color: COLORS.black,
    fontSize: 14,
    marginBottom: 4,
    borderRadius: 12,
    paddingHorizontal: 8,
  },
  inputContainer: {
    height: 55,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: COLORS.primary,
    overflow: 'hidden',
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    color: COLORS.black,
    paddingHorizontal: 20,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grayText,
    margin: 8,
  },
  error: {
    color: COLORS.error,
    fontSize: 12,
    marginTop: 4,
    marginLeft: 16,
  },
  buttonContainer: {
    alignItems: 'center',
    ...Platform.select({
      android: {
        paddingBottom: 20,
      },
    }),
  },
});

export default ReservationScreen;
