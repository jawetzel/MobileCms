import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class Home extends React.Component {
    constructor(props) {
        super(props);

    }

    //this.props.route.params is params from caller
    //this.props.route.name == route name

    componentDidMount() {

        //load up stuff
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>HOME</Text>
                <Button
                    onPress={() => this.props.navigation.navigate('Section', { Title: "Section 1"})}
                    title="Section 1"
                    color="#841584"
                    accessibilityLabel="Section 1"
                />
                <Button
                    onPress={() => this.props.navigation.navigate('About')}
                    title="About Us"
                    color="#841584"
                    accessibilityLabel="About Us"
                />
                <Button
                    onPress={() => this.props.navigation.navigate('Contact')}
                    title="Contact Us"
                    color="#841584"
                    accessibilityLabel="Contact Us"
                />
            </View>
        );
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});