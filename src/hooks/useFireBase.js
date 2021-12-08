import { useEffect, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import firebaseInitialization from "firebase/firebase.init";
import axios from "axios";
import { useHistory } from "react-router";

firebaseInitialization();

const useFireBase = () => {
  const [user, setUser] = useState({});
  const history = useHistory();

  const auth = getAuth();

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser({});
      }
    });
    return () => unsubscribed;
  }, [auth]);

  // register user
  const registerUser = (name, email, password) => {
    createUserWithEmailAndPassword(auth, email, password, history)
      .then((userCredential) => {
        if (userCredential.user) {
          const user = userCredential.user;
          console.log(user);
          axios({
            method: "post",
            url: "https://registertest.free.beeceptor.com/init",
            data: {
              userId: user.uid,
              email: email,
            },
          })
            .then((response) => {
              //assume response is 200
              // if response is 200 then
              // history.push("/admin")
              console.log(response);
            })
            .catch((error) => console.log(error))
            .finally(() => history.push("/admin")); //assume response is 200 and redirected to admin page
        }
      })
      .catch((error) => {});
  };

  //   login user
  const loginUser = (email, password, history) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        if (userCredential.user) {
          const user = userCredential.user;
          console.log(user);
          axios({
            method: "post",
            url: "https://registertest.free.beeceptor.com/init",
            data: {
              userId: user.uid,
              email: email,
            },
          })
            .then((response) => {
              //assume response is 200
              // if response is 200 then
              // history.push("/admin")
              console.log(response);
            })
            .catch((error) => console.log(error))
            .finally(() => history.push("/admin")); //assume response is 200 and redirected to admin page
        }
      })
      .catch((error) => {});
  };

  return { user, registerUser, loginUser };
};

export default useFireBase;
