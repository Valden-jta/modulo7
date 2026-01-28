// *---------------------- Comment model ---------------------- *\\

class Comment {
  constructor(
    comment_id,
    user_id,
    book_id,
    collection_id,
    content,
    created_at,
    updated_at,
  ) {
    this.comment_id = comment_id;
    this.user_id = user_id;
    this.book_id = book_id; // opcional: comentarios sobre libro
    this.collection_id = collection_id; // opcional: comentarios sobre colección
    this.content = content;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}

module.exports = { Comment };
