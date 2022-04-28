const BookService = require("../services/book.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

// Create and Save a new Book
exports.create = async (req, res, next) => {
	if (!req.body?.title) {
		return next(new ApiError(400, "Name can not be empty"));
	}

	try {
		const bookService = new BookService(req.userId, MongoDB.client);
		const document = await bookService.create(req.body);
		return res.send(document);
	} catch (error) {
		console.log(error);
		return next(
			new ApiError(500, "An error occurred while creating the book")
		);
	}
};

// Retrieve all books of a user from the database
exports.findAll = async (req, res, next) => {
	let documents = [];

	try {
		const bookService = new BookService(req.userId, MongoDB.client);
		const { title } = req.query;
		if (title) {
			documents = await bookService.findByName(title);
		} else {
			documents = await bookService.find({});
		}
	} catch (error) {
		console.log(error);
		return next(
			new ApiError(500, "An error occurred while retrieving books")
		);
	}

	return res.send(documents);
};

// Find a single book with an id
exports.findOne = async (req, res, next) => {
	try {
		const bookService = new BookService(req.userId, MongoDB.client);
		const document = await bookService.findById(req.params.id);
		if (!document) {
			return next(new ApiError(404, "Book not found"));
		}
		return res.send(document);
	} catch (error) {
		console.log(error);
		return next(
			new ApiError(
				500,
				`Error retrieving book with id=${req.params.id}`
			)
		);
	}
};

// Update a book by the id in the request
exports.update = async (req, res, next) => {
	if (Object.keys(req.body).length === 0) {
		return next(new ApiError(400, "Data to update can not be empty"));
	}

	try {
		const bookService = new BookService(req.userId, MongoDB.client);
		const document = await bookService.update(req.params.id, req.body);
		if (!document) {
			return next(new ApiError(404, "Book not found"));
		}
		return res.send({ message: "Book was updated successfully" });
	} catch (error) {
		console.log(error);
		return next(
			new ApiError(500, `Error updating book with id=${req.params.id}`)
		);
	}
};

// Delete a book with the specified id in the request
exports.delete = async (req, res, next) => {
	try {
		const bookService = new BookService(req.userId, MongoDB.client);
		const document = await bookService.delete(req.params.id);
		if (!document) {
			return next(new ApiError(404, "Book not found"));
		}
		return res.send({ message: "Book was deleted successfully" });
	} catch (error) {
		console.log(error);
		return next(
			new ApiError(
				500,
				`Could not delete book with id=${req.params.id}`
			)
		);
	}
};

// Delete all books of a user from the database
exports.deleteAll = async (req, res, next) => {
	try {
		const bookService = new BookService(req.userId, MongoDB.client);
		const deletedCount = await bookService.deleteAll();
		return res.send({
			message: `${deletedCount} books were deleted successfully`,
		});
	} catch (error) {
		return next(
			new ApiError(500, "An error occurred while removing all books")
		);
	}
};

// Find all favorite books of a user
exports.findAllFavorite = async (req, res, next) => {
	try {
		const bookService = new BookService(req.userId, MongoDB.client);
		const documents = await bookService.findFavorite();
		return res.send(documents);
	} catch (error) {
		return next(
			new ApiError(
				500,
				"An error occurred while retrieving favorite books"
			)
		);
	}
};
