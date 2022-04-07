/* eslint-disable array-callback-return */

import { prependOnceListener } from "process";

/**
 * Clase para leer y escribir datos en los archivos de usuario.
 */
export interface IUser {
  id: number;
  userName: string;
  pwd: string;
  status: string;
  friends: string;
}
export interface IMessage {
  id: number;
  from: string;
  to: string;
  text: string;
}

export default class DataManager {
  static async postMessage(msg: IMessage) {
    await fetch("http://localhost:5000/messages?", {
      method: "POST",
      body: JSON.stringify(msg),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  static async fetchMessages(userName: string, friendName: string) {
    let res: Array<IMessage> = Array(0);
    const response = await fetch("http://localhost:5000/messages?");
    const jsonData = await response.json();

    const keys = Object.keys(jsonData);

    keys.forEach((e) => {
      let data = jsonData[e] as IMessage;
      if (
        (data.from.toLowerCase() === userName.toLowerCase() ||
          data.to.toLowerCase() === userName.toLowerCase()) &&
        (data.from.toLowerCase() === friendName.toLowerCase() ||
          data.to.toLowerCase() === friendName.toLowerCase())
      ) {
        res.push(data);
      }
    });

    return res;
  }

  static fetchAllUserData = async () => {
    let res: Array<IUser> = [];
    const response = await fetch("http://localhost:5000/users?");
    const jsonData = await response.json();

    const keys = Object.keys(jsonData);

    keys.forEach((e) => res.push(jsonData[e] as IUser));

    return res;
  };

  /**
   * Comprueba que una pareja de datos usuario-contraseña exista
   * y sea válida.
   * @param user
   * @param pwd
   */
  static async checkCredentials(user: string, pwd: string) {
    let valid = false;

    await DataManager.fetchAllUserData().then((data) =>
      data.map((u: IUser) => {
        if (u.userName.toLowerCase() === user.toLowerCase() && u.pwd === pwd) {
          console.log(u);
          console.log("User " + u.userName + " found. Proceeding to log in...");
          valid = true;

          return;
        }
      })
    );

    console.log(valid ? "Validation correct." : "Validation incorrect.");

    return valid;
  }

  /**
   * Devuelve un array con todos los amigos y sus estados.
   *
   * @param userName
   */
  static async getFriends(userName: string): Promise<IUser[] | undefined> {
    return await DataManager.fetchAllUserData().then((data) => {
      return data
        .map((user) => {
          // Si encontramos el usuario
          if (user.userName === userName) {
            // Extraemos sus amigos
            let friends = Array(0);
            user.friends.split(",").map((friend: string) => {
              data.map((u) => {
                if (u.userName.toLowerCase() === friend) {
                  friends.push({
                    name: friend[0].toUpperCase() + friend.substring(1),
                    status: u.status,
                  });
                  return;
                }
              });
            });
            return friends;
          }
        })
        .filter((e) => {
          return e != null;
        })[0];
    });
  }

  static async logIn(userName: string) {
    return await DataManager.fetchAllUserData().then((data) =>
      data.map((user: IUser) => {
        if (user.userName.toLowerCase() === userName.toLowerCase()) {
          user.status = "online";
          fetch("http://localhost:5000/users/" + user.id, {
            method: "PUT",
            body: JSON.stringify(user),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => console.log(response))
            .catch((error) => console.log("An error ocurred: " + error));
          return;
        }
      })
    );
  }

  static async logOut(userName: string) {
    return await DataManager.fetchAllUserData().then((data) =>
      data.map((user: IUser) => {
        if (user.userName.toLowerCase() === userName.toLowerCase()) {
          user.status = "offline";
          fetch("http://localhost:5000/users/" + user.id, {
            method: "PUT",
            body: JSON.stringify(user),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => console.log(response))
            .catch((error) => console.log("An error ocurred: " + error));
          return;
        }
      })
    );
  }
}
