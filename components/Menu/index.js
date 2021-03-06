import PropTypes from 'prop-types';
import { Menu as MenuAnt } from 'antd';
import MenuItem from '../MenuItem';
import Icon from '../Icon';
import SubMenu from '../SubMenu';
import StyledMenu from './StyledMenu';
import 'antd/lib/menu/style';

export default class Menu extends React.Component{

  getMenuItem = (item) => {
    return (
      <MenuItem styling={this.props.styling} key={item.name}>
        {item.linkTo ? <a href={item.linkTo} target={item.target || "_blank"} key={item.name}>{item.name}</a>
        : item.name}
      </MenuItem>
    )
  }

  getSubmenuItem = (item) => {
    const iconRight = item.iconRight && <Icon type={item.iconRight} isRight />;
    const iconLeft = item.iconLeft && <Icon type={item.iconLeft} />;
    const subItems = item.subNavigation.map(subItem => (
      <MenuItem key={subItem.name}>
        {subItem.linkTo ? <a href={subItem.linkTo} target={subItem.target || "_blank"} key={subItem.name}>{subItem.name}</a>
          : subItem.name}
      </MenuItem>
    ));

    return(
      <SubMenu styling={{color: "#ffffff"}} key={item.name} title={<span>{iconLeft}{item.name}{iconRight}</span>}>
        {subItems}
      </SubMenu>
    )
  }

  getMenu = (item) =>
    item.subNavigation ?
      this.getSubmenuItem(item) : this.getMenuItem(item);

  render(){
    const {onClick, items, selectedKeys, mode, className, styling} = this.props;
    return(
      <StyledMenu styling={styling}>
        <MenuAnt
          onClick={onClick}
          selectedKeys={selectedKeys}
          mode={mode}
          className={className}
        >
          {items.map(this.getMenu)}
        </MenuAnt>
      </StyledMenu>
    )
  }
}

Menu.propTypes = {
  styling: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  selectedKeys: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  mode: PropTypes.string.isRequired,
  className: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};
