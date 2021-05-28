import React ,{ useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, View, Text , StyleSheet } from 'react-native';
import firebase from 'firebase';
import { color } from 'react-native-reanimated';

const Offres = () => {
  //
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [offers, setoffers] = useState([]); // Initial empty array of offers

  useEffect(() => {
    const subscriber = firebase.firestore()
      .collection('offers')
      .onSnapshot(querySnapshot => {
        const offers = [];
  
        querySnapshot.forEach(documentSnapshot => {
          offers.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
  
        setoffers(offers);
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
      data={offers}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.report}>{item.report}</Text>
          <Text style={styles.date}>{item.date + " " + item.time}</Text>
        </View>
      )}
    />
    </View>
  );
}
export default Offres;

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
    fontWeight:"bold",
    fontSize : 20,
    marginBottom : 8
  },
  report : {
    color : '#0DB0A8',
    fontSize : 18,
  },
  date : {
    textAlign : "right",
    color: '#0DB0A5',
  }
})