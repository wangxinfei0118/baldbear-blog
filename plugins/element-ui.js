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
  Message,
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
  Popover,
  Pagination,
  Cascader
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
  Message,
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
  Popover,
  Pagination,
  Cascader
]
const Element = {
  install(Vue) {
    components.forEach((component) => {
      Vue.component(component.name, component)
    })
  }
}
Vue.prototype.$mb = MessageBox
Vue.prototype.$message = Message
Vue.prototype.$message.success = function (message) {
  Message({
    message,
    type: 'success',
    offset: 80
  })
}
Vue.prototype.$message.error = function (message) {
  Message({
    message,
    type: 'error',
    offset: 80
  })
}
Vue.prototype.$message.info = function (message) {
  Message({
    message,
    type: 'info',
    offset: 80
  })
}
Vue.prototype.$message.warning = function (message) {
  Message({
    message,
    type: 'warning',
    offset: 80
  })
}
Vue.use(Element)
