import {
  check as checkPermission,
  request as requestPermission,
  PERMISSIONS
} from 'react-native-permissions';

const check = {
  calendarsAccess: () => checkPermission(PERMISSIONS.IOS.CALENDARS),
  cameraAccess: () => checkPermission(PERMISSIONS.IOS.CAMERA),
  contactsAccess: () => checkPermission(PERMISSIONS.IOS.CONTACTS),
  microphoneAccess: () => checkPermission(PERMISSIONS.IOS.MICROPHONE),
  remindersAccess: () => checkPermission(PERMISSIONS.IOS.REMINDERS),
  locationAlwaysAccess: () => checkPermission(PERMISSIONS.IOS.LOCATION_ALWAYS),
  photoLibraryAccess: () => checkPermission(PERMISSIONS.IOS.PHOTO_LIBRARY),
  speechRecognitionAccess: () => checkPermission(PERMISSIONS.IOS.SPEECH_RECOGNITION),
  locationWhenInUseAccess: () => checkPermission(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE),
  storekitAccess: () => checkPermission(PERMISSIONS.IOS.STOREKIT),
  siriAccess: () => checkPermission(PERMISSIONS.IOS.SIRI),
  bluetoothPeripheralAccess: () => checkPermission(PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL),
  faceIdAccess: () => checkPermission(PERMISSIONS.IOS.FACE_ID),
  mediaLibraryAccess: () => checkPermission(PERMISSIONS.IOS.MEDIA_LIBRARY),
  motionAccess: () => checkPermission(PERMISSIONS.IOS.MOTION)
};

const request = {
  calendarsAccess: () => requestPermission(PERMISSIONS.IOS.CALENDARS),
  cameraAccess: () => requestPermission(PERMISSIONS.IOS.CAMERA),
  contactsAccess: () => requestPermission(PERMISSIONS.IOS.CONTACTS),
  microphoneAccess: () => requestPermission(PERMISSIONS.IOS.MICROPHONE),
  remindersAccess: () => requestPermission(PERMISSIONS.IOS.REMINDERS),
  locationAlwaysAccess: () => requestPermission(PERMISSIONS.IOS.LOCATION_ALWAYS),
  photoLibraryAccess: () => requestPermission(PERMISSIONS.IOS.PHOTO_LIBRARY),
  speechRecognitionAccess: () => requestPermission(PERMISSIONS.IOS.SPEECH_RECOGNITION),
  locationWhenInUseAccess: () => requestPermission(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE),
  storekitAccess: () => requestPermission(PERMISSIONS.IOS.STOREKIT),
  siriAccess: () => requestPermission(PERMISSIONS.IOS.SIRI),
  bluetoothPeripheralAccess: () => requestPermission(PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL),
  faceIdAccess: () => requestPermission(PERMISSIONS.IOS.FACE_ID),
  mediaLibraryAccess: () => requestPermission(PERMISSIONS.IOS.MEDIA_LIBRARY),
  motionAccess: () => requestPermission(PERMISSIONS.IOS.MOTION)
};

export { check, request };
