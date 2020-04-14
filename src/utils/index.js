import {Message} from 'element-ui'

/**
 * 全局设置弹出消息窗口
 * @param message
 * @param type = 'error' 、'warning' 、'success'
 */
export function setMessage(message, type = 'info', duration = 2000) {
  Message({
    showClose: true,
    message,
    type,
    duration
  })
}