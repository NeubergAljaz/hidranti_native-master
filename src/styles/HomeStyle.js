import { StyleSheet } from 'react-native';

const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    position: 'relative',
  },
  sideNavContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '25%',
    height: '100%',
    backgroundColor: '#1e1e1e',
    padding: 20,
  },
  sideNavContainerOpen: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#1e1e1e',
    padding: 20,
  },
  sideNavOptionsContainer: {
    flex: 1,
    marginTop: 20,
  },
  sideNavOption: {
    marginVertical: 10,
  },
  sideNavOptionText: {
    color: 'white',
    fontSize: 18,
  },
  sideNavIcon: {
    width: 24,
    height: 24,
  },
  mapContainer: {
      position: 'absolute',
      top: 0,
      left: '25%',
      right: 0,
      bottom: 0,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e1e1e',
    marginBottom: 20,
  },
  userNameText: {
  fontSize: 18,
  color: '#1e1e1e',
  marginBottom: 20,
  },
  logoutButton: {
  backgroundColor: 'red',
  padding: 10,
  borderRadius: 5,
  alignSelf: 'center',
  },
  logoutButtonText: {
  color: 'white',
  fontWeight: 'bold',
  },
  fab: {
  position: 'absolute',
  top: -28,
  alignSelf: 'center',
  backgroundColor: '#1e1e1e',
  },
});


export default {
    homeStyles: homeStyles,
};