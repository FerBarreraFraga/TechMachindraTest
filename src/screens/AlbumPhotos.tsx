import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {fetchAlbumPhotos, fetchAllPhotos} from '../api';
import colors from '../constants/colors';
import {Icon, IconButton} from 'react-native-paper';
import LoadingIndicator from '../components/LoadingIndicator';
import {AlbumPhoto} from '../types';

const screenWidth = Dimensions.get('window').width;
const photoWidth = screenWidth / 3 - 8;

export type AlbumPhotosScreenProps = {
  params: {
    albumId: number;
    albumTitle: string;
  };
};

const AlbumPhotosScreen = ({route}: {route: AlbumPhotosScreenProps}) => {
  const {albumId, albumTitle} = route.params;

  const navigation = useNavigation();
  const [photos, setPhotos] = useState<AlbumPhoto[]>([]);
  const [showAllPhotos, setShowAllPhotos] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);
      try {
        if (showAllPhotos) {
          const allPhotos = await fetchAllPhotos();
          setPhotos(allPhotos);
        } else {
          const albumPhotos = await fetchAlbumPhotos(albumId);
          setPhotos(albumPhotos);
        }
      } catch (error) {
        console.error('Error fetching album photos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [albumId, showAllPhotos]);

  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Icon source="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {showAllPhotos ? 'All Photos' : albumTitle}
        </Text>
        <IconButton
          icon={showAllPhotos ? 'star' : 'star-outline'}
          onPress={() => setShowAllPhotos(prevState => !prevState)}
          iconColor={colors.white}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderHeader()}

      {loading ? (
        <LoadingIndicator />
      ) : (
        <FlatList
          data={photos}
          keyExtractor={photo => photo?.id.toString()}
          numColumns={3}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => console.log('PRESSED')}>
              <Image
                source={{uri: item?.thumbnailUrl}}
                style={[styles.photo, {width: photoWidth}]}
                resizeMode="cover"
              />
            </TouchableOpacity>
          )}
          /*
           You can add a footer with loader if there is an offset to the endpoint,
           this should let you do some pagination seemlessly
           */
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  photo: {
    flex: 1,
    aspectRatio: 1,
    margin: 4,
    width: photoWidth,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: colors.primaryColor,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
  },
  headerIcon: {
    fontSize: 24,
  },

  backButton: {
    padding: 8,
  },
});

export default AlbumPhotosScreen;
