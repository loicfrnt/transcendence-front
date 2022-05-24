import { ProtoUser, RelStatus, User } from '../types/user'

export default function isBlocked(currUser: User, secondUser: ProtoUser) {
  if (currUser.sent_relationships) {
    for (let relationship of currUser.sent_relationships) {
      if (
        relationship.status === RelStatus.Blocked &&
        relationship.receiver_id === secondUser.id
      ) {
        return true
      }
    }
  }
  return false
}
