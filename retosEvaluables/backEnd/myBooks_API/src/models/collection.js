// *---------------------- Collection model ---------------------- *\\

class Collection {
  constructor(
    collection_id,
    user_id,
    name,
    description,
    is_public,
    created_at,
    updated_at,
  ) {
    this.collection_id = collection_id;
    this.user_id = user_id;
    this.name = name;
    this.description = description;
    this.is_public = is_public;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}

// Relación N:M colección-libro
class CollectionBook {
  constructor(collection_id, book_id, position, added_at) {
    this.collection_id = collection_id;
    this.book_id = book_id;
    this.position = position;
    this.added_at = added_at;
  }
}

module.exports = { Collection, CollectionBook };
