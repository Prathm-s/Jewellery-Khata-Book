import React, { useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import { assets, COLORS, FONTS, SIZES } from '../constants';



const DropdownScreen = (props) => {
    const [dropdown, setDropdown] = useState(null);
    const [selected, setSelected] = useState([]);
    
    const data = props.data

    const _renderItem = item => {
        return (
            <View style={[styles.item]}>
                <Text style={styles.textItem}>{item.label}</Text>
                {/* <Image style={styles.icon} source={assets.bottom} /> */}
            </View>
        );
    };

    return (
        <View style={[styles.inputGroup, { ...props }]}>
            <Text style={styles.label}>{props.label}</Text>
            <Dropdown
                style={styles.dropdown}
                containerStyle={styles.shadow}
                data={data}
                
                searchPlaceholder="Search"
                labelField="label"
                valueField="value"
                label="Dropdown"
                placeholder={`Select ${props.label}`}
                value={dropdown}
                onChange={item => {
                    setDropdown(item.value);
                    props.onChangeText(item.value)
                }}
                // renderLeftIcon={() => (
                //     <Image style={styles.icon} source={assets.bottom} />
                // )}
                renderItem={item => _renderItem(item)}
                textError="Error"
            />
            {props.error && <Text style={styles.error}>{error}</Text>}
            {/* <MultiSelect
                style={styles.dropdown}
                data={data}
                labelField="label"
                valueField="value"
                label="Multi Select"
                placeholder="Select item"
                search
                searchPlaceholder="Search"
                value={selected}
                onChange={item => {
                    setSelected(item);
                    console.log('selected', item);
                }}
                renderItem={item => _renderItem(item)}
            /> */}
        </View>

    );
};

export default DropdownScreen;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // backgroundColor: 'white',
        // padding: 40,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        color: COLORS.naturelDark,
        fontWeight: FONTS.bold,
        fontSize: SIZES.font,
        marginBottom: 12,
        lineHeight: 21,
        letterSpacing: .5,
    },
    dropdown: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: COLORS.naturelLight,
        borderRadius: 5,
        fontSize: SIZES.small,
        fontWeight: FONTS.bold,
        color: COLORS.naturelGrey,

    },
    icon: {
        marginRight: 5,
        width: 18,
        height: 18,
    },
    item: {
        padding: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textItem: {
        flex: 1,
        fontSize: SIZES.small,
        fontWeight: FONTS.bold,
        color: COLORS.naturelGrey

    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    error: {
        color: COLORS.primaryRed,
        fontWeight: FONTS.bold,
        fontSize: SIZES.small,
        marginTop: 4,
        letterSpacing: .5,
    }
});