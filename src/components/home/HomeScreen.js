import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from './styles';
import { Modal } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import * as Actions from "../../store/actions"
import moment from 'moment';
import Loader from '../../common/Loader';

const HomeScreen = (props) => {



    const dispatch = useDispatch()

    const [IsLoadingTasks, setIsLoadingTasks] = useState(true)
    const [IsLoadingCreateTask, setIsLoadingCreateTask] = useState(false)
    const [IsDeleteLoading, setIsDeleteLoading] = useState(null)
    const [IsLoadingUpdate, setIsLoadingUpdate] = useState(false)

    const [TaskText, setTaskText] = useState('')
    const [entities, setEntities] = useState([])
    const [DialogOpen, setDialogOpen] = useState(false)
    const [TaskToUpdate, setTaskToUpdate] = useState(null)
    const [UpdatedTaskText, setUpdatedTaskText] = useState("")


    const Tasks = useSelector(state => state.User.Tasks)


    useEffect(() => {
        getTasksForUser()
    }, [])

    const getTasksForUser = async () => {

        setIsLoadingTasks(true)

        await dispatch(Actions.GetTasks())

        setIsLoadingTasks(false)

    }

    const onAddButtonPress = async () => {
        if (!TaskText) Alert.alert("Please enter a task!")

        setIsLoadingCreateTask(true)
        await dispatch(Actions.AddNewTask(TaskText))
        setIsLoadingCreateTask(false)
        setTaskText("")

    }



    const onDeletePress = async (id) => {


        Alert.alert(
            "Are you sure?",
            "This action can not be undo, are you sure you want to delete this task?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Delete!", onPress: async () => {
                        setIsDeleteLoading(id)
                        await dispatch(Actions.DeleteTask(id))
                        setIsDeleteLoading(null)
                    }
                }
            ]
        );

    }


    const onMarkStatusUpdate = async (id, status) => {


        Alert.alert(
            "Are you sure?",
            status ? "Are you sure you want to mark this task as done?" : "Are you sure you want to mark this task as incomplete?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Mark!", onPress: async () => {
                        setIsDeleteLoading(id)
                        await dispatch(Actions.UpdateStaus(id, status))
                        setIsDeleteLoading(null)
                    }
                }
            ]
        );

    }


    const onUpdatePress = async () => {
        if (!UpdatedTaskText) return Alert.alert("Please enter a task!")

        setIsLoadingUpdate(true)
        await dispatch(Actions.UpdateSummary(TaskToUpdate.id, UpdatedTaskText));
        setIsLoadingUpdate(false)
        setDialogOpen(false)
        setTaskToUpdate(null)
    }

    const renderEntity = ({ item, index }) => {
        return (
            <View style={styles.entityContainer}>
                <View style={{ flex: 1, }}>

                    <Text style={{ textDecorationLine: item.done ? "line-through" : "none" }} >
                        {index + 1}.) {item.summary}
                    </Text>
                    <Text style={{ fontWeight: "bold", marginTop: 20 }} >
                        Created At.) {moment(item.createdDate).format("LLL")}
                    </Text>

                </View>
                <View style={{ flex: 1, paddingTop: 20 }}>

                    {
                        IsDeleteLoading === item.id ? <Loader/> : (
                            <>
                                <TouchableOpacity
                                    style={{ ...styles.button, width: 210 }}
                                    onPress={() => onMarkStatusUpdate(item.id, !item.done)}>
                                    <Text style={styles.buttonText}>
                                        {
                                            item.done ? "Mark as incomplete" : "Mark As Done"
                                        }
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ ...styles.button, width: 210, marginTop: 10 }}
                                    onPress={() => {
                                        setTaskToUpdate(item)
                                        setUpdatedTaskText(item.summary)
                                        setDialogOpen(true)
                                    }}>
                                    <Text style={styles.buttonText}>Edit</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={{ ...styles.button, width: 210, marginTop: 10 }}
                                    onPress={() => onDeletePress(item.id)}>
                                    <Text style={styles.buttonText}>Delete</Text>
                                </TouchableOpacity>
                            </>
                        )
                    }
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder='Add new task'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setTaskText(text)}
                    value={TaskText}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                {
                    IsLoadingCreateTask ? <Loader/> : (
                        <TouchableOpacity style={styles.button} onPress={onAddButtonPress}>
                            <Text style={styles.buttonText}>Add</Text>
                        </TouchableOpacity>
                    )
                }

            </View>
            {
                IsLoadingTasks ? <Loader/> : null
            }
            {
                !IsLoadingTasks && Tasks.length === 0 ? (
                    <Text style={{fontSize:30,color:"grey"}}>
                        No Tasks Found
                    </Text>
                ) : null
            }
            {!IsLoadingTasks && Tasks.length > 0 && (
                <View style={styles.listContainer}>
                    <FlatList
                        data={Tasks}
                        renderItem={renderEntity}
                        keyExtractor={(item) => item.id}
                        removeClippedSubviews={true}
                    />
                </View>
            )}
            {
                DialogOpen ? (
                    <Modal isOpen={DialogOpen} onClose={() => setDialogOpen(false)}>
                        <Modal.Content maxWidth="400px">
                            <Modal.CloseButton />
                            <Modal.Body style={{ paddingTop: 10, height: 200, alignItems: "center" }}>
                                <TextInput
                                    style={{ ...styles.input, flex: 0, marginTop: 40, width: "100%", marginBottom: 10 }}
                                    placeholder='Add new entity'
                                    placeholderTextColor="#aaaaaa"
                                    onChangeText={(text) => setUpdatedTaskText(text)}
                                    value={UpdatedTaskText}
                                    underlineColorAndroid="transparent"
                                    autoCapitalize="none"
                                />
                                {
                                    IsLoadingUpdate ? <Loader/> : <TouchableOpacity
                                        style={{ ...styles.button, width: "100%", marginTop: 10 }}
                                        onPress={onUpdatePress}>
                                        <Text style={styles.buttonText}>Update</Text>
                                    </TouchableOpacity>
                                }

                            </Modal.Body>
                        </Modal.Content>
                    </Modal>
                ) : null
            }
        </View>
    )
}


export default HomeScreen