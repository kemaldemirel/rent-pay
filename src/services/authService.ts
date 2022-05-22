import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

export class authService {
  static async authMethod({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    const auth = getAuth();
    return await signInWithEmailAndPassword(auth, email, password);
  }

  static async signOutMethod() {
    const auth = getAuth();
    return await signOut(auth);
  }
}
