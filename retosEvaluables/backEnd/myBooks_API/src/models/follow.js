// *---------------------- Follow model ---------------------- *\\

class Follow {
  constructor(follow_id, follower_user_id, target_user_id, created_at) {
    this.follow_id = follow_id;
    this.follower_user_id = follower_user_id;
    this.target_user_id = target_user_id;
    this.created_at = created_at;
  }
}

module.exports = { Follow };
