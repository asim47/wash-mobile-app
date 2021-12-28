import { Dimensions, StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        width:Dimensions.get("window").width,
        alignItems: 'center',
        // justifyContent:"flex-start"
        
    },
    formContainer: {
        flexDirection: 'row',
        maxHeight: 80, 
        marginTop: 40,
        marginBottom: 20,
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        paddingLeft: 16,
        flex: 1,
        marginRight: 5,
        color:"black"
    },
    button: {
        height: 47,
        borderRadius: 5,
        backgroundColor: '#788eec',
        width: 80,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        textAlign:"center"
    },
    listContainer: {
        marginTop: 20,
        padding: 20,
        width:"90%",
        flex:1,
    },
    entityContainer: {
        marginTop: 16,
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1,
        paddingBottom: 16,
        minHeight:120
    },
    entityText: {
        fontSize: 20,
        color: '#333333'
    }
})
