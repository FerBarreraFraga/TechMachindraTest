import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet, FlatList} from 'react-native';
import AlbumItem from './AlbumItem';
import {Album, User} from '../types';
import colors from '../constants/colors';
import LoadingIndicator from './LoadingIndicator';
import {RootState} from '../redux/store';
import {useSelector} from 'react-redux';

interface UserItemProps {
  user: {id: number; name: string; albums: Album[]};
  expandedUserId: number | null;
  deletedAlbums: number[];
  onUserPress: (user: User) => void;
  onAlbumPress: (userId: number, albumId: number) => void;
  onDeleteAlbum: (userId: number, albumId: number) => void;
}

const UserItem: React.FC<UserItemProps> = ({
  user,
  expandedUserId,
  deletedAlbums,
  onUserPress,
  onAlbumPress,
  onDeleteAlbum,
}) => {
  const filteredAlbums = user?.albums?.filter(
    album => !deletedAlbums.includes(album.id),
  );
  const loadingAlbums = useSelector(
    (state: RootState) => state.user.loadingAlbums,
  );

  return (
    <View style={styles.userContainer}>
      <TouchableOpacity onPress={() => onUserPress(user)}>
        <Text
          style={[
            styles.userName,
            expandedUserId === user.id && styles.expandedUser,
          ]}>
          {user.name}
        </Text>
      </TouchableOpacity>
      {expandedUserId === user.id && (
        <FlatList
          keyExtractor={album => album.id.toString()}
          data={filteredAlbums}
          renderItem={({item}) => (
            <AlbumItem
              album={item}
              onAlbumPress={() => onAlbumPress(user.id, item.id)}
              onDeleteAlbum={() => onDeleteAlbum(user.id, item.id)}
            />
          )}
          style={styles.albumContainer}
          ListEmptyComponent={
            loadingAlbums ? (
              <LoadingIndicator />
            ) : (
              <Text>{user.name} has no albums</Text>
            )
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  userContainer: {
    marginBottom: 16,
    borderBottomColor: colors.primaryColor,
    borderBottomWidth: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    color: colors.textPrimary,
  },
  expandedUser: {
    opacity: 0.5,
    backgroundColor: colors.grey,
    paddingVertical: 5,
    paddingLeft: 10,
  },
  albumContainer: {marginLeft: 10},
});

export default UserItem;
