import Vue from 'vue'
import { Form, FormItem, Input, Tooltip, Button, Message } from 'element-ui'

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Tooltip)
Vue.use(Button)
// Vue.use(Message) 这么使用的时候刷新页面会自动弹框。
Vue.component(Message.name, Message)

Vue.prototype.$message = Message
