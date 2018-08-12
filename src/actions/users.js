import projectService from '../services/users';

// const fetch = ()=>{
//     return  (async () => {
//      const   content = await projectService.get();
//         console.log(content);
//       })();
// }

export default function fetchUsers() {
  //   let content;
  //   (async () => {
  //     content = await projectService.get();
  //     console.log(content);
  //   })();
  return {
    type: 'FETCH_USERS',
    payload: (async () => {
      const content = await projectService.get().then(res => {
        return res;
      });
      console.log(content);
      return content;
    })()
  };
}

// export default  function fetchUsers(fetch) {
//   return { type: "FETCH_USERS", payload: fetch };
// }

// export const fetchUsers = () => dispatch => {
//       console.log('I got tracks');
//       dispatch({ type: 'FETCH_USERS', payload: projectService.get() });
//   };
