
import firebase from "firebase/app";
import "firebase/auth";

export default {
    actions: {
      async login({dispatch, commit}, {email, password}) {
        try {
            await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(()=>{
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
          } catch (e) {
            e.code !='auth/invalid-email' ? commit('setError', e) : false
            throw e
        }
      },
      async logout() {
        await firebase.auth().signOut()
      }
    }
  }