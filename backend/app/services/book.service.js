const { ObjectId } = require("mongodb");

class BookService {
	constructor(ownerId, client) {
		this.ownerId = ObjectId.isValid(ownerId) ? new ObjectId(ownerId) : null;
		this.Book = client.db().collection("books");
	}

	async create(payload) {
		const book = {
			title: payload.title,
			author: payload.author,
			publishDate: payload.publishDate,
			publisher: payload.publisher,
			category: payload.category,
			ownerId: this.ownerId,
		};
		// As collection.insertOne() doesn't return the inserted document,
		// we need to use collection.findOneAndUpdate to get the inserted document
		const result = await this.Book.findOneAndUpdate(
			book,
			{ $set: { favorite: payload.favorite === true } },
			{ returnDocument: "after", upsert: true }
		);
		return result.value;
	}

	async find(filter) {
		const cursor = await this.Book.find({
			...filter,
			ownerId: this.ownerId,
		});
		return await cursor.toArray();
	}

	async findFavorite() {
		return await this.find({
			favorite: true,
			ownerId: this.ownerId,
		});
	}

	async findByName(title) {
		return await this.find({
			title: { $regex: new RegExp(title), $options: "i" },
			ownerId: this.ownerId,
		});
	}

	async findById(id) {
		return await this.Book.findOne({
			_id: ObjectId.isValid(id) ? new ObjectId(id) : null,
			ownerId: this.ownerId,
		});
	}

	async update(id, payload) {
		const filter = {
			_id: ObjectId.isValid(id) ? new ObjectId(id) : null,
			ownerId: this.ownerId,
		};
		// Don't want to put _id and ObjectId types in the $set object
		const { _id, ownerId, ...update } = payload;
		const result = await this.Book.findOneAndUpdate(
			filter,
			{ $set: update },
			{ returnDocument: "after" }
		);
		return result.value;
	}

	async delete(id) {
		const result = await this.Book.findOneAndDelete({
			_id: ObjectId.isValid(id) ? new ObjectId(id) : null,
			ownerId: this.ownerId,
		});
		return result.value;
	}

	async deleteAll() {
		const result = await this.Book.deleteMany({
			ownerId: this.ownerId,
		});
		return result.deletedCount;
	}
}

module.exports = BookService;
