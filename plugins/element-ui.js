import Vue from 'vue'
import {
  Button,
  Input,
  Row,
  Col,
  Icon,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  MenuItem,
  MenuItemGroup,
  Submenu,
  Radio,
  Card,
  MessageBox,
  Backtop,
  Divider,
  Timeline,
  TimelineItem,
  Collapse,
  CollapseItem,
  Upload,
  Tree,
  Tag,
  Form,
  FormItem,
  Tooltip,
  Table,
  TableColumn,
  RadioGroup,
  Avatar,
  Empty,
  Popover
} from 'element-ui'

const components = [
  Button,
  Input,
  Row,
  Col,
  Icon,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  MenuItem,
  MenuItemGroup,
  Submenu,
  Radio,
  Card,
  MessageBox,
  Backtop,
  Divider,
  Timeline,
  TimelineItem,
  Collapse,
  CollapseItem,
  Upload,
  Tree,
  Tag,
  Form,
  FormItem,
  Tooltip,
  Table,
  TableColumn,
  RadioGroup,
  Avatar,
  Empty,
  Popover
]
const Element = {
  install(Vue) {
    components.forEach((component) => {
      Vue.component(component.name, component)
    })
  }
}
Vue.prototype.$mb = MessageBox
Vue.use(Element)
