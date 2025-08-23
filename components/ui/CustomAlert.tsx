import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Platform, Animated, Easing, AccessibilityInfo } from 'react-native';

const CustomAlert = ({
  visible,
  title,
  message,
  onClose,
  buttonLabel = 'OK', // customizable button label
}: {
  visible: boolean;
  title: string;
  message: string;
  onClose: () => void;
  buttonLabel?: string;
}) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 250,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start(() => {
        // Announce alert for screen readers
        AccessibilityInfo.announceForAccessibility(`${title}. ${message}`);
      });
    } else {
      fadeAnim.setValue(0);
    }
  }, [visible]);

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none" // handled by Animated.View for smoother fade
      onRequestClose={onClose}
      hardwareAccelerated
      statusBarTranslucent={Platform.OS === 'android'}
      accessible={true}
      accessibilityViewIsModal
      accessibilityLiveRegion="assertive"
    >
      <Animated.View style={[styles.backdrop, { opacity: fadeAnim }]}>
        <View style={styles.container} accessibilityRole="alert" accessibilityLabel={title}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <TouchableOpacity
            onPress={onClose}
            accessibilityRole="button"
            style={styles.button}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>{buttonLabel}</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 16,
    width: '85%',
    maxWidth: 320,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
    color: '#222',
    textAlign: 'center',
  },
  message: {
    fontSize: 15,
    color: '#444',
    textAlign: 'center',
    marginBottom: 28,
    lineHeight: 21,
  },
  button: {
    backgroundColor: '#1877F2',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 12,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default CustomAlert;
