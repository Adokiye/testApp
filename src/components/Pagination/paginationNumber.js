import React, {Component} from 'react';
import {View, Text} from 'react-native';

import PaginationItem from './paginationItem';
import PaginationItemStyle from './styles/style.paginationNumber';
class HeaderPagination extends Component {
  render() {
    const {viewCount, units} = this.props;
    let itemsAlias = [];
    //use units to populate pagination items
    for (let i = 1, len = units; i <= len; i++) {
      itemsAlias.push(i);
    }

    const itemsList = itemsAlias.map((item, index) => {
      return (
        <PaginationItem
          key={index}
          value={'0' + String(item)}
          active={viewCount === item - 1}
        />
      );
    });

    return <View style={PaginationItemStyle.container}>{itemsList}</View>;
  }
}

export default HeaderPagination;
