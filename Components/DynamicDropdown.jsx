import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';



const DynamicDropdown = ({ ...props }) => {


    const handleClick = (item) => {
        props.itemCallback(item)
    }
    const [value, setValue] = useState(null);

    return (
        <Dropdown
            {...props}
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={props.data}
            search
            maxHeight={300}
            // labelField="item_name"
            // valueField="item_name"

            // placeholder="Select item"
            // searchPlaceholder="Search..."
            value={value}
            // onChange={item => {
            //     setValue(item.item_name);
            //     handleClick(item.item_name)
            // }}
            {...props}
            renderLeftIcon={() => (
                <AntDesign style={styles.icon} color="black" name="search1" size={20} />
            )}
        />
    );
};

export default DynamicDropdown;

const styles = StyleSheet.create({
    dropdown: {
        backgroundColor: 'white',
        
        height: 50,
        // borderColor: 'gray',
        // borderWidth: 0.5,
        paddingHorizontal: 10,
        borderRadius: 8,
    },
    icon: {
        marginRight: 5,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});