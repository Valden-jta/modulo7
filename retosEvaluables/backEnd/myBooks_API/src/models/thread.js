// *---------------------- Thread / Message models ---------------------- *\\

class Thread {
  constructor(thread_id, is_group, name, created_at, updated_at) {
    this.thread_id = thread_id;
    this.is_group = is_group;
    this.name = name;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}

class ThreadMember {
  constructor(thread_id, user_id, joined_at) {
    this.thread_id = thread_id;
    this.user_id = user_id;
    this.joined_at = joined_at;
  }
}

class Message {
  constructor(message_id, thread_id, user_id, content, created_at) {
    this.message_id = message_id;
    this.thread_id = thread_id;
    this.user_id = user_id;
    this.content = content;
    this.created_at = created_at;
  }
}

module.exports = { Thread, ThreadMember, Message };
