<template>
	<div v-if="book" class="page">
		<h4>Cập nhật thông tin Sách</h4>
		<BookForm
			:book="book"
			@submit:book="updateBook"
			@delete:book="deleteBook"
		/>
	</div>
</template>

<script>
import { swtoast, swalert } from "@/mixins/swal.mixin";
import BookForm from "@/components/BookForm.vue";
import BookService from "@/services/book.service";

export default {
	components: {
		BookForm,
	},
	props: {
		id: { type: String, required: true },
	},
	data() {
		return {
			book: null,
		};
	},
	methods: {
		async getBook(id) {
			try {
				this.book = await BookService.get(id);
			} catch (error) {
				console.log(error);
				this.$router.push({
					name: "notfound",
					params: { pathMatch: this.$route.path.split("/").slice(1) },
					query: this.$route.query,
					hash: this.$route.hash,
				});
			}
		},

		async updateBook(data) {
			try {
				await BookService.update(this.book._id, data);
				swtoast.success({
					text: "Thông tin Sách đã được cập nhật.",
				});
			} catch (error) {
				console.log(error);
				swtoast.error({
					text: "Đã có lỗi xảy ra.",
				});
			}
		},

		async deleteBook() {
			swalert
				.fire({
					title: "Xóa Sách",
					icon: "warning",
					text: "Bạn muốn xóa Sách này?",
					showCloseButton: true,
					showCancelButton: true,
				})
				.then(async (result) => {
					if (result.isConfirmed) {
						try {
							await BookService.delete(this.book._id);
							swtoast.success({
								text: "Sách đã được xóa.",
							});
							this.$router.push({ name: "bookapp" });
					  	} catch (error) {
							console.log(error);
							swtoast.error({
								text: "Đã có lỗi xảy ra.",
							});
						}
					}
				});
		},
	},
	created() {
		this.getBook(this.id);
	},
};
</script>
