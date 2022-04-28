<template>
	<Form
		ref="contactForm"
		@submit="submitBook"
		:validation-schema="bookFormSchema"
	>
		<div class="form-group">
			<label for="title">Tựa</label>
			<Field
				name="title"
				type="text"
				class="form-control"
				v-model="bookLocal.title"
			/>
			<ErrorMessage name="title" class="error-feedback" />
		</div>
		<div class="form-group">
			<label for="author">Tác giả</label>
			<Field
				name="author"
				type="text"
				class="form-control"
				v-model="bookLocal.author"
			/>
			<ErrorMessage name="author" class="error-feedback" />
		</div>
		<div class="form-group">
			<label for="publishDate">Năm xuất bản</label>
			<Field
				name="publishDate"
				type="text"
				class="form-control"
				v-model="bookLocal.publishDate"
			/>
			<ErrorMessage name="publishDate" class="error-feedback" />
		</div>
		<div class="form-group">
			<label for="publisher">Nhà xuất bản</label>
			<Field
				name="publisher"
				type="text"
				class="form-control"
				v-model="bookLocal.publisher"
			/>
			<ErrorMessage name="publisher" class="error-feedback" />
		</div>
		<div class="form-group">
			<label for="category">Thể loại</label>
			<Field
				name="category"
				type="text"
				class="form-control"
				v-model="bookLocal.category"
			/>
			<ErrorMessage name="category" class="error-feedback" />
		</div>
		<div class="form-group form-check">
			<input
				name="favorite"
				type="checkbox"
				class="form-check-input"
				v-model="bookLocal.favorite"
			/>
			<label for="favorite" class="form-check-label">
				<strong>Sách yêu thích</strong>
			</label>
		</div>
		<div class="form-group">
			<button class="btn btn-primary">
				<i class="fas fa-save"></i> Lưu
			</button>
			<button
				v-if="bookLocal._id"
				type="button"
				class="ml-2 btn btn-danger"
				@click="deleteBook"
			>
				<i class="fas fa-trash"></i> Xóa
			</button>
		</div>
	</Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
	components: {
		Form,
		Field,
		ErrorMessage,
	},
	emits: ["submit:book", "delete:book"],
	props: {
		book: { type: Object, required: true },
		resetAfterSubmit: { type: Boolean, default: false },
	},
	data() {
		const bookFormSchema = yup.object().shape({
			title: yup
				.string()
				.required("Tựa không được bỏ trống."),
			author: yup
				.string()
				.required("Tác giả không được bỏ trống."),
			publishDate: yup
				.string()
				.required("Năm xuất bản không được bỏ trống.")
				.matches(
					/((18|19|20)+(\d{2})\b)/g,
					"Năm xuất bản không hợp lệ."
				),
			publisher: yup
				.string()
				.required("Nhà xuất bản không được bỏ trống."),
			category: yup
				.string()
				.required("Thể loại không được bỏ trống."),
		});
		return {
			bookLocal: this.book,
			bookFormSchema,
		};
	},
	methods: {
		submitBook() {
			this.$emit("submit:book", this.bookLocal);
			if (this.resetAfterSubmit) {
				this.$refs.bookForm.resetForm();
			}
		},
		deleteBook() {
			this.$emit("delete:book", this.bookLocal._id);
		},
	},
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>
