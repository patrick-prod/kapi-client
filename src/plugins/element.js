import Vue from 'vue'
import {
  Row,
  Col,
  Form,
  FormItem,
  Input,
  Tooltip,
  Button,
  Message,
  Container,
  Aside,
  Header,
  Main,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Dialog,
  Switch,
  Menu,
  MenuItem,
  Submenu,
  MenuItemGroup,
  Tabs,
  TabPane,
  Card,
  Select,
  Option,
  Radio,
  Alert,
  Table,
  TableColumn,
  Badge,
  Tag,
  Pagination,
  Link
} from 'element-ui'

Vue.use(Row)
Vue.use(Col)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Tooltip)
Vue.use(Button)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Header)
Vue.use(Main)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Dialog)
Vue.use(Switch)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Card)
Vue.use(Select)
Vue.use(Option)
Vue.use(Radio)
Vue.use(Alert)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Badge)
Vue.use(Tag)
Vue.use(Pagination)
Vue.use(Link)
// Vue.use(Message) 这么使用的时候刷新页面会自动弹框。
Vue.component(Message.name, Message)

Vue.prototype.$message = Message
