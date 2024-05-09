import { View, ActivityIndicator, Dimensions, Platform, StyleSheet } from 'react-native';

interface LoaderProps {
  isLoading: boolean;
  size?: number; // Optional prop for custom size
  color?: string; // Optional prop for custom color
}

const Loader: React.FC<LoaderProps> = ({ isLoading, size = 50, color = '#fff' }) => {
  const osName = Platform.OS;

  if (!isLoading) return null;

  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator animating={isLoading} color={color} size={osName === 'ios' ? 'large' : size} />
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default Loader;
