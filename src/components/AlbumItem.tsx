import React, {useState, useEffect, useMemo} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
  Animated,
} from 'react-native';
import {IconButton} from 'react-native-paper';
import colors from '../constants/colors';

interface AlbumItemProps {
  album: {id: number; title: string};
  onAlbumPress: () => void;
  onDeleteAlbum: () => void;
}

const AlbumItem: React.FC<AlbumItemProps> = ({
  album,
  onAlbumPress,
  onDeleteAlbum,
}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fadeAnim = useMemo(() => new Animated.Value(1), []);

  const showModal = () => setModalVisible(true);

  const hideModal = () => setModalVisible(false);

  const handleDelete = () => {
    setIsDeleting(true);
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      onDeleteAlbum();
      hideModal();
    });
  };

  useEffect(() => {
    setIsDeleting(false);
    fadeAnim.setValue(1);
  }, [album.id, fadeAnim]);

  return (
    <Animated.View
      style={[
        styles.albumItem,
        isDeleting && styles.albumDeleting,
        {opacity: fadeAnim},
      ]}>
      <TouchableOpacity
        onPress={onAlbumPress}
        style={styles.albumTextContainer}>
        <Text style={styles.albumText}>{album.title}</Text>
      </TouchableOpacity>
      <View style={styles.iconContainer}>
        <IconButton
          icon="minus-circle"
          iconColor={colors.red}
          size={16}
          onPress={showModal}
        />
      </View>
      <Modal
        transparent={true}
        animationType="fade"
        visible={isModalVisible}
        onRequestClose={hideModal}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>
                Are you sure to delete this album?
              </Text>
              <Text style={styles.modalSubText}>{album.title}</Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity onPress={handleDelete}>
                  <Text style={styles.modalButton}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={hideModal}>
                  <Text style={[styles.modalButton, styles.modalButtonCancel]}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  albumTextContainer: {
    flex: 1,
    paddingRight: 10,
  },
  albumText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  albumItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey,
    overflow: 'hidden',
  },
  albumDeleting: {
    backgroundColor: colors.red,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  iconContainer: {
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    color: colors.textPrimary,
    marginBottom: 10,
  },
  modalSubText: {
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalButton: {
    color: colors.primaryColor,
    fontSize: 16,
  },

  modalButtonCancel: {
    color: colors.red,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AlbumItem;
