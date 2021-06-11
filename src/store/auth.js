
import firebase from "firebase/app";
import "firebase/auth";

export default {
    actions: {
      async login({dispatch, commit}, {email, password}) {
        try {
            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(()=>{
                return firebase.auth().signInWithEmailAndPassword(email, password)
            })
            
        } catch (e) {
            e.code !='auth/invalid-email' ? commit('setError', e) : false
          throw e
        }
      },
      async register({dispatch, commit}, {email, password, name}) {
        try {
            await firebase.auth().createUserWithEmailAndPassword(email, password)
            let date = new Date(Date.now() + 86400e3);
            date = date.toUTCString();
            document.cookie = `user=${email}; expires=${date}`;
            /* const uid = await dispatch('getUid') */
/*             await firebase.database().ref(`/users/${uid}/info`).set({
              bill: 10000,
              name
            }) */
          } catch (e) {
            e.code !='auth/invalid-email' ? commit('setError', e) : false
            throw e
        }
      },
      getUid() {
        const user = firebase.auth().currentUser
        return user ? user.uid : null
      },
      async logout() {
        await firebase.auth().signOut()
        document.cookie = `user=${email}; max-age=0`;
      }
    }
  }