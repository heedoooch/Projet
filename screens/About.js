import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';


export default function about({navigation}) {
    return(
        <ScrollView>
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>
                    ABOUT
                </Text>
                <Text style={styles.par}>
                    <Text style={styles.inner}>SETRAM</Text> est la société chargée de l'exploitation et de la maintenance des Tramways Algériens. Elle exploite actuellement les Tramways d'Alger, Oran, Constantine, Sidi Bel Abbes, Ouargla et Sétif. La direction générale de la SETRAM se trouve dans la capitale Alger.
                    {"\n"}{"\n"}
                    La SETRAM est née d’un accord entre l’Entreprise du Métro d’Alger (EMA) et le groupe RATP.
                    {"\n"}{"\n"}
                    Riche du savoir-faire hérité du groupe RATP dont l’expertise a été reconnue en France et à l’international dans de nombreux pays du monde, la SETRAM, société de droit algérien a pour objectifs :
                </Text>

                <View style={styles.item}>
                    <Text style={styles.dot}>{'\u2022'}</Text>
                    <Text style={styles.itemS}>De porter l’Algérie vers un nouveau mode de transport urbain accessible à tous,</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.dot}>{'\u2022'}</Text>
                    <Text style={styles.itemS}>D’offrir un service de transport de haute qualité où sécurité, confort, régularité et propreté sont maitres à bord,</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.dot}>{'\u2022'}</Text>
                    <Text style={styles.itemS}>D’accompagner les algériens dans la phase d’adaptation à ce nouveau moyen de transport et l’ancrer dans leurs habitudes de déplacements,</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.dot}>{'\u2022'}</Text>
                    <Text style={styles.itemS}>D’assurer le transfert de savoir-faire des experts du groupe RATP vers l’ensemble des salariés de la SETRAM par l’apprentissage et la formation,</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.dot}>{'\u2022'}</Text>
                    <Text style={styles.itemS}>De se positionner comme référence en Afrique et dans le monde.</Text>
                </View>
                <Text style={styles.par}>
                    Egalement, SETRAM a passé avec succès l'audit de certification qui s'est déroulé du 26 au 29 Novembre 2017 et couvrant le siège de la Direction Générale et l'unité Opérationnelle de Constantine. L’examen d'audit de certification a été mené par l'organisme VINCOTTE.
                    {"\n"}{"\n"}
                    SETRAM s'est ainsi dotée d'une politique qualité basée sur les objectifs suivants :
                </Text>
                <View style={styles.item}>
                    <Text style={styles.dot}>{'\u2022'}</Text>
                    <Text style={styles.itemS}>la réussite des mises en service des futurs réseaux et extensions;</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.dot}>{'\u2022'}</Text>
                    <Text style={styles.itemS}>l’harmonisation des processus et des organisations internes;</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.dot}>{'\u2022'}</Text>
                    <Text style={styles.itemS}>valoriser notre image d’entreprise innovante et responsable;</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.dot}>{'\u2022'}</Text>
                    <Text style={styles.itemS}>orienter nos ressources humaines vers le développement des compétences;</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.dot}>{'\u2022'}</Text>
                    <Text style={styles.itemS}>conforter nos fondamentaux opérationnelles et tendre vers l’excellence.</Text>
                </View>
                <Text style={styles.par}>
                    En 2018, SETRAM a lancé deux nouvelles unités, menant son réseau à 6 lignes de tramway à travers le territoire national : l'Unité de Ouargla inaugurée le 20 mars 2018, et l'Unité de Sétif inaugurée le 8 mai 2018. Ces projets ont été menés à bien dans le cadre du développement du secteur des transports chapeauté par Ministère des Travaux Publics et des Transports, sous le haut patronage du Président de la République Algérienne, Monsieur Abdelaziz Bouteflika.
                    {"\n"}{"\n"}
                </Text>


                <Text style={styles.title}>
                    CONTACTS
                </Text>
                <View style={styles.contacts}>
                    <Image
                        style={styles.icon}
                        source={require('../assets/email.png')}
                    />
                    <Text style={styles.info}>sav-sba@setram-dz.com</Text>
                </View>
                <View style={styles.contacts}>
                    <Image
                        style={styles.icon2}
                        source={require('../assets/phone.png')}
                    />
                    <Text style={styles.info2}>+213 (0)560 60 23 27</Text>
                </View>
            </SafeAreaView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
      },
    par: {
        fontSize:15,
        marginTop: 8,
    },
    inner: {
        fontWeight: 'bold',
        color:'#1FB2AC',
    },
    title:{
        fontWeight: 'bold',
        fontSize:24,
        margin: 16,
        color:'#1FB2AC',
    },
    item:{
        flexDirection: 'row',
        marginTop:8,
    },
    itemS: {
        flex: 1,
        paddingLeft: 5,
    },
    dot: {
        color:'#1FB2AC',
        fontWeight:'bold',
    },
    contacts: {
        justifyContent:'center',
        flexDirection: 'row',
    },
    icon: {
        left: 50,
        height: 24,
        resizeMode: 'contain',
    },
    info: {
        fontSize: 16,
        position: 'absolute'
    },
    icon2: {
        marginTop:24,
        left: -12,
        height: 24,
        resizeMode: 'contain',
    },
    info2: {
        marginTop:24,
        fontSize: 16,
        position: 'absolute'
    }
})