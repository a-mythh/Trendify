class ApiFeatures {
	constructor(query, queryString) {
		this.query = query;
		this.queryString = queryString;
	}

	search() {
		const keyword = this.queryString.keyword
			? {
					name: {
						$regex: this.queryString.keyword,
						$options: "i", // case-insensitive search
					},
			  }
			: {};

		this.query = this.query.find({ ...keyword });
		return this;
	}

	filter() {
		const queryCopy = { ...this.queryString };

		// removing some fields for category
		const removeFields = ["keyword", "page", "limit"];

		removeFields.forEach((key) => delete queryCopy[key]);

		// filter for price and rating
		let queryString = JSON.stringify(queryCopy);
		queryString = queryString.replace(
			/\b(gt|gte|lt|lte)\b/g, // regex
			(key) => `$${key}`
		);

		this.query = this.query.find(JSON.parse(queryString));
		return this;
	}

	pagination(resultPerPage) {
		const currentPage = Number(this.queryString.page) || 1;

		// number of results to skip
		const skip = resultPerPage * (currentPage - 1);

		// limit the number of results per page and skip the amount before that
		this.query = this.query.limit(resultPerPage).skip(skip);

		return this;
	}
}

module.exports = ApiFeatures;
