<template>
	<div class="page row">
		<div class="col-md-10">
			<InputSearch v-model="searchText" />
		</div>
		<div class="mt-3 col-md-6">
			<h4>
				Các Sách hiện có
				<i class="fas fa-book"></i>
			</h4>
			<BookList
				v-if="filteredBooksCount > 0"
				:books="filteredBooks"
				v-model:activeIndex="activeIndex"
			/>
			<p v-else>Chưa có Sách nào được thêm vào!</p>

			<div class="mt-3 row justify-content-around align-items-center">
				<button class="btn btn-sm btn-primary" @click="refreshList()">
					<i class="fas fa-redo"></i> Làm mới
				</button>

				<button class="btn btn-sm btn-success" @click="goToAddBook">
					<i class="fas fa-plus"></i> Thêm mới
				</button>

				<button
					class="btn btn-sm btn-danger"
					@click="removeAllBooks"
				>
					<i class="fas fa-trash"></i> Xóa tất cả
				</button>
			</div>
		</div>
		<div class="mt-3 col-md-6">
			<div v-if="activeBook">
				<h4>
					Thông tin Sách
					<i class="fas fa-book-open"></i>
				</h4>
				<BookCard :book="activeBook" />
				<router-link
					:to="{
						name: 'book.edit',
						params: { id: activeBook._id },
					}"
				>
					<span class="mt-2 badge badge-warning">
						<i class="fas fa-edit"></i> Chỉnh sửa</span
					>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import { swalert } from "@/mixins/swal.mixin";
import BookCard from "@/components/BookCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import BookList from "@/components/BookList.vue";
import BookService from "@/services/book.service";

export default {
	components: {
		BookCard,
		InputSearch,
		BookList,
	},
	data() {
		return {
			books: [],
			activeIndex: -1,
			searchText: "",
		};
	},
	watch: {
		searchText() {
			this.activeIndex = -1;
		},
	},
	computed: {
		contactStrings() {
			return this.books.map((book) => {
				const { title, author, publishDate, pulisher, category } = book;
				return [title, author, publishDate, pulisher, category].join("");
			});
		},
		filteredBooks() {
			if (!this.searchText) return this.books;
			return this.books.filter((_contact, index) =>
				this.contactStrings[index].includes(this.searchText)
			);
		},
		activeBook() {
			if (this.activeIndex < 0) return null;
			return this.filteredBooks[this.activeIndex];
		},
		filteredBooksCount() {
			return this.filteredBooks.length;
		},
	},
	methods: {
		async retrieveBooks() {
			try {
				this.books = await BookService.getAll();
				this.books.sort((current, next) =>
					current.title.localeCompare(next.title)
				);
			} catch (error) {
				console.log(error);
			}
		},

		refreshList() {
			this.retrieveBooks();
			this.activeIndex = -1;
		},

		async removeAllBooks() {
			swalert
				.fire({
					title: "Xóa tất cả Sách",
					icon: "warning",
					text: "Bạn muốn xóa tất cả Sách?",
					showCloseButton: true,
					showCancelButton: true,
				})
				.then(async (result) => {
					if (result.isConfirmed) {
						try {
							await BookService.deleteAll();
							this.refreshList();
						} catch (error) {
							console.log(error);
						}
					}
				});
		},

		goToAddBook() {
			this.$router.push({ name: "book.add" });
		},
	},
	created() {
		this.refreshList();
	},
};
</script>

<style scoped>
.page {
	text-align: left;
	max-width: 750px;
}
</style>
