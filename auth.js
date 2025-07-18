// auth.js
import { auth, db } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const provider = new GoogleAuthProvider();

// 新規登録
export async function signUp(email, password) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  await sendEmailVerification(user);
  await saveUserData(user);
  alert("登録完了！確認メールを送信しました。メールを確認してください。");
}

// ログイン
export async function login(email, password) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  if (!userCredential.user.emailVerified) {
    alert("メール認証をしてください。");
    await signOut(auth);
    throw new Error("メール未認証");
  }
  return userCredential.user;
}

// Googleログイン
export async function loginWithGoogle() {
  const result = await signInWithPopup(auth, provider);
  const user = result.user;
  await saveUserData(user);
  return user;
}

// Firestoreにユーザーデータ保存（初回のみ想定）
async function saveUserData(user) {
  const userRef = doc(db, "users", user.uid);
  await setDoc(userRef, {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName || "",
    photoURL: user.photoURL || "",
    createdAt: new Date(),
  }, { merge: true });
}

// ログアウト
export async function logout() {
  await signOut(auth);
}

// パスワードリセット
export async function resetPassword(email) {
  await sendPasswordResetEmail(auth, email);
}

// 認証状態監視（ログイン状態を検知）
export function onAuthChange(callback) {
  onAuthStateChanged(auth, callback);
}
