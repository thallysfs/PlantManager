import React, { useState } from 'react'
import {
    StyleSheet, 
    Text,
    TextInput, 
    View,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Platform,
    Keyboard,
    Alert
} from 'react-native'
import {styles} from './Styles.UserIdentification'

import { Button } from '../../components/Button'
import colors from '../../styles/colors'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export function UserIdentification(){
    const[isFocused, setIsFocused] = useState(false)
    const[isFilled, setIsFilled] = useState(false)
    const[name, setName] = useState<string>()
    
    const navigation = useNavigation()

    //caso saia do input e tenha algo escrito, o input ficará verde
    function handleInputBlur(){
        setIsFocused(false)
        setIsFilled(!!name)
    }

    function handleInputFocus(){
        setIsFocused(true)
    }

    function handleInputChange(value: string){
        //essas duas exclamações transforma o conteúdo em boleano
        setIsFocused(!!value)
        setName(value)
    }

    

    async function handleSubmit(){
        if(!name)
        return Alert.alert('Me diz como chamar você 🥲')

        await AsyncStorage.setItem('@plantmanager:user', name)

        // passando os parâmetros para montar na próxima tela
        navigation.navigate('Confirmation', {
            title: 'Prontinho',
            subtitle: 'Agora vamos começar a cuidar das suas plantinhas com muito cuidado.',
            buttonTitle: 'Começar',
            icon: 'smile',
            nextScreen: 'PlantSelect'
        })
    }


    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.content} >
                        <View style={styles.form}>
                            {/* Essa view foi criada só para o efeito de subida dos elementos ao aparecer o teclado fica suave */}
                            <View style={styles.header}>
                                <Text style={styles.emoji}>
                                    { isFilled ? '😀' : '🙂'}
                                </Text>

                                <Text style={styles.title}>
                                    Como podemos {'\n'} chamar você?
                                </Text>
                            </View>

                            <TextInput 
                                style={[
                                    styles.input,
                                    (isFocused || isFilled) && {borderColor: colors.green}
                                ]}
                                placeholder="Digite um nome"
                                onBlur={handleInputBlur}
                                onFocus={handleInputFocus}
                                onChangeText={handleInputChange}
                            />
                            <View style={styles.footer}>
                                <Button 
                                    title="Confirmar"
                                    onPress={handleSubmit}
                                />
                            </View>
                        </View>

                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </View>
    )
}
/*
const styles = StyleSheet.create({
    container: {
        
    }
})
*/
