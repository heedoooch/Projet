import React ,{ useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, View, Text , StyleSheet } from 'react-native';
import firebase from 'firebase';

const Alert = () => {
  //
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [alerts, setalerts] = useState([]); // Initial empty array of alerts

  useEffect(() => {
    const subscriber = firebase.firestore()
      .collection('alerts')
      .onSnapshot(querySnapshot => {
        const alerts = [];
  
        querySnapshot.forEach(documentSnapshot => {
          alerts.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
  
        setalerts(alerts);
        setLoading(false);
      });
  
    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);
  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <FlatList
      data={alerts}
      renderItem={({ item , index }) => (
        <View style={styles.item }>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.report}>{item.report}</Text>
          <Text style={styles.date}>{item.date + " " + item.time}</Text>
        </View>
      )}
    />
    </View>
  );
}
export default Alert;

const styles = StyleSheet.create({  
  container: {  
      flex: 1,  
  },  
  item: {  
    borderColor : '#0DB0A8',
    borderStyle : 'solid' ,
    borderWidth : 5,
    borderRadius : 13 ,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,  
    backgroundColor : 'white'
  },  
  title : {
    color : '#0DB0A8',
    fontSize : 20,
    fontWeight:"bold",
    marginBottom : 8
  },
  report : {
    color : '#0DB0A8',
    fontSize : 18,
  },
  date : {
    textAlign : "right"
  },})