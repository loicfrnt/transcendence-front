import { RelStatus, User } from '../types/user'

export default function isFriend(currUser: User, secondUser: User) {
  if (currUser.received_relationships) {
    for (let relationship of currUser.received_relationships) {
      console.log(secondUser.id, relationship.issuer_id, relationship.status)
      if (
        relationship.status === RelStatus.Friends &&
        relationship.issuer_id === secondUser.id
      ) {
        return true
      }
    }
  }
  if (currUser.sent_relationships) {
    for (let relationship of currUser.sent_relationships) {
      if (
        relationship.status === RelStatus.Friends &&
        relationship.receiver_id === secondUser.id
      ) {
        return true
      }
    }
  }
  return false
}
