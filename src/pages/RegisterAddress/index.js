import React from 'react';
import {
    ImageBackground,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    PermissionsAndroid,
} from 'react-native';
import {Button, Gap, Link, TextInput} from '../../components';
import {firebase} from '../../config';
import {colors, fonts, useForm, storeData, showMessage} from '../../utils';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { API_HOST } from '../../config';
import { setLoading, signUpAction } from '../../redux/action';
import {Picker} from '@react-native-community/picker';

const RegisterAddress = ({navigation, route}) => {
    const user = route.params;
    const dispatch = useDispatch();
    const registerReducer = useSelector((state) => state.registerReducer);
    const {coordinates} = useSelector(state => state.orderReducer);

    const requestLocationPermission = async () => {
        try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            navigation.navigate("Map")
        } else {
            console.log("Camera permission denied");
        }
        } catch (err) {
        console.warn(err);
        }
    };

    const [form, setForm] = useForm({
        user_id: "",
        nama_penerima: user.name,
        nomor_handphone: user.phone_number,
        email: user.email,
        kategori: "Alamat Utama",
        kelurahan: "",
        detail_alamat : "",
        kecamatan : "",
        kota_kabupaten : "",
        provinsi : "Sulawesi Utara",
        latitude : coordinates.latitude,
        longitude : coordinates.longitude,
    });

    const onSubmit = () => {
        //update nilai latitude dan longitude pada form
        form.latitude = coordinates.latitude,
        form.longitude = coordinates.longitude, 

        dispatch(setLoading(true));
        if(form.latitude == 0 || form.detail_alamat === "" || form.kecamatan === "" || form.kelurahan === "" || form.kota_kabupaten === ""){
            dispatch(setLoading(false));
            showMessage('Data Anda belum lengkap');
        }
        else{
            //jika format alamat sesuai
            if(form.detail_alamat.length >= 20){
                console.log('form user: ', form);
                //register user
                dispatch(signUpAction(registerReducer, form, navigation));
            }
            //jika format alamat tidak sesuai
            else{
                dispatch(setLoading(false));
                showMessage('Alamat harus 20 karakter atau lebih');
            }
        }
    };

    return (
    <SafeAreaView style={styles.page}>
        <ImageBackground style={styles.headerContainer}>
        <Text style={styles.headerText}>Add Address</Text>
        </ImageBackground>
        <View style={styles.formContainer}>
            <View>
            <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.textInputTitle}>Lokasi Pickup</Text>
                    {coordinates.distance == 0 
                    ?
                    <View style={styles.mapContainer}>
                        <View style={styles.mapWrapper}>
                            <Button
                                buttonColor={colors.white}
                                borderWidth={2}
                                borderColor={colors.grey}
                                textColor={colors.button.primary.backgroundColor}
                                borderRadius={4} 
                                title={"Pilih Lokasi"}  
                                onPress={requestLocationPermission}
                            />
                            <Gap height={8} />
                            <Text style={{ color: colors.status.cancelled, fontFamily: fonts.nunito.bold }}>Lokasi pickup belum ditentukan</Text>
                        </View>
                    </View>
                    :
                    <View style={styles.mapContainer}>
                        <View style={styles.mapWrapper}>
                            <Button
                                buttonColor={colors.white}
                                borderWidth={2}
                                borderColor={colors.grey}
                                textColor={colors.text.grey}
                                borderRadius={4} 
                                title={"Ubah Lokasi"}  
                                onPress={requestLocationPermission}
                            />
                            <Gap height={8} />
                            <Text style={{ color: colors.status.on_delivery, fontFamily: fonts.nunito.bold }}>Lokasi telah diambil</Text>
                        </View>
                    </View>
                    }
                    <Gap height={12} />
                <TextInput
                    label="Alamat"
                    placeholder="Masukkan Alamat (Cth : Jln. Wolter Monginsidi 1)"
                    value={form.detail_alamat}
                    onChangeText={(value) => setForm('detail_alamat', value)}
                />
                <Gap height={18} />
                <TextInput
                    label="Kecamatan"
                    placeholder="Masukan Kecamatan"
                    value={form.kecamatan}
                    onChangeText={(value) => setForm('kecamatan', value)}
                />
                <Gap height={18} />
                <TextInput
                    label="Kelurahan"
                    placeholder="Masukan Kelurahan"
                    value={form.kelurahan}
                    onChangeText={(value) => setForm('kelurahan', value)}
                />
                <Gap height={18} />
                <TextInput
                    label="Kota/Kabupaten"
                    placeholder="Masukan Kota/Kabupaten"
                    value={form.kota_kabupaten}
                    onChangeText={(value) => setForm('kota_kabupaten', value)}
                />
                <Gap height={24} />
                <Button title="Sign Up" onPress={onSubmit} borderRadius={10}/>
                <Gap height={20} />
                </ScrollView>
            </View>
        </View>
    
    </SafeAreaView>
    );
};

export default RegisterAddress;

const styles = StyleSheet.create({
    page: {
        backgroundColor: colors.white,
        flex: 1,
    },
    headerContainer: {
        width: '100%',
        height: 166,
        backgroundColor: colors.primary,
        justifyContent: 'center',
    },
    headerText: {
        fontFamily: fonts.primary[700],
        fontSize: 24,
        marginLeft: 24,
        color: colors.white,
    },
    formContainer: {
        marginTop: 24,
        marginHorizontal: 24,
        justifyContent: 'space-between',
        flex: 1,
    },
    textInputTitle: {
        fontFamily: fonts.nunito.bold,
        fontSize: 16,
        paddingBottom: 8,
    },
    mapContainer: {
        borderWidth: 1,
        borderRadius:10,
        borderColor:colors.grey,
    },
    mapWrapper: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius:10,
    },
    container: {
        width: '100%'
    },
    label: {
        fontSize: 14, 
        fontFamily: fonts.primary[700], 
        color: colors.text.primary, 
        marginBottom: 8
    },
    input: {
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 8,
        paddingVertical: 2,
        paddingHorizontal: 16,
    },
    bottomContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 35,
    },
});
