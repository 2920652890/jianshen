const PUSH = 'PUSH'
const REMOVE = 'REMOVE'

const initState = {
  pages: []
}

export default function reducer(state = initState, action = {}) {
  const { pages } = state
  switch (action.type) {
    case PUSH:
      pages.push(action.pageName)
      return {
        ...state,
        pages
      }
    case REMOVE:
      let index = pages.indexOf(action.pageName)
      if (index > -1) {
        pages.splice(index, 1)
      }
      return {
        ...state,
        pages
      }
    default:
      return state
  }
}

//推入刷新栈
export const push = pageName => ({ type: PUSH, pageName })
//移除
export const remove = pageName => ({ type: REMOVE, pageName })
