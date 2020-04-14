import Mock from 'mockjs'
// 获取 mock.Random 对象
const Random = Mock.Random
/**
 * 如果get请求带有参数，则使用
 *  Mock.mock(RegExp(url + '.*'), 'get', {})
 *  如果是post请求，则使用
 *  Mock.mock(url, 'post', {}
 *  如果使用的是函数处理的话，函数的参数中包含了 type、url、body参数
 */
/* 内置用户 */
const userArr = [
  {userId: '111111', password: '111111'},
  {userId: '222222', password: '222222'},
  {userId: 'root', password: 'root123'},
]
/* 登录用户返回的对象 */
const getUser = (userId) => Mock.mock({
  code: 200,
  userId,
  username: '@cname',
  'age|17-60': 0,
  'sex|0-1': 0,
  card: '@id',
  'phone': '@string(number,11)',
  birthday: Random.date('yyyy-MM-dd'),
  'major': '@csentence(4,8)',
  address: '@county(true)',
  native: '@province',
  nation: '汉',
  position: '@csentence(4,12)'
})
// 请求该url，就可以返回newsList
Mock.mock('/login', 'post', (options) => {
  const {userId, password} = JSON.parse(options.body)
  let result = userArr.find(user => user.userId === userId)
  if (result) {
    if (result.password === password) {
      return getUser(userId)
    } else {
      return {
        code: 302,
        message: '密码错误，请重新输入'
      }
    }
  } else {
    return {
      code: 301,
      message: '该用户不存在'
    }
  }
})

Mock.setup({
  timeout: 700
})