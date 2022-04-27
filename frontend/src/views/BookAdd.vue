<template>
	<div class="page">
		<div>
			<h4>Thêm Sách Mới</h4>
			<BookForm
				:book="{}"
				:resetAfterSubmit="false"
				@submit:book="saveBook"
			/>
		</div>
	</div>
</template>

<script>
import { swtoast } from "@/mixins/swal.mixin";
import BookForm from "@/components/BookForm.vue";
import BookService from "@/services/book.service";

export default {
	components: {
		BookForm,
	},
	methods: {
		async saveBook(data) {
			try {
				await BookService.create(data);
				swtoast.success({
					text: "Thêm sách thành công.",
				});
			} catch (error) {
				console.log(error);
				swtoast.error({
					text: "Đã có lỗi xảy ra.",
				});
			}
		},
	},
};
</script>
