const initialState = {
  users: ['ghg', 'jhh']
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_USERS':
      return { ...state, users: action.payload };
      break;

    default:
      return state;
  }
}
