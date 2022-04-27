<template>
	<div class="col-md-12">
		<div class="card card-container">
			<img
				id="profile-img"
				src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
				alt="Cannot load the image"
				class="profile-img-card"
			/>
			<Form
				@submit="handleRegister"
				:validation-schema="registerFormSchema"
			>
				<div v-if="!successful">
					<div class="form-group">
						<label for="username">Tên đăng nhập</label>
						<Field
							name="username"
							type="text"
							class="form-control"
						/>
						<ErrorMessage name="username" class="error-feedback" />
					</div>
					<div class="form-group">
						<label for="email">E-mail</label>
						<Field name="email" type="email" class="form-control" />
						<ErrorMessage name="email" class="error-feedback" />
					</div>
					<div class="form-group">
						<label for="password">Mật khẩu</label>
						<Field
							name="password"
							type="password"
							class="form-control"
						/>
						<ErrorMessage name="password" class="error-feedback" />
					</div>

					<div class="form-group">
						<button
							class="btn btn-primary btn-block"
							:disabled="loading"
						>
							<span
								v-show="loading"
								class="spinner-border spinner-border-sm"
							></span>
							Đăng ký
						</button>
					</div>
				</div>
			</Form>

			<div
				v-if="message"
				class="alert"
				:class="successful ? 'alert-success' : 'alert-danger'"
			>
				{{ message }}
			</div>
		</div>
	</div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { mapActions } from "pinia";
import { useAuthStore } from "@/stores/auth.store";

export default {
	components: {
		Form,
		Field,
		ErrorMessage,
	},
	data() {
		const registerFormSchema = yup.object().shape({
			username: yup
				.string()
				.required("Tên đăng nhập phải có giá trị.")
				.min(3, "Tên phải ít nhất 2 ký tự.")
				.max(20, "Tên tối đa có 20 ký tự."),
			email: yup
				.string()
				.required("E-mail phải có giá trị.")
				.email("E-mail không đúng.")
				.max(50, "E-mail tối đa 50 ký tự."),
			password: yup
				.string()
				.required("Mật khẩu phải có giá trị.")
				.min(6, "Mật khẩu tối thiểu 6 ký tự.")
				.max(40, "Mật khẩu tối đa 40 ký tự."),
		});

		return {
			successful: false,
			loading: false,
			message: "",
			registerFormSchema,
		};
	},
	methods: {
		...mapActions(useAuthStore, ["register"]),
		async handleRegister(user) {
			this.message = "";
			this.successful = false;
			this.loading = true;

			try {
				const data = await this.register(user);

				this.message = data.message;
				this.successful = true;
				this.loading = false;
			} catch (error) {
				console.log(error);

				this.message = "Đã có lỗi xảy ra.";
				this.successful = false;
				this.loading = false;
			}
		},
	},
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>
