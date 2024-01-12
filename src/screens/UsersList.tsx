import React, {useEffect, useState} from 'react';
import {Text, FlatList, SafeAreaView, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setUsers, deleteAlbum, setLoadingAlbums} from '../redux/userSlice';
import {RootState} from '../redux/store';
import {User, Album} from '../types';
import {fetchUsers, fetchAlbums} from '../api';
import UserItem from '../components/UserItem';
import LoadingIndicator from '../components/LoadingIndicator';
import colors from '../constants/colors';

interface UsersListProps {
  navigation: any;
}

const UsersList: React.FC<UsersListProps> = ({navigation}) => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.user.users);
  const deletedAlbums = useSelector(
    (state: RootState) => state.user.deletedAlbums,
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedUserId, setExpandedUserId] = useState<number | null>(null);

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        setLoading(true);
        const userList: User[] = await fetchUsers();
        dispatch(setUsers(userList));
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserList();
  }, [dispatch]);

  const fetchUserAlbums = async (selectedUser: User) => {
    const {id, name} = selectedUser;

    try {
      dispatch(setLoadingAlbums(true));
      const userAlbums: Album[] = await fetchAlbums(id);
      dispatch({
        type: 'user/setUsers',
        payload: users.map((user: User) => {
          if (user.id === id) {
            return {...user, albums: userAlbums};
          }
          return user;
        }),
      });
    } catch (err) {
      console.log('Error fetching user albums:', err);
      setError(`Error fetching user ${name} album`);
    } finally {
      setLoading(false);
      dispatch(setLoadingAlbums(false));
    }
  };

  const handleDeleteAlbum = (userId: number, albumId: number) => {
    dispatch(deleteAlbum({userId, albumId}));
  };

  const handleAlbumPress = (userId: number, albumId: number) => {
    const albumTitle = users
      .find(user => user.id === userId)
      ?.albums.find(album => album.id === albumId)?.title;

    if (albumTitle !== undefined && !deletedAlbums[userId]?.includes(albumId)) {
      navigation.navigate('AlbumPhotos', {userId, albumId, albumTitle});
    }
  };

  const handleToggleUser = async (user: User) => {
    setExpandedUserId(prevUserId => (prevUserId === user.id ? null : user.id));
    await fetchUserAlbums(user);
  };

  const renderUserItem = ({item}: {item: User}) => (
    <UserItem
      user={item}
      expandedUserId={expandedUserId}
      onUserPress={handleToggleUser}
      onAlbumPress={handleAlbumPress}
      onDeleteAlbum={handleDeleteAlbum}
      deletedAlbums={deletedAlbums[item.id] || []}
    />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {loading ? (
        <LoadingIndicator />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : users.length === 0 ? (
        <Text>No users found.</Text>
      ) : (
        <FlatList
          data={users}
          keyExtractor={user => user.id.toString()}
          renderItem={renderUserItem}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 16,
  },
  errorText: {
    color: colors.red,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default UsersList;
