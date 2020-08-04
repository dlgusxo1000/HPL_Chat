import React, {Component} from 'react';
import DropdownMenu from 'react-native-dropdownmenus';
import {StyleSheet, Text, View, Image, TextInput, Alert, ImageBackground,TouchableOpacity} from 'react-native';

let conditionData = [ 
                    ["서울특별시", 
                     "부산광역시", 
                     "대전광역시", 
                     '인천광역시', 
                     '광주광역시', 
                     '대구광역시', 
                     '세종특별자치시', 
                     '제주특별자치도'], 
                    ["성남동", 
                     "달동", 
                     "옥동",
                     "신정동",
                     "대연동",
                     "용호동",
                     "삼산동"],
                    ];

export default class Dropdown extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
  }

  render() {
    return (
        <DropdownMenu
            style={{flex :1, }}
            bgColor={'null'}
            tintColor={'#36657d'}
            activityTintColor={'green'}
            // arrowImg={}
            // checkImage={}
            optionTextStyle={{color: 'red'}}
            titleStyle={{color: 'red'}}
            maxHeight={135}
            handler={(selection, row) =>
                console.log(selection,row)
                    }
            data={conditionData}
            selectIndex={[0,0]}>


        </DropdownMenu>
    )
  }
}
