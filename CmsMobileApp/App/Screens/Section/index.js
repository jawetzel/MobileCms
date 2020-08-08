import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class Section extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <View style={styles.container}>
                <Text>{this.props.route.params.Title}</Text>
                <Button
                    onPress={() => this.props.navigation.navigate('Detail', {Title: "Section 1 - Detail 1"})}
                    title="Detail 1"
                    color="#841584"
                    accessibilityLabel="Detail 1"
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
