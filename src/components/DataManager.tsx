/* eslint-disable array-callback-return */
/**
 * Clase para leer y escribir datos en los archivos de usuario.
 */
export default class DataManager {
  static data: Array<Array<string>> = [
    ["Delmer", "delm3r", "offline", "candelario,leo,cisco"],
    ["Candelario", "c4ndel", "online", "delmer,leo"],
    ["Leo", "le0", "offline", "delmer,candelario,cisco"],
    ["Cisco", "c1sc0", "online", "decmer,leo,amadeo"],
    ["Amadeo", "4m4deo", "online", "cisco"],
  ];

  /**
   * Comprueba que una pareja de datos usuario-contraseña exista
   * y sea válida.
   * @param user
   * @param pwd
   */
  static checkCredentials(user: string, pwd: string) {
    let valid = false;

    this.data.forEach((u) => {
      if (u[0].toLowerCase() === user.toLowerCase() && u[1] === pwd) {
        valid = true;
        return;
      }
    });

    return valid;
  }

  /**
   * Devuelve un array con todos los amigos y sus estados.
   *
   * @param userName
   */
  static getFriends(userName: string) {
    return this.data
      .map((user) => {
        // Si encontramos el usuario
        if (user[0] === userName) {
          // Extraemos sus amigos
          let friends = Array(0);
          user[3].split(",").map((friend: string) => {
            this.data.map((u) => {
              if (u[0].toLowerCase() === friend) {
                friends.push({
                  name: friend[0].toUpperCase() + friend.substring(1),
                  status: u[2],
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
  }

  static logIn(userName: string) {
    this.data.map((user) => {
      if (user[0].toLowerCase() === userName.toLowerCase()) {
        user[2] = "online";
        return;
      }
    });
  }

  /**
   * Carga todos los datos disponibles
   */
  // static loadAll() {
  //     let temp = new Array(0)

  //     fs.readFileSync('../data/users.txt', 'utf-8')
  //     .split("\n")
  //     .map((line:any) => {
  //         temp.push(line.split(";"))
  //     })

  //     console.log(temp)

  //     return temp
  // }
}

console.log(DataManager.getFriends("Delmer"));
