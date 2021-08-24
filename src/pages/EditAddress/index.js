import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import {Button, TextInput, Gap} from '../../components';
import {colors, fonts, getData, storeData} from '../../utils';
import {showMessage} from 'react-native-flash-message';
import { firebase } from '../../config';
import { useDispatch, useSelector } from "react-redux";

const EditAddress = ({navigation, route}) => {

    const item = route.params;
    // console.log('item id : ', item.id);
    const user = useSelector(state => state.user);
    
    const dispatch = useDispatch();

    const [form, setForm] = useState({
        address: [],
    }, [])

    useEffect(() => {
        // getData('user').then(response => {
        //     const data = response;
        //     setIdUser(data.uid);
        //     console.log('profile id: ' + idUser);
        // });
        setForm(item);
    },[]);



    const changeText = (key, value) => {
        setForm({
            ...form,
            [key]: value,
        });
    };

    const updateAddressData = () => {
        const data = form;
        console.log('id user: ', user.uid);
        firebase
        .database()
        .ref('users/' + user.uid + '/address/' + item.id)
        .update(data)
        .then(() => {
            firebase
            .database()
            .ref('users/' + user.uid)
            .once('value')
            .then(snapshot => {
                storeData('user', snapshot.val());
                dispatch({type: 'SAVE_USER', value:snapshot.val()})
                navigation.goBack();
                showMessage({
                    message: "Data Alamat Anda berhasil diubah",
                    type: 'default',
                    backgroundColor: colors.primary,
                    color: colors.white,
                })
        })
        })
        .catch(error => {
            showMessage({
                message: error.message,
                type: 'default',
                backgroundColor: colors.error,
                color: colors.white,
            });
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.backButtonContainer}>
                <Button
                type="icon-only"
                icon="icon-arrow-back"
                style={styles.backButton}
                onPress={() => navigation.goBack()}
                borderRadius={4}
                />
                </View>
                <View style={styles.titleTextContainer}>
                <Text style={styles.titleText}>Ubah Alamat</Text>
                </View>
            </View> 

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.contentWrapper}>
                    <TextInput
                        label="Alamat"
                        value={form.alamat}
                        onChangeText={value => changeText('alamat', value)}
                    />
                    <Gap height={14} />
                    <TextInput
                        label="Kategori"
                        value={form.kategori}
                        onChangeText={value => changeText('kategori', value)}
                    />
                    <Gap height={14} />
                    <TextInput
                        label="Kecamatan"
                        value={form.kecamatan}
                        onChangeText={value => changeText('kecamatan', value)}
                    />
                    <Gap height={14} />
                    <TextInput
                        label="Kelurahan"
                        value={form.kelurahan}
                        onChangeText={value => changeText('kelurahan', value)}
                    />
                    <Gap height={14} />
                    <TextInput
                        label="Kota/Kabupaten"
                        value={form.kota_kabupaten}
                        onChangeText={value => changeText('kota_kabupaten', value)}
                    />
                    <Gap height={14} />
                    <TextInput
                        label="Provinsi"
                        value={form.provinsi}
                        onChangeText={value => changeText('provinsi', value)}
                    />
                    <Gap height={22} />
                    <Button title="Simpan Alamat" borderRadius={8}  onPress={updateAddressData}/>    
                </View>
            </ScrollView>
        </View>
    )
}

export default EditAddress

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    headerContainer: {
        backgroundColor: 'white',
        flexDirection: 'row',
    },
    backButtonContainer: {
        backgroundColor: colors.button.primary.backgroundColor,
        opacity: 0.5,
        height: 38,
        width: 38,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        marginTop: 32,
        marginLeft: 24,
        alignSelf: 'flex-start',
        position: 'absolute',
    },
    contentWrapper: {
        marginVertical: 38,
        marginHorizontal: 24,
    },
    titleTextContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 36,
    },
    titleText: {
        fontFamily: fonts.nunito.semibold,
        fontSize: 22,
        opacity: 0.7,
    }
})

